// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}









var string = "a plug 'n play backend for web apps.";
var pos = 0;

var stringTwo = " open source.";
var posTwo = 0;

var changeText = true;
window.onload = function() {
    document.location.hash = "main";
    disable_scroll()
    setInterval(function() {
    if (window.innerWidth <= 700) {
        document.getElementById("windowEditor").style.width = "95%";   
    } else {
        document.getElementById("windowEditor").style.width = "700px";
    }
    }, 1000);
    
    
  setTimeout(function() {
      setInterval(function() {
          if (pos <= string.length - 1) {
              if (pos === 22) {
                document.getElementById("point").innerHTML +=string[pos] + "</br>";
              } else {
                document.getElementById("point").innerHTML +=string[pos];
              }
               pos++;
          } else {
                document.getElementById("logo").style.opacity = 1.0;   
              document.getElementById("windowEditor").style.opacity = 1.0; 
              document.getElementById("windowEditor").style.marginTop = 0;  
              document.getElementById("bottom").style.opacity = 1.0;  
              enable_scroll()
              if (changeText !== false) {
                setTimeout(function(){changePointText()}, 500); 
                changeText = false;
              }
          }
         
      }, 80);
      
  }, 900);
    
    document.getElementById("point").innerHTML = "";
    
    setTimeout(function() {
    document.body.style.backgroundColor = "#f8f8f8";
    }, 500);
};

var changePointText = function() {
     setInterval(function() {
          if (posTwo <= stringTwo.length - 1) {
                document.getElementById("point").innerHTML +=stringTwo[posTwo];
              posTwo++;
          }
          
      }, 80);
    
}
