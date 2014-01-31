//used for basic tasks
var Mg = {};
Mg.validate = {};
Mg.validate.username = function (username) {

	var result = {
		isValid: true,
		reasons: [],
		type: 'username'
	};

	if (typeof username !== "string") {
		result.isValid = false;
		result.reasons.push("Username is not a valid string");
	} else {

		if (username.match(/^[A-Za-z0-9_]+$/)) {} else {
			result.isValid = false;
			result.reasons.push("Username contains special characters");
		}

	}
	if (username.length > 24) {
		result.isValid = false;
		result.reasons.push("Username too long");
	}
	if (username.length < 5) {
		result.isValid = false;
		result.reasons.push("Username too short");
	}


	return result;
};

Mg.validate.password = function (password) {

	var result = {
		isValid: true,
		reasons: [],
		type: 'password'
	};

	if (typeof password !== "string") {
		result.isValid = false;
		result.reasons.push("Password is not a valid string");
	} else {
		if (password.match(/^[A-Za-z]+$/)) {
			result.isValid = false;
			result.reasons.push("Password must contain at least one special character");
		}
	}
	if (password.length > 70) {
		result.isValid = false;
		result.reasons.push("Password too long");
	}
	if (password.length < 5) {
		result.isValid = false;
		result.reasons.push("Password too short");
	}


	return result;

};

