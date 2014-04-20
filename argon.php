<?php

// Add this file to a server that supports PHP

//*****uncomment the line below to enable cross-domain access to Argon.*****
// header('Access-Control-Allow-Origin: *');

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
	}
	return $dataToReturn;
}

function actionIsAllowed($actionX,$groupNameX,$userNameX) {
	$config_file = array();
	if (file_exists("backend/config.json")) {
		$config_file = openFile("backend/config.json");
		$config_file = json_decode($config_file,true);
	} else {
		return true;
	}
	$return_val = false;

	if ($groupNameX !== "") {
		if (array_key_exists($groupNameX, $config_file)) { //group config
			$gSettings = $config_file[$groupNameX];
			if (array_key_exists($userNameX, $gSettings)) {
				$uSettings = $gSettings[$userNameX];
				if (array_key_exists($actionX, $uSettings)) {
					if ($uSettings[$actionX] === true) {
						$return_val = true;
					} else {
						$return_val = false;
					}
				} else {
					$return_val = true;
				}
			} else { //global username
				if (array_key_exists("*", $gSettings)) {
					$uSettings = $gSettings["*"];
					if (array_key_exists($actionX, $uSettings)) {
						if ($uSettings[$actionX] === true) {
							$return_val = true;
						} else {
							$return_val = false;
						}
					} else {
						$return_val = true;
					}
				} else {
					$return_val = true;
				}
			}
		} else { //global group
			if (array_key_exists("*", $config_file)) { //group config
				$gSettings = $config_file["*"];
				if (array_key_exists($userNameX, $gSettings)) {
					$uSettings = $gSettings[$userNameX];
					if (array_key_exists($actionX, $uSettings)) {
						if ($uSettings[$actionX] === true) {
							$return_val = true;
						} else {
							$return_val = false;
						}
					} else {
						$return_val = true;
					}
				} else { //global username
					if (array_key_exists("*", $gSettings)) {
						$uSettings = $gSettings["*"];
						if (array_key_exists($actionX, $uSettings)) {
							if ($uSettings[$actionX] === true) {
								$return_val = true;
							} else {
								$return_val = false;
							}
						} else {
							$return_val = true;
						}
					} else {
						$return_val = true;
					}
				}
			} else {
				$return_val = true;
			}
		}
	} else {
		if (array_key_exists($actionX, $config_file)) {
			if (is_Array($config_file[$actionX]) === false) {
				if ($config_file[$actionX] === false) {
					$return_val = false;
				} else {
					$return_val = true;
				} 
			} else {
				$return_val = true;
			}
		} else {
			$return_val = true;
		}
	}
	return $return_val;
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

function splitString($stringX, $by) {
	$arrayX = explode($by, $stringX);
	return $arrayX;
}

function saveFile($url, $dataToSave,$prop=null) {
	$file = $url;
	if (strlen(json_encode($dataToSave)) < 157286400) { //maxiumum file size
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
		echo '{"argonError":"not enough available storage"}';
	}
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

//.htaccess file to prevent unauthorized access
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
		if (actionIsAllowed("creategroup","",$userName) === true) {
			$oldmask = umask(0);
			mkdir("$directory/$groupName/", 0777);
			umask($oldmask);
			$group_loggedin = true;
		}
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
				$output_error = json_decode('{"argonError":"user incorrect"}');
			}
		} else {
			$output_error = json_decode('{"argonError":"user incorrect"}');
		}

	} else if ($userName === "default") {
		saveFile("$directory/$groupName/default.json","{}");
		saveFile("$directory/$groupName/default.json", "default","pass");
		$user_loggedin = true;
	} else {
		$output_error = json_decode('{"argonError":"user does not exist"}');
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
		if ($action === "set" && actionIsAllowed($action,$groupName,$userName) === true) {

			saveFile("$directory/$groupName/$userName.json", $data,"data");
			$main_output[$k] = json_decode('{"argonInfo":"set"}');

		} else if ($action === "setOther" && actionIsAllowed($action,$groupName,$userName) === true) {

			$otherUser = $request['otherUser'];

			if (file_exists("$directory/$groupName/$otherUser.json")) {
				$openedWrite = openFile("$directory/$groupName/$otherUser.json", "permissions");
				$permissionProperties = $openedWrite;
				
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
					saveFile("$directory/$groupName/$otherUser.json", $data,"data");
					$main_output[$k] = json_decode('{"argonInfo":"set"}');
				} else {
					$main_output[$k] = json_decode('{"argonError":".set() permission not granted."}');
				}
			} else {
				$main_output[$k] = json_decode('{"argonError":"user does not exist."}');
			}

		} else if ($action === "get" && actionIsAllowed($action,$groupName,$userName) === true) {

			$openedData = openFile("$directory/$groupName/$userName.json", "data");
			$getProperties = $data;
			if ($getProperties === "all") {

				if ($openedData !== "") {
					$main_output[$k] = $openedData;
				} else {
					$main_output[$k] = json_decode('{"argonError":"user is empty"}');
				}

			} else {
				$getProperties = splitString($getProperties, "@n@");
				if ($openedData !== "") {
					$openedData = $openedData;
					$outputObj = array();

					foreach ($openedData as $pName => $pData) {
						for ($x = 0; $x < count($getProperties); $x++) {
							if ($pName === $getProperties[$x]) {
								$outputObj[$pName] = $pData;
							}
						}
					}

					$outputObj = $outputObj;
					//encode output obj to json
					$main_output[$k] = $outputObj;

				} else {//opened data is empty
					$main_output[$k] = json_decode('{"argonError":"user is empty"}');
				}

			}
		} else if ($action === "generateAuthToken") {
			if ($data['user'] !== "default") {
				$_username = $data['user'];
				$_password = $data['pass'];
				if (file_exists("$directory/$groupName/$_username.json")) {
					if (openFile("$directory/$groupName/$_username.json",'pass') === $_password || openFile("$directory/$groupName/$_username.json",'token') === $_password) {
						if (actionIsAllowed($action,$groupName,$_username) === true) {
							$token = genToken();
							saveFile("$directory/$groupName/$_username.json", $token,"token");
							$main_output[$k] = $token;
						} else {
							$main_output[$k] = "not_allowed";
						}
					} else {
						$main_output[$k] = json_decode('{"argonError":"user incorrect"}');
					}
				} else {
					$main_output[$k] = json_decode('{"argonError":"user incorrect"}');
				}
			} else {
				$main_output[$k] = "not_allowed";
			}
		} else if ($action === "changePass" && actionIsAllowed($action,$groupName,$userName) === true) {
			if ($userName !== "default") {
				$newPass = $data;
				saveFile("$directory/$groupName/$userName.json", $newPass,"pass");
				$main_output[$k] = json_decode('{"argonInfo":"password changed"}');
			} else {
				$main_output[$k] = json_decode('{"argonError":"cannot modify default user password"}');
			}
		} else if ($action === "getOther" && actionIsAllowed($action,$groupName,$userName) === true) {

			$otherUser = $data;

			if (file_exists("$directory/$groupName/$otherUser.json")) {
				$openedRead = openFile("$directory/$groupName/$otherUser.json","permissions");
				$permissionProperties = json_encode($openedRead);
				$permissionProperties = json_decode($permissionProperties,true);
				
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
						$main_output[$k] = json_decode('{"argonError":"user is empty"}');
					}
				} else {//check if any property allows $userName read access
					$openedPropertyPerm = openFile("$directory/$groupName/$otherUser.json", "permissions");
					$openedData = openFile("$directory/$groupName/$otherUser.json", "data");
					//actual data
					$openedData = $openedData;
					$permissionProperties = json_encode($openedPropertyPerm);
					$permissionProperties = json_decode($permissionProperties);

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
						$outputObj = $outputObj;
						//encode output obj to json
						$main_output[$k] = $outputObj;
					} else {//otherwise, present error
						$main_output[$k] = json_decode('{"argonError":".get() permission not granted."}');
					}

				}
			} else {
				$main_output[$k] = json_decode('{"argonError":"user does not exist"}');
			}
		} else if ($action === "updateOther" && actionIsAllowed($action,$groupName,$userName) === true) {

			$otherUser = $request['otherUser'];

			if (file_exists("$directory/$groupName/$otherUser.json")) {
				$openedWrite = openFile("$directory/$groupName/$otherUser.json", "permissions");
				$permissionProperties = $openedWrite;
				
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
						$openedData = $openedData;
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
						} else {
							if (actionIsAllowed("updateOther:removeProp",$groupName,$userName) === true) {
								$outputData[$opName] = $opData;
							}
						}
					}//end $openData foreach

					foreach ($clientData as $cpName => $cpData) {//push all clientData (from argon.js) properties to output object
						if ($cpName !== 'DELETE') {//do not store 'DELETE' property
							$outputData[$cpName] = $cpData;
						} else {
							if (actionIsAllowed("updateOther:updateExistingProp",$groupName,$userName) === false) {
								$outputData[$opName] = $opData;
							}
						}
					}
					saveFile("$directory/$groupName/$otherUser.json", $outputData,"data");

					$main_output[$k] = json_decode('{"argonInfo":"updated"}');

				} else {
					$main_output[$k] = json_decode('{"argonError":".update() permission not granted."}');
				}
			} else {
				$main_output[$k] = json_decode('{"argonError":"user does not exist."}');
			}

		} else if ($action === "update" && actionIsAllowed($action,$groupName,$userName) === true) {

			$openedData = openFile("$directory/$groupName/$userName.json", "data");
			if ($openedData === "") {
				$openedData = array();
			} else {
				$openedData = $openedData;
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
				} else {
					if (actionIsAllowed("update:removeProp",$groupName,$userName) === false) {
						$outputData[$opName] = $opData;
					}
				}
			}//end $openData foreach

			foreach ($clientData as $cpName => $cpData) {//push all clientData (from argon.js) properties to output object
				if ($cpName !== 'DELETE') {//do not store 'DELETE' property
					if (array_key_exists($cpName,$outputData) === true) {
						if (actionIsAllowed("update:updateExistingProp",$groupName,$userName) === true) {
							$outputData[$cpName] = $cpData;
						}
					} else {
						$outputData[$cpName] = $cpData;
					}
				}
			}
			saveFile("$directory/$groupName/$userName.json", $outputData,"data");

			$main_output[$k] = json_decode('{"argonInfo":"updated"}');
		} else if ($action === "setPermissions" && actionIsAllowed($action,$groupName,$userName) === true) {
			if ($userName !== "default") {//make sure no permissions are set on default user
				$permissionProperties = $data;
				saveFile("$directory/$groupName/$userName.json",$permissionProperties,"permissions");
				$main_output[$k] = json_decode('{"argonInfo":"permissions updated"}');
			} else {
				$main_output[$k] = json_decode('{"argonError":"permissions cannot be edited on default user"}');
			}

		} else if ($action === "getPermissions" && actionIsAllowed($action,$groupName,$userName) === true) {
			if ($userName !== "default") {//make sure no permissions are set on default user
				$permissionProperties = openFile("$directory/$groupName/$userName.json","permissions");
				if ($permissionProperties === "") {
					$permissionProperties = '{}';
				}
				$main_output[$k] = $permissionProperties;
			} else {
				$main_output[$k] = json_decode('{"argonError":"permissions cannot be retrieved for default user"}');
			}

		} else if ($action === "removeUser" && actionIsAllowed($action,$groupName,$userName) === true) {
		    
			//remove user file
			unlink("$directory/$groupName/$userName.json");
			$main_output[$k] = json_decode('{"argonInfo":"removed user ' . $userName . ' from group ' . $groupName . '"}');
				
		} else if ($action === "createuser" && actionIsAllowed($action,$groupName,$userName) === true) {
			$info = $data;

			foreach ($info as $pName => $pData) {
				if ($pName === "username") {
					$newUsername = $pData;
				} else if ($pName === "password") {
					$newPassword = $pData;
				}
			}

			if (file_exists("$directory/$groupName/$newUsername.json")) {
				$main_output[$k] = json_decode('{"argonError":"user ' . $newUsername . ' already exists"}');
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
						
						$main_output[$k] = json_decode('{"argonInfo":"user created"}');
					} else {
						$main_output[$k] = json_decode('{"argonError":"username invalid"}');
					}
				} else {
					$main_output[$k] = json_decode('{"argonError":"password invalid"}');
				}
			}

		} else {
			$main_output[$k] = json_decode('{"argonError":"' . $action . ' is not a valid action"}');
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
		$main_output[$k] = json_decode('{"argonError":"username or groupname invalid"}');
	}
	echo json_encode($main_output);
}

?>