//Main Argon begins at line 193
var Mg = {};

//validate methods provide only BASIC validation (used by user methods of Argon)
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
Mg.isJSON = function (str) { //used by Mg.convertData()
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};
Mg.convertData = function (data) { //converts data from Mg.requests.send()
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
Mg.countObj = function (obj) {//returns the length of an object
	var c = 0;
	for (key in obj) {
		c++;
	}
	return c;
};
//******
//Request sender automatically combines requests made in rapid succession into a single request.
Mg.requests = {};
Mg.requests.url = ""; //url to argon.php
Mg.requests.auth = []; //contains authentication information of current user
Mg.requests.queue = []; //queued requests to server
Mg.requests.queue_callbacks = []; //callbacks of queued requests to server
// Mg.requests.processing = false; 
Mg.requests.isBusy = false; //used to prevent sending of a request multiple times (Mg.requests.sender)


Mg.requests.removeRequest = function (index) { //removes a request from Mg.requests.queue[], as well as its callback from Mg.requests.queue_callbacks[]
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

Mg.requests.add = function (request, auth, callback, url) { //adds a request to Mg.requests.queue[] and Mg.requests.queue_callbacks[], used by Argon.ajax()
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

Mg.requests.send = function () {//called by Mg.requests.sender interval, sends a request to server
	if (Mg.requests.isBusy === false) {
		var xmlhttp;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				setTimeout(function () {
					Mg.requests.isBusy = false;
					// Mg.requests.processing = false;
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
		// Mg.requests.processing = true;
		xmlhttp.open("POST", Mg.requests.url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("requests=" + JSON.stringify(requests) + "&groupName=" + Mg.requests.auth[0] + "&userName=" + Mg.requests.auth[1] + "&userPass=" + Mg.requests.auth[2]);
		Mg.requests.isBusy = true;
	}
};

Mg.requests.sender = setInterval(function () {//sends requests in bulk to server every 300ms.
	if (Mg.countObj(Mg.requests.queue) > 0) {
		if (Mg.requests.isBusy !== true) {
			Mg.requests.send();
		}
	}
}, 300);


//Begin main
function Argon(url, group) {

	//****
	this.user = {};
	this.user.clientID = Math.floor(Math.random() * 329733);
	//****

	this.groupObject = {};

	//group definitions
	this.groupObject.group = "default";
	this.userObject = {};

	//user definitions
	this.userObject.user = "default";
	this.userObject.pass = "default";

	this.url = "#";

	//tokens are used to sign each request to server
	//scan for new tokens (auth info) on this computer
	this.user.scanForToken = function () { //look for token in another window
		var lastTokenMeta = [];
		setInterval(function () {
			var token = localStorage.getItem('argonToken');
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
			argonError: 'url to argon.php not given'
		});
	}
	if (typeof group === "string") {
		if (Mg.validate.username(group).isValid === true) {
			this.groupObject.group = group;
		} else {
			console.error({
				argonError: 'group invalid'
			});
		}
	}

	//load authentication information (if any) from localStorage
	var temp_user_info = localStorage.getItem('argonUser');
	temp_user_info = JSON.parse(temp_user_info);
	if (temp_user_info !== "null" && temp_user_info !== null) {
		if (typeof temp_user_info === "object") {
			if (temp_user_info.group === this.groupObject.group) {
				this.userObject.user = temp_user_info.user;
				this.userObject.pass = temp_user_info.pass;
			}
		}
	}

	//SERVER REQUEST METHOD (SENDS REQUESTS TO QUEUE)
	this.ajax = function (sendData, callback) {
		if (callback === undefined || typeof callback !== "function") {
			callback = function (d) {
				console.info(d);
			};
		}
		if (navigator.onLine === true) {
			//check username before sending request
			if (Mg.validate.username(that.userObject.user).isValid === true) {
				if (Mg.validate.password(that.userObject.pass).isValid === true || (that.userObject.user === "default" && that.userObject.pass === "default")) {
					Mg.requests.add(sendData, [that.groupObject.group, that.userObject.user, that.userObject.pass], callback, that.url);
				} else {
					callback(Mg.validate.password(that.userObject.pass));
				}
			} else {
				callback(Mg.validate.username(that.userObject.user));
			}
		} // is offline
	};
	this.get = function (callback, user) {
		//if user var is set to current username, set user var to ''
		if (typeof user === "string") {
			if (user === that.userObject.user) {
				user = '';
			}
		}
		if (user === undefined || user === '') {
			that.ajax({
				data: "all",
				action: "get"
			}, callback);
		} else {
			if (Mg.validate.username(user).isValid === true) {
				that.ajax({
					action: "getOther",
					data: user
				}, callback);
			} else {
				callback({
					argonError: 'username invalid'
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
		object['argonJS'] = true;
		if (user === undefined || user === "" || typeof user === "function") {
			that.ajax({
				data: object,
				action: "update"
			}, user);
		} else {
			if (Mg.validate.username(user).isValid === true) {
				that.ajax({
					otherUser: user,
					data: object,
					action: "updateOther"
				}, callback);
			} else {
				callback({
					argonError: 'username invalid'
				});
			}
		}
	};
	//experimental function, replaces all data in a user's storage with data provided.
	this.set = function (object, user, callback) {

		//if user var is set to current username, set user var to ''
		if (typeof user === "string") {
			if (user === that.userObject.user) {
				user = '';
			}
		}
		if (object instanceof Object) {
			object['argonJS'] = true;
			if (user === undefined || user === '') {
				that.ajax({
					data: object,
					action: "set"
				}, callback);
			} else if (typeof user === "function") {
				that.ajax({
					data: object,
					action: "set"
				}, user);
			} else {
				if (Mg.validate.username(user).isValid === true) {
					that.ajax({
						data: object,
						action: "setOther",
						otherUser: user
					}, callback);
				} else {
					callback({
						argonError: 'username invalid'
					});
				}
			}
		}
	};
	//USER METHODS
	this.user.remove = function (callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		that.ajax({
			data: "",
			action: "removeUser"
		}, function (d) {
			if (d.argonError === undefined) {
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
		that.ajax({
			data: "",
			action: "getPermissions"
		}, function (d) {
			console.log(d);
			if (d.argonError !== "permissions cannot be retrieved for default user") {
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
				that.ajax({
					data: newPermObj,
					action: "setPermissions"
				}, callback);
			} else {
				callback({
					argonError: "permissions cannot be edited on default user"
				});
			}
		});
	};
	//.user.remember() and .user.forget() should not be used directly ****
	this.user.remember = function () {
		localStorage.setItem('argonUser', JSON.stringify({
			user: that.userObject.user,
			pass: that.userObject.pass,
			group: that.groupObject.group
		}));
	};
	this.user.forget = function () {
		localStorage.setItem('argonUser', "null");
	};
	//****
	this.user.password = function (newPassword, callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		if (Mg.validate.password(newPassword).isValid === true) {
			that.ajax({
				data: newPassword,
				action: "changePass"
			}, callback);
		} else {
			callback(Mg.validate.password(newPassword));
		}
	};
	this.user.signin = function (username, password, callback) {
		if (typeof callback !== "function") {
			callback = function (d) {
				console.log(d);
			};
		}
		if ((typeof username === "string") && (typeof password === "string")) {
			if (username !== that.userObject.user) {
				if (Mg.validate.username(username).isValid === true && Mg.validate.password(password).isValid === true) {
					that.ajax({
						data: {"user":username,"pass":password},
						action: "generateAuthToken"
					}, function (d) {
						if (d.argonError !== undefined) {
							callback(d);
						} else {
							//set local user information
							that.userObject.user = username;
							that.userObject.pass = password;
							if (d !== "not_allowed") {
								that.userObject.pass = d; //set pass to token
							} else {
								console.log(d);
							}
							localStorage.setItem('argonToken', JSON.stringify([that.userObject.pass, that.user.clientID, that.userObject.user])); //set token in localStorage
							that.user.remember();
							callback({
								argonInfo: 'signed in'
							});
						}
					});
				} else {
					callback({
						argonError: 'username or password invalid'
					});
				}
			} else {
				callback({
					argonError: 'already signed in'
				});
			}
		} else {
			callback({
				argonError: 'first and second parameters should be username and password'
			});
		}

	};
	this.user.signout = function (callback) { //signs into default user.
		if (callback === undefined) {
			callback = function(d) {
				console.log(d);
			};
		}
		if (that.userObject.user !== "default") { //only sign out on server if user is not default
			that.ajax({
				data: {"user":that.userObject.user,"pass":that.userObject.pass},
				action: "generateAuthToken"
			}, function (d) {
				that.userObject.pass = "default";
				that.userObject.user = "default";
				callback({argonInfo:'signed out'});
			});
			that.user.forget();
		}
	};
	this.user.create = function (username, password, callback) {
		if (callback === undefined) {
			callback = function (d) {
				console.log(d);
			};
		}
		if ((typeof username === "string") && (typeof password === "string")) {
			if (Mg.validate.username(username).isValid === true) {
				if (Mg.validate.password(password).isValid === true) {
					that.ajax({
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
				argonError: 'first and second parameters should be username and password'
			});
		}
	};
	this.user.info = function (callback) {//passes info on current user to the callback
		if (callback !== undefined) {
			callback([that.userObject.user, that.userObject.pass]);
		}
	};
	//END USER METHODS
	var that = this;
};