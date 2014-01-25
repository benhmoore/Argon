#Cenny.js | The plug 'n play backend for web apps.
Building a chat web app? Use Cenny.js to store, send, and receive messages in real-time. Building a multiplayer game? Cenny.js can keep player positions synced in real-time. User goes offline while using your web app? No problem, Cenny.js will sync new data to the backend when a connection is established, and while the user is offline, Cenny.js will still be useable.

###Introducing Offline Mode

If a user goes offline while using your web app, dont' worry. Any actions they take while offline will be gracefully synced when they get back online. And while they're offline, the majority of Cenny.js features will function normally (like .set(), .update(), .get(), etc). Best of all, you don't have to add a single line of code, all this happens automatically. If your not into that kind of thing, we'll get into how to disable it in the permissions section.

___

###Security

Cenny.js was built from the ground up to be incredibly secure. All requests to the server must be authenticated, timely, and validated before any action is taken. All requests must pass through an authentication barrier before any code is executed.

Building a secure platform using Javascript is tough, if not impossible. Cenny.js gets around this by doing a second round of validation, authentication, and scanning on the server, making it impossible for an invalid request to infiltrate the backend. 

Best of all, because Cenny.js is an open source project, if an issue ever arises, there's an amazing community that can help.

___

Cenny.js was built to work with your web app, it is extremely flexible and works with almost any setup. Everything is done through a single JS script. No Javascript dependancies, just two files: Cenny.js, and a PHP file for the server. Oh, and no database required. Cenny.js is proudly file based, no specials needed.

###**Phrases used in this documentation**:

**!Word of thumb** - a helpful explanation or definition.

**!Remember this** - something you'll want to remember.

**!Issue scout** - describes a common mistake.

**!Get the gist** - a simple explanation or instructions of a complex subject. 


###**Definitions of words used in this documentation**:

*Property* - a labeled item in a JS Object.

*cenny.js* - refers to either the name of this project, or the file cenny.js, the file which we'll be working with.

*cenny.php* - a file cenny.js talks to, you should not edit this.



###**Documentation order**:

1. Setup

2. Getting Started

3. Setting, Updating, & Adding Properties

4. Getting & Watching Properties

5. Users & Their Methods

6. Permissions

7. Reading & Writing Another User

8. Debugging

9. Simple Documentation

__

10. Security Measures

11. Contributors & Credits


##Setup & Stuff You Should Know 

1. Download the *.zip* of this respiratory.
2. Unpack and add *cenny.php* (inside ```server``` directory) to your web server.
3. Add *cenny.js* (inside ```client``` directory) to the ```<head>``` of your pages.

Congratulations! Cenny.js is ready to go.

**!Issue scout**: You may have to modify permissions for the directory in which *cenny.php* is stored, in order for *cenny.php* to create directories and files.

###Stuff You Should Know

**Cenny.js Diagram:**

Server —> Group(s) —> User(s) —> Object (```{ property:data }```).


A *group* is a directory in which users are stored.


A *user* is a directory in which data can be stored as properties of the main Object (normal JS Object). Permissions can be set for the user, or individual properties to prevent unauthorized access, and give custom privileges. 


**!Remember this**: All data is stored as properties in a user's main Object.


##Getting Started

Before Cenny.js can be used, a new instance of the Cenny() object must be created.


```javascript
var server = new Cenny({ url:'url.to/cenny.php' });
```
The variable ```server``` has now been setup to access the backend located at the url provided (```url``` property).


You can optionally provide a group, though if none is provided, the ```default``` group is used.
```javascript
var server = new Cenny({ url:'url.to/cenny.php', group:['name','key'] });
```
This snippet creates a *group* named 'name', with the key 'key'.
**!Word of thumb**: Don't mistake the 'key' variable as a variable meant to be protected, do not take measures to protect it's secrecy, as it is not important.


**!Remember this**: by default, the ```default``` group and user are accessed. As discussed above, you may define another group to access. We'll discuss how to sign into another user later on.


##Setting, Updating, & Adding Properties

Adding properties to Cenny.js - whether it's a player's high-score, a user's address, or computed schematics - can be accomplished with two methods: .set() and .update().


###.set()