Mg.isJSON = function (str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

Mg.convertData = function (data) {
	var isJSON = Mg.isJSON(data);
	if (isJSON === true) {
		return JSON.parse(data);
	} else {
		return data;
	}
};

//CENNY.JS ---------
Mg.isBusy = false;
function requestQueue(requestBody,callback,urlX) {
    var x = setInterval(function() {
        
        if (Mg.isBusy === false) {
                Mg.isBusy = true;
                var xmlhttp;
				xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function () {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        
                        Mg.isBusy = false;
                        
						var data = xmlhttp.responseText;
						if (callback !== undefined && data !== "") {
                            
							callback(Mg.convertData(data));
						}
					}

				};
				xmlhttp.open("POST", urlX, true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send(requestBody);
                clearInterval(x);
        }
    },10);
};

function Cenny(mainObject) {

	//*** STATS ****
		
		this.stats = {};
		this.stats.obj = {};
		this.stats.getTime = function() {
			var x = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");	
			return x;
		};
		this.stats.obj.log = [];
		this.stats.obj.totalRequests = 0;
		this.stats.get = function() {
			return that.stats.obj;
		};
    
        this.stats.userRequestsPS = 0;
        setInterval(function() {
            that.stats.userRequestsPS = 0;
        },1000);
        this.stats.isAllowed = function() {
            if (that.stats.userRequestsPS > 3) {
                return false;
            } else {
                return true;   
            }
        };
	
	//***
	
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

	var temp_user_info = localStorage.getItem('cennyUser');
	temp_user_info = JSON.parse(temp_user_info);
	if (temp_user_info !== "null" && temp_user_info !== null) {
		if (typeof temp_user_info === "object") {
			this.userObject.user = temp_user_info.user;
			this.userObject.pass = temp_user_info.pass;
		}
	}

	//scan for new tokens (auth info) on this computer
	this.user.scanForToken = function () { //look for token in another window
		var lastTokenMeta = [];
		setInterval(function () {
			var token = localStorage.getItem('cennyToken');
			token = JSON.parse(token);
			if (token !== null && token !== undefined && token !== []) {
				if (token[2] === that.userObject.user) {
					if (lastTokenMeta !== token[0]) {
						if (token[1] !== that.user.clientID) { //if this client did not set token
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


	//url to cenny.php (until set)
	this.url = document.URL + "cenny.php";

	//SETUP MAIN OBJECT
	if (mainObject instanceof Object) {
		if (mainObject.group !== undefined && mainObject.group instanceof Array) {
            if (Mg.validate.username(mainObject.group[0]).isValid === true) {
                if (Mg.validate.password(mainObject.group[1]).isValid === true) {
                    this.groupObject.group = mainObject.group[0];
                    this.groupObject.key = mainObject.group[1];
                } else {
                    console.error({cenError:'group key invalid'});   
                }
            } else {
                console.error({cenError:'group name invalid'});   
            }

		}
		if (mainObject.user !== undefined && mainObject.user instanceof Array) {
            if (Mg.validate.username(mainObject.user[0]).isValid === true) {
                if (Mg.validate.password(mainObject.user[1]).isValid === true) {
                    this.userObject.user = mainObject.user[0];
                    this.userObject.pass = mainObject.user[1];
                } else {
                    console.error({cenError:'user password invalid'});   
                }
            } else {
                console.error({cenError:'username invalid'});   
            }
		}

		if (mainObject.url !== undefined) {
			this.url = mainObject.url;
		}
	} else {
		console.warn("mainObject should be an Object.");
	}
    
    
	//SERVER REQUEST METHOD

	this.aj = function (sendData, action, callback, optionalUserInfo) {
		if (callback === undefined || typeof callback !== "function") {
			callback = function (d) {
				console.info(d);
			};
		}
		if (navigator.onLine === true) {
			//check username before sending request

			var shouldContinue = true;

			if (optionalUserInfo !== undefined) {
				if (optionalUserInfo[0].length > 2 && optionalUserInfo[0].length < 25) {
					if (/^\w+$/.test(optionalUserInfo[0])) {
						if (optionalUserInfo[1].length > 4) {

						} else {
							callback({
								cenError: 'password invalid length'
							});
							shouldContinue = false;
						}
					} else {
						callback({
							cenError: 'username contains invalid chars'
						});
						shouldContinue = false;
					}
				} else {
					callback({
						cenError: 'username length invalid'
					});
					shouldContinue = false;
				}
			}
			
			if (shouldContinue === true) {

				if (optionalUserInfo !== undefined && optionalUserInfo instanceof Array) { //used for **.create();**
					var userX = optionalUserInfo[0];
					var passX = optionalUserInfo[1];


					var new_request = new requestQueue("action=" + action + sendData + "&groupName=" + that.groupObject.group + "&groupKey=" + that.groupObject.key + "&userName=" + userX + "&userPass=" + passX, callback, that.url);
					
					that.stats.obj.log.push([action,sendData,that.stats.getTime()]);
					if (that.stats.obj[action] === undefined) {
						that.stats.obj[action] = {};
						that.stats.obj[action].count = 0;
						that.stats.obj[action].log = [];
					}
					that.stats.obj[action].count++;
					that.stats.obj[action].log.push([sendData,that.stats.getTime()]);
					that.stats.obj.totalRequests++;

				} else { //otherwise, use global user info

					if (that.userObject.user.length > 2 && that.userObject.user.length < 25) {
						if (/^\w+$/.test(that.userObject.user)) {
							if (that.userObject.pass.length > 4) {

								var new_request = new requestQueue("action=" + action + sendData + "&groupName=" + that.groupObject.group + "&groupKey=" + that.groupObject.key + "&userName=" + that.userObject.user + "&userPass=" + that.userObject.pass, callback, that.url);
								
								that.stats.obj.log.push([action,sendData,that.stats.getTime()]);
								if (that.stats.obj[action] === undefined) {
									that.stats.obj[action] = {};
									that.stats.obj[action].count = 0;
									that.stats.obj[action].log = [];
								}
								that.stats.obj[action].count++;
								that.stats.obj[action].log.push([sendData,that.stats.getTime()]);
								that.stats.obj.totalRequests++;
								

							} else {
								callback({
									cenError: 'pass length insufficient.'
								});
							}
						} else {
							callback({
								cenError: 'username contains invalid characters.'
							});
						}
					} else {
						callback({
							cenError: 'username length unsuitable.'
						});
					}
				}

			} //end should continue
		} else { //is offline
			that.log.push([action,sendData]);
		}

	};

	this.get = function (callback, user) { //if user variable is array, it will be treated as property list, if it's a string, it will be treated as a username.
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			if (user === undefined || user === '') {
				that.aj("&getProperties=all", "get", callback);
			} else if (user instanceof Array) {
				var propertyString = "";
				for (var i = 0; i < user.length; i++) {
					if (user[i + 1] !== undefined) { //"user@n@" <-- (no user next, but still "@n@")
						propertyString += user[i] + "@n@";
					} else {
						propertyString += user[i];
					}
				}
				that.aj("&getProperties=" + propertyString, "get", callback);
			} else {
                if (Mg.validate.username(user).isValid === true) {
				    that.aj("&otherUser=" + user, "getOther", callback);
                } else {
                    callback({cenError:'username invalid'});   
                }
			}
		} else if (isOnline === false) { //user offline
			var offlineObject = that.offline.getOfflineObject();
			if (user === undefined || user === '') {
				callback(offlineObject);
			} else if (user instanceof Array) { //specific properties
				var finalObject = {};
				for (var i = 0; i < user.length; i++) {
					for (key in offlineObject) {
						if (user[i] === key) {
							finalObject[key] = offlineObject[key];
						}
					}
				}
				callback(finalObject);
			} else { //inform that getting data from another user is not possible when offline
				callback({
					cenError: 'getting properties from user while offline is not possible'
				});
			}
		}
	};

	this.set = function (object, user, callback) {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			if (object instanceof Object) {
				object['cennyJS'] = true;
				if (user === undefined || user === '') {
					that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "set", callback);
				} else if (typeof user === "function") { //for backwards compat
					that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "set", user);
				} else {
                    if (Mg.validate.username(user).isValid === true) {
                        that.aj("&otherUser=" + user + "&data=" + encodeURIComponent(JSON.stringify(object)), "setOther", callback);
                    } else {
                        callback({cenError:'username invalid'});   
                    }
				}
			}

		} else if (isOnline === false) { //user offline
			if (object instanceof Object) {

				object['cennyJS'] = true;

				if (user === undefined || user === '') {
					that.offline.set(object);
				} else if (typeof user === "function") { //for backwards compat
					that.offline.set(object);
					user("updated (offline)");
				}
			}
		}


		setTimeout(function () {
			that.offline.updateOfflineObject();
		}, 2000);

	};
	
	this.update = function (object, user, callback) {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			object['cennyJS'] = true;
			if (user === undefined || user === "" || typeof user === "function") {
				that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "update", user);
			} else {
                if (Mg.validate.username(user).isValid === true) {
                    that.aj("&otherUser=" + user + "&data=" + encodeURIComponent(JSON.stringify(object)), "updateOther", callback);
                } else {
                    callback({cenError:'username invalid'});   
                }
			}
		} else if (isOnline === false) { //offline
			object['cennyJS'] = true;
			if (user === undefined || user === "" || typeof user === "function") {
				that.offline.update(object);
			}
		}
		setTimeout(function () {
			that.offline.updateOfflineObject();
		}, 2000);
	};


	//USER

	this.user.remove = function (password, callback) {
		if (password !== undefined) {
			that.aj("&data=" + encodeURIComponent(password), "removeUser", function(d) {
				if (d.cenError !== "user pass incorrect") {
					that.userObject.user = "default";
					that.userObject.pass = "default";
					that.user.forget();
				}
				callback(d);
			});
			
		} else {
			console.error("must provide user password");	
		}
	};

	this.user.permissions = function (permObj, callback) {
		var read = permObj.read;
		var write = permObj.write;
		var emailRead = permObj.emailRead;
		var offlinePerm = permObj.allowOffline;
		var readString = "";
		var writeString = "";
		var emailReadString = "";

		//read
		if (read instanceof Array) {
			for (var i = 0; i < read.length; i++) {
				if (read[i + 1] !== undefined) {
					readString += read[i] + "@n@";
				} else {
					readString += read[i];
				}
			}
		} else if (read === true) {
			readString = "allowAll";
		} else if (read === false) {
			readString = "blockAll";
		} else if (read === undefined) {
			readString = "DoNotEdit";
		} else {
			readString = "blockAll";
		}

		//write
		if (write instanceof Array) {
			for (var i = 0; i < write.length; i++) {
				if (write[i + 1] !== undefined) {
					writeString += write[i] + "@n@";
				} else {
					writeString += write[i];
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
			for (var i = 0; i < emailRead.length; i++) {
				if (emailRead[i + 1] !== undefined) {
					emailReadString += emailRead[i] + "@n@";
				} else {
					emailReadString += emailRead[i];
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
						if (permObj[key][i + 1] !== undefined) {
							propertyString += permObj[key][i] + "@n@";
						} else {
							propertyString += permObj[key][i];
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

		that.aj('&write=' + writeString + '&read=' + readString + '&offlinePerm=' + offlinePerm + '&emailRead=' + emailReadString + '&propertyObj=' + JSON.stringify(propertyObj), "permissions", callback);
	};


	this.user.remember = function () {
		localStorage.setItem('cennyUser', JSON.stringify({
			user: that.userObject.user,
			pass: that.userObject.pass
		}));
	};

	this.user.forget = function () {
		localStorage.setItem('cennyUser', "null");
	};

	this.user.password = function (newPassword, callback) {
        if (that.stats.isAllowed() === true) {
		if (Mg.validate.password(newPassword).isValid === true) {
			that.aj("&newPassword=" + newPassword, "newPass", callback);
		} else {
			callback(Mg.validate.password(newPassword));
		}
            
        that.stats.userRequestsPS++;
        } else {
            callback({cenError:'server did not respond'});
        }
	};

	this.user.signin = function (mainObject, callback) {
		if (callback === undefined) {
			callback = function(d) {
				console.log(d);
			};
		}
        if (that.stats.isAllowed() === true) {
		if (mainObject instanceof Object) {
			if (mainObject['user'] !== undefined && mainObject['user'] instanceof Array) {

				//once signed in, check if should update backend with offline data
				that.offline.syncWithBackend();
                
				var userX = mainObject['user'][0];
				var passX = mainObject['user'][1];
                
                if (Mg.validate.username(userX).isValid === true && Mg.validate.password(passX).isValid === true) {
				if (typeof callback === "function") {
					that.aj("", "generateAuthToken", function (d) {
						if (d.cenError !== undefined) {
							callback(d);
						} else {
							//set local user information
							that.userObject.user = userX;
							that.userObject.pass = passX;

							that.userObject.pass = d; //set pass to token
							localStorage.setItem('cennyToken', JSON.stringify([d, that.user.clientID, that.userObject.user])); //set token in localStorage

							that.user.remember();

							callback(true); //call provided callback
						}
					}, [userX, passX]);
					
				}
                } else {
                    callback({cenError: 'username or password invalid'});
                }
			}
		} else {
			console.warn("mainObject should be an Object.");
		}
            
        that.stats.userRequestsPS++;
        } else {
            callback({cenError:'server did not respond'});
        }

	};

	this.user.signout = function () { //signs into default user.
        if (that.userObject.user !== "default") {//only sign out on server if user is not default
            that.userObject.pass = "default";
            that.userObject.user = "default";
            that.aj("", "generateAuthToken", function (d) {});
            that.user.forget();
        }
	};

	this.user.exists = function (callback, username) {
		that.aj("&data=" + username, "userExists", function (d) {
			if (d === true) {
				callback(true);
			} else {
				callback(false);
			}

		});
	};

	this.user.create = function (mainObject, callback) {
        if (callback === undefined) {
			callback = function(d) {
				console.log(d);
			};
		}
        
        if (that.stats.isAllowed() === true) {
		if (mainObject instanceof Object) {
			if (mainObject['user'] !== undefined && mainObject['user'] instanceof Array) {
				var usrValid = Mg.validate.username(mainObject['user'][0]);
				var passValid = Mg.validate.password(mainObject['user'][1]);
				if (usrValid.isValid === true) {
					if (passValid.isValid === true) {
						var userX = mainObject['user'][0];
						var passX = mainObject['user'][1];
                        if (Mg.validate.username(userX).isValid === true && Mg.validate.password(passX).isValid === true) {
                            that.aj("&data=" + JSON.stringify({username: userX, password:encodeURIComponent(passX)}), "createuser", callback);
                        } else {
                            callback({cenError:'username or password invalid'});   
                        }
					} else {
						callback(passValid);
					}
				} else {
					callback(usrValid);
				}
			}
		} else {
			console.warn("mainObject should be an Object.");
		}
        
        that.stats.userRequestsPS++;
        } else {
            callback({cenError:'server did not respond'});
        }
	};

	this.user.info = function () {
		return [that.userObject.user, that.userObject.pass];
	};


	this.user.setEmail = function (email, callback) {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (filter.test(email) === true) {
			that.aj("&data=" + email, "setEmail", callback);
		} else {
			if (callback !== undefined) {
				callback("Email invalid.");
			} else {
				console.error("email invalid.")
			};
		}

	};

	this.user.getEmail = function (callback, username) {
		if (username === undefined) {
			var username = that.user.info();
			username = username[0];
		}
        if (Mg.validate.username(username).isValid === true) {
            that.aj("&otherUser=" + username, "getEmailOther", callback);
        } else {
            callback({cenError:'username invalid'});   
        }
	};


	this.user.metadata = function (callback, user) {
        
        if (Knwl !== undefined) {
            var knwl = new Knwl();
            if (user !== undefined) {
                that.get(function (d) {
                    if (d.cenError === undefined) {
                        var metaOBJ = {};
                        for (key in d) {
                            var str = d[key];
                            if (typeof str === "string") {
                                knwl.init(str);
                                var x = knwl.get();
                                metaOBJ[key] = x;
                            }
                        }
                        callback(metaOBJ);
                    } else {
                        callback(d.cenError);
                    }
                }, user);
            } else {
                that.get(function (d) {
                    if (d.cenError === undefined) {
                        var metaOBJ = {};
                        for (key in d) {
                            var str = d[key];
                            if (typeof str === "string") {
                                knwl.init(str);
                                var x = knwl.get();
                                metaOBJ[key] = x;
                            }
                        }
                        callback(metaOBJ);
                    } else {
                        callback(d.cenError);
                    }
                });
            }
            
        } else {
            callback({cenError:'Knwl.js must be included above Cenny.js before .user.metadata() can be called'});  
        }
	};


	//END USER



	//START OFFLINE - - - - - - - -

	this.offline = {};
	this.offline.update = function (object) {
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
				localStorage.setItem('cennyOffline', JSON.stringify(offlineObject));
			} else {
				offlineQueueObject[key] = object[key];
			}
		}

		offlineQueueObject = JSON.stringify(offlineQueueObject);
		localStorage.setItem('cennyOfflineUpdate', offlineQueueObject);

		that.offline.setDataUsername();

	};

	this.offline.setDataUsername = function () { //so that data isn't updated in the wrong user
		localStorage.setItem('cennyOfflineUsername', that.userObject.user);
	};

	this.offline.set = function (object) {
		object = JSON.stringify(object);
		localStorage.setItem('cennyOffline', object);
		localStorage.setItem('cennyOfflineUpdate', object);

		that.offline.setDataUsername();

	};

	this.offline.syncWithBackend = function () {
		that.aj("", "getOfflinePerm", function (d) {
			if (d !== "blockAll") {
				var isOnline = navigator.onLine;
				if (isOnline === true) {
					var offlineObject = localStorage.getItem('cennyOfflineUpdate');
					var dataUsername = localStorage.getItem('cennyOfflineUsername'); //username that set data
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

	this.offline.getOfflineObject = function () { //used for get / modified
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
	setTimeout(function () {
		var updateData = JSON.parse(localStorage.getItem('cennyOfflineUpdate'));
		if (updateData !== {}) {
			var shouldSync = true;
			var x = localStorage.getItem('lastOffline');
			if (x !== null) {
				if (x === "false") {
					shouldSync = false;
				}
			} else {
				shouldSync = false;
			}
			if (shouldSync === true) {
				localStorage.setItem("lastOffline", "false");
				that.offline.syncWithBackend();
			}
		}
	}, 100);

	this.offline.lastState = navigator.onLine;
	setInterval(function () {
		if (navigator.onLine !== that.offline.lastState) {
			if (navigator.onLine === true) {
				that.offline.syncWithBackend();
				localStorage.setItem('lastOffline', "false");
			} else {
				localStorage.setItem('lastOffline', "true");
			}
			that.offline.lastState = navigator.onLine;
		}

	}, 300);

	this.offline.updateOfflineObject = function () {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			that.get(function (d) {
				var offlineObject = d;
				localStorage.setItem('cennyOffline', JSON.stringify(offlineObject));
			});
		} else {
			//user offline
		}
	}
	
	this.offline.updateOfflineInterval = setInterval(function () {
		that.offline.updateOfflineObject();
	}, 40500);
	
	//END OFFLINE - - - - - - - -

	function watchBackendProperty(callback, pArray) {
		var lastData = "";
		setInterval(function () {
			that.get(function (d) {

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
			}, pArray);
		}, 1500);
	}



	this.modified = function (callback, pArray) {
		var x = new watchBackendProperty(callback, pArray);
	};


	var that = this;

};