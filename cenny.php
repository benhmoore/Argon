<?php

/* * * * * * * * * * * * * * * * * *
 *
 * <- Backend for Cenny.js ->
 *
 * How data is stored:
 *   Backend (root) directory
 *      v
 *    Group directory
 *      v
 *     User directory
 *      v
 *      Data.txt
 *
 *
 /* * * * * * * * * * * * * * * * * */

$IP = $_SERVER['REMOTE_ADDR'];

function is_assoc($var) {
	return is_array($var) && array_diff_key($var, array_keys(array_keys($var)));
}

function openFile($url, $prop=null) {
	if (file_exists($url)) {
		$file = $url;
		$dataToReturn = file_get_contents($file);
		if ($prop !== null) {
			if ($dataToReturn !== "") {
				$dataToReturn = json_decode($dataToReturn,true);
			} else {
				$dataToReturn = array();
			}
			if (array_key_exists($prop,$dataToReturn)) {
				$dataToReturn = $dataToReturn["$prop"];
			} else {
				$dataToReturn = "";	
			}
		}
	} else {
		saveFile($url, "");
		$dataToReturn = "";
	}
	return $dataToReturn;

}

function endsWith($haystack, $needle)
{
    return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
}

function genToken() {
	$length = 67;
	$chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-.!,";
	//length:36
	$final_rand = '';
	for ($i = 0; $i < $length; $i++) {
		$final_rand .= $chars[rand(0, strlen($chars) - 1)];

	}
	return $final_rand;
}
function delete_files($dir) {
	if (is_dir($dir)) {
		$objects = scandir($dir);
		foreach ($objects as $object) {
			if ($object != "." && $object != "..") {
				if (filetype($dir . "/" . $object) == "dir")
					rrmdir($dir . "/" . $object);
				else
					unlink($dir . "/" . $object);
			}
		}
		reset($objects);
		rmdir($dir);
	}
}

function splitString($stringX, $by) {
	$arrayX = explode($by, $stringX);
	return $arrayX;
}

function saveFile($url, $dataToSave,$prop=null) {
	$file = $url;
	if (strlen($dataToSave) < 157286400) { //maxiumum file size
		if ($prop !== null) {
			
			$opened_data = file_get_contents($file);
			if ($opened_data !== "") {
				$opened_data = json_decode($opened_data,true);
			} else {
				$opened_data = array();
			}
			$opened_data[$prop] = $dataToSave;
			file_put_contents($file, json_encode($opened_data));
		} else {
			file_put_contents($file, $dataToSave);
		}
	} else {
		echo '{"cenError":"not enough available storage"}';
	}
}

function addToFile($url, $dataToSave) {
	$myFile = $url;
	$fh = fopen($myFile, 'a') or die($myFile);
	fwrite($fh, $dataToSave);
	fclose($fh);
}

//***********************************************************
$group_loggedin = false;
$user_loggedin = false;
//***********************************************************

$groupName = $_POST['groupName'];

$userName = $_POST['userName'];
$userPass = $_POST['userPass'];

$directory = "backend";
if (file_exists("backend/")) {
} else {
	$oldmask = umask(0);
	mkdir("backend/", 0777);
	umask($oldmask);

}

//security 
$data_for_htaccess = "Order deny,allow" . "\n" . "Deny from all";
file_put_contents("$directory/.htaccess", $data_for_htaccess);


//make sure groupName & userName are valid
$userNameValid = false;
$groupNameValid = false;
$userPassValid = true;


//pass
if (strlen($userPass) > 70) {
	$userPassValid = false;
} else if (strlen($userPass) < 5) {
	$userPassValid = false;
}

//username
if (preg_match('/^\w{5,}$/', $userName)) {
	$userNameValid = true;
}
if (strlen($userName) > 22) {
	$userNameValid = false;
}

//group
if (preg_match('/^\w{5,}$/', $groupName)) {
	$groupNameValid = true;
}
if (strlen($groupName) > 22) {
	$groupNameValid = false;
}

$output_error = "";