.set() is the most basic method of Cenny.js, it writes properties to a user's main Object, overwriting existing ones. 
**!Remember this:** If used, this method replaces all existing properties with new ones.

####Syntax:
```javascript
server.set( {propertyN:[1,2,3], sixty:60} );
```

####What's happening:

This snippet overwrites all existing data, and appends the properties ```propertyN``` and ```sixty``` to the user's main Object.


###.update()

.update() is much the same as .set(), in that it writes to a user's main Object. However, instead of replacing existing properties, it adds to them. If a property already exists that is being modified, it will simply update the property. If a property does not already exist, it will be added. **Properties can be removed** by adding the property ```DELETE``` to the first parameter's Object and setting it to an Array of properties to be removed.

####Syntax:
```javascript
server.update( {propertyN:[4,5,6], hundred:100} );

server.update( {DELETE:['property','two','etc']} ); //deletes properties 'property','two', and 'etc' if they exist

```

####What's happening:
This snippet updates ```propertyN``` since it already exists, and adds the hundred property to the user's main Object. The property ```sixty``` remains the same from the previous snippet. 


##Getting & Watching Properties

Existing properties can be retrieved from Cenny.js using the method *.get()*, or watched for changes using the method *.modified()*.


###.get()

.get() is how properties are retrieved from the user's main Object. Optionally, a the second parameter of this method can be set to an Array of specific properties to be retrieved (instead of the entire Object).

####Syntax: 
```javascript
server.get( function(returnedData) {
		console.log(returnedData);
} /* optionally add ['array'] of specific properties here */);
```

####What's happening:

This snippet retrieves the properties already set in the previous section and logs them to the console. 

####Simulated Output:
```javascript
{propertyN: [4,5,6], sixty: 60, hundred:100}
```


###.modified()

Once it is called, .modified() continuously watches a provided Array of properties for changes. If a change is detected, the properties are passed to the callback function.

~~**!Issue scout**: This method can only be called once per instance of the Cenny() Object.~~

####Syntax: 
```javascript
server.modified( function(returnedData) {
		console.log(returnedData);
}, ['sixty', 'propertyN'] );
```

####What's happening:

This snippet continuously watches the properties ```sixty``` and ```propertyN``` for changes. If a .update() was called that updated propertyN to ```[7,8,9]```, the properties ```sixty``` and ```propertyN``` would be passed to the callback function.

####Simulated Output:
```javascript
{propertyN: [7,8,9], sixty: 60}
```


##Users & Their Methods

Cenny.js provides many methods for user operations: .create(), .signin(), .signout(), .password(), .info(), .metadata(), .setEmail(), .getEmail(), and .remove(). These methods are located under the ```.user``` object.


###.user.create()

.user.create() creates a new user under the current group with the information provided.

####Syntax:
```javascript
server.user.create({user:['username','password'}, callback);
```

####What's happening:

This snippet creates the user 'username' with the password 'password'. Information about the creation attempt will be passed to the callback.


###.user.signin()

.user.signin() as the same suggests, is used to sign into the specified user. Once a user is signed in, methods like .get() or .update() will begin operating on this user, instead of the previous user.

~~**!Word of thumb**: if a user does not already exist, it will be created.~~ A user must exist (must have been created with ```.user.create()```) before it can be signed into.

####Syntax:
```javascript
server.user.signin({user:['username','password']}, callback);
```

####What's happening:

This snippet signs into the user 'username'. Once the sign in is complete, information about the attempt is passed to the optional callback function. A callback function is useful as, for example, it can be used to automatically load data once a user has signed in, or retrieve information about a failed signin attempt.


###.user.signout()

.user.signout() signs out of the current user, switching back to the 'default' user.

####Syntax:
```javascript
server.user.signout();
```

####What's happening:

This snippet signs out of the current user, which is 'username', and switches back to the 'default' user.


###.user.password()

.user.password() allows you to define a new password for the current user. 
**!Issue scout:** when this method is called, the user must be signed in again with the new password.

####Syntax:
```javascript
server.user.password('thePass293g2#');
```

####What's happening:

This snippet sends a request to the server to change the current user's password.


###.user.info()

.user.info() returns an array of information about the current user. 

####Syntax:

