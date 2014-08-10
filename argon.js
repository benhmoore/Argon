/*

Copyright (c) 2013 - 2014 LoadFive

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
function Argon(url, temp) {

    this.temp = false;
    if (temp === true)
        this.temp = true;

    this.time = {};
    this.time.current = 0;
    this.time.DATA = {}; //data that is changed BEFORE a reliable time is retrieved from server
    this.time.updater = undefined;

    this.time.dataUpdater = function(offset) { //syncs data (argon.time.DATA) that was modified before time was retrieved from server
        // console.log(offset);
        if (JSON.stringify(argon.time.DATA).length > 2) { //data has been changed
            for (key in argon.time.DATA) {
                if (argon.time.DATA[key].time !== undefined) {
                    argon.time.DATA[key].time = argon.time.DATA[key].time + offset;
                }
            }
            //push to LS and argon.DATA
            for (key in argon.time.DATA) {
                argon.DATA[key] = argon.time.DATA[key];
            }
            argon.ls.user.update(argon.time.DATA);
            console.info("Synced locally");
        }
    }

    this.time.get = function() {
        var request_time = 0;
        var time_interval = setInterval(function() {
            request_time += 1;
        }, 1);
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                clearInterval(time_interval);
                // console.log(request_time);

                var date = xmlhttp.responseText;

                //subtract request time from date string
                date = date - request_time;

                argon.time.current = date;

                //sync un-synced data * * * * * *
                var date_obj = new Date();
                var cpu_time = date_obj.getMonth() + "/" + date_obj.getDate() + "/" + date_obj.getFullYear() + " " + date_obj.toLocaleTimeString();
                cpu_time = Date.parse(cpu_time);

                // console.log(cpu_time);
                // console.log(date);

                if (date > cpu_time) {
                    var offset = date - cpu_time; //date === server time
                } else if (date === cpu_time) {
                    var offset = 0;
                } else {
                    var offset = cpu_time - date; //date === server time
                }

                argon.time.dataUpdater(offset);
                //* * * * * * * * *

                clearInterval(argon.time.updater);
                argon.time.updater = setInterval(function() {
                    argon.time.current += 100;
                }, 100);
            }

        };

        //set current time to 1
        argon.time.current = 1;

        xmlhttp.open("POST", argon.url + "/time.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
    };

    this.url = url;

    this.DATA = {};

    this.validate = {};

    this.validate.password = function(password) {
        var valid_chars = 'abcdefghijklmnopqrstuvwxyz1234567890.,?!';
        if (password.length > 3 && password.length < 17) {
            for (var i = 0; i < password.length; i++) {
                var isThere = false;
                for (var e = 0; e < valid_chars.length; e++) {
                    if (valid_chars[e] === password[i].toLowerCase()) {
                        isThere = true;
                    }
                }
                if (isThere === false) {
                    return false;
                }
            }
            //if password is valid length and does not contain invalid characters
            return true;
        }
        return false;
    }
    this.validate.username = function(username) {
        var valid_chars = 'abcdefghijklmnopqrstuvwxyz1234567890_';
        if (username.length > 3 && username.length < 17) {
            for (var i = 0; i < username.length; i++) {
                var isThere = false;
                for (var e = 0; e < valid_chars.length; e++) {
                    if (valid_chars[e] === username[i].toLowerCase()) {
                        isThere = true;
                    }
                }
                if (isThere === false) {
                    return false;
                }
            }
            //if username is valid length and does not contain invalid characters
            return true;
        }
        return false;
    }
    this.user = {};
    this.user.username = "default";
    this.user.password = "default";

    //REQUESTS ENGINE * * * * * * * * * * * * * * * * * * * * * * * * * * *
    this.requests = {};

    //* *
    this.requests.busy = false; //set to true when a request is being sent
    this.requests.queue = {
        requests: [],
        callbacks: []
    };
    //* *

    this.requests.send = function(requests) {
        callbacks = requests.callbacks;
        requests = requests.requests;

        if (argon.requests.busy === false) {
            var xmlhttp;
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    argon.requests.busy = false;

                     // console.info(xmlhttp.responseText);

                    try {
                        var return_data = JSON.parse(xmlhttp.responseText);
                    } catch (err) {
                        var error = {
                            "argonError": "Server responded with error",
                            "raw": xmlhttp.responseText.replace(/\n/g, " ")
                        }
                        console.info(error);
                        //send error to callbacks
                        for (var i = 0; i < callbacks.length; i++) {
                            callbacks[i](error);
                        }
                        return 0; //cancel function call
                    }
                    if (return_data instanceof Array) { //array === normal response
                        for (var i = 0; i < return_data.length; i++) {
                            callbacks[i](return_data[i]);
                        }
                    } else { //other === error
                        if (return_data === "Not authenticated") {
                            console.info({
                                argonError: "User authentication failed"
                            });
                            argon.user.logout();
                        }

                        for (var i = 0; i < callbacks.length; i++) {
                            callbacks[i](return_data);
                        }
                    }
                }

            };

            var request_object = {
                'requests': requests,
                'username': argon.user.username,
                'password': argon.user.password
            };
            // console.log(JSON.stringify(request_object));
            xmlhttp.open("POST", argon.url + "/argon.php", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("FROM_CLIENT=" + JSON.stringify(request_object));
            argon.requests.busy = true;

        }
    };

    this.requests.sender = function() {
        if (argon.requests.busy === false) {
            if (argon.requests.queue.requests.length > 0) {
                if (navigator.onLine === true) {
                    argon.requests.send(argon.requests.queue);
                    argon.requests.queue = {
                        callbacks: [],
                        requests: []
                    };
                }
            }
        }
    }
    setInterval(this.requests.sender, 400);

    this.requests.add = function(request, callback) {
        var is_valid = {
            request: false,
            callback: false
        };
        if (typeof request === "object" && request.action !== undefined)
            is_valid.request = true;
        if (typeof callback === "function") {
            is_valid.callback = true;
        } else {
            is_valid.callback = true;
            callback = function(d) {
                console.info(d);
            }
        }

        if (is_valid.callback === true && is_valid.request === true) {
            argon.requests.queue.callbacks.push(callback);
            argon.requests.queue.requests.push(request);
            return true;
        } else {
            return false
        }
    };

    this.ls = {};
    this.ls.get = function() {
        if (argon.temp === false) { //if instance of Argon is not temporary
            var x = localStorage.getItem('argonObject');
            if (x === null || x === "{}") {
                x = {
                    users: {},
                    pools: {}
                };
                localStorage.setItem('argonObject', JSON.stringify(x));
            } else {
                x = JSON.parse(x);
            }
            return x;
        } else {
            return {
                users: {},
                pools: {}
            };
        }
    }
    this.ls.update = function(obj) {
        if (argon.temp === false) { //if instance of Argon is not temporary
            var x = localStorage.getItem('argonObject');
            if (x === null) {
                x = {};
            } else {
                x = JSON.parse(x);
            }
            for (key in obj) {
                x[key] = obj[key];
            }
            localStorage.setItem('argonObject', JSON.stringify(x));
        }
    }
    this.ls.set = function(obj) {
        if (argon.temp === false) { //if instance of Argon is not temporary
            var x = localStorage.getItem('argonObject');
            if (x === null) {
                x = {};
            } else {
                x = JSON.parse(x);
            }
            x = obj;
            localStorage.setItem('argonObject', JSON.stringify(x));
        }
    }

    this.ls.user = {};
    this.ls.user.update = function(obj) {
        if (argon.temp === false) { //if instance of Argon is not temporary
            var argonObject = argon.ls.get();
            argonObject.users[argon.user.username].data = argon.DATA;
            argon.ls.update(argonObject);
        }
    };
    
    this.encode = function(obj) {
        var strObj = JSON.stringify(obj);
        strObj = strObj.replace(/@/g, "%40");
        strObj = strObj.replace(/\//g, "%2F");
        strObj = strObj.replace(/\+/g, "%2B");
        strObj = strObj.replace(/`/g, "%27");
        strObj = strObj.replace(/&/g, "%26");
        obj = JSON.parse(strObj);
        // console.log(obj); (debug)
        return obj;
    }

    this.ls.sync = function(callback) {

        if (navigator.onLine === true) {
            argon.requests.add({
                'action': 'sync',
                'data': argon.encode(argon.DATA)
            }, function(d) {
                if (d.argonError === undefined) {
                    if (typeof d !== "object") {
                        d = {};
                    }
                    argon.DATA = d;

                    //update localStorage again if received response from server
                    if (argon.user.username !== "default" && argon.temp === false) { //is not temp user
                        var argonObject = argon.ls.get();
                        if (argonObject.users[argon.user.username] !== undefined) {
                            argonObject.users[argon.user.username].data = d;
                        }
                        argon.ls.update(argonObject);
                    }
                }
                if (callback !== undefined) {
                    callback(true);
                }
            });
        }

        //update localStorage initially with argon.DATA
        if (argon.temp === false) { //if instance of Argon is not temporary
            var argonObject = argon.ls.get();
            if (argonObject.users[argon.user.username] !== undefined) {
                argonObject.users[argon.user.username].data = argon.DATA;
            }
            argon.ls.update(argonObject);
        }
    };

    /*
        SYNCING * * * * * * * * * * * * * *
    */

    //sync quickly after change is made:
    this.ls.lastData = {};
    setInterval(function() {
        if (argon.user.username !== "default") {
            if (JSON.stringify(argon.DATA) !== JSON.stringify(argon.ls.lastData)) {
                argon.ls.sync();
                argon.ls.lastData = argon.DATA;
            }
        }
    }, 400);

    //sync periodically to make sure data is in sync across clients logged into user
    setInterval(function() {
        if (argon.user.username !== "default") {
            argon.ls.sync();
        }
    }, 5000);

    //ACCESSIBLE METHODS * * * * * * * * * * * * * * * * * *

    this.pool = {};
    this.pool.current = {
        name: '',
        password: ''
    };
    this.pool.create = function(name, password, callback) {
        if (typeof callback !== "function")
            callback = function(d) {
                console.info(d)
            };
        if (argon.validate.password(password) === true && password.length > 5) {
            if (argon.validate.username(name) === true && name.length > 5) {
                argon.requests.add({
                    'action': 'create pool',
                    'name': name,
                    'password': password
                }, callback);
            } else {
                callback({
                    argonError: 'invalid name'
                })
            }
        } else {
            callback({
                argonError: 'invalid password'
            })
        }
    };
    this.pool.join = function(name, password, callback) {
        if (typeof callback !== "function")
            callback = function(d) {
                console.info(d)
            };
        if (argon.validate.password(password) === true && password.length > 5) {
            if (argon.validate.username(name) === true && name.length > 5) {
                argon.requests.add({
                    'action': 'join pool',
                    'name': name,
                    'password': password
                }, function(d) {
                    if (d.argonError === undefined) {

                        var argonObject = argon.ls.get();
                        argonObject.pools[name] = {
                            password: password,
                            active: true
                        };

                        //set previous pool to inactive
                        if (argonObject.pools[argon.pool.current.name] !== undefined) {
                            argonObject.pools[argon.pool.current.name].active = false;
                        }
                        argon.ls.update(argonObject);

                        argon.pool.current = {
                            name: name,
                            password: password
                        };

                        callback({
                            argonInfo: 'successfully joined'
                        });
                    } else {
                        callback(d);
                    }
                });
            } else {
                callback({
                    argonError: 'invalid name'
                })
            }
        } else {
            callback({
                argonError: 'invalid password'
            })
        }
    };
    this.pool.leave = function() {
        if (argon.pool.current.name !== "") {
            //forget user (and data) from localStorage
            var argonObject = argon.ls.get();
            argonObject.pools[argon.pool.current.name].active = false;
            argon.ls.update(argonObject);

            //forget user from current session, set to default user
            argon.pool.current.name = "";
            argon.pool.current.password = "";
            return {
                argonInfo: 'left pool'
            };
        } else {
            return {
                argonError: "action not available unless in active pool"
            };
        }
    }
    this.pool.remove = function(callback) {
        argon.requests.add({
            'action': 'remove pool',
            'name': argon.pool.current.name,
            'password': argon.pool.current.password
        }, callback);
    };
    this.pool.get = function(properties, callback, auth) {
        if (!(properties instanceof Array)) {
            return {
                argonError: "no properties to retrieve were specified as an Array in the first parameter"
            };
        }
        if (auth === undefined) {
            argon.requests.add({
                'properties': properties,
                'action': 'get pool',
                'name': argon.pool.current.name,
                'password': argon.pool.current.password
            }, callback);
        } else {
            argon.requests.add({
                'properties': properties,
                'action': 'get pool',
                'name': auth.name,
                'password': auth.password
            }, callback);
        }
    }
    this.pool.update = function(obj, callback, auth) {
        if (typeof callback !== "function")
            callback = function(d) {
                console.info(d)
            };

        if (typeof obj === "object") {
            obj = argon.encode(obj);
        } else {
            callback({
                argonError: "no properties to retrieve were specified as an Array in the first parameter"
            });
        }
        if (auth === undefined) {
            argon.requests.add({
                'action': 'update pool',
                'name': argon.pool.current.name,
                'password': argon.pool.current.password,
                'data': obj
            }, callback);
        } else {
            argon.requests.add({
                'action': 'update pool',
                'name': auth.name,
                'password': auth.password,
                'data': obj
            }, callback);
        }
    }
    this.pool.permissions = function(obj, callback) {
        argon.requests.add({
            'action': 'set pool permissions',
            'name': argon.pool.current.name,
            'password': argon.pool.current.password,
            'permissions': obj
        }, callback);
    }

    function Modified_checker(prop, action, callback, auth) {
        var last_value = undefined;
        var first = true;
        var check_interval = setInterval(function() {
            argon.pool.get([prop],function(d) {
                if (d[prop] !== last_value) {
                    if (first === false) {
                        if (action(d[prop], last_value) === true) { //if action is observed
                            callback(d[prop]); //call callback with new value
                        }
                    } else {
                        first = false;
                    }
                }
                last_value = d[prop];
            }, auth)
        }, 1000);
    }
    this.pool.watch = function(property, action, callback, auth) {
        if (action === undefined) {
            action = function(a, b) {
                if (a !== b) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        if (callback === undefined) {
            callback = function(d) {
                console.log(d);
            }
        }
        if (auth === undefined) { //setup auth object for current pool, if another is not defined.
            auth = {
                name: argon.pool.current.name,
                password: argon.pool.current.password
            }
        }
        if (property !== undefined) {
            var checker = new Modified_checker(property, action, callback, auth);
        } else {
            callback({
                argonEror: "property not defined"
            });
        }
    }

    //USER * * * * * * * * * * * * * * * * * * * *
    this.user.get = function(callback) {
        if (argon.user.username !== "default") {
            var returnObj = {};
            for (key in argon.DATA) {
                if (argon.DATA[key].data !== null) { //don't return data that has been set to *null* (meaning: been deleted)
                    if (argon.DATA[key].data !== undefined && argon.DATA[key].time !== undefined) {
                        returnObj[key] = argon.DATA[key].data;
                    } else {
                        returnObj[key] = argon.DATA[key];
                    }
                }
            }
            return returnObj;
        } else {
            return {
                argonError: "action not available for default user"
            };
        }
    }
    this.user.update = function(obj) {
        if (argon.user.username !== "default") {
            if (argon.time.current < 100) {
                var date = new Date();
                var time = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.toLocaleTimeString();
                time = Date.parse(time);
            } else {
                var time = argon.time.current;
            }

            if (argon.time.current === 1) { //data that is changed BEFORE a reliable time is retrieved from server
                for (key in obj) {
                    //assign data and time of creation
                    argon.time.DATA[key] = {
                        data: obj[key],
                        time: time
                    };
                }
            } else if (argon.time.current === 0) { //user is offline

                return {
                    argonInfo: "Eror updating: unable to connect with time server."
                };

            } else {
                for (key in obj) {
                    //assign data and time of creation
                    argon.DATA[key] = {
                        data: obj[key],
                        time: time
                    };
                }
                //update LS
                argon.ls.user.update(argon.DATA);
            }

            return {
                argonInfo: "updated"
            };
        } else {
            return {
                argonError: "action not available for default user"
            };
        }
    }
    //USER METHODS * * * * * * * * * * * * * * * * * * * * * * * * *
    this.user.create = function(username, password, callback) {
        if (typeof callback !== "function")
            callback = function(d) {
                console.info(d)
            }
        if (argon.validate.password(password) === true && password.length > 5) {
            if (argon.validate.username(username) === true && username.length > 5) {
                argon.requests.add({
                    'action': 'create user',
                    'username': username,
                    'password': password
                }, callback);
            } else {
                callback({
                    argonError: 'invalid username'
                })
            }
        } else {
            callback({
                argonError: 'invalid password'
            })
        }
    }
    this.user.loggedIn = function() {
        if (argon.user.username !== "default") {
            return true;
        } else {
            return false;
        }
    }
    this.user.login = function(username, password, callback) {
        if (typeof callback !== "function")
            callback = function(d) {
                console.info(d)
            };
        if (argon.validate.password(password) === true && password.length > 5) {
            if (argon.validate.username(username) === true && username.length > 5) {

                var client_data = {};

                var argonObject = argon.ls.get();
                if (argonObject.users[username] !== undefined) {
                    if (argonObject.users[username].password === password) {
                        client_data = argonObject.users[username].data;
                    }
                }

                argon.requests.add({
                    'action': 'login user',
                    'username': username,
                    'password': password,
                    'data': client_data
                }, function(data) {
                    if (data.argonError === undefined) {

                        //set to localStorage
                        var argonObject = argon.ls.get();
                        if (argonObject.users[username] === undefined)
                            argonObject.users[username] = {};

                        argonObject.users[username].password = password; //store password...
                        argonObject.users[username].token = data.token; //... and token.
                        argonObject.users[username].data = data.data;
                        argonObject.users[username].active = true;

                        //set previous user to inactive
                        if (argonObject.users[argon.user.username] !== undefined) {
                            argonObject.users[argon.user.username].active = false;
                        }

                        argon.ls.update(argonObject);

                        argon.user.username = username;
                        argon.user.password = data.token;

                        //set data to current session
                        argon.DATA = data.data;

                        //return success to callback
                        callback({
                            argonInfo: 'successfully logged in'
                        });
                    } else {
                        callback(data);
                    }
                });
            } else {
                callback({
                    argonError: 'invalid username'
                })
            }
        } else {
            callback({
                argonError: 'invalid password'
            })
        }
    }
    this.user.changePassword = function(new_password, callback) {
        if (argon.user.username !== "default") {
            if (typeof callback !== "function")
                callback = function(d) {
                    console.info(d)
                };
            if (argon.validate.password(new_password) === true && new_password.length > 5) {
                argon.requests.add({
                    'action': 'change user password',
                    'password': new_password
                }, callback)
            } else {
                callback({
                    argonError: 'invalid password'
                })
            }
        } else {
            return {
                argonError: "action not available for default user"
            };
        }
    }
    this.user.logout = function() {
        if (argon.user.username !== "default") {
            //forget user from localStorage by setting user to inactive
            var argonObject = argon.ls.get();
            if (argonObject.users[argon.user.username] !== undefined) { //change to inactive
                argonObject.users[argon.user.username].active = false;
            }
            argon.ls.set(argonObject);

            //forget user from current session, set to default user
            argon.user.username = "default";
            argon.user.password = "default";
            argon.DATA = {};
            return {
                argonInfo: 'logged out'
            }
        } else {
            return {
                argonError: "action not available for default user"
            };
        }
    }

    this.user.forget = function() {
        if (argon.user.username !== "default") {
            //forget user (and data) from localStorage
            var argonObject = argon.ls.get();
            if (argonObject.users[argon.user.username] !== undefined) { //remove user from LS
                delete argonObject.users[argon.user.username];
            }
            argon.ls.set(argonObject);
            return {
                argonInfo: 'forgot user from localStorage'
            }
        }
    }

    this.user.remove = function(callback) {
        if (typeof callback !== "function")
            callback = function(d) {
                console.info(d)
            };
        if (argon.user.username !== "default") {
            argon.requests.add({
                'action': 'remove user'
            }, function(d) {
                argon.user.forget();
                //set back to default user after removing
                argon.user.username = "default";
                argon.user.password = "default";
                argon.DATA = {};
                callback(d)
            });
        } else {
            return {
                argonError: "action not available for default user"
            };
        }
    }

    function User_modified_checker(prop, action, callback) {
        var last_value = undefined;
        var first = true;
        var check_interval = setInterval(function() {
            argon.user.get(function(d) {
                if (d[prop] !== last_value) {
                    if (first === false) {
                        if (action(d[prop], last_value) === true) { //if action is observed
                            callback(d[prop]); //call callback with new value
                        }
                    } else {
                        first = false;
                    }
                }
                last_value = d[prop];
            })
        }, 1000);
    }
    this.user.watch = function(property, action, callback) {
        if (action === undefined) {
            action = function(a, b) {
                if (a !== b) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        if (callback === undefined) {
            callback = function(d) {
                console.log(d);
            }
        }
        if (property !== undefined) {
            var checker = new User_modified_checker(property, action, callback);
        } else {
            callback({
                argonEror: "property not defined"
            });
        }
    }

    this.setup = function() {
        if (argon.temp === false) { //if instance of Argon is not temporary, get user from LS
            var argonObject = argon.ls.get();
            var users = argonObject.users;
            for (user in users) {
                if (users[user].active === true) {
                    argon.user.username = user;
                    argon.user.password = users[user].token;
                    argon.DATA = users[user].data;
                }
            }
            var pools = argonObject.pools;
            for (pool in pools) {
                if (pools[pool].active === true) {
                    argon.pool.current.name = pool;
                    argon.pool.current.password = pools[pool].password;
                }
            }
        }

        if (navigator.onLine === true) {
            argon.time.get();
        }
    }

    var argon = this;

    this.setup();
}