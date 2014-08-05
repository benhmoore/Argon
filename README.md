<<<<<<< HEAD
#Argon
*The plug and play backend*
____
=======
#The Argon Project
Argon is an open source JS and PHP based backend that just works. Sets up in seconds and runs on almost any server. Argon makes it easy for anyone to create interactive, multi-user web apps, without the need for a third-party backend.
>>>>>>> FETCH_HEAD

Argon enables web apps to seamlessly store and sync user data across multiple devices. It offers a complete backend solution for web apps. Argon can store anything from the data of a simple text editor, to the position of a player in game -- and keeps it in sync across a user's devices.

Argon is based on Javascript and PHP -- there are no dependencies, no plugins to install, no commands to run, and no database. Just drag and drop onto your server and you're set.

Argon is the result of countless hours of brainstorming, rethinking, and development. We've started over, rethought, and rebuilt; we've been working on this for over a year, and we're just getting started. 

##Getting Started
To get started, first, go ahead and grab the .zip of this project [here][1].

1. Unzip and upload `argon.php`, `argon.js`, and `time.php` to your server. *Make sure permissions are set to '0777' on the directory you upload Argon files.*

2. Add this snippet to the head of any page you want Argon to operate: `<script src = "http://URL.TO/argon.js"></script>`.

___
Next, create a new instance of the `Argon` object:

    var server = new Argon('http://URL.TO/argon_directory');
The first parameter should be the *full* URL to the *directory* where you uploaded the Argon files on your server.
___
Finally, let's test it out. On a page with Argon setup, run the following in the web console:

    server.user.create('username', 'password');
If everything is setup correctly, you should get a success message:

    argonInfo: "user created"

If you didn't get that message, make sure the permissions for the directory you uploaded Argon are set to '0777'. Also, check the console for any error messages. If the problem still persists, you can send us an email at [argon@loadfive.com][2].

Argon is now setup.
___
##Documentation
###Stuff you should know
* Any method that requires direct server interaction may be supplied a callback. This function is passed helpful information on the request attempt, for instance: if a user's password was incorrect when trying to log in. Callbacks are (in most cases) optional, however, it is recommended that you take advantage of them.
* Argon stores all data as **JSON**. Any interactions with data, such as retrieving or updating data, are done with objects.

###The Basics

####.user.create()

    .user.create('username', 'password', callback)
This method creates a user, in this case, with the username 'username' and password 'password'. A callback is optional, but recommended.

####.user.login()
    .user.login('username', 'password', callback)
This method logs into a user, which in this case, is the user 'username'. A callback is optional, but recommended.

####.user.logout()
    .user.logout()
This method logs out of the current user. *Note: It does not remove the user's credentials or data from localStorage -- see `.user.forget()`.*

####.user.update()
    .user.update({property:value})

This method updates the property 'property' with the value 'value'. If the property already exists, its value will be updated. Otherwise, the property will be created.

Properties may be removed by setting their values to `null`.

####.user.get()
    .user.get()
`.user.get()` returns the currently logged in user's data as an object.

####.user.changePassword()
    .user.changePassword('newPassword', callback);
When called, this method will change the currently logged in user's password. This will require the user to be logged out and logged in again.

####.user.forget()
    .user.forget()
This method removes the current user's data and credentials from localStorage.

####.user.remove()
    .user.remove(callback)
Calling this method will remove the currently logged in user from the client, as well as the server. Be careful, however, as this action is irreversible.

###Pools
Pools are perhaps the most versatile feature of Argon. Multiple users may join the same pool and have access to the same data, updating in real time; and because pools operate independently of users, a visitor doesn't have to be logged in to access a pool.

Because pools may be accessed by multiple users, Argon allows the owner (the creator) to set **permissions**. Permissions allow you to dictate who can read, who can change or add properties, and who can remove properties.

####.pool.create()

    .pool.create('poolname', 'password', callback);
This method, when called, creates a pool with the name 'poolname' and the password 'password'. A callback is optional, but recommended.

####.pool.join()

    .pool.join('poolname', 'password', callback);
This method joins an existing pool, which, in this case, is 'poolname'. A callback is optional, but recommended.

####.pool.leave()

    .pool.leave()
This method removes authentication data for the pool from the client, thus logging out of the pool.
####.pool.update()

    .pool.update({property:value}, callback);
This method updates the property 'property' with the value 'value' in the pool. If the property already exists, its value will be updated. Otherwise, the property will be created. A callback is optional, but recommended.

Properties may be removed by setting their values to `null`.

####.pool.get()

    .pool.get(['property'], callback);

When called, this method gets the property 'property' from the pool, passing it to the callback function.

####.pool.watch()

    .pool.watch('property', action, callback);

`.pool.watch()` gives you the ability to watch a property in the pool for changes, the *first parameter* being the property in the pool you want to watch. 

The *second parameter* is a function that determines if a change has occurred. This function should return true if the desired change has occurred, or false if it has not.
*An example action function:*

    function(current, last) {
        if (current !== last) { //if the current value is different from the last
            return true; //trigger
        } else {
            return false;
        }
    }

The *third parameter* is the callback. This function will be passed the latest value of the property when the change -- as defined by the action function -- occurs.

####.pool.permissions()

    .pool.permissions({
        "update properties": true,
        "change properties": ['userA'],
        "remove properties": false,
        "get properties" false
    }, callback);
    
This method updates the permissions for the current pool. *Only the owner (the creator) of the pool may change permissions*.

Each permission may either be set to `true`, `false`, or an array of allowed users.

#####`"update propertes"`
Defines whether or not properties may be updated, removed, or changed.

**This property is the parent of `"change properties"` and `"remove properties"`**. If set to `true`, child permissions may be used to disallow certain actions. If set to `false`, child permissions will be overridden.

#####`"change properties"`
Defines whether or not property values may be changed.
#####`"remove properties"`
Defines whether or not properties may be removed.
#####`"get properties"`
Defines whether or not properties may be read from the server.

####.pool.remove()

    .pool.remove(callback);
Calling this method will remove the current pool from the client, as well as the server. Be careful, however, as this action is irreversible. *Only the owner (the creator) of the pool may remove the pool*.

####Utilizing multiple pools on one client
Argon allows multiple pools to be accessed simultaneously. This is accomplished by using the `auth` parameter of certain pool methods.

The `auth` parameter is an object with the following format:

    {
        "name": "poolname",
        "password": "password"
    }

The `auth` parameter is supported by the following methods:

    .pool.get()
    .pool.update()
    .pool.watch()

This parameter is **always the last parameter** of the methods. For instance, here's an example call of `.pool.update()`:

    .pool.update(obj, callback, auth);

*Whenever using a method with the `auth` parameter to access another pool, a callback must be supplied, as shown above.*

___
##Help
If you have any further questions, or if you can't quite figure something out, send us an email at [argon@loadfive.com][3] or tweet us [@loadfive][4].

___
##Examples
Writer: [loadfive.com/writer][5]
____

![enter image description here][6]  This project is developed and maintained by LoadFive. 

____
____


  [1]: https://github.com/loadfive/Argon/archive/master.zip
  [2]: mailto:argon@loadfive.com
  [3]: mailto:argon@loadfive.com
  [4]: http://twitter.com/loadfive
  [5]: http://loadfive.com/writer
  [6]: http://loadfive.com/styles/logo.svg
