<?php 

	header('Access-Control-Allow-Origin: *');
	
	
	
	
	
	if (file_exists("backend/")) {} else {
		mkdir("backend/", 0700);
	}
	
	if (file_exists("src/")) {} else {
		echo "MAYDAY! src directory does not exist!";		
	}
	
	
	if (file_exists("backend/info/")) {} else {
		mkdir("backend/info/", 0700);
	}
	
	
	include_once('src/main.php');
	
	
	$location = 1;
	$data = $_POST['data'];
	$dataLength = strlen(utf8_decode($data));//the length of the data
	
	//formatting
		$data = str_replace("\'","'",$data);
		$data = str_replace('\"','"',$data);
	
	$action = $_POST['act'];
	
	$user = $_POST['user'];
	$pass = $_POST['pass'];
	$readAccess = $_POST['readAccess'];
	
	//fixr upr
	$user = str_replace("http://","",$user);
	$user = str_replace("/","",$user);
	$user = str_replace("\\","",$user);
	$user = str_replace(".","",$user);
	$user = str_replace(":","",$user);
	$user = str_replace("-","",$user);
	$user = str_replace(" ","",$user);
	$user = str_replace("_","",$user);
	$user = str_replace(",","",$user);
	$user = str_replace("#","",$user);
	$user = str_replace("@","",$user);
	$user = str_replace("*","",$user);
	$user = str_replace("<","",$user);
	$user = str_replace(">","",$user);
	$user = str_replace("'","",$user);
	$user = str_replace('"',"",$user);
	
	if (file_exists("backend/")) {
	
	
	
	//check if data contains blacklisted word
	$inBlacklist = checkBlacklist($data, "backend/info/blacklist.txt");

	if ($inBlacklist === "false") { 
	$domainBlocked = openFile("backend/info/access.txt", 5000);
	if ($domainBlocked !== "block") {
	if ($action === "get") {//____________________________________________________________________GET____
			
			if (file_exists("backend/$user/ps.txt")) {$passwordFromFile = openFile("backend/$user/ps.txt", 5000);}
			if (file_exists("backend/$user/readAccess.txt")) {$readableX = openFile("backend/$user/readAccess.txt", 5000);}
				
			if ($readableX !== "false") {
				if (file_exists("backend/$user/$location.txt")) {
				
						$dataToEcho = openFile("backend/$user/$location.txt", 510000);
						
						echo $dataToEcho;
				
					} else {
						echo json_encode(false);
					}
			} else {
				//if password is correct
			if ($pass === $passwordFromFile) {
				
				if (file_exists("backend/$user/$location.txt")) {
			
					$dataToEcho = openFile("backend/$user/$location.txt", 510000);
					
					echo $dataToEcho;
			
				} else {
					echo json_encode(false);
				}
			
			} //end pass check
			}//end readable check
		//ANALYTICS FOR REQUESTS~~~~~~~~~~~~~~~~~
		plusNum("backend/info/requests.txt", 1);
	}  else if ($action === "save") {//___________________________________________________________SAVE____
			if ($location < 501) {
		//open password
				if (file_exists("backend/$user/ps.txt")) {$passwordFromFile = openFile("backend/$user/ps.txt", 7000);}
				
				//if password is correct
			if ($pass === $passwordFromFile) {
		
					if ($dataLength < 510000 && $dataLength > 0) { 		
				  		saveFile("backend/$user/$location.txt", $data);
				  		echo json_encode(true);
					} else {
						echo json_encode(false);
					}	   
			
			} else {
				echo json_encode(false);
			}
			}//end location check
		//ANALYTICS FOR REQUESTS~~~~~~~~~~~~~~~~~
		plusNum("backend/info/requests.txt", 1);
		
	} else if ($action === "auth") {
		$isBlocked = openFile("backend/info/newUsersBlocked.txt", 7001);
		if ($isBlocked !== "block") {
				$accounts = openFile("backend/info/accounts.txt", 7001);
				$urlFilename = "backend/$user/";
				if ($accounts < 101) {
				if (file_exists($urlFilename)) { echo "Group already exists.";}else{mkdir("backend/$user/", 0700);
			
				  	saveFile("backend/$user/ps.txt", $pass);
				  	saveFile("backend/$user/readAccess.txt", $readAccess);
				 
					saveFile("backend/info/accounts.txt", $accounts + 1);
					
					//save to list
					addUserToDirectory($user, "backend/info/userList.txt");
					
				  echo "Group created.";
				 
				  
				
				} 	
				}
				}
	
		}else {
			 echo "Group creation blocked.";
		}
		
		//ANALYTICS FOR REQUESTS~~~~~~~~~~~~~~~~~
		plusNum("backend/info/requests.txt", 1);
		
	} else if ($action === "deauth") {
		if ($user !== "default") {
			$urlFilename = "backend/$user/";
				if (file_exists($urlFilename)) {
			
					$lastPass = openFile("backend/$user/ps.txt", 5000);	
				
				} else {
					 echo "Group does not exist.";
				}
				if ($lastPass === $pass) {
					delete_files("backend/$user/");
					
					//remove Group from list
					removeUserFromDirectory($user, "backend/info/userList.txt");
					
				$accounts = openFile("backend/info/accounts.txt", 5000);
					saveFile("backend/info/accounts.txt", $accounts - 1);
					echo "Group removed.";
				}
		}
				
		//ANALYTICS FOR REQUESTS~~~~~~~~~~~~~~~~~
		plusNum("backend/info/requests.txt", 1);
		
	} else if ($action === "pageview") {
	
		//ANALYTICS FOR PAGEVIEWS~~~~~~~~~~~~~~~~~
		plusNum("backend/info/pageviews.txt", 1);
	
	}//end actions.
	
	} else { //end DOMAINBLOCK	
		echo json_encode("Domain locked.");
	}//end DOMAINBLOCK else	
	
	}//end user blacklist check

		

	
	
	
?>