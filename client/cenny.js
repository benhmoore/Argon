/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Cenny.js was build by @LoadFive, and has been delighted to receive many contributions from a bunch of amazing people.                           *
 * We want to give a huge THANK YOU to everyone who has had any input into this project. (list of notable contributors available in README.md)     *
 *                                                                                                                                                 *
 * List of libraries included with Cenny.js:                                                                                                       *
 *  1. Braid.js | http://github.com/loadfive/braid.js (@LoadFive)                                                                                  *
 *                                                                                                                                                 *
 *                                                                                                                                                 *
 *  - - - - - - - - - - -                                                                                                                          *
 *                                                                                                                                                 *
 * - - - | THIS FILE AND ALL OTHERS INCLUDED IN THIS PROJECT RELEASED UNDER AN MIT LICENSE                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 //LoadFive | loadfive.com | @loadfive




//BRAID.JS IMPLEMENTATION | YOU MAY IGNORE THIS
var braid={};braid.vnumber=.02;braid.version=function(){console.log(braid.vnumber)};braid.search=function(e,t,n,r){if(n!==undefined){if(n===false){t=t.toLowerCase();e=e.toLowerCase();if(r!==false){t=braid.replace(t,"aeiouyAEIOUY@wa@");e=braid.replace(e,"aeiouyAEIOUY@wa@")}}}var i=[];var t=t.split("");var e=e.split("");var s;var o=0;for(var u=0;u<t.length;u++){if(t[u]===e[0]){for(var a=0;a<e.length;a++){s=u+a;if(t[s]===e[a]){if(a===e.length-1){var f=s-e.length+1;i.push(f);o++}}}}}if(o===0){return false}else{return i}};braid.replace=function(e,t){var n=t;var t={};t.full=n;var r=false,i=false;t.groups=t.full.split("@n@");if(e instanceof Array){var s=[];r=true;for(var o=0;o<e.length;o++){var u=e[o];if(u===parseInt(u)){u=u.toString();i=true}for(var a=0;a<t.groups.length;a++){var f=t.groups[a];var l=braid.search("@wa@",f,true);if(l===false){var c=f.split("@w@");var h=c[0];var p=c[1];u=deiwo3replace(h,p,u)}else{var c=f.split("@wa@");var h=c[0];if(braid.search("!NUM!",h,true)!==false){h="12345678910"}if(braid.search("!VOWEL!",h,true)!==false){h="aeiouyAEIOUY"}if(braid.search("!SPECIAL!",h,true)!==false){h="~`@#$%^&*()_+-={}|[]:;<>"}h=h.split("");var p=c[1];for(var d=0;d<h.length;d++){u=deiwo3replace(h[d],p,u)}}}if(i===true){u=parseInt(u)}s.push(u);i=false}}else{if(e===parseInt(e)){e=e.toString();i=true}for(var a=0;a<t.groups.length;a++){var f=t.groups[a];var l=braid.search("@wa@",f,true);if(l===false){var c=f.split("@w@");var h=c[0];var p=c[1];e=deiwo3replace(h,p,e)}else{var c=f.split("@wa@");var h=c[0];if(braid.search("!NUM!",h,true)!==false){h="12345678910"}if(braid.search("!VOWEL!",h,true)!==false){h="aeiouyAEIOUY"}h=h.split("");var p=c[1];for(var d=0;d<h.length;d++){e=deiwo3replace(h[d],p,e)}}}if(i===true){e=parseInt(e)}}if(r===false){return e}else{return s}};var deiwo3replace=function(e,t,n){return n.replace(new RegExp(e,"g"),t)};braid.help=function(e){if(!e){console.log('Incorrect santex. Make sure to use the first parameter as a keyword. Example: braid.help("braid.replace"). \n|TIP: You can use this function in the console for quick help.')}else{if(braid.search("replace",e,false)!==false){console.log("*SANTEX FOR braid.replace()*\n\n"+"|RETURNS: braid.replace() will return the output after completing actions on the string.\n"+"|SANTEX: var VARIABLE = braid.replace('this is a test','this@w@that@n@is@w@was');\n"+"|OUTPUT: 'that was a test'\n"+"|NOTE: Using the parameter 'key' (second parameter), '@w@' is used as 'with', so 'apple@w@grape' means 'replace apple with grape'.\n"+"| '@n@ is used as 'next.' It is used to seperate instructions, as follows, 'apple@w@grape@n@cherry@w@bannana'.\n"+"| You can use '@wa@' instead of '@w@' to replace all instances of each character with another, like so, 'aeiouy@wa@#'\n"+"| If the string were 'abcdefghijklmnopqrstuvwxyz', this would output '#bcd#fgh#jklmn#pqrst#vwx#z'.\n"+"| *Input can be an Array, Integer, or String.\n")}else if(braid.search("search",e,false)!==false){console.log("*SANTEX FOR braid.search()*\n\n"+"|RETURNS: if braid.search() finds a match to query, it will return the positions of all matches in an array.\n"+"| If it does not find a match, it will return *false*.\n"+"|SANTEX: var VARIABLE = braid.search('query','complete string',false,false);\n"+"|OUTPUT: *false*\n"+"|NOTE: The third (3) parameter should be *true* or *false*, if *true* the search will be case sensitive, if *false* the search will not.\n| Setting this to false will also search by just consonants, instead of both consonants and vowels.\n"+"| The fourth (4) parameter can be set to *false* to disable the removal of vowels when searching with the third (3) parameter equal to *true*.\n")}else{console.log("~No help available on this topic. Please make sure to check your spelling.\nSANTEX: braid.help('braid.complementary'), etc.\n    ")}}}


