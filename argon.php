<?php
//*****uncomment the line below to enable cross-domain access to Argon.*****
header('Access-Control-Allow-Origin: *');

//MUNDANE METHODS * * * * * * * * * * * * * * * * * * * * * *

function getTime() { //2 hours = 7200000 ms
    date_default_timezone_set('America/Chicago'); // CDT
    $milliseconds = round(microtime(true) * 1000);
    return $milliseconds;
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
                $dataToReturn = null;   
            }
        }
    } else {
        $dataToReturn = false;
    }
    return $dataToReturn;
}

function validate_password($password) {
    $valid_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,?!-';
    if (strlen($password) > 3) {
        for ($i = 0; $i < strlen($password); $i++) {
            $isThere = false;
            for ($e = 0; $e < strlen($valid_chars); $e++) {
                if ($valid_chars[$e] === $password[$i]) {
                    $isThere = true;
                }
            }
            if ($isThere === false) {
                return false;
            }
        }
        //if username is valid length and does not contain invalid characters
        return true;
    }
    return false;
}

function validate_username($username) {
    $valid_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_';
    if (strlen($username) > 3 && strlen($username) < 17) {
        for ($i = 0; $i < strlen($username); $i++) {
            $isThere = false;
            for ($e = 0; $e < strlen($valid_chars); $e++) {
                if ($valid_chars[$e] === $username[$i]) {
                    $isThere = true;
                }
            }
            if ($isThere === false) {
                return false;
            }
        }
        //if username is valid length and does not contain invalid characters
        return true;
    }
    return false;
}

function genToken() {
    $length = 256;
    $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-.!,";
    //length:36
    $final_rand = '';
    for ($i = 0; $i < $length; $i++) {
        $final_rand .= $chars[rand(0, strlen($chars) - 1)];

    }
    return $final_rand;
}

function saveFile($url, $dataToSave,$prop=null) {
    $file = $url;
    if (strlen(json_encode($dataToSave)) < 1572864000) { //maxiumum file size
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
    }
}

function action_allowed($action,$auth_state) {
    $allowed_default_actions = ["create user", "login user","get pool","update pool","join pool"];
    $is_allowed = false;
    if ($auth_state === 2) {
        for ($i = 0; $i < count($allowed_default_actions); $i++) {
            if ($allowed_default_actions[$i] === $action) {
                $is_allowed = true;
            }
        }
    } else {
        $is_allowed = true;
    }
    return $is_allowed;
}

function is_allowed($action,$username,$permissions) { // for pool permissions
    $is_allowed = false;
    if ($permissions === null) {
        $permissions = array();
    }
    if (array_key_exists($action,$permissions)) {
        if ($permissions[$action] === true) {
            $is_allowed = true;
        } else if ($permissions[$action] === false) {
            $is_allowed = false;
        } else if ($permissions[$action] === null) {
            $is_allowed = true;
        } else {
            for ($i = 0; $i < count($permissions[$action]); $i++) {
                if ($permissions[$action][$i] === $username) {
                    $is_allowed = true;
                }
            }
        }
    } else {
        $is_allowed = true;
    }
    return $is_allowed;
}

//SETUP * * * * * * * * * * * * * * * * * * * * * * *

$directory = "argon_backend";
if (file_exists($directory . "/")) {
} else {
    $oldmask = umask(0);
    mkdir($directory . "/", 0777);
    umask($oldmask);

}
//.htaccess file to prevent unauthorized access
$data_for_htaccess = "Order deny,allow" . "\n" . "Deny from all";
file_put_contents("$directory/.htaccess", $data_for_htaccess);

if (file_exists("$directory/users/") === false) {
    $oldmask = umask(0);
    mkdir("$directory/users/", 0777);
    umask($oldmask);
}
//.htaccess file to prevent unauthorized access
$data_for_htaccess = "Order deny,allow" . "\n" . "Deny from all";
file_put_contents("$directory/users/.htaccess", $data_for_htaccess);
if (file_exists("$directory/pools/") === false) {
    $oldmask = umask(0);
    mkdir("$directory/pools/", 0777);
    umask($oldmask);
}
//.htaccess file to prevent unauthorized access
$data_for_htaccess = "Order deny,allow" . "\n" . "Deny from all";
file_put_contents("$directory/pools/.htaccess", $data_for_htaccess);


//ACTION RELATED METHODS * * * * * * * * * * * * * * *


//FROM_CLIENT * * * * * * * * * * * * * * * * * *

$FROM_CLIENT = $_POST['FROM_CLIENT'];
$FROM_CLIENT = json_decode($FROM_CLIENT,true);
$CLIENT_IP = $_SERVER['REMOTE_ADDR'];

