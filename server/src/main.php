<?php

	function checkBlacklist($data, $urlX) {
		$data = strtolower($data);
		$data = preg_replace('/\s+/', '', $data);
		
		
		$blacklist = openFile($urlX, 10000);
		$blacklist = strtolower($blacklist);
		$blacklist = preg_replace('/\s+/', '', $blacklist);
		
		if ($blacklist !== "") {
			$found = false;
			$blacklist = explode("@bc@", $blacklist);
			
			for ($i = 0; $i < count($blacklist); $i++) {

				if (strpos($data, $blacklist[$i]) !== false) {
					$found = true;
				} else {
					$fX = checkForCommon($data, $blacklist[$i]);
					if ($fX === true) {
						$found = true;
					}
				}
			
			}
			
			if ($found === true) {
				return "true";
			} else {
				return "false";
			}
			
		
		} else {
			return "false";
		}
	
	}
	
	
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
		$fh = fopen($myFile, 'w') or die("can't open file");
		fwrite($fh, $dataToSave);
		fclose($fh);
	
	
	}
	
	function addToFile($url, $dataToSave) {
		$myFile = $url;
		$fh = fopen($myFile, 'a') or die("can't open file");
		fwrite($fh, $dataToSave);
		fclose($fh);
	
	
	}
	
	
	function addUserToDirectory($userX, $urlX) {
		$allUsers = openFile($urlX, 5000);
		
		$output = $allUsers . $userX . "@SEPERATEUSERSX@";

		saveFile($urlX, $output);
		
		return true;
		
	}
	
	function removeUserFromDirectory($userX, $urlX) {
		
		$allUsers = openFile($urlX, 5000);
			
		$allUsers = explode("@SEPERATEUSERSX@", $allUsers);
		$output = "";
		for($x = 0; $x < count($allUsers); $x++) {
		  if ($allUsers[$x] !== $userX) {
		  if ($allUsers[$x] !== "") {
		  	$output = $output . $allUsers[$x] . "@SEPERATEUSERSX@";
		  	}
		  }
		} 
			
		saveFile($urlX, $output);
		
		
		return true;
	}
	
	
	function plusNum($url, $num) {
				if (file_exists($url)) {
					$dataXXX = openFile($url, 5000);
					$dataXXX = $dataXXX + $num;
					saveFile($url, $dataXXX);
				}else{
					saveFile($url, $num);
				}
	}
	
	function checkForCommon($data, $listItem) {
	
		if ($listItem = "link") {
			
			$data = str_replace(' ', '', $data);	
			$data = str_replace('.', '', $data);
			$data = str_replace('_', '', $data);
			$data = str_replace('-', '', $data);
			$data = str_replace('\n', '', $data);	
			
			if ((strpos($data, "http") !== false) || (strpos($data, "www") !== false) || (strpos($data, "com") !== false) || (strpos($data, "net") !== false) || (strpos($data, "org") !== false) || (strpos($data, "tk") !== false) || (strpos($data, "ww") !== false)) {
				
				return true;
			
			} else {
			
				$data = str_replace('1', 'i', $data);
				$data = str_replace('!', 'i', $data);
				$data = str_replace('0', 'o', $data);
				$data = str_replace('3', 'e', $data);
				$data = str_replace('()', 'o', $data);
				$data = str_replace(')', '', $data);
				$data = str_replace('(', '', $data);
				$data = str_replace('x', '', $data);
				$data = str_replace('!', '', $data);
				$data = str_replace('*', '', $data);
				$data = str_replace('+', '', $data);
				$data = str_replace('@', '', $data);
				$data = str_replace('&', '', $data);
				
				
				if ((strpos($data, "http") !== false) || (strpos($data, "www") !== false) || (strpos($data, "com") !== false) || (strpos($data, "net") !== false) || (strpos($data, "ww") !== false)) {
					
					return true;
				
				} else {
					return false;
				}
				
			
			}
			
			
		
		}
	
		$listItem = str_replace(' ', '', $listItem);	
		$listItem = str_replace('.', '', $listItem);
		$listItem = str_replace('_', '', $listItem);
		$listItem = str_replace('-', '', $listItem);	
		
		$data = str_replace(' ', '', $data);	
		$data = str_replace('.', '', $data);
		$data = str_replace('_', '', $data);
		$data = str_replace('-', '', $data);
		
		if (strpos($data, $listItem) !== false) {
			return true;
		} else {
			$data = str_replace('1', 'i', $data);
			$data = str_replace('!', 'i', $data);
			$data = str_replace('0', 'o', $data);
			$data = str_replace('3', 'e', $data);
			$data = str_replace('()', 'o', $data);
			
			if (strpos($data, $listItem) !== false) {
				return true;
			} else {
				return false;
			}
			
		}
	
	}
	
	
	
	

?>