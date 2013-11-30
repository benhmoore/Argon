cenny.js
========

###A realtime backend for web apps.
Cenny.js is a plug 'n play and open source backend for web apps of all shapes and sizes. 

####Live Example: http://byteaspect.com/cidar/

Cenny.js was created to make building powerful real-time web apps simple, even managing users. You won't have to touch a single line
of server code if you don't want to. It's all easily accessed with pure Javascript. No networking code here.

___

##Setup

First, you'll need to add **cenny.php** (inside the ```server``` directory) to your server, this is what **cenny.js** (```client``` directory) will communicate with.

Secondly, add **cenny.js** to the ```<head>``` of any html document, just like any other JS script.

##Cenny.js Documentation

Cenny.js is object based, so you'll first need to create a fresh instance of the Cenny object.


```javascript
   var backend = new Cenny( {url: 'url.to/cenny.php'} ); 
```
*The first parameter is an object containing the property 'url', this is the url referring to cenny.php on your server.*

   *All data stored, transferred, and retrieved with Cenny is object based, so instead of storing "hello world", it should
   be stored as {name: "hello world"}.*
   
Anyways, from here, let's set some data to our backend.
```javascript
   backend.set({sky: 'is high.'});
```


Now let's retrieve that data.
```javascript
   backend.get(function(returnedData){
           console.log(returnedData); //outputs {sky: 'is high.'}
   });
```
*This method connects to cenny.php and retrieves the data, then passes it to the callback function.*

Great, but ```.set()``` replaces existing data. Let's keep the data we already have stored and just add to it.
```javascript
   backend.update({another: [1,2,3]}); //the data is now { sky: 'is high.', another: [1,2,3] }
   backend.update( {DELETE: ['another', 'etc']} ); //removes properties 'another' and 'etc'
```

Ok, but what if someone across the world ```.update()```s this data? How can we get, in real-time, 
the new data when it changes?
```javascript
   backend.modified(function(returnedData) {
           console.log(returnedData);  
   });
```
Optionally, the second parameter can be an array of specific properties to watch, instead of all data.
*The callback function (first parameter) will be passed the data only when it is edited.*


___

###Users

Users can be used to keep data protected from prying eyes. They work the same as a Facebook user, or Youtube account.

By default, when a new instance of Cenny is created, the user is "default" with the password "default".
To create a new user, or login to an existing user, we'll need to create a new instance of the Cenny object.

```javascript
var fresh = new Cenny( {url: 'url.to/cenny', user: ['username', 'password']} );
```
*Since this user does not exist, it will be created. If the user had already existed, it would be logged in.*

Now that we're signed in, we'll probably want to remember that complicated password and username.
```javascript
fresh.user.remember();
```
*This uses the localStorage object to save the username and password to the user's computer, if a username and password are not provided when defining a new instance of Cenny, these credentials will be used.*
*localStorage is used to prevent syncing of confidential information outside of the user's computer.*

...And once we remember that our complicated username and password are not that complicated at all, we'll want to forget them.
```javascript
fresh.user.forget();
```

If we'd like to remove the user completely, we can do that.
```javascript
fresh.user.remove();
```
*You MUST be signed in to do this, but be careful, no going back from here.*

Let's say you want to signin to a different user, that's simple. If the user does not exist, Cenny will go ahead and create it for you. Optionally, a callback function can be provided. This function will be passed info on the signin attempt.
```javascript
fresh.user.signin( { user:['businessPro', 'hardPassword']}, callback );
```

Or you might like to just create a user without signing out of your current user. Again, a callback function can optionally be provided.
```javascript
fresh.user.create( { user:['another', 'insanePassword']}, callback );
```

If you'd like to get info on the currently signed in user, that's simple.
```javascript
fresh.user.info() //returns an array [username,password]
```

We can also easily attach an email to our user.
```javascript
fresh.user.setEmail(email); //set email

fresh.user.getEmail(callback); //retrieve email
```

Also, anyone can retrieve a user's email by it's username.
```javascript
fresh.user.getEmail(callback, username);
```

To retrieve a list of all users:
```javascript
fresh.user.list(callback); //passes array of usernames
```

To sign out of the current user, and sign back into the **default** user:
```javascript
fresh.user.signout();
```

___
###Permissions

Permissions can be setup for users to, for instance, allow certain users to read from a user, block all users from reading from a user, allow a list of users to write to a user, and more.

By default, when a user is created, permissions are set to **block** *both* read and write attempts from other users.
These settings can easily be modified.
```javascript
fresh.user.permissions({
write:['user1','user2','user3','etc'], //allows these users to write to this user.
read:true; //allows all users to read from this user.

});
```
Both of these properties - "read" and "write" - can be set to ```true``` to allow any user access, ```false``` to block all access, or to an ```Array``` of certain users to allow access.


___
###Groups

Groups can be used to separate groups of users or multiple web apps.

By default, when a new instance of Cenny is created, the group "default" with the key "default" is used. *All users are stored in groups.*
To create a new group or access an existing one, it must be defined when creating an instance of the Cenny object.


```javascript
var fresh = new Cenny( {url: 'url.to/cenny', group: ['groupName', 'secretKey']} );
```
*Since this group does not exist, it will be created. If the group had already existed, it would be accessed.*

Groups cannot be removed from cenny.js, to remove a group, the directory will need to be removed from the server.

___

##No fluff documentation

Define a new Cenny.
```javascript
var x = new Cenny( {url: 'url.to.cenny', user:['username', 'password'], group: ['name', 'key']} );
```

Set data (replaces existing data).
```javascript
x.set( {} );
```

Get data.
```javascript
x.get( callback );
```

Get data from another user (if allowed).
```javascript
x.get( callback, 'username' );
```

Update data.
```javascript
x.update( {property: null, DELETE: ['property']} );
```

Watch data.
```javascript
x.modified( function(d) {}, ['property1', '2', 'three'] );
```

Remember user.
```javascript
x.user.remember();
```

Forget user.
```javascript
x.user.forget();
```

Remove user.
```javascript
x.user.remove();
```

Signin to another user. 
```javascript
x.user.signin( {user:['username', 'password']}, callback );
```

Create another user.
```javascript
x.user.create( {user:['username', 'password']}, callback );
```

Get user info.
```javascript
x.user.info() //returns array: [username,password]
```

Set user email.
```javascript
x.user.setEmail( 'email' );
```

Get user email.
```javascript
x.user.getEmail( callback, 'username' );
```

List all usernames.
```javascript
x.user.list( callback );
```

Signout of current user.
```javascript
fresh.user.signout(callback);
```
___

**Simple example (created by benmooredaily):**http://codepen.io/anon/pen/GKIqD
