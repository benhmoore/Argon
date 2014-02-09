#Cenny.js | The plug 'n play backend for web apps.

Website: http://loadfive.com/cenny

##FULL DOCUMENTATION
http://loadfive.com/cenny/documentation

___

1. Download the *.zip* of this respiratory.
2. Unpack and add *cenny.php* (inside ```server``` directory) to your web server.
3. Add *cenny.js* (inside ```client``` directory) to the ```<head>``` of your pages.

Congratulations! Cenny.js is ready to go.

**!Issue scout**: You may have to modify permissions for the directory in which *cenny.php* is stored, in order for *cenny.php* to create directories and files.

___


###Create a new instance of Cenny:


Without group:

```javascript
var server = new Cenny(url);
```

With group:

```javascript
var server = new Cenny(url, groupname, groupkey);
```



##Security Measures

###Cenny.js was from the ground up to be secure. Many measures are taken to prevent attacks like *cross-site request forgery*, amongst others. All these precautions are set by default, however, if wanted, can be removed.


####1. ALL requests must be signed with an authenticated user, a client cannot update, set, or even receive data from Cenny.js without being authenticated.


####2. ALL requests must come from the same domain. (**Under some circumstances, there may be a need for cross-site scripting. For instance, the examples included with this documentation use a version of cenny.php that allows other locations access**).


####3. ALL requests must pass through an authentication "barrier", NO actions on the server are executed, or loaded, before the user and group is authenticated.



___

##Contributors & Credits
####Created by Ben Moore (@benmooredaily) as a part of LoadFive (@loadfive).

Thanks to all of you for suggesting ideas, giving heads ups on bugs, and contributing.


