# Argon

*The plug and play backend*
____

**This project is no longer receiving updates.**

It is not recommended to use this project in production environments.
____

Argon enables web apps to seamlessly store and sync user data across multiple devices. It offers a complete backend solution for web apps. Argon can store anything from the data of a simple text editor, to the position of a player in game -- and keeps it in sync across a user's devices.

Argon is based on Javascript and PHP -- there are no dependencies, no plugins to install, no commands to run, and no database! Just drag and drop onto your server and you're set.

1. [Getting Started](https://github.com/loadfive/Argon/blob/master/README.md#getting-started)
2. [Documentation](https://github.com/loadfive/Argon/blob/master/README.md#documentation)
3. [Stuffs You Should Know](https://github.com/loadfive/Argon/blob/master/README.md#stuff-you-should-know)
4. [The Basics](https://github.com/loadfive/Argon/blob/master/README.md#the-basics)
5. [Pools](https://github.com/loadfive/Argon/blob/master/README.md#pools)
6. [Utilizing Multiple Pools](https://github.com/loadfive/Argon/blob/master/README.md#utilizing-multiple-pools-on-one-client)
7. [Help](https://github.com/loadfive/Argon/blob/master/README.md#help)


## Getting Started

It is easy to get started.

First, go ahead and [grab the .zip of this project here][1] or do a simple wget :

```sh
$ wget https://github.com/loadfive/Argon/archive/master.zip
```
Unzip and upload `argon.php`, `argon.js`, and `time.php` to your server or localhost.
Make sure permissions are set to '0777' on the directory you upload Argon files.* Add this snippet to the header of any webpage you want Argon to operate : 

```html
 <script src ="http://URL.TO/argon.js"></script> 
```
___

Next, create a new instance of the `Argon` object:

```js
var server = new Argon('http://URL.TO/argon_directory');
```
    
The first parameter should be the *full* URL to the *directory* where you uploaded the Argon files on your server.
___

Finally, let's test it out. On a page with Argon setup, run the following in the web console :

```js
server.user.create('username', 'password');
```
    
If everything is setup correctly, you should get a success message :

```js
argonInfo: "user created"
```

If you didn't get that message, make sure the permissions for the directory you uploaded Argon are set to '0777'. Also, check the console for any error messages. If the problem still persists, you can send me an email at [moore.h.ben@gmail.com][2].

Argon setup is now complete!
___

## Documentation

### Stuff you should know

* Any method that requires direct server interaction may be supplied a callback. This function is passed helpful information on the request attempt, for instance: if a user's password was incorrect when trying to log in. Callbacks are (in most cases) optional, however, it is recommended that you take advantage of them.
+ Argon stores all data as **JSON**. Any interactions with data, such as retrieving or updating data, are done with objects.

### The Basics

#### .user.create()

```js
.user.create('username', 'password', callback)
```
    
This method creates a user, in this case, with the username 'username' and password 'password'. A callback is optional, but recommended.

#### .user.login()

```js
.user.login('username', 'password', callback)
```
    
This method logs into a user, which in this case, is the user 'username'. A callback is optional, but recommended.

#### .user.logout()

```js
.user.logout()
```
    
This method logs out of the current user. *Note: It does not remove the user's credentials or data from localStorage -- see `.user.forget()`.*

#### .user.update()

```js
.user.update('property', value)
```

This method updates the property 'property' with the value 'value'. If the property already exists, its value will be updated. Otherwise, the property will be created.

Properties may be removed by setting their values to `null`.

#### .user.get()
    
```js
.user.get() 
```
    
`.user.get()` returns the currently logged in user's data as an object.

#### .user.changePassword()
    
```js
.user.changePassword('newPassword', callback);
```
    
When called, this method will change the currently logged in user's password. This will require the user to be logged out and logged in again.

#### .user.forget()

```js
.user.forget()
```
    
This method removes the current user's data and credentials from localStorage.

#### .user.remove()

```js
.user.remove(callback)
```
    
Calling this method will remove the currently logged in user from the client, as well as the server. Be careful, however, as this action is irreversible.

### Pools

Pools are perhaps the most versatile feature of Argon. Multiple users may join the same pool and have access to the same data, updating in real time; and because pools operate independently of users, a visitor doesn't have to be logged in to access a pool.

Because pools may be accessed by multiple users, Argon allows the owner (the creator) to set **permissions**. Permissions allow you to dictate who can read, who can change or add properties, and who can remove properties.

#### .pool.create()

```js
.pool.create('poolname', 'password', callback);
```

This method, when called, creates a pool with the name 'poolname' and the password 'password'. A callback is optional, but recommended.

#### .pool.join()

```js
.pool.join('poolname', 'password', callback);
```

This method joins an existing pool, which, in this case, is 'poolname'. A callback is optional, but recommended.

#### .pool.leave()

```js
.pool.leave()
```
    
This method removes authentication data for the pool from the client, thus logging out of the pool.
#### .pool.update()

```js
.pool.update('property', value, callback);
```
    
This method updates the property 'property' with the value 'value' in the pool. If the property already exists, its value will be updated. Otherwise, the property will be created. A callback is optional, but recommended.

Properties may be removed by setting their values to `null`.

#### .pool.get()

```js
.pool.get(['property'], callback);
```

When called, this method gets the property 'property' from the pool, passing it to the callback function.

#### .pool.watch()

```js
.pool.watch('property', action, callback);
```

`.pool.watch()` gives you the ability to watch a property in the pool for changes, the *first parameter* being the property in the pool you want to watch. 

The *second parameter* is a function that determines if a change has occurred. This function should return true if the desired change has occurred, or false if it has not.
*An example action function:*

```js
function(current, last) {
        if (current !== last) { //if the current value is different from the last
            return true; //trigger
        } else {
            return false;
        }
    }
```

The *third parameter* is the callback. This function will be passed the latest value of the property when the change -- as defined by the action function -- occurs.

#### .pool.permissions()

```js
.pool.permissions({
        "update properties": true,
        "change properties": ['userA'],
        "remove properties": false,
        "get properties" false
    }, callback); 
```
    
This method updates the permissions for the current pool. *Only the owner (the creator) of the pool may change permissions*.

Each permission may either be set to `true`, `false`, or an array of allowed users.

##### `"update propertes"`
Defines whether or not properties may be updated, removed, or changed.

**This property is the parent of `"change properties"` and `"remove properties"`**. If set to `true`, child permissions may be used to disallow certain actions. If set to `false`, child permissions will be overridden.

##### `"change properties"`

Defines whether or not property values may be changed.

##### `"remove properties"`

Defines whether or not properties may be removed.

##### `"get properties"`

Defines whether or not properties may be read from the server.

#### .pool.remove()

```js
.pool.remove(callback);
```
    
Calling this method will remove the current pool from the client, as well as the server. Be careful, however, as this action is irreversible. *Only the owner (the creator) of the pool may remove the pool*.

#### Utilizing multiple pools on one client
Argon allows multiple pools to be accessed simultaneously. This is accomplished by using the `auth` parameter of certain pool methods.

The `auth` parameter is an object with the following format:

```js 
   {
        "name": "poolname",
        "password": "password"
    }
```

The `auth` parameter is supported by the following methods:

```js
.pool.get()
    .pool.update()
    .pool.watch()
```

This parameter is **always the last parameter** of the methods. For instance, here's an example call of `.pool.update()`:

```js
.pool.update(obj, callback, auth);
```

*Whenever using a method with the `auth` parameter to access another pool, a callback must be supplied, as shown above.*

____

This project is developed and maintained by Ben Moore.

____


  [1]: https://github.com/loadfive/Argon/archive/master.zip
  [2]: mailto:moore.h.ben@gmail.com
  [3]: mailto:moore.h.ben@gmail.com
  [4]: http://twitter.com/benmooredaily
  [5]: http://loadfive.com/writer
  [6]: http://loadfive.com/styles/logo.svg
  [7]: https://plus.google.com/112470566873602878232/posts
