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

##Setup

First, you'll need to add **cenny.php** (inside server directory) to your server, this is what **cenny.js** will comunicate with
and where it will store data generated with cenny.js.

Second, add **cenny.js** to the ```<head>``` just like any other JS script.

##Cenny.js Documentation

Cenny.js is object based, so you'll first need to create a fresh instance of the Cenny object.


```javascript
   var backend = new Cenny(); 
```

   *All data stored, transfered, and retrieved with Cenny is object based, so instead of storing "hello world", it should
   be stored as {name: "hello world"}.*
   
Anyways, from here, let's set some data to our backend.
```javascript
   backend.set({sky: 'is high.'});
```
*This method connects to cenny.php and saves the data.*

Yay! Now let's retrieve that data.
```javascript
   backend.get(function(returnedData){
           console.log(returnedData); //outputs {sky: 'is high.'}
   });
```
*This method connects to cenny.php and retrives the data.*

Great, but ```.set()``` replaces existing data. Let's keep the data we already have stored and just add to it.
```javascript
   backend.update({another: [1,2,3]}); //the data is now {sky: 'is high.', another: [1,2,3]}
```
*This method uses .get() and .set() to update, but not replace data.*

Ok, but what if someone across the world ```.update()```s this data? How can we get, in real-time, 
the new data when it changes?
```javascript
   backend.modified(function(returnedData) {
           console.log(returnedData);  
   });
```
*The callback function will be passed the data only when it is edited.*


___


   
   