//CENNY.JS STARTS HERE - - - -


function Cenny(mainObject) {
	
	//****
		this.user = {};
		this.user.clientID = Math.floor(Math.random() * 32973);
		
		this.group = {};
        this.secure = {};
	//****

	this.groupObject = {};
	
	//group definitions
	this.groupObject.group = "default";
	this.groupObject.key = "default";
	
	this.userObject = {};
	
	//user definitions
	this.userObject.user = "default";
	this.userObject.pass = "default";
	
	
	//scan for new tokens (auth info) on this computer
	this.user.scanForToken = function() {//look for token in another window
		var lastTokenMeta = [];
		setInterval(function() {
			var token = localStorage.getItem('cennyToken');
			token = JSON.parse(token);
			if (token !== null && token !== undefined && token !== []) {
				if (token[2] === that.userObject.user) {
					if (lastTokenMeta !== token[0]) {
					if (token[1] !== that.user.clientID) {//if this client did not set token
                        if (that.userObject.pass !== token[0]) {
				            that.userObject.pass = token[0];
                            lastTokenMeta = token[0];
                        }
						
					}
					}
				}
			}
		}, 500);
	};
	this.user.scanForToken();
	

    //url to cenny.php (preset until set)
	this.url = document.URL + "cenny.php";
	
	//#######################################################################################################################################################
	//######################################################## SET UP MAIN OBJECT ###########################################################################
	//#######################################################################################################################################################
	if (mainObject instanceof Object) {
		if (mainObject['group'] !== undefined && mainObject['group'] instanceof Array) {
			
			this.groupObject.group = braid.replace(mainObject['group'][0], " @w@");
			this.groupObject.key = braid.replace(mainObject['group'][1], " @w@");
			
		} 
		if (mainObject['user'] !== undefined && mainObject['user'] instanceof Array) {
			
			this.userObject.user = braid.replace(mainObject['user'][0], ' @w@');
			this.userObject.pass = braid.replace(mainObject['user'][1], ' @w@');   
		}

		if (mainObject['url'] !== undefined) {
			this.url = mainObject['url'];
		}
	} else {
		console.log("mainObject should be an Object.");
	}
	
	//#######################################################################################################################################################
	//############################################# USED FOR PLUGINS ########################################################################################
    //#######################################################################################################################################################
		
	this.plugin = {};
	this.plugin.requests = 0;
	this.plugin.requestTimes = []; //(in milliseconds)
	this.plugin.currentRequestTime = 0;
	
	//returns info on current Cenny instance
	this.plugin.cInfo = function() {
	
		//generate average request times
		var averageRT = 0;
		for (var i = 0; i < that.plugin.requestTimes.length; i++) {
			averageRT+=that.plugin.requestTimes[i];
		}
		averageRT = averageRT / that.plugin.requestTimes.length;
		
		
		return {group:[that.groupObject.group, that.groupObject.key], user:that.user.info(), requests:that.plugin.requests, requestTime:averageRT};
	}
	
	//test if a user's connection speed is sufficient
	this.plugin.testConnectionSpeed = function(callback,wantedMS) {
		that.plugin.requestTimes = [];
		if (navigator.onLine === true) {
		that.get(function(d){
			that.get(function(d){
				that.get(function(d){
					that.get(function(d){
						that.get(function(d){
							that.get(function(d){
								that.get(function(d){
									var cInfoData = that.plugin.cInfo();
									if (cInfoData['requestTime'] + 300 >= wantedMS && cInfoData['requestTime'] - 300 <= wantedMS) {
										callback(true);
									} else if (cInfoData['requestTime'] < wantedMS) {
										callback(true);
									} else {
										callback(false);
									}
								});
							});
						});
					});
				});
			});
		});
		}
		
	};
	
	this.plugin.startRequestTimer = function() {
		that.plugin.requestTimer = setInterval(function() {
			that.plugin.currentRequestTime++;
		},1);
	
	};
	this.plugin.stopRequestTimer = function() {
		clearInterval(that.plugin.requestTimer);
		that.plugin.requestTimes.push(that.plugin.currentRequestTime);
		that.plugin.currentRequestTime = 0;	
	};
	
	//#######################################################################################################################################################
	//############################################# USED FOR ALL PLUGIN AJAX REQUESTS (& .GET() / .SET())####################################################
    //#######################################################################################################################################################
	
	this.aj = function(sendData, action, callback, optionalUserInfo) {
        if (callback === undefined || typeof callback !== "function") {
            var callback = function(d) {
                console.log(d);   
            };
        }
       	if (navigator.onLine === true) { 
	        //check username before sending request
	        if (that.userObject.user.length > 2 && that.userObject.user.length < 25) {
	            if (/^\w+$/.test(that.userObject.user)) {
	                if (that.userObject.pass.length > 3) {    
	                    var xmlhttp;
	                    xmlhttp=new XMLHttpRequest();
	                    xmlhttp.onreadystatechange=function(){
	                        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	                            var data = xmlhttp.responseText;
	                            if (callback !== undefined) {
	                                callback(JSON.parse(data));	
	                                
	                                //update offline stuff
	                                that.offline.updateOfflineObject();
	                                
	                                //plugin info
	                                that.plugin.stopRequestTimer();
	                            }		  
	                        }
	                             
	                    };
	                    xmlhttp.open("POST",that.url,true);
	                    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	                       
	                        
	                    if (optionalUserInfo !== undefined) {//used for **.create();**
	                        var userX = optionalUserInfo[0];
	                        var passX = optionalUserInfo[1];
	                        
	                        
	                        xmlhttp.send("action=" + action + sendData + "&groupName=" + that.groupObject.group + "&groupKey=" + that.groupObject.key + "&userName=" + userX + "&userPass=" + passX);
	                        
	                    } else { //otherwise, use global user info
	                        
	                        xmlhttp.send("action=" + action + sendData + "&groupName=" + that.groupObject.group + "&groupKey=" + that.groupObject.key + "&userName=" + that.userObject.user + "&userPass=" + that.userObject.pass);
	                    }
	                    
	                    
	                    //plugin info
	                    that.plugin.startRequestTimer();
	                    that.plugin.requests++; //add to requests
	                    //end plugin info
	                
	                } else {
	                    callback({error: 'pass length insufficient.'});   
	                }
	            } else {
	               callback({error: 'username contains invalid characters.'});   
	            }
	        } else {
	            callback({error: 'username length unsuitable.'});   
	        }
        } else { //is offline
        
        }
	
	};
	
	//#######################################################################################################################################################
	//######################################################### GET DATA FROM BACKEND #######################################################################
	//#######################################################################################################################################################
	
	this.get = function(callback, user) { //if user variable is array, it will be treated as property list, if it's a string, it will be treated as a username.
        var isOnline = navigator.onLine;
        if (isOnline === true) {
	        if (user === undefined || user === '') {
	            that.aj("&getProperties=all", "get", callback);
	        } else if (user instanceof Array) {
	            var propertyString = "";
	            for (var i = 0; i < user.length;i++) {
	                if (user[i + 1] !== undefined) { //to keep things like "user@n@" <-- (no user next, but still "@n@")
	                propertyString+=user[i] + "@n@";
	                } else {
	                    propertyString+=user[i];  
	                }
	            }
	            that.aj("&getProperties=" + propertyString, "get", callback); 
	        } else {
	        	that.aj("&otherUser=" + braid.replace(user, " @w@"), "getOther", callback);
	        }
        } else if (isOnline === false) { //user offline
        	var offlineObject = that.offline.getOfflineObject();
        	if (user === undefined || user === '') {
        	    callback(offlineObject);
        	} else if (user instanceof Array) { //specific properties
        		var finalObject = {};
        	    for (var i = 0; i < user.length;i++) {
        	        for (key in offlineObject) {
        	        	if (user[i] === key) {
        	        		finalObject[key] = offlineObject[key];
        	        	}
        	        }
        	    }
        	    callback(finalObject);
        	} else {//inform that getting data from another user is not possible when offline
        		callback({error:'getting properties from user while offline is not possible'});
        	}
        }
	};
	
	this.set = function(object, user, callback) {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
	        if (object instanceof Object) {
	        	object['cennyJS'] = true; //for smashing bugs
	            if (user === undefined || user === '') {
	                that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "set", callback);
	            } else if (typeof user === "function") { //for backwards compat
	                that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "set", user);  
	            } else {
	                that.aj("&otherUser=" + braid.replace(user, " @w@") + "&data=" + encodeURIComponent(JSON.stringify(object)),"setOther",callback);
	            }
	        }
	        
        } else if (isOnline === false) { //user offline
        	if (object instanceof Object) {
        		
        		object['cennyJS'] = true; //for smashing bugs
        	
        	    if (user === undefined || user === '') {
        	        that.offline.set(object); 
        	    } else if (typeof user === "function") { //for backwards compat
        	        that.offline.set(object);
        	        user("updated (offline)");   
        	    }
        	}
        }
	};
	
	this.update = function(object, user, callback) {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			object['cennyJS'] = true; //for smashing bugs
			if (user === undefined || user === "" || typeof user === "function") {
				that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "update", user);
			} else {
				that.aj("&otherUser=" + braid.replace(user, " @w@") + "&data=" + encodeURIComponent(JSON.stringify(object)), "updateOther", callback);
			}
		} else if (isOnline === false) {//offline
			object['cennyJS'] = true; //for smashing bugs
			if (user === undefined || user === "" || typeof user === "function") {
				that.offline.update(object);
			}
		}
	};
	
	
	//USER STUFF
	
	this.user.remove = function(callback) {
		that.aj("", "removeUser", callback);
		that.userObject.user = "default";
		that.userObject.pass = "default";
	};
    
    this.user.permissions = function(permObj,callback) {
        var read = permObj.read;
        var write = permObj.write;
        var emailRead = permObj.emailRead;
        var offlinePerm = permObj.allowOffline;
        var readString = "";
        var writeString = "";
        var emailReadString = "";
        
        //read
        if (read instanceof Array) {
            for (var i = 0; i < read.length;i++) {
                if (read[i + 1] !== undefined) { //to keep things like "user@n@" <-- (no user next, but still "@n@")
                readString+=read[i] + "@n@";
                } else {
                    readString+=read[i];  
                }
            }
        } else if (read === true){
            readString = "allowAll";   
        } else if (read === false){
            readString = "blockAll";   
        } else if (read === undefined) {
            readString = "DoNotEdit";
        } else {
            readString = "blockAll";   
        }
        
        //write
        if (write instanceof Array) {
        for (var i = 0; i < write.length;i++) {
            if (write[i + 1] !== undefined) { //to keep things like "user@n@" <-- (no user next, but still "@n@")
                writeString+=write[i] + "@n@";
            } else {
                writeString+=write[i];  
            }
        }
        } else if (write === true) {
            writeString = "allowAll";
        } else if (write === false) {
            writeString = "blockAll";
        } else if (write === undefined) {
            writeString = "DoNotEdit";
        } else {
            writeString = "blockAll";   
        }
        
        //emailRead
        if (emailRead instanceof Array) {
        for (var i = 0; i < emailRead.length;i++) {
            if (emailRead[i + 1] !== undefined) { //to keep things like "user@n@" <-- (no user next, but still "@n@")
                emailReadString+=emailRead[i] + "@n@";
            } else {
                emailReadString+=emailRead[i];  
            }
        }
        } else if (emailRead === true) {
            emailReadString = "allowAll";
        } else if (emailRead === false) {
            emailReadString = "blockAll";
        } else if (emailRead === undefined) {
            emailReadString = "DoNotEdit";  
        } else {
            emailReadString = "allowAll";
        }
        
        if (offlinePerm === true) {
            offlinePerm = "allowAll";
        } else if (offlinePerm === false) {
            offlinePerm = "blockAll";
        } else if (offlinePerm === undefined) {
            offlinePerm = "DoNotEdit";  
        } else {
            offlinePerm = "allowAll";
        }
        
        var propertyObj = {};
        for (key in permObj) {
            
            if (key !== "read" && key !== "write" && key !== "emailRead" && key !== "allowOffline") {
                var propertyString = "";
                if (permObj[key] instanceof Array) {
                    for (var i = 0; i < permObj[key].length; i++) {
                        if (permObj[key][i + 1] !== undefined) { //to keep things like "user@n@" <-- (no user next, but still "@n@")
                             propertyString+=permObj[key][i] + "@n@";
                        } else {
                            propertyString+=permObj[key][i];  
                        }
                    }
                    
                } else if (permObj[key] === true) {
                    propertyString = "allowAll";
                } else if (permObj[key] === false) {
                    propertyString = "blockAll";
                } else {
                    propertyString = "blockAll";   
                }
                propertyObj[key] = propertyString; 
            }
        }
        if (propertyObj === {}) {
            propertyObj = "DoNotEdit";   
        }
        
        that.aj('&write=' + writeString + '&read=' + readString + '&offlinePerm=' + offlinePerm + '&emailRead=' + emailReadString + '&propertyObj=' + JSON.stringify(propertyObj),"permissions", callback);
    };
    
    
    this.user.password = function(newPassword,callback){
    	that.aj("&newPassword="+braid.replace(newPassword,' @w@'),"newPass",callback);
    };
	
	this.user.signin = function(mainObject,callback) {
		if (mainObject instanceof Object) {
			if (mainObject['user'] !== undefined && mainObject['user'] instanceof Array) {
                
                //once signed in, check if should update backend with offline data
                that.offline.syncWithBackend();
                
                var userX = braid.replace(mainObject['user'][0], ' @w@');
				var passX = braid.replace(mainObject['user'][1], ' @w@');
                if (typeof callback === "function") {
                    that.aj("","generateAuthToken",function(d){
                    
                    	//set local user information
                    	that.userObject.user = braid.replace(mainObject['user'][0], ' @w@');
                    	that.userObject.pass = braid.replace(mainObject['user'][1], ' @w@');
                    	
                    	that.userObject.pass = d; //set pass to token
                    	localStorage.setItem('cennyToken',JSON.stringify([d,that.user.clientID,that.userObject.user])); //set token in localStorage

                    	callback(d); //call provided callback
                    },[userX,passX]);
                    
                } else {
                   that.aj("","generateAuthToken",function(d){
                   		
                   		//set local user information
                   		that.userObject.user = braid.replace(mainObject['user'][0], ' @w@');
                   		that.userObject.pass = braid.replace(mainObject['user'][1], ' @w@');
                   		
                   		that.userObject.pass = d; //set pass to token
                   		localStorage.setItem('cennyToken',JSON.stringify([d,that.user.clientID,that.userObject.user])); //set token in localStorage

                   },[userX,passX]);
                }
                
			}
		} else {
			console.log("mainObject should be an Object.");
		}

	};
    
    this.user.signout = function() { //signs into default user.
        that.userObject.pass = "default";
        that.userObject.user = "default";
        that.aj("","generateAuthToken",function(d){});
    };
    
    this.user.create = function(mainObject, callback) {
        if (mainObject instanceof Object) {
			if (mainObject['user'] !== undefined && mainObject['user'] instanceof Array) {
				var userX = braid.replace(mainObject['user'][0], ' @w@');
				var passX = braid.replace(mainObject['user'][1], ' @w@');
                
                that.aj("","none",callback,[userX,passX]);
			}
		} else {
			console.log("mainObject should be an Object.");
		}
    }
    
    this.user.info = function() {
        return [that.userObject.user, that.userObject.pass];
    };
    
    
    this.user.setEmail = function(email, callback) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (filter.test(email) === true) {
            that.aj("&data=" + email, "setEmail", callback); 
        } else {
            if (callback !== undefined){callback("Email invalid.");}else{console.log("email invalid.")}; 
        }
        
    };
    
    this.user.getEmail = function(callback, username) {
        if (username === undefined) {
            var username = that.user.info();
            username = username[0];
            username = braid.replace(username, " @w@");
            that.aj("&otherUser=" + username, "getEmailOther", callback);
        } else {
            username = braid.replace(username, " @w@");
            that.aj("&otherUser=" + username, "getEmailOther", callback); 
        }
    };
    
   
	//END USER STUFF
	
	
	
	//START OFFLINE - - - - - - - - 
	
	this.offline = {};
	this.offline.update = function(object) {
		var offlineQueueObject = localStorage.getItem('cennyOfflineUpdate');
		if (offlineQueueObject === undefined || offlineQueueObject === null) { 
			offlineQueueObject = {};
		} else { 
			offlineQueueObject = JSON.parse(offlineQueueObject);
		}
		
		for (key in object) {
			if (key === "DELETE") {
				var offlineObject = JSON.parse(localStorage.getItem('cennyOffline'));
				for (var i = 0; i < object[key].length; i++) {
					delete offlineQueueObject[object[key][i]];
					delete offlineObject[object[key][i]];
				}
				localStorage.setItem('cennyOffline',JSON.stringify(offlineObject));
			} else {
				offlineQueueObject[key] = object[key];
			}
		}
		
		offlineQueueObject = JSON.stringify(offlineQueueObject);
		localStorage.setItem('cennyOfflineUpdate', offlineQueueObject);	
    
        that.offline.setDataUsername();
        
	};
    
    this.offline.setDataUsername = function() { //so that data isn't updated in the wrong user
        localStorage.setItem('cennyOfflineUsername', that.userObject.user);
    };
	
	this.offline.set = function(object) {
		object = JSON.stringify(object);
		localStorage.setItem('cennyOffline', object);	
		localStorage.setItem('cennyOfflineUpdate', object);
        
        that.offline.setDataUsername();
        
	};
	
	this.offline.syncWithBackend = function() {
		that.aj("", "getOfflinePerm", function(d){
			if (d !== "blockAll") {
				var isOnline = navigator.onLine;
				if (isOnline === true) {
					var offlineObject = localStorage.getItem('cennyOfflineUpdate');
				    var dataUsername = localStorage.getItem('cennyOfflineUsername');//username that set data
					if (offlineObject === undefined || offlineObject === null) { 
						offlineObject = {};
					} else { 
						offlineObject = JSON.parse(offlineObject);
					}
				    if (dataUsername === that.userObject.user) {
				        that.update(offlineObject);
				        localStorage.setItem('cennyOfflineUpdate', JSON.stringify({})); //clear update queue
				    }
				}
			} else {
				localStorage.setItem('cennyOfflineUpdate', JSON.stringify({})); //clear update queue
			}
			
		});
	};
	
	this.offline.getOfflineObject = function() { //used for get / modified
		var offlineObjectUpdate = localStorage.getItem('cennyOfflineUpdate');
		var offlineObject = localStorage.getItem('cennyOffline');
		if (offlineObject === undefined || offlineObject === null) { 
			offlineObject = {};
		} else { 
			offlineObject = JSON.parse(offlineObject);	
		}
		if (offlineObjectUpdate === undefined || offlineObjectUpdate === null) { 
			offlineObjectUpdate = {};
		} else { 
			offlineObjectUpdate = JSON.parse(offlineObjectUpdate);	
		}
		
		var finalObject = {};
		
		for (key in offlineObject) {
			finalObject[key] = offlineObject[key];
		}
		for (key in offlineObjectUpdate) {
			finalObject[key] = offlineObjectUpdate[key];
		}
		
		return finalObject;
	};
    
    //check if should sync with backend
    setTimeout(function() {
        var updateData = JSON.parse(localStorage.getItem('cennyOfflineUpdate'));
        if (updateData !== {}) {
            that.offline.syncWithBackend();   
        }
    }, 100);
	
	this.offline.lastState = navigator.onLine;
	setInterval(function() {
		if (navigator.onLine !== that.offline.lastState) {
			if (navigator.onLine === true) {
				console.log("gracefully came back online");
				that.offline.syncWithBackend();
			}
			that.offline.lastState = navigator.onLine;
		}
	
	},300);
	
	this.offline.updateOfflineObject = function() {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			that.get(function(d) {
				var offlineObject = d;
				localStorage.setItem('cennyOffline', JSON.stringify(offlineObject));
			});
		} else {
			//user offline
		}
	};
	
	//start offline updating
	setTimeout(this.offline.updateOfflineObject, 1000);
	
	this.offline.updateOfflineInterval = setInterval(function(){
		that.offline.updateOfflineObject();
	},7000); //updates offline object every 8 sec
	
	
	//END OFFLINE - - - - - - - - 
	
	function watchBackendProperty(callback, pArray) {
		var lastData = "";
		setInterval(function() {
			that.get(function(d){
		        
			var output = {};
				if (pArray !== undefined) {
					for (var i = 0; i < pArray.length; i++) {
						output[pArray[i]] = d[pArray[i]];
					}
				} else {
					output = d;
				}
				
				var vexput = JSON.stringify(output); //for comparing.
				
				if (vexput !== lastData) {
					callback(output);	
					lastData = JSON.stringify(output);
				}
			},pArray);
		}, 450);
	}
	
	
	
	this.modified = function(callback, pArray) {
		var x = new watchBackendProperty(callback, pArray);
	};
	
    
	var that = this;
	
   

};