//continue only if username / groupname valid
if ($groupNameValid === true && $userNameValid === true && $userPassValid === true) {
	
	// groups

	if (file_exists("$directory/$groupName/")) {
		$group_loggedin = true;
	} else {
		$oldmask = umask(0);
		mkdir("$directory/$groupName/", 0777);
		umask($oldmask);
		$group_loggedin = true;
	}

	// users

	if (file_exists("$directory/$groupName/$userName.json")) {
		$orginalPass = openFile("$directory/$groupName/$userName.json",'pass');
		$token = openFile("$directory/$groupName/$userName.json",'token');
		if ($orginalPass === $userPass) {
			$user_loggedin = true;
		} else if ($token !== "") {
			if ($token === $userPass) {
				$user_loggedin = true;
			} else {
				$output_error = '{"cenError":"user incorrect"}';
			}
		} else {
			$output_error = '{"cenError":"user incorrect"}';
		}

	} else if ($userName === "default") {
		saveFile("$directory/$groupName/default.json","{}");
		saveFile("$directory/$groupName/default.json", "default","pass");
		$user_loggedin = true;
	} else {
		$output_error = '{"cenError":"user does not exist"}';
	}

	//########################################################################################################################
	if ($group_loggedin === true && $user_loggedin === true) {

		//**********************************************
		$requests = json_decode($_POST['requests'],true);
		
		$main_output = array();
		
		for ($k = 0; $k < count($requests); $k++) {
		
		$request = $requests[$k];
		
		$action = $requests[$k]['action'];
		$data = $requests[$k]['data'];
		//**********************************************

		// - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - /
		if ($action === "set") {

			saveFile("$directory/$groupName/$userName.json", json_encode($data),"data");
			$main_output[$k] = '{"cenInfo":"set"}';

		} else if ($action === "setOther") {

			$otherUser = $request['otherUser'];

			if (file_exists("$directory/$groupName/$otherUser.json")) {
				$openedWrite = openFile("$directory/$groupName/$otherUser.json", "permissions");
				$permissionProperties = json_decode($openedWrite,true);
				
				$dotSet_permissions = false;
				$userFoundInP = false;
				
				if ($permissionProperties !== null && $permissionProperties !== "") {
					if (isset($permissionProperties['.set'])) {
						$dotSet_permissions = $permissionProperties['.set'];
					}
					if (is_array($dotSet_permissions) === true) {
						for ($i = 0; $i < count($dotSet_permissions); $i++) {
							if ($dotSet_permissions[$i] === $userName) {
								$userFoundInP = true;
							}
						}
					}
				}
				if ($userFoundInP === true || $dotSet_permissions === true) {
					saveFile("$directory/$groupName/$otherUser.json", json_encode($data),"data");
					$main_output[$k] = '{"cenInfo":"set"}';
				} else {
					$main_output[$k] = '{"cenError":".set() permission not granted."}';
				}
			} else {
				$main_output[$k] = '{"cenError":"user does not exist."}';
			}

		} else if ($action === "get") {

			$openedData = openFile("$directory/$groupName/$userName.json", "data");
			$getProperties = $data;
			if ($getProperties === "all") {

				if ($openedData !== "") {
					$main_output[$k] = $openedData;
				} else {
					$main_output[$k] = '{"cenError":"user is empty"}';
				}

			} else {
				$getProperties = splitString($getProperties, "@n@");
				if ($openedData !== "") {
					$openedData = json_decode($openedData);
					$outputObj = array();

					foreach ($openedData as $pName => $pData) {
						for ($x = 0; $x < count($getProperties); $x++) {
							if ($pName === $getProperties[$x]) {
								$outputObj[$pName] = $pData;
							}
						}
					}

					$outputObj = json_encode($outputObj);
					//encode output obj to json
					$main_output[$k] = $outputObj;

				} else {//opened data is empty
					$main_output[$k] = '{"cenError":"user is empty"}';
				}

			}

		} else if ($action === "generateAuthToken") {
			if ($userName !== "default") {
				$token = genToken();
				saveFile("$directory/$groupName/$userName.json", $token,"token");
				$main_output[$k] = json_encode($token);
			}

		} else if ($action === "changePass") {
			if ($userName !== "default") {
				$newPass = $data;
				saveFile("$directory/$groupName/$userName.json", $newPass,"pass");
				$main_output[$k] = '{"cenInfo":"password changed"}';
			} else {
				$main_output[$k] = '{"cenError":"cannot modify default user password"}';
			}
		} else if ($action === "getOther") {

			$otherUser = $data;

			if (file_exists("$directory/$groupName/$otherUser.json")) {
				$openedRead = openFile("$directory/$groupName/$otherUser.json","permissions");
				$permissionProperties = json_decode($openedRead,true);
				
				$dotGet_permissions = false;
				$userFoundInP = false;
				
				if ($permissionProperties !== null && $permissionProperties !== "") {
					if (isset($permissionProperties['.get'])) {
						$dotGet_permissions = $permissionProperties['.get'];
					}
					if (is_array($dotGet_permissions) === true) {
						for ($i = 0; $i < count($dotGet_permissions); $i++) {
							if ($dotGet_permissions[$i] === $userName) {
								$userFoundInP = true;
							}
						}
					}
				}
				if ($userFoundInP === true || $dotGet_permissions === true) {
					$openedData = openFile("$directory/$groupName/$otherUser.json","data");
					if ($openedData !== "") {
						$main_output[$k] = $openedData;
					} else {
						$main_output[$k] = '{"cenError":"user is empty"}';
					}
				} else {//check if any property allows $userName read access
					$openedPropertyPerm = openFile("$directory/$groupName/$otherUser.json", "permissions");
					$openedData = openFile("$directory/$groupName/$otherUser.json", "data");
					//actual data
					$openedData = json_decode($openedData);
					$permissionProperties = json_decode($openedPropertyPerm);

					$isThere = false;
					if ($permissionProperties !== null && $permissionProperties !== "") {//make sure permissions are set

						$outputObj = array();
						//create obj for properties user is given access to.

						foreach ($permissionProperties as $propertyName => $propertyValue) {
							if ($propertyName !== ".get" && $propertyName !== ".set" && $propertyName !== ".update") {
								
								$propertyUsers = $propertyValue;
									if (is_array($propertyUsers) === true) {
									for ($x = 0; $x < count($propertyUsers); $x++) {//look for current user in $otherUser's perms
										if ($propertyUsers[$x] === $userName) {
											$isThere = true;
											foreach ($openedData as $dataPropertyName => $dataPropertyData) {
												if ($propertyName === $dataPropertyName) {
													$outputObj[$propertyName] = $dataPropertyData;
												}
											}
										}
									}
								} else if ($propertyValue === true) {
									$isThere = true;
									foreach ($openedData as $dataPropertyName => $dataPropertyData) {
										if ($propertyName === $dataPropertyName) {
											$outputObj[$propertyName] = $dataPropertyData;
										}
									}
								}
								
							} else { //is .set, .get, or .update
								
							}
						}

					} else {//permissions are not set
						//do nothing
					}

					if ($isThere === true) {//if $userName is found in properties do this
						$outputObj = json_encode($outputObj);
						//encode output obj to json
						$main_output[$k] = $outputObj;
					} else {//otherwise, present error
						$main_output[$k] = '{"cenError":".get() permission not granted."}';
					}

				}
			} else {
				$main_output[$k] = '{"cenError":"user does not exist"}';
			}
		} else if ($action === "updateOther") {

			$otherUser = $request['otherUser'];

			if (file_exists("$directory/$groupName/$otherUser.json")) {
				$openedWrite = openFile("$directory/$groupName/$otherUser.json", "permissions");
				$permissionProperties = json_decode($openedWrite,true);
				
				$dotUpdate_permissions = false;
				$userFoundInP = false;
				
				if ($permissionProperties !== null && $permissionProperties !== "") {
					if (isset($permissionProperties['.update'])) {
						$dotUpdate_permissions = $permissionProperties['.update'];
					}
					if (is_array($dotUpdate_permissions) === true) {
						for ($i = 0; $i < count($dotUpdate_permissions); $i++) {
							if ($dotUpdate_permissions[$i] === $userName) {
								$userFoundInP = true;
							}
						}
					}
				}
				if ($userFoundInP === true || $dotUpdate_permissions === true) {
					$openedData = openFile("$directory/$groupName/$otherUser.json", "data");
					if ($openedData === "") {
						$openedData = array();
					} else {
						$openedData = json_decode($openedData);
					}

					$clientData = $data;

					$outputData = array();
					$markedFDProps = array();

					foreach ($openedData as $opName => $opData) {

						//check if should be deleted
						$shouldBeDeleted = false;
						foreach ($clientData as $cpName => $cpData) {
							if ($cpName === "DELETE") {
								for ($i = 0; $i < count($cpData); $i++) {//go though 'DELETE' array
									if ($cpData[$i] === $opName) {//mark to be deleted
										$shouldBeDeleted = true;
									}
								}//end 'DELETE' array search
							}
						}//end $clientData foreach
						if ($shouldBeDeleted === false) {//only push to output object if it should stay
							$outputData[$opName] = $opData;
						}
					}//end $openData foreach

					foreach ($clientData as $cpName => $cpData) {//push all clientData (from cenny.js) properties to output object
						if ($cpName !== 'DELETE') {//do not store 'DELETE' property
							$outputData[$cpName] = $cpData;
						}
					}
					saveFile("$directory/$groupName/$otherUser.json", json_encode($outputData),"data");

					$main_output[$k] = '{"cenInfo":"updated"}';

				} else {
					$main_output[$k] = '{"cenError":".update() permission not granted."}';
				}
			} else {
				$main_output[$k] = '{"cenError":"user does not exist."}';
			}

		} else if ($action === "update") {

			$openedData = openFile("$directory/$groupName/$userName.json", "data");
			if ($openedData === "") {
				$openedData = array();
			} else {
				$openedData = json_decode($openedData);
			}

			$clientData = $data;

			$outputData = array();
			$markedFDProps = array();

			foreach ($openedData as $opName => $opData) {

				//check if should be deleted
				$shouldBeDeleted = false;
				foreach ($clientData as $cpName => $cpData) {
					if ($cpName === "DELETE") {
						for ($i = 0; $i < count($cpData); $i++) {//go though 'DELETE' array
							if ($cpData[$i] === $opName) {//mark to be deleted
								$shouldBeDeleted = true;
							}
						}//end 'DELETE' array search
					}
				}//end $clientData foreach
				if ($shouldBeDeleted === false) {//only push to output object if it should stay
					$outputData[$opName] = $opData;
				}
			}//end $openData foreach

			foreach ($clientData as $cpName => $cpData) {//push all clientData (from cenny.js) properties to output object
				if ($cpName !== 'DELETE') {//do not store 'DELETE' property
					$outputData[$cpName] = $cpData;
				}
			}
			saveFile("$directory/$groupName/$userName.json", json_encode($outputData),"data");

			$main_output[$k] = '{"cenInfo":"updated"}';
		} else if ($action === "setPermissions") {
			if ($userName !== "default") {//make sure no permissions are set on default user
				$permissionProperties = $data;
				saveFile("$directory/$groupName/$userName.json",$permissionProperties,"permissions");
				$main_output[$k] = '{"cenInfo":"permissions updated"}';
			} else {
				$main_output[$k] = '{"cenError":"permissions cannot be edited on default user"}';
			}

		} else if ($action === "getPermissions") {
			if ($userName !== "default") {//make sure no permissions are set on default user
				$permissionProperties = openFile("$directory/$groupName/$userName.json","permissions");
				if ($permissionProperties === "") {
					$permissionProperties = '{}';
				}
				$main_output[$k] = $permissionProperties;
			} else {
				$main_output[$k] = '{"cenError":"permissions cannot be retrieved for default user"}';
			}

		} else if ($action === "removeUser") {
		    
			//remove user file
			unlink("$directory/$groupName/$userName.json");
			$main_output[$k] = '{"cenInfo":"removed user ' . $userName . ' from group ' . $groupName . '"}';
				
		} else if ($action === "userExists") {
			if (file_exists("$directory/$groupName/$data.json")) {
				$main_output[$k] = 'true';
			} else {
				$main_output[$k] = 'false';
			}
		} else if ($action === "createuser") {
			$info = $data;

			foreach ($info as $pName => $pData) {
				if ($pName === "username") {
					$newUsername = $pData;
				} else if ($pName === "password") {
					$newPassword = $pData;
				}
			}

			if (file_exists("$directory/$groupName/$newUsername.json")) {
				$main_output[$k] = '{"cenError":"user ' . $newUsername . ' already exists"}';
			} else {

				$newPasswordValid = true;
				$newUsernameValid = false;

				//pass
				if (strlen($newPassword) > 70) {
					$newPasswordValid = false;
				} else if (strlen($newPassword) < 5) {
					$newPasswordValid = false;
				}

				//username
				if (preg_match('/^\w{5,}$/', $newUsername)) {
					$newUsernameValid = true;
				}
				if (strlen($newUsername) > 22) {
					$newUsernameValid = false;
				}

				if ($newPasswordValid === true) {
					if ($newUsernameValid === true) {
						
						saveFile("$directory/$groupName/$newUsername.json","{}");
						saveFile("$directory/$groupName/$newUsername.json", $newPassword,"pass");
						
						$main_output[$k] = '{"cenInfo":"user created"}';
					} else {
						$main_output[$k] = '{"cenError":"username invalid"}';
					}
				} else {
					$main_output[$k] = '{"cenError":"password invalid"}';
				}
			}

		} else {
			$main_output[$k] = '{"cenError":"' . $action . ' is not a valid action"}';
		}
		// - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - /

		}//for loop
		
		echo json_encode($main_output);
		
	} else {
		//**********************************************
		$requests = json_decode($_POST['requests'],true);
		$main_output = array();
		for ($k = 0; $k < count($requests); $k++) {
			$main_output[$k] = $output_error;
		}
		echo json_encode($main_output);
	}//close authentication if statement
	//########################################################################################################################

} else {// userName or groupName invalid
	$requests = json_decode($_POST['requests'],true);
	$main_output = array();
	for ($k = 0; $k < count($requests); $k++) {
		$main_output[$k] = '{"cenError":"username or groupname invalid"}';
	}
	echo json_encode($main_output);
}

?>