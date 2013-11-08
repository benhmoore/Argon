function Cenny(userObject) {
    this.isOnline = true;
    
	this.url = document.URL + "cenny.php";
	this.userObject = {group:'default', key:'default'};

	if (userObject !== undefined) {
	
	if (userObject['url'] !== undefined) {
	this.url = userObject.url;
	}
        
    //run pre-load plugins
    if (userObject['plugin'] !== undefined) {

         var strFun = userObject['plugin'];  
         var fn = window[strFun];
         fn();   
        
    }
    
	if (userObject['group'] !== undefined && userObject['key'] !== undefined) {
	
		 this.userObject.group = userObject.group; 
		 this.userObject.key = userObject.key;
		 if (userObject['read'] !== undefined) {
		 	this.userObject.read = userObject.read;
		 }

	}
	}
    
    

	
	this.user = {};
	
	this.group = {};
	
	this.defaultLocation = 'main';
	
	this.user.remove = function() {
		
			that.get(function(d) {
			
			if (that.defaultLocation !== "main") {
				delete d[that.defaultLocation];
			that.set(d, 6);
			
			that.defaultLocation = "main";
			}
			}, "x324" + "bgx");
			
		
				
		
			
			return "Removing...";

		
	
	};
	
	this.user.remember = function() {
		
		localStorage.cennyUser = that.defaultLocation;
	
	};
	
	this.user.forget = function() {
		
		localStorage.cennyUser = "main";
	
	};
	
	this.user.remSignin = function() {
		if (localStorage.cennyUser !== "" || localStorage.cennyUser !== "main") {
			that.defaultLocation = localStorage.cennyUser;
			return "logged in";
		} else {
			return "Last user not available";
		}
	}

	this.user.signin = function(objectX, callbackFunction) {
		
		if (objectX['user'] !== undefined && objectX['pass'] !== undefined) {
		if (objectX['user'].length < 15) {
		if (objectX['pass'].length < 15) {
		
			var password = objectX['user'] + '{-=pass=x}' + objectX['pass'];
			that.get(function(d) {
			var status = "beginning";
			for (key in d) {
				var defaultUsername = password.split('{-=pass=x}');
				defaultUsername = defaultUsername[0];
				var username = key.split('{-=pass=x}');
				username = username[0];
				
				//------
				
				if (username === defaultUsername && password !== key) {
					status = 2;
					break;
				} else if (username === defaultUsername){
					
					status = 4;
					break;
				} else if (username !== defaultUsername && password !== key) {
					status = 3;
					
				}
			}
			
			//4 === correct 3 === user does not exist 2 === incorrect pass;
			
			if (status === 3 || status === 4) {
				that.defaultLocation = password;
			}
			if (status === 2) {
				var statusX = "Incorrect password";
			} else if (status === 3) {
				var statusX = "User added to queue. Waiting for data to be written.";
			} else if (status === 4) {
				var statusX = "User logged in.";
			}
			if (callbackFunction !== undefined) {
				callbackFunction({info:statusX, code: status});
			}
			
			},"x324b" + "gx"); 
			
			return "Signing in...";
		} else {
			return "Pass string over 15 characters";
		}
		} else {
			return "User string over 15 characters";
		}
		}
		
	
	
	};
	
	this.user.signout = function() {
			that.defaultLocation = 'main';
	};
	
	this.group.auth = function(userObject, functionName) {
		
		if (userObject['read'] === undefined) {
			userObject['read'] = "false";
		}
		if (userObject['read'] === false) {
			userObject['read'] = "false";
		} else if (userObject['read'] === true) {
			userObject['read'] = "true";
		}
		
		//AJAX
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var data = xmlhttp.responseText;
				if (functionName !== undefined) {
					functionName(data);			  
				}		  
			}
				 
		};
		xmlhttp.open("POST",that.url,true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("act=auth" + "&user=" + userObject['group'] + "&pass=" + userObject['key'] + "&readAccess=" + userObject['read']);
		//END AJAX
	
	}
	
	this.group.deauth = function(userObject, functionName) {
	
		//AJAX
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var data = xmlhttp.responseText;
				if (functionName !== undefined) {
					functionName(data);			  
				}
			}
				 
		};
		xmlhttp.open("POST",that.url,true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("act=deauth" + "&user=" + userObject['group'] + "&pass=" + userObject['key']);
		
		//END AJAX
	
	}
	
	this.set = function(data, option) {
		
			
		
			//REGULAR CHECKUP
			if (data instanceof Object) {
			data['containerCenny'] = "obj";
			} else {
				var raw = data;
				var data = {};
				data['containerCenny'] = "obj";
				data['default'] = raw;
				console.log("Data must be contained in a valid Object. CHANGED TO OBJECT.");
			}
			
			if (option !== 6 || option === undefined) {
			
			that.get(function(x) {
				if (x === false) {
					x = {};
				}
				x[that.defaultLocation] = data;
				data = x;
				
				
						data = JSON.stringify(data);
						
						
						
						
						//AJAX
						var xmlhttp;
						xmlhttp=new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if (xmlhttp.readyState==4 && xmlhttp.status==200) {
								var data = xmlhttp.responseText;		  
							}
								 
						};
						
						xmlhttp.open("POST",that.url,true);
						xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
						xmlhttp.send("data=" + encodeURI(data) + "&act=save" + "&user=" + that.userObject['group'] + "&pass=" + that.userObject['key']);
						
			}, "x324bg" + "x");
			} else {
			
			data = JSON.stringify(data);

			//AJAX
			var xmlhttp;
			xmlhttp=new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					var data = xmlhttp.responseText;		  
				}
					 
			};
			
			xmlhttp.open("POST",that.url,true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("data=" + encodeURI(data) + "&act=save" + "&user=" + that.userObject['group'] + "&pass=" + that.userObject['key']);
			
			//END AJAX
			}
			
		
	};
	
	
		
	this.get = function(functionName, objectX) {
	
		
		
		
		//AJAX
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var data = xmlhttp.responseText;
				data = JSON.parse(data);
				if (data !== "Register this domain at http://loadfive.com/cenny.") {
				if (objectX !== undefined && objectX instanceof Array) {
					var raw = data[that.defaultLocation];
					data = {};
					
					for (var i = 0; i < objectX.length; i++) {
						var x = objectX[i];
						if (raw !== undefined && raw[x] !== undefined && raw[x] !== null) {
							
							data[x] = raw[x];
						} else {
							data[x] === "";
						}
					}
				} else if (objectX !== "x" + 324 + "bg" + "x") {
					var raw = data;
					data = {};
					var x = "default";
					data[x] = raw[x];
				}
				
				
				functionName(data);	
				
				} else {
					console.log(data);
				}	  
			}
				 
		};
		
		xmlhttp.open("POST",that.url,true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("act=get" + "&user=" + that.userObject['group'] + "&pass=" + that.userObject['key']);
		//END AJAX
		

	};
	
	
	this.pushData;
	this.pushName;
	this.update = function(data) {
		that.pushData = data;
		
		that.get(function(d) {
			d = d[that.defaultLocation];
			var data = d;
			if (data instanceof Object) {
				if (data['containerCenny'] !== undefined) {
					var output = data;
					for (key in that.pushData) {
						if (key === "DELETE") {
						if (that.pushData[key] instanceof Array) {
							for (var i = 0; i < that.pushData[key].length; i++) {
								if (that.pushData[key][i] !== "containerCenny") {
								delete output[that.pushData[key][i]];
								}
							}
						} else {
							if (that.pushData[key] !== "containerCenny") {
								delete output[that.pushData[key]];
							}
						}
						} else {
						output[key]=that.pushData[key];
						}
					}
				} else {
					var output = {};
					output['containerCenny'] = "obj";
					for (key in that.pushData) {
						output[key]=that.pushData[key];
					}
					output['default'] = data;
					
				}
			} else {
				
				var output = {};
				output['containerCenny'] = "obj";
				for (key in that.pushData) {
					output[key]=that.pushData[key];
				}
				output['default'] = data;
			}
			
			that.set(output);
			
		}, "x" + "324" + "b" + "gx" + "");
	
	
	};
	
	
	this.on = function(event, functionName, objectX) {
	
		if (event === "modified" || event === "Modified") {
			if (that.checkForChangeEnabled === false) {
				that.checkForChangeFunction = functionName;
				if (objectX instanceof Array) {
				that.arrayForChangeFunction = objectX;
				} else if (objectX !== undefined){
					alert("Third parameter of .on() should be an Array.");
				} 
				setInterval(that.checkForChange, 1100);
				that.checkForChangeEnabled === true;
			}
		}
	
	};

	this.checkForChangeFunction = function(d){};
	this.checkForChangeEnabled = false;
	this.checkForChangeLast = "";
	this.checkForChange = function(functionName) {
	if (that.arrayForChangeFunction === undefined) {
		that.arrayForChangeFunction = ['default'];
	} 
		that.get(function(data) {
			data = data[that.defaultLocation];
			if (that.arrayForChangeFunction !== undefined) {
			if (data !== undefined) {
				var raw = data;
				
				data = {};
				for (var i = 0; i < that.arrayForChangeFunction.length; i++) {
					var x = that.arrayForChangeFunction[i];
					if (raw[x] !== undefined) {
					if (raw !== undefined || raw !== null) {
					data[x] = raw[x];
					} else {
						data[x] = "";
					}
					}
				}
			}
			var dataX = JSON.stringify(data);
			if (dataX !== that.checkForChangeLast) {
				that.checkForChangeFunction(data);
				
			}
			}
			that.checkForChangeLast = dataX;
			
		}, "x324bgx");
	
	};
	
	
 var that = this;
 if (that.userObject instanceof Object) {
 	that.group.auth(that.userObject, function(d) {
 	that.update({cennyStatus:'x'});
 	});
 }
    
    setInterval(function() {
        
        if (navigator.onLine) {
            that.isOnline = true;
        } else {
            that.isOnline = false;
        }
        
        
    }, 300);

 
};