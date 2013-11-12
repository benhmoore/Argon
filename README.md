cenny.js
========

###A realtime backend for web apps.
Cenny.js is a plug 'n play, simple, and open backend for web apps of all shapes and sizes. 

  **What can I do with a backend?** 
      A backend is used to store data to be accessed across multiple clients. For instance, Facebook, Youtube,
      and Wordpress all use a backend to store user data.
      
  **Why Cenny.js?**
      Cenny.js was built to make building powerful real-time web apps simple. You won't have to touch a single line
      of server code if you don't want to. It's all easily accessed by pure Javascript. Best of all, *it's completely
      free and open source.*

___

##The Idea

Cenny.js works on the bases of users. A user is a special "location" where data can be stored. These
users can then be stored in groups, think of a group as a folder containing a list of users. A user holds a main JS ```Object``` 
in which properties can be added and removed, *all data stored in a user is contained within this main ```Object```.*

Domain (root) --> Group --> User --> JSON data

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


Yay! Now let's retrieve that data.
```javascript
   backend.get(function(returnedData){
           console.log(returnedData); //outputs {sky: 'is high.'}
   });
```
*This method connects to cenny.php and retrieves the data, then passes it to the callback function.*

Great, but ```.set()``` replaces existing data. Let's keep the data we already have stored and just add to it.
```javascript
   backend.update({another: [1,2,3]}); //the data is now {sky: 'is high.', another: [1,2,3]}
   backend.update( {DELETE: ['another', 'etc']} ); //removes properties
```
*This method uses .get() and .set() to update, but not replace data.*

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

By default, **anyone can view data in a user**, however, this can easily be disabled.
```javascript
var fresh = new Cenny( {url: 'url.to/cenny', user: ['username', 'password', false]} );
```
*Setting the third item in the user Array to ```false``` disables read access.*

To get data from a user that has read access **enabled**:
```javascript
fresh.user.get( callback, 'username' );
```
*Remember, this only works with users that have read access enabled.*

Now that we're signed in, we'll probably want to remember that complicated password and username.
```javascript
fresh.user.remember();
```
*This uses the localStorage object to save the username and password to the user's computer, if a username and password are not provided when defining a new instance of Cenny, these credentials will be used.*

...And once we remember that our complicated username and password are not that complicated at all, we'll want to forget them.
```javascript
fresh.user.forget();
```

If our brand new user starts to get stale and we long for a new one, we can remove it completely.
```javascript
fresh.user.remove();
```
*You MUST be signed in to do this, but be careful, no going back from here.*

Let's say you're a multitasking business pro, and have multiple users, you'll want to be able to switch between them easily, right?
```javascript
fresh.user.switch( { user:['businessPro', 'hardPassword']} );
```

We can also easily attach an email to our user.
```javascript
fresh.user.setEmail(email); //set email

fresh.user.getEmail(callback); //retrieve email
```

Anyone can retrieve any user's email by its username.
```javascript
fresh.user.getEmail(callback, username);
```

___

###Groups

Groups can be used to separate groups of users, or multiple web apps.

By default, when a new instance of Cenny is created, the group "default" with the key "default" is used. *All users are stored in groups.*
To create a new group, or access an existing one, we'll need to create a new instance of the Cenny object.


```javascript
var fresh = new Cenny( {url: 'url.to/cenny', group: ['groupName', 'secretKey']} );
```
*Since this group does not exist, it will be created. If the group had already existed, it would be accessed.*

Groups cannot be removed from cenny.js, if you would like to remove a group, you'll need to remove the directory from the server.

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

Switch user.
```javascript
x.user.switch( {user:['username', 'password']} );
```

Set user email.
```javascript
x.user.setEmail( 'email' );
```

Get user email.
```javascript
x.user.getEmail( callback, 'username' );
```

