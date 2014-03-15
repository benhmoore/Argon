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

Mg.validate.object = function(object) {
	var isValid = true;
	var leng = 0;
	for (key in object) {
		leng++;
		if (key.length > 100) {
			isValid = false;
		}
	}
	if (leng > 5000) {
		isValid = false;
	}
	return isValid;
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
		if (data.search("}{") !== -1) {
			data = data.replace(/}{/g, ',');
			if (Mg.isJSON(data) === true) {
				return JSON.parse(data);
			}
		}
		return data;
	}
};
Mg.countObj = function (obj) {
	var c = 0;
	for (key in obj) {
		c++;
	}
	return c;
};
Mg.getTime = function () {
	var obj = {};

	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);

	var x = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
	x = x.split(":");
	obj.second = parseInt(x[2]);
	obj.minute = parseInt(x[1]);
	obj.hour = parseInt(x[0]);
	obj.day = day;
	obj.year = now.getFullYear();
	return obj;
};

Mg.makeID = function () {
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 15; i++)
		id += possible.charAt(Math.floor(Math.random() * possible.length));

	return id;
};


Mg.requests = {};

Mg.requests.removeRequest = function (index) {
	var newQueue = [];
	var newQueue_callbacks = [];
	for (var i = 0; i < Mg.requests.queue.length; i++) {
		if (i !== index) {
			newQueue.push(Mg.requests.queue[i]);
		}
	}
	for (var i = 0; i < Mg.requests.queue_callbacks.length; i++) {
		if (i !== index) {
			newQueue_callbacks.push(Mg.requests.queue_callbacks[i]);
		}
	}
	Mg.requests.queue = newQueue;
	Mg.requests.queue_callbacks = newQueue_callbacks;
};

Mg.requests.url = "";
Mg.requests.auth = [];
Mg.requests.queue = [];
Mg.offlineIsAllowed = true;
Mg.requests.queue_callbacks = [];

Mg.requests.processing = false; //used to prevent sending of a request multible times

//for sent requests
Mg.requests.sent_queue = [];
Mg.requests.sent_queue_callbacks = [];

Mg.requests.total = 0;

Mg.requests.isBusy = false;
Mg.requests.add = function (request, auth, callback, url) {
	Mg.requests.auth = auth;
	Mg.requests.url = url;
	var shouldAdd = true;
	for (var i = 0; i < Mg.requests.queue.length; i++) {
		if (JSON.stringify(request) === JSON.stringify(Mg.requests.queue[i])) {
			shouldAdd = false;
			Mg.requests.queue_callbacks[i].push(callback);
		}
	}
	if (shouldAdd === true) {
		Mg.requests.queue.push(request);
		Mg.requests.queue_callbacks.push([callback]);
	}

};

Mg.requests.send = function () {
	if (Mg.requests.isBusy === false) {
		var xmlhttp;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				setTimeout(function () {
					Mg.requests.isBusy = false;
					Mg.requests.processing = false;
				}, 70);

				var temp_callbacks = Mg.requests.queue_callbacks;
				var temp_queue = Mg.requests.queue;

				var data = xmlhttp.responseText; //pass this to callbacks
				data = Mg.convertData(data);

				for (var e = data.length; e + 1 > 0; e--) {
					Mg.requests.removeRequest(e);
				}

				for (var e = 0; e < data.length; e++) {
					var request_callbacks = temp_callbacks[e];
					if (request_callbacks !== undefined) {
						for (var i = 0; i < request_callbacks.length; i++) {
							request_callbacks[i](data[e]);
						}
					}
				}

			}

		};

		
		var requests = Mg.requests.queue;
		
		Mg.requests.processing = true;

		xmlhttp.open("POST", Mg.requests.url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("requests=" + JSON.stringify(requests) + "&groupName=" + Mg.requests.auth[0] + "&userName=" + Mg.requests.auth[1] + "&userPass=" + Mg.requests.auth[2]);
		Mg.requests.total++;
		Mg.requests.isBusy === true;
	}
};

Mg.requests.sender = setInterval(function () {
	if (Mg.countObj(Mg.requests.queue) > 0) {
		if (Mg.requests.processing !== true) {
		// console.log(JSON.stringify(Mg.requests.queue));
		Mg.requests.send();
		} else {
			//waiting on response to last request
		}
	}
}, 300);

