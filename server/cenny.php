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


	function openFile($url, $size) {
		if (file_exists($url)) {
		$myFile = $url;
		$fh = fopen($myFile, 'r');
		$dataToReturn = fread($fh, $size);
		fclose($fh);	
		} else {
			saveFile($url, "");
			$dataToReturn = "";
		}
		return $dataToReturn;
	
	
	}
	
	function delete_files($dir) {
	  if (is_dir($dir)) {
	    $objects = scandir($dir);
	    foreach ($objects as $object) {
	      if ($object != "." && $object != "..") {
	        if (filetype($dir."/".$object) == "dir") 
	           rrmdir($dir."/".$object); 
	        else unlink   ($dir."/".$object);
	      }
	    }
	    reset($objects);
	    rmdir($dir);
	  }
	 }

	function saveFile($url, $dataToSave) {
		$myFile = $url;
		$fh = fopen($myFile, 'w') or die($myFile);
		fwrite($fh, $dataToSave);
		fclose($fh);
	
	
	}
	
	//***********************************************************
		$group_loggedin = false;
		$user_loggedin = false;
	//***********************************************************
	

	$action = $_POST['action'];
	
	$clientData = $_POST['data'];
	
	//formatting
		$clientData = str_replace("\'","'",$clientData);
		$clientData = str_replace('\"','"',$clientData);

	$groupName = $_POST['groupName'];
	$groupKey = $_POST['groupKey'];
	
	$userName = $_POST['userName'];
	$userPass = $_POST['userPass'];

	$directory = "backend";
	if (file_exists("backend/")) {} else {
		mkdir("backend/", 0700);
		
	}
	
	//#######################################################################################################################################################
	//############################################################### GROUP / USER ##########################################################################
	//#######################################################################################################################################################
	
	// groups
	
	if (file_exists("$directory/$groupName/")) {
		$orginalKey = openFile("$directory/$groupName/key.txt", 10000);
		if ($orginalKey === $groupKey) {
			$group_loggedin = true;
		} else {
			echo json_encode("Group key incorrect.");
		}
		
	} else {
		mkdir("$directory/$groupName/", 0700);
		saveFile("$directory/$groupName/key.txt", $groupKey);
			$group_loggedin = true;
	}
	
	// users
	
	if (file_exists("$directory/$groupName/$userName/")) {
		$orginalPass = openFile("$directory/$groupName/$userName/pass.txt", 10000);
		if ($orginalPass === $userPass) {
			$user_loggedin = true;
		} else {
			echo json_encode("User pass incorrect.");
		}
		
	} else {
		mkdir("$directory/$groupName/$userName/", 0700);
		saveFile("$directory/$groupName/$userName/pass.txt", $userPass);
			$user_loggedin = true;
	}
	
	
	
	//########################################################################################################################
	if ($group_loggedin === true && $user_loggedin === true) {
		
		// - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - /
		if ($action === "get") {
			
			$openedData = openFile("$directory/$groupName/$userName/data.txt", 500000);
			echo $openedData;
		
		} else if ($action === "set") {
		
			saveFile("$directory/$groupName/$userName/data.txt", $clientData);
			echo json_encode("saved to user " . $userName . " in group " . $groupName);
			
		} else if ($action === "removeUser") {
		
			delete_files("$directory/$groupName/$userName/");
			echo json_encode("removed user " . $userName . " in group " . $groupName);
			
		} else if ($action === "removeGroup") {
		
			delete_files("$directory/$groupName/");
			echo json_encode("removed group " . $groupName . " and all users within.");
			
		} else if ($action === "setEmail") {
            
            saveFile("$directory/$groupName/$userName/email.txt", $data);
                  
        } else if ($action === "getEmail") {
            $emailbyuser = $_POS['getEmailOfUser'];
            if (!empty($emailbyuser)) {
                $openedEmail = openFile("$directory/$groupName/$emailbyuser/email.txt", 1000);
            } else {
                $openedEmail = openFile("$directory/$groupName/$userName/email.txt", 1000);
            }
            echo $openedEmail;
        
        } else if ($action === "saveToken") {
		    
		    if (file_exists("backend/token.txt")) {
		        echo json_encode("failed. Token already exists.");
		    } else {
		        saveFile("backend/token.txt", $clientData);
                echo json_encode($clientData);
            }
		
        }
		// - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - / - /
	
	
	} else {
	//user or group incorrect.	
	}	
	//########################################################################################################################
	
	
	
	


?>