//USERNAME & PASSWORD COULD ALSO BE POOL NAME AND PASSWORD.
$USERNAME = $FROM_CLIENT['username'];
$PASSWORD = $FROM_CLIENT['password'];

//ARRAY OF REQUEST OBJECTS
$REQUESTS = $FROM_CLIENT['requests'];

//Authentication (0 === "not authenticate", 1 === "authenticated successfully", 2 === "Does not exist");
$user_authenticated = 0;

if (file_exists("$directory/users/$USERNAME.json")) {
    $token = openFile("$directory/users/$USERNAME.json","token");
    if ($PASSWORD === $token['token']) {
        $user_authenticated = 1;   
    }
} else if ($USERNAME === "default" && $PASSWORD === "default") { //create default user
    $user_authenticated = 2;
} else {
    $user_authenticated = 0;
}


//Validate username / password * * * * * * * *
$validation_success = false;
if (validate_username($USERNAME) === true && validate_password($PASSWORD) === true) {
    $validation_success = true;
}



//MAIN ACTIONS * * * * * * * * * * * * * * * * * * * *
if ($user_authenticated > 0 && $validation_success === true) {
$RETURN = array();
for ($r = 0; $r < count($REQUESTS); $r++) {
    $REQUEST = $REQUESTS[$r];
    if ($REQUEST['action'] === "create user" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $username = $REQUEST['username'];
        $password = $REQUEST['password'];
        if (validate_username($username) === true && validate_password($password) === true) {
            if (file_exists("$directory/users/$username.json") === false) {
                saveFile("$directory/users/$username.json","{}");
                saveFile("$directory/users/$username.json",$password,"password");
                $RETURN[$r] = json_decode('{"argonInfo":"user created"}');
            } else {
                $RETURN[$r] = json_decode('{"argonError":"user already exists"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"invalid username or password"}');
        }
    } else if ($REQUEST['action'] === "login user" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $username = $REQUEST['username'];
        $password = $REQUEST['password'];
        if (validate_username($username) === true && validate_password($password) === true) {
            if (file_exists("$directory/users/$username.json")) {
                if ($password === openFile("$directory/users/$username.json","password")) {

                    $tokenData = openFile("$directory/users/$username.json","token");
                    $nToken = genToken();
                    $nTokenCreationTime = getTime();

                    $tObj = array();
                    $tObj['time'] = $nTokenCreationTime;
                    $tObj['token'] = $nToken;

                    if (is_array($tokenData) === true) {
                        if (getTime() - 3600000 > $tokenData['time']) { //only generate new token after 60 minutes has past since last login.
                            saveFile("$directory/users/$username.json",$tObj,"token");
                        } else {
                            $tObj['token'] = $tokenData['token'];
                            saveFile("$directory/users/$username.json",$tObj,"token"); //log login time
                            $nToken = $tokenData['token']; //if within 60 minutes, return saved token
                        }
                    } else { //if token does not exist, create it
                         saveFile("$directory/users/$username.json",$tObj,"token");
                    }
                    
                    //return userData and token.
                    $user_data = openFile("$directory/users/$username.json","data");
                    if ($user_data === null) {
                        $user_data = array();
                        $user_data['argonInfo'] = json_decode('{"data":"true","time":0}',true);
                    }

                    if (array_key_exists('data', $REQUEST)) {
                        $client_data = $REQUEST['data'];
                    } else {
                        $client_data = array();
                    }

                    foreach ($client_data as $dName => $dData) {
                        if (array_key_exists($dName,$user_data)) {
                            if ($user_data[$dName]['time'] === null) {
                                if (is_array($user_data[$dName])) {
                                    $user_data[$dName]['time'] = 0;
                                } else {
                                    $value = $user_data[$dName];
                                    $user_data[$dName] = array();
                                    $user_data[$dName]['data'] = $value;
                                    $user_data[$dName]['time'] = 0;
                                }
                            }
                            if ($client_data[$dName]['time'] >= $user_data[$dName]['time']) {
                                $user_data[$dName] = $client_data[$dName];
                            }
                        } else {
                            $user_data[$dName] = $client_data[$dName];
                        }
                    }

                    //add client ip to login log of user
                    $login_ips = openFile("$directory/users/$username.json","login-ips");
                    if (is_array($login_ips) !== true) {
                        $login_ips = array();
                    }
                    $already_present = false; //if client as already logged in from ip
                    for ($i = 0; $i < count($login_ips); $i++) {
                        if ($login_ips[$i] === $CLIENT_IP) {
                            $already_present = true;
                        }
                    }
                    if ($already_present === false) { //only add ip to login-ip property of user if ip does not already exist
                        array_push($login_ips, $CLIENT_IP);
                    }
                    
             
                    $return_array = array();
                    $return_array['data'] = $user_data;
                    $return_array['token'] = $nToken;

                    $RETURN[$r] = $return_array;

                    saveFile("$directory/users/$username.json", $login_ips, "login-ips");

                } else {
                    $RETURN[$r] = json_decode('{"argonError":"password incorrect"}');
                }
            } else {
                $RETURN[$r] = json_decode('{"argonError":"user does not exist"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"invalid username or password"}');
        }
    } else if ($REQUEST['action'] === "sync" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $USER_DATA = openFile("$directory/users/$USERNAME.json","data");
        if ($USER_DATA === null) {
            $USER_DATA = array();
            $USER_DATA['argonInfo'] = true;
        }
        $client_data = $REQUEST['data'];
        if ($client_data === null) {
            $client_data = array();
        }
        foreach ($client_data as $dName => $dData) {
            if (array_key_exists($dName,$USER_DATA)) {
                if ($USER_DATA[$dName]['time'] === null) {
                    if (is_array($USER_DATA[$dName])) {
                        $USER_DATA[$dName]['time'] = 0;
                    } else {
                        $value = $USER_DATA[$dName];
                        $USER_DATA[$dName] = array();
                        $USER_DATA[$dName]['data'] = $value;
                        $USER_DATA[$dName]['time'] = 0;
                    }
                }
                if ($client_data[$dName]['time'] >= $USER_DATA[$dName]['time']) {
                    $USER_DATA[$dName] = $client_data[$dName];
                }
            } else {
                $USER_DATA[$dName] = $client_data[$dName];
            }
        }
        
        if ($USER_DATA === null) {
            $USER_DATA = array();
            $USER_DATA['argonInfo'] = json_decode('{"data":"true","time":0}');
        }
        
        saveFile("$directory/users/$USERNAME.json",$USER_DATA,'data');
        $RETURN[$r] = $USER_DATA;
    } else if ($REQUEST['action'] === "remove user" && action_allowed($REQUEST['action'],$user_authenticated)) {
        unlink("$directory/users/$USERNAME.json");
        $RETURN[$r] = json_decode('{"argonInfo":"removed user"}');
    } else if ($REQUEST['action'] === "change user password" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $password = $REQUEST['password'];
        saveFile("$directory/users/$USERNAME.json",$password,"password");
        $RETURN[$r] = json_decode('{"argonInfo":"changed user password"}');
    } else if ($REQUEST['action'] === "get pool" && action_allowed($REQUEST['action'],$user_authenticated)) { // POOLS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        $name = $REQUEST['name'];
        $password = $REQUEST['password'];
        if (file_exists("$directory/pools/$name.json")) {
            if (openFile("$directory/pools/$name.json","password") === $password) {
                
                $permissions = openFile("$directory/pools/$name.json",'permissions');
                $owner = openFile("$directory/pools/$name.json",'owner');
                
                if (is_allowed("get properties",$USERNAME, $permissions) || $owner === $USERNAME) { //permission: "get properties"
                    $return_val = openFile("$directory/pools/$name.json",'data');
                    $properties = $REQUEST['properties'];
                    if ($return_val === null) {
                        $return_val = array();
                        $return_val['argonInfo'] = true;
                    }

                    $final_return = array(); //contains only properties listed in array
                    $final_return['argonInfo'] = true;

                    for ($i = 0; $i < count($properties); $i++) { //loop through requested properties
                        if (array_key_exists($properties[$i], $return_val)) {
                            $final_return[$properties[$i]] = $return_val[$properties[$i]];
                        }
                    }

                    $RETURN[$r] = $final_return;
                } else {
                    $RETURN[$r] = json_decode('{"argonError":"action not allowed"}');
                }
            } else {
                $RETURN[$r] = json_decode('{"argonError":"pool not authenticated"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"pool does not exist"}');
        }
    } else if ($REQUEST['action'] === "update pool" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $name = $REQUEST['name'];
        $password = $REQUEST['password'];
        if (file_exists("$directory/pools/$name.json")) {
            if (openFile("$directory/pools/$name.json","password") === $password) {
                
                $permissions = openFile("$directory/pools/$name.json",'permissions');
                $owner = openFile("$directory/pools/$name.json",'owner');
                
                if (is_allowed("update properties",$USERNAME,$permissions) || $owner === $USERNAME) { //permission: "update properties"
                    //*** ACTION ***
                    $data = $REQUEST['data'];
                    $pool_data = openFile("$directory/pools/$name.json",'data');
                    if ($pool_data === null) {
                        $pool_data = array();
                    }
                    foreach ($data as $opName => $opData) {
                        if ($opData !== null) {
                            if (array_key_exists($opName,$pool_data)) {
                                if (is_allowed("change properties",$USERNAME,$permissions) || $owner === $USERNAME) { //permission: "change properties"
                                    $pool_data[$opName] = $opData;
                                }
                            } else {
                                $pool_data[$opName] = $opData;
                            }
                        } else {
                            if (is_allowed("remove properties",$USERNAME,$permissions) || $owner === $USERNAME) { //permissions "remove properties"
                                if (array_key_exists($opName,$pool_data)) {
                                    $pool_data[$opName] = $opData;
                                }
                            }
                        }
                    }
                    saveFile("$directory/pools/$name.json",$pool_data,'data');
                    $RETURN[$r] = json_decode('{"argonInfo":"updated"}');                    
                    //*** ACTION ***
                } else {
                    $RETURN[$r] = json_decode('{"argonError":"action not allowed"}'); 
                }
            } else {
                $RETURN[$r] = json_decode('{"argonError":"pool not authenticated"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"pool does not exist"}');
        }
    } else if ($REQUEST['action'] === "create pool" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $name = $REQUEST['name'];
        $password = $REQUEST['password'];
        if (validate_username($name) === true && validate_password($password) === true) {
            if (file_exists("$directory/pools/$name.json") === false) {
                
                //*** ACTION ***
                saveFile("$directory/pools/$name.json","{}");
                saveFile("$directory/pools/$name.json",$password,"password");
                saveFile("$directory/pools/$name.json",$USERNAME,"owner");
                $RETURN[$r] = json_decode('{"argonInfo":"pool created"}');                    
                //*** ACTION ***
                
            } else {
                $RETURN[$r] = json_decode('{"argonError":"pool already exists"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"invalid name or password"}');
        }
    } else if ($REQUEST['action'] === "join pool" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $name = $REQUEST['name'];
        $password = $REQUEST['password'];
        if (validate_username($name) === true && validate_password($password) === true) {
            if (file_exists("$directory/pools/$name.json")) {
                if (openFile("$directory/pools/$name.json","password") === $password) {
                    
                    //*** ACTION ***
                    $RETURN[$r] = json_decode('{"argonInfo":"pool joined"}');                    
                    //*** ACTION ***
                    
                } else {
                    $RETURN[$r] = json_decode('{"argonError":"pool not authenticated"}');
                }
            } else {
                $RETURN[$r] = json_decode('{"argonError":"pool does not exist"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"invalid name or password"}');
        }
    } else if ($REQUEST['action'] === "remove pool" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $name = $REQUEST['name'];
        $password = $REQUEST['password'];
        if (file_exists("$directory/pools/$name.json")) {
            if (openFile("$directory/pools/$name.json","password") === $password) {
                $owner = openFile("$directory/pools/$name.json",'owner');
                if ($owner === $USERNAME) {
                    unlink("$directory/pools/$name.json");
                    $RETURN[$r] = json_decode('{"argonError":"removed pool"}');
                } else {
                    $RETURN[$r] = json_decode('{"argonError":"the owner must remove a pool"}');  
                }
            } else {
                $RETURN[$r] = json_decode('{"argonError":"pool not authenticated"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"pool does not exist"}');
        }
    } else if ($REQUEST['action'] === "set pool permissions" && action_allowed($REQUEST['action'],$user_authenticated)) {
        $name = $REQUEST['name'];
        $password = $REQUEST['password'];
        $permissions = $REQUEST['permissions'];
        if (file_exists("$directory/pools/$name.json")) {
            if (openFile("$directory/pools/$name.json","password") === $password) {
                
                //*** ACTION ***
                $owner = openFile("$directory/pools/$name.json",'owner');
                if ($owner === $USERNAME) {
                    $prev_permissions = openFile("$directory/pools/$name.json","permissions");
                    if ($prev_permissions === null) {
                        $prev_permissions = array();
                    }
                    foreach($permissions as $permission => $permissionD) {
                        $prev_permissions[$permission] = $permissions[$permission];
                    }
                    saveFile("$directory/pools/$name.json",$prev_permissions,"permissions");
                    $RETURN[$r] = json_decode('{"argonError":"updated permissions for pool"}');
                } else {
                    $RETURN[$r] = json_decode('{"argonError":"the owner must update permissions for a pool"}');  
                }
                //*** ACTION ***
                
            } else {
                $RETURN[$r] = json_decode('{"argonError":"pool not authenticated"}');
            }
        } else {
            $RETURN[$r] = json_decode('{"argonError":"pool does not exist"}');
        }
    } else {
        $RETURN[$r] = json_decode('{"argonError":"action does not exist or is not allowed"}');
    }
    
} //end main for loop
    echo json_encode($RETURN);
} else {
    echo json_encode("Not authenticated");
} //end auth if statement

?>