function Cenny(url, group) {

	//*** STATS ****

	this.stats = {};
	this.stats.obj = {};
	this.stats.getTime = function () {
		var x = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		return x;
	};
	this.stats.obj.log = [];
	this.stats.obj.totalRequests = 0;
	this.stats.get = function () {
		return that.stats.obj;
	};

	this.stats.userRequestsPS = 0;
	setInterval(function () {
		that.stats.userRequestsPS = 0;
	}, 10000);
	this.stats.isAllowed = function () {
		if (that.stats.userRequestsPS > 10) {
			return false;
		} else {
			return true;
		}
	};

	//***

	//****
	this.user = {};
	this.user.clientID = Math.floor(Math.random() * 329733);

	this.group = {};
	this.secure = {};
	//****

	this.groupObject = {};

	//group definitions
	this.groupObject.group = "default";

	this.userObject = {};

	//user definitions
	this.userObject.user = "default";
	this.userObject.pass = "default";

	//url to cenny.php (until set)
	this.url = document.URL + "cenny.php";


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

	if (typeof url === "string") {
		this.url = url;
	} else {
		console.error({
			cenError: 'url to cenny.php not given'
		});
	}

	if (typeof group === "string") {
		if (Mg.validate.username(group).isValid === true) {
			this.groupObject.group = group;
		} else {
			console.error({
				cenError: 'group invalid'
			});
		}
	}

	var temp_user_info = localStorage.getItem('cennyUser');
	temp_user_info = JSON.parse(temp_user_info);
	if (temp_user_info !== "null" && temp_user_info !== null) {
		if (typeof temp_user_info === "object") {
			if (temp_user_info.group === this.groupObject.group) {
				this.userObject.user = temp_user_info.user;
				this.userObject.pass = temp_user_info.pass;
			}
		}
	}

	//SERVER REQUEST METHOD
	this.aj = function (sendData, callback, optionalUserInfo) {
		if (callback === undefined || typeof callback !== "function") {
			callback = function (d) {
				console.info(d);
			};
		}
		if (navigator.onLine === true) {
			//check username before sending request

			var shouldContinue = true;

			if (optionalUserInfo !== undefined) {
				if (Mg.validate.username(optionalUserInfo[0]).isValid === true) {
					if (Mg.validate.password(optionalUserInfo[1]).isValid === true) {

					} else {
						callback(Mg.validate.password(optionalUserInfo[1]));
						shouldContinue = false;
					}
				} else {
					callback(Mg.validate.username(optionalUserInfo[0]));
					shouldContinue = false;
				}
			}

			if (shouldContinue === true) {

				if (optionalUserInfo !== undefined && optionalUserInfo instanceof Array) { //used for **.create() / .signin()**
					var userX = optionalUserInfo[0];
					var passX = optionalUserInfo[1];

					Mg.requests.add(sendData, [that.groupObject.group, userX, passX], callback, that.url);

					that.stats.obj.log.push([sendData.action, sendData, that.stats.getTime()]);
					if (that.stats.obj[sendData.action] === undefined) {
						that.stats.obj[sendData.action] = {};
						that.stats.obj[sendData.action].count = 0;
						that.stats.obj[sendData.action].log = [];
					}
					that.stats.obj[sendData.action].count++;
					that.stats.obj[sendData.action].log.push([sendData, that.stats.getTime()]);
					that.stats.obj.totalRequests++;

				} else { //otherwise, use global user info

					if (Mg.validate.username(that.userObject.user).isValid === true) {
						if (Mg.validate.password(that.userObject.pass).isValid === true || (that.userObject.user === "default" && that.userObject.pass === "default")) {
							Mg.requests.add(sendData, [that.groupObject.group, that.userObject.user, that.userObject.pass], callback, that.url);

							that.stats.obj.log.push([sendData.action, sendData, that.stats.getTime()]);
							if (that.stats.obj[sendData.action] === undefined) {
								that.stats.obj[sendData.action] = {};
								that.stats.obj[sendData.action].count = 0;
								that.stats.obj[sendData.action].log = [];
							}

							that.stats.obj[sendData.action].count++;
							that.stats.obj[sendData.action].log.push([sendData, that.stats.getTime()]);
							that.stats.obj.totalRequests++;

						} else {
							callback(Mg.validate.password(that.userObject.pass));
						}
					} else {
						callback(Mg.validate.username(that.userObject.user));
					}
				}

			} //end should continue
		} // is offline
	};
	this.get = function (callback, user) {

		//if user var is set to current username, set user var to ''
		if (typeof user === "string") {
			if (user === that.userObject.user) {
				user = '';
			}
		}

		var isOnline = navigator.onLine;
		if (isOnline === true) {
			if (user === undefined || user === '') {
				that.aj({
					data: "all",
					action: "get"
				}, callback);
			} else if (user instanceof Array) {
				var propertyString = "";
				for (var i = 0; i < user.length; i++) {
					if (user[i + 1] !== undefined) { //"user@n@" <-- (no user next, but still "@n@")
						propertyString += user[i] + "@n@";
					} else {
						propertyString += user[i];
					}
				}
				that.aj({
					data: propertyString,
					action: "get"
				}, callback);
			} else {
				if (Mg.validate.username(user).isValid === true) {
					that.aj({
						action: "getOther",
						data: user
					}, callback);
				} else {
					callback({
						cenError: 'username invalid'
					});
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

	this.update = function (object, user, callback) {

		//if user var is set to current username, set user var to ''
		if (typeof user === "string") {
			if (user === that.userObject.user) {
				user = '';
			}
		}

		var isOnline = navigator.onLine;
		if (isOnline === true) {
			object['cennyJS'] = true;
			if (user === undefined || user === "" || typeof user === "function") {
				that.aj({
					data: object,
					action: "update"
				}, user);
			} else {
				if (Mg.validate.username(user).isValid === true) {
					that.aj({
						otherUser: user,
						data: object,
						action: "updateOther"
					}, callback);
				} else {
					callback({
						cenError: 'username invalid'
					});
				}
			}
		} else if (isOnline === false) { //offline
			object['cennyJS'] = true;
			if (user === undefined || user === "" || typeof user === "function") {
				that.offline.update(object);
			}
		}
		setTimeout(function () {
			if (Mg.offlineIsAllowed === true) {
				that.offline.updateOfflineObject();
			}
		}, 10);
	};

	this.set = function (object, user, callback) {

		//if user var is set to current username, set user var to ''
		if (typeof user === "string") {
			if (user === that.userObject.user) {
				user = '';
			}
		}

		var isOnline = navigator.onLine;
		if (isOnline === true) {
			if (object instanceof Object) {
				object['cennyJS'] = true;
				if (user === undefined || user === '') {
					that.aj({
						data: object,
						action: "set"
					}, callback);
				} else if (typeof user === "function") { //for backwards compat
					that.aj({
						data: object,
						action: "set"
					}, user);
				} else {
					if (Mg.validate.username(user).isValid === true) {
						that.aj({
							data: object,
							action: "setOther",
							otherUser: user
						}, callback);
					} else {
						callback({
							cenError: 'username invalid'
						});
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
			if (Mg.offlineIsAllowed === true) {
				that.offline.updateOfflineObject();
			}
		}, 10);
	};

	//USER
	this.user.remove = function (callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		that.aj({
			data: "",
			action: "removeUser"
		}, function (d) {
			if (d.cenError === undefined) {
				that.userObject.user = "default";
				that.userObject.pass = "default";
				that.user.forget();
			}
			if (callback !== undefined) {
				callback(d);
			}
		});
	};
	this.user.permissions = function (permObj, callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		that.aj({
			data: "",
			action: "getPermissions"
		}, function (d) {
			console.log(d);
			if (d.cenError !== "permissions cannot be retrieved for default user") {
				var newPermObj = {};
				if (typeof d === "object") {
					for (key in d) {
						newPermObj[key] = d[key];
					}
				}
				for (key in permObj) {
					newPermObj[key] = permObj[key];
				}
				console.log(d);
				that.aj({
					data: newPermObj,
					action: "setPermissions"
				}, callback);
			} else {
				callback({
					cenError: "permissions cannot be edited on default user"
				});
			}
		});
	};


	this.user.remember = function () {
		localStorage.setItem('cennyUser', JSON.stringify({
			user: that.userObject.user,
			pass: that.userObject.pass,
			group: that.groupObject.group
		}));
	};

	this.user.forget = function () {
		localStorage.setItem('cennyUser', "null");
	};

	this.user.password = function (newPassword, callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		if (that.stats.isAllowed() === true) {
			if (Mg.validate.password(newPassword).isValid === true) {
				that.aj({
					data: newPassword,
					action: "changePass"
				}, callback);
			} else {
				callback(Mg.validate.password(newPassword));
			}

			that.stats.userRequestsPS++;
		} else {
			callback({
				cenError: 'server did not respond'
			});
		}
	};

	this.user.signin = function (username, password, callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		if (that.stats.isAllowed() === true) {
			if ((typeof username === "string") && (typeof password === "string")) {
				if (username !== that.userObject.user) {
					//once signed in, check if should update backend with offline data
					that.offline.syncWithBackend();

					if (Mg.validate.username(username).isValid === true && Mg.validate.password(password).isValid === true) {
						if (typeof callback === "function") {
							that.aj({
								data: "",
								action: "generateAuthToken"
							}, function (d) {
								if (d.cenError !== undefined) {
									callback(d);
								} else {
									//set local user information
									that.userObject.user = username;
									that.userObject.pass = password;
									if (d !== "not_allowed") {
										that.userObject.pass = d; //set pass to token
										Mg.offlineIsAllowed = true;
									} else {
										Mg.offlineIsAllowed = false;
									}
									localStorage.setItem('cennyToken', JSON.stringify([that.userObject.pass, that.user.clientID, that.userObject.user])); //set token in localStorage
									that.user.remember();

									callback({
										cenInfo: 'signed in'
									}); //call provided callback
								}
							}, [username, password]);

						}
					} else {
						callback({
							cenError: 'username or password invalid'
						});
					}
				} else {
					callback({
						cenError: 'already signed in'
					});
				}
			} else {
				callback({
					cenError: 'first and second parameters should be username and password'
				});
			}
		} else {
			callback({
				cenError: 'server did not respond'
			});
		}
		that.stats.userRequestsPS++;

	};

	this.user.signout = function (callback) { //signs into default user.
		if (callback === undefined) {
			callback = function(d) {
				console.log(d);
			};
		}
		if (that.userObject.user !== "default") { //only sign out on server if user is not default
			that.userObject.pass = "default";
			that.userObject.user = "default";
			that.aj({
				data: "",
				action: "generateAuthToken"
			}, function (d) {});
			that.user.forget();
		}
		if (callback !== undefined) {
			callback({cenInfo:'success'});
		}
	};

	this.user.exists = function (callback, username) {
		that.aj({
			data: username,
			action: "userExists"
		}, function (d) {
			if (d === true) {
				callback(true);
			} else if (d === false) {
				callback(false);
			} else {
				callback(d);
			}
		});
	};

	this.user.create = function (username, password, callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		if (that.stats.isAllowed() === true) {
			if ((typeof username === "string") && (typeof password === "string")) {
				if (Mg.validate.username(username).isValid === true) {
					if (Mg.validate.password(password).isValid === true) {
						that.aj({
							action: "createuser",
							data: {
								username: username,
								password: encodeURIComponent(password)
							}
						}, callback);
					} else {
						callback(Mg.validate.password(password));
					}
				} else {
					callback(Mg.validate.username(username));
				}
			} else {
				callback({
					cenError: 'first and second parameters should be username and password'
				});
			}
			that.stats.userRequestsPS++;
		} else {
			callback({
				cenError: 'server did not respond'
			});
		}
	};

	this.user.info = function (callback) {
		if (callback !== undefined) {
			callback([that.userObject.user, that.userObject.pass]);
		}
		return [that.userObject.user, that.userObject.pass];
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
		if (Mg.offlineIsAllowed === true) {
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
		}
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
		if (Mg.offlineIsAllowed === true) {
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
		}
	}, 100);

	this.offline.lastState = navigator.onLine;
	setInterval(function () {
		if (Mg.offlineIsAllowed === true) {
			if (navigator.onLine !== that.offline.lastState) {
				if (navigator.onLine === true) {
					console.log({
						cenInfo: "came back online : syncing"
					});
					that.offline.syncWithBackend();
					localStorage.setItem('lastOffline', "false");
				} else {
					console.log({
						cenInfo: "went offline"
					});
					localStorage.setItem('lastOffline', "true");
				}
				that.offline.lastState = navigator.onLine;
			}
		}

	}, 300);

	this.offline.updateOfflineObject = function () {
		if (Mg.offlineIsAllowed === true) {
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
	};

//	this.offline.updateOfflineInterval = setInterval(function () {
//		that.offline.updateOfflineObject();
//	}, 40500);

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