cenny.js
========

###A realtime backend for web apps.
Cenny.js is a plug 'n play, simple, and open backend for web apps of all shapes and sizes. 

  **What can I do with a backend?** 
      A backend is used to store data to be accessed across multible clients. For instance, Facebook, Youtube,
      and Wordpress all use a backend to store user data.
      
  **Why Cenny.js?**
      Cenny.js was built to make building powerful real-time web apps simple. You won't have to touch a single line
      of server code if you don't want to. It's all easily accessed by pure Javascript. Best of all, *it's completely
      free and open source.*

___

##Cenny.js Documentation

Cenny.js is object based, so you'll first need to create a fresh instance of the Cenny object.


```javascript
   var backend = new Cenny(); 
```

   *All data stored, transfered, and retrieved with Cenny is object based, so instead of storing "hello world", it should
   be stored as {name: "hello world"}.*