```javascript
server.user.info();
```

####What's happening:

This snippet returns an array of information about the 'default' user. 

####Simulated output:
```javascript
['default', 'default'] // [username, password]
```


###.user.metadata()

.user.metadata() returns an object that contains metadata on what is inside the main Object of a user, using Knwl.js (http://github.com/loadfive/Knwl.js).

####Syntax:

```javascript
server.user.metadata(callback);
```


###.user.setEmail()

.user.setEmail() can be used to set the email of the current user. 

####Syntax:
```javascript
server.user.setEmail('valid@email.com');
```

####What's happening:

This snippet checks the provided email for authenticity, before setting it as the user's email.  


###.user.getEmail()

.user.getEmail() is used to get the email of the current user (if it is set). 

####Syntax:
```javascript
server.user.getEmail(callback);
```

####What's happening:

This snippet passes the email of the current user to the callback function, if it is set.


###.user.remove()

.user.remove() completely removes the current user.

**!Issue scout**: There's no going back.

####Syntax:
```javascript
server.user.remove( userPassword );
```  


##Permissions

Permissions can be setup for the current user to, for instance, allow certain users to read from the current user, block all users from reading from the current user, allow a list of users to write to the current user, allow a certain property to be read from, block syncing of offline data, and more. Permissions are modified and set using the method .user.permissions().


By default, when a user is created, permissions are set to block both read and write attempts from other users. These settings can easily be modified.


###.user.permissions()

####Syntax:
```javascript
server.user.permissions({
write:['user1','user2','user3','etc'], //allows these users to write to this user.
read:false, //blocks all users from reading from this user.
emailRead:false, //blocks all users from viewing the current user's email
allowOffline:false //block offline mode syncing
});
```


These properties - "read", "write", "emailRead", and "allowOffline" - can be set to ```true``` to allow any user access, ```false``` to block all access, or - with an exception to "allowOffline" - to an Array of certain users to allow access. "allowOffline" sets whether the current user can sync offline data, this is useful if the user in question is used by more than one client. Individual properties can also be set to allow read access using the same syntax:
```javascript
server.user.permissions({
friendCount:true, //allows anyone to read the 'friendCount' property.
privateMessageCount:['admin'] //allows only user 'admin' read access to this property.

});
```
**!Word of thumb**: When a specific property is given permissions, those permissions override the existing read access permissions, for just that property.


##Reading & Writing Another User


If another user has given write access to at least the current user, ```.set()``` or ```.update()``` can be used on that user's properties:
```javascript
server.set( {}, 'username'); //set properties in user 'username'

server.update( {}, 'username'); //update properties in user 'username'
```


If a user has given full or per-property read access to at least the current user, ```.get()``` can be used on that user:
```javascript
server.get( callback, 'username'); //get data from user 'username'
```

**!Word of thumb**: If the second parameter of .get() is an array, it will be treated as a list of properties to be retrieved, however, if it is a string, it will be treated as a username (like above):
```javascript
server.get(function(d){ console.log(d); }, 'toby') //gets data from USER 'toby' 
server.get(function(d){ console.log(d); }, ['MsgCount','ip']) //gets only properties 'MsgCount' and 'ip' from server.
```

If a user has given at least the current user emailRead access, .user.getEmail() can be used to retrieve the user's email:
```javascript
server.user.getEmail( callback, 'username'); //get user "username"'s email
```

##Getting Metadata Of Another User

If a user has given full or per-property read access to at least the current user, ```.user.metadata()``` can be used on that user:
```javascript
server.user.metadata( callback, 'username'); //get metadata of user 'username'
```

____

##Debugging 

###.stats.get()

Cenny.js provides the method ```.stats.get()`` for debugging purposes. This method returns an object containing information on all requests made to the server.

####Simulated Output:
```javascript

{
  "log": [
    [
      "update",
      "&data=%7B%22cennyJS%22%3Atrue%7D",
      "16:57:51"
    ],
    [
      "get",
      "&getProperties=all",
      "16:57:53"
    ],
    [
      "createuser",
      "&data={\"username\":\"benmooredaily\",\"password\":\"1867309200ipod210!\"}",
      "16:58:00"
    ],
    [
      "getOfflinePerm",
      "",
      "16:58:00"
    ],
    [
      "generateAuthToken",
      "",
      "16:58:00"
    ],
    [
      "get",
      "&getProperties=all",
      "16:58:01"
    ],
    [
      "get",
      "&getProperties=all",
      "16:58:20"
    ]
  ],
  "totalRequests": 7,
  "update": {
    "count": 1,
    "log": [
      [
        "&data=%7B%22cennyJS%22%3Atrue%7D",
        "16:57:51"
      ]
    ]
  },
  "get": {
    "count": 3,
    "log": [
      [
        "&getProperties=all",
        "16:57:53"
      ],
      [
        "&getProperties=all",
        "16:58:01"
      ],
      [
        "&getProperties=all",
        "16:58:20"
      ]
    ]
  },
  "createuser": {
    "count": 1,
    "log": [
      [
        "&data={\"username\":\"benmooredaily\",\"password\":\"1867309200ipod210!\"}",
        "16:58:00"
      ]
    ]
  },
  "getOfflinePerm": {
    "count": 1,
    "log": [
      [
        "",
        "16:58:00"
      ]
    ]
  },
  "generateAuthToken": {
    "count": 1,
    "log": [
      [
        "",
        "16:58:00"
      ]
    ]
  }
}

```

___

##Simple Documentation

Define a new Cenny.
```javascript
var x = new Cenny( {url: 'url.to.cenny', group: ['name', 'key']} );
```

Set data (replaces existing data).
```javascript
x.set( {} );
```

Set data in another user (if allowed).
```javascript
x.set( {}, 'username' );
```

Get data.
```javascript
x.get( callback );
```

Get data from another user (if allowed).
```javascript
x.get( callback, 'username' );
```

Get specific properties from data.
```javascript
x.get( callback, ['array','of','properties'] );
```

Update data.
```javascript
x.update( {property: null, DELETE: ['property']} );
```

Update data in another user (if allowed).
```javascript
x.update( {property: null, DELETE: ['property']}, 'username' );
```
*the last parameter (either the second or third, depending if a username is provided) can optionally be a callback function. It will be passed information about the update attempt.*

Watch backend properties.
```javascript
x.modified( function(d) {}, ['property1', '2', 'three'] );
```

Remove user.
```javascript
x.user.remove( userPassword, callback );
```

Signin to another user. 
```javascript
x.user.signin( {user:['username', 'password']}, callback );
```
Change user password. 
```javascript
x.user.password('newPaSsWo#2wid');
```

Create another user.
```javascript
x.user.create( {user:['username', 'password']}, callback );
```

Get user info.
```javascript
x.user.info() //returns array: [username,password]
```

Get user metadata.
```javascript
x.user.metadata( callback ) //returns obj
```

Get another user's metadata (if allowed).
```javascript
x.user.metadata( callback, 'username' ) //returns obj
```

Set user email.
```javascript
x.user.setEmail( 'email' );
```

Get user email (if allowed).
```javascript
x.user.getEmail( callback, 'username' );
```

Signout of current user.
```javascript
fresh.user.signout();
```

Set user permissions.
```javascript
fresh.user.permissions( {write:['user1','etc'], read:['user54','ben'], emailRead:false, propertyX:true} );
```
*"write" / "read" / "emailRead" / and other properties can be set to true (allows all users), false (blocks all users), or an array of specific users.*


##Security Measures

###Cenny.js was from the ground up to be secure. Many measures are taken to prevent attacks like *cross-site request forgery*, amongst others. All these precautions are set by default, however, if wanted, can be removed.


####1. ALL requests must be signed with an authenticated user, a client cannot update, set, or even receive data from Cenny.js without being authenticated.


####2. ALL requests must come from the same domain. (**Under some circumstances, there may be a need for cross-site scripting. For instance, the examples included with this documentation use a version of cenny.php that allows other locations access**).


####3. ALL requests must pass through an authentication "barrier", NO actions on the server are executed, or loaded, before the user and group is authenticated.



___

##Contributors & Credits
####Created by Ben Moore (@benmooredaily) as a part of LoadFive (@loadfive).

Thanks to all of you for suggesting ideas, giving heads ups on bugs, and contributing.


