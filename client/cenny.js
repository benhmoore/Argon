/*

Included:

    1. Braid.js - @loadfive
    2. Knwl.js - @loadfive

*/
//LoadFive | loadfive.com | @loadfive

//KNWL.JS + BRAID.JS
function Knwl(){var e=/\b([0-9]{4})-(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])(T(2[0-3]|[0-1][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[0-1][0-9]):[0-5][0-9])?)?\b/i;var t=/\b[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,4}|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\b/i;var n=["ac","ad","ae","aero","af","ag","ai","al","am","an","ao","aq","ar","arpa","as","asia","at","au","aw","ax","az","ba","bb","be","bf","bg","bh","bi","biz","bj","bm","bo","br","bs","bt","bv","bw","by","bz","ca","cat","cc","cd","cf","cg","ch","ci","cl","cm","cn","co","com","coop","cr","cu","cv","cw","cx","cz","de","dj","dk","dm","do","dz","ec","edu","ee","eg","es","eu","fi","fm","fo","fr","ga","gb","gd","ge","gf","gg","gh","gi","gl","gm","gn","gov","gp","gq","gr","gs","gt","gw","gy","hk","hm","hn","hr","ht","hu","id","ie","im","in","info","int","io","iq","ir","is","it","je","jo","jobs","jp","kg","ki","km","kn","kp","kr","ky","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mg","mh","mil","mk","ml","mn","mo","mobi","mp","mq","mr","ms","mt","mu","museum","mv","mw","mx","my","na","name","nc","ne","net","nf","ng","nl","no","nr","nu","om","org","pa","pe","pf","ph","pk","pl","pm","pn","post","pr","pro","ps","pt","pw","py","qa","re","ro","rs","ru","rw","sa","sb","sc","sd","se","sg","sh","si","sj","sk","sl","sm","sn","so","sr","st","su","sv","sx","sy","sz","tc","td","tel","tf","tg","th","tj","tk","tl","tm","tn","to","tp","travel","tt","tv","tw","tz","ua","ug","us","uy","uz","va","vc","ve","vg","vi","vn","vu","wf","ws","yt","امارات","বাংলা","中国","中國","الجزائر","مصر","გე","香港","भारत","بھارت","భారత్","ભારત","ਭਾਰਤ","ভারত","இந்தியா","ایران","ايران","الاردن","한국","қаз","ලංකා","இலங்கை","المغرب","мон","مليسيا","عمان","فلسطين","срб","рф","قطر","السعودية","السعودیة","السعودیۃ","السعوديه","سورية","سوريا","新加坡","சிங்கப்பூர்","ไทย","تونس","台灣","台湾","臺灣","укр","اليمن","xxx","онлайн","сайт","شبكة","游戏","企业","camera","clothing","lighting","singles","ventures","voyage","guru","holdings","equipment","bike","estate","tattoo","在线","中文网","land","plumbing","contractors","sexy","menu","世界","uno","gallery","technology","集团","reviews","guide","我爱你","graphics","construction","onl","みんな","diamonds","kiwi","enterprises","today","futbol","photography","tips","directory","kitchen","移动","kim","삼성","monash","wed","pink","ruhr","buzz","careers","shoes","موقع","career","otsuka","中信","gift","recipes","coffee","luxury","domains","photos","limo","viajes","wang","democrat","mango","cab","support","dance","nagoya","computer","wien","berlin","codes","email","بازار","repair","holiday","center","systems","wiki","ceo","international","solar","company","education","training","academy","marketing","florist","solutions","build","institute","builders","red","blue","ninja","business","gal","social","house","camp","immobilien","moda","glass","management","kaufen","farm","公益","政务","club","voting","TOKYO","moe"];this.text={};this.text.data={};this.addToObj=function(e,t){r.text.data[t]=e};this.get=function(e){if(e!==undefined){e=e.toLowerCase();if(e==="emotion"){return r.text.data.emotions}else if(e==="phones"){return r.text.data.phones}else if(e==="dates"){return r.text.data.dates}else if(e==="times"){return r.text.data.times}else if(e==="links"){return r.text.data.links}else if(e==="readingtime"){return r.text.data.readingTime}else if(e==="emails"){return r.text.data.emails}else if(e==="places"){return r.text.data.places}else if(e==="hashtags"){return r.text.data.hashtags}else if(e==="aliases"){return r.text.data.aliases}else if(e==="spam"){return r.text.data.spam}else{console.error("KNWL ERROR: Data type not correct, correct types: 'emotion','phones','dates','times','links','emails','places','hashtags','aliases'")}}else{console.error("KNWL ERROR: Data type not correct, correct types: 'emotion','phones','dates','times','links','emails','places','hashtags','aliases'")}};this.escapeRegExp=function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")};this.removeCharacters=function(e,t){for(var n=0;n<e.length;n++){t=t.replace(new RegExp(r.escapeRegExp(e[n]),"g"),"")}return t};this.text.readingTime=function(e){var t=e*.312;return t/60};this.date={};this.date.days=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];this.date.months=["january","february","march","april","may","june","july","august","september","october","november","december"];this.date.monthAbbrs=["jan","feb","mar","apr","may","jun","jul","aug","sept","oct","nov","dec"];this.date.holidays=[["thanksgiving"],["christmas"],["new","years"],["july","4th"]];this.date.holidaysD=[[28,11],[25,12],[1,1],[4,7]];this.date.dateObj=new Date;this.date.getDay=function(e){if(!isNaN(e)){if(e>0&&e<32){return parseInt(e)}}else{for(var t=0;t<r.date.days.length;t++){if(r.date.days[t]===e){return t+1}}}};this.date.getMonth=function(e,t){if(!isNaN(e)&&t==="mdy"){return parseInt(e)}else{for(var n=0;n<r.date.months.length;n++){if(r.date.months[n]===e){return n+1}}for(var n=0;n<r.date.monthAbbrs.length;n++){if(r.date.monthAbbrs[n]===e){return n+1}}}};this.date.findDates=function(e,t){var n=[];for(var i=0;i<e.length;i++){e[i]=e[i].split(/[.,!?]+/);e[i]=e[i][0]}var s=[];for(var i=0;i<e.length;i++){var o=r.date.getMonth(e[i]);if(o!==undefined){var u=r.date.getDay(e[i+1]);if(u!==undefined){if(u>0&&u<32){if(!isNaN(e[i+2])&&e[i+2]!==""){var a=parseInt(e[i+2]);if(a>32&&a<1e4){s=[o,u,a,r.preview(i,e)]}}else{s=[o,u,r.date.dateObj.getFullYear(),r.preview(i,e)]}}n.push(s)}}}var s=[];for(var i=0;i<e.length;i++){var f=e[i].replace("(","");var f=f.replace(")","");var l=f.split("/");if(l.length===3){var c=0;for(var h=0;h<l.length;h++){if(!isNaN(l[h])&&l[h]!==""){c++}}if(c===3){var o=r.date.getMonth(l[0],"mdy");var u=r.date.getDay(l[1]);var a=parseInt(l[2]);s=[o,u,a,r.preview(i,e)];n.push(s)}}}var s=[];for(var i=0;i<e.length;i++){if(e[i+1]==="of"){if(e[i+2]!==undefined){var u=r.date.getDay(e[i]);var o=r.date.getMonth(e[i+2]);var a=r.date.dateObj.getFullYear();if(o!==undefined&&u!==undefined){if(e[i+3]!==undefined){if(!isNaN(e[i+3])){if(e[i+3]>32&&e[i+3]<1e4){a=e[i+3]}}else if(e[i+3]==="on"||e[i+3]==="in"){if(e[i+4]!==undefined){if(!isNaN(e[i+4])){if(e[i+4]>32&&e[i+4]<1e4){a=e[i+4]}}}}else{for(var p=i;p>0;p--){if(!isNaN(e[p])){if(e[p]>32&&e[p]<1e4){a=parseInt(e[p]);break}}else if(t[p-1][t[p-1].length-1]==="."||t[p-1][t[p-1].length-1]==="?"||t[p-1][t[p-1].length-1]==="!"||t[p-1][t[p-1].length-1]===";"){break}}}}else{for(var p=i;p>0;p--){if(!isNaN(e[p])){if(e[p]>32&&e[p]<1e4){a=parseInt(e[p]);break}}else if(t[p-1][t[p-1].length-1]==="."||t[p-1][t[p-1].length-1]==="?"||t[p-1][t[p-1].length-1]==="!"||t[p-1][t[p-1].length-1]===";"){break}}}s=[o,u,a,r.preview(i,e)];n.push(s)}}}}var s=[];for(var i=0;i<e.length;i++){for(var d=0;d<r.date.holidays.length;d++){var v=r.date.holidays[d];var m=i;if(e[m]===v[0]){for(var g=0;g<v.length;g++){if(e[m]===v[g]){if(g===v.length-1){if(r.date.dateObj.getMonth()<=r.date.holidaysD[d][1]+1){s=[r.date.holidaysD[d][1],r.date.holidaysD[d][0],r.date.dateObj.getFullYear(),r.preview(i,e)]}else{s=[r.date.holidaysD[d][1],r.date.holidaysD[d][0],r.date.dateObj.getFullYear()+1,r.preview(i,e)]}n.push(s)}}m++}}}}var s=[];for(var i=0;i<e.length;i++){var y=e[i].split(/[-]+/);if(y.length===3){var b=0;for(var g=0;g<y.length;g++){if(isNaN(y[g])===false){b++}}if(b===3){if(y[0].length===4&&(y[1].length===2||y[1].length===1)&&(y[2].length===2||y[2].length===1)){for(var g=0;g<y.length;g++){y[g]=parseInt(y[g])}if(y[1]>0&&y[1]<13){if(y[2]>0&&y[2]<32){if(y[0]>0){s=[y[1],y[2],y[0],r.preview(i,e)];n.push(s)}}}}}}}return n};this.time={};this.time.findTimes=function(e){var t=[];var n=[];for(var i=0;i<e.length;i++){var s=e[i].split(":");if(s.length===2){var o=false;if(braid.search("am",s[1],true)!==false){s[1]=s[1].slice(0,s[1].length-2);o="AM"}else if(braid.search("pm",s[1],true)!==false){s[1]=s[1].slice(0,s[1].length-2);o="PM"}if(!isNaN(s[0])&&!isNaN(s[1])){if(s[0]>0&&s[0]<13){if(s[1]>=0&&s[1]<61){if(e[i+1]==="pm"){n=[s[0],s[1],"PM",r.preview(i,e)];t.push(n)}else if(e[i+1]==="am"){n=[s[0],s[1],"AM",r.preview(i,e)];t.push(n)}else{if(o!==false){n=[s[0],s[1],o,r.preview(i,e)];t.push(n)}}}}}}}var n=[];for(var i=0;i<e.length;i++){if(e[i].split(":").length===1){if(isNaN(e[i])!==true){var u=parseInt(e[i]);if(u>0&&u<13){if(e[i+1]==="am"||e[i+1]==="pm"){n=[u,"00",e[i+1].toUpperCase(),r.preview(i,e)];t.push(n)}}}else if(braid.search("am",e[i],true)!==false){var u=e[i];u=u.slice(0,u.length-2);u=parseInt(u);if(isNaN(u)!==true){if(u>0&&u<13){n=[u,"00","AM",r.preview(i,e)];t.push(n)}}}else if(braid.search("pm",e[i],true)!==false){var u=e[i];u=u.slice(0,u.length-2);u=parseInt(u);if(isNaN(u)!==true){if(u>0&&u<13){n=[u,"00","PM",r.preview(i,e)];t.push(n)}}}}}return t};this.emotion={};this.emotion.negativeWords=["terrible","horrible","evil","die","dick","bitch","fucked","stupid","idiot","dumb","noob","shit","vain","n00b","dickhead","cocksucker","disgusting","slut"];this.emotion.negativeWordsB=["fuck","shit","kill","rape","hate","hating"];this.emotion.positiveWords=["happy","good","great","amazing","awesome","wonderful","brilliant","smart"];this.emotion.positiveWordsB=["love","like","want","<3","kiss"];this.emotion.subjects=["she's","you","him","her","it","this","he's","shes","hes","your","you're","ur","they're","their","theyre"];this.emotion.negComb=[["fuck","off"],["go","away"],["go","cry"],["go","and"]];this.emotion.negCombSep=["and","it","&"];this.emotion.posComb=[["thank","you"],["thanks","a","million"],["happy","birthday"],["happy","thanksgiving"],["merry","christmas"],["happy","holidays"],["good","day"],["oh","cool"]];this.emotion.posCombSep=["for","and","&"];this.emotion.findEmotions=function(e){var t=0;var n=0;for(var i=0;i<e.length;i++){e[i]=e[i].split(/[.,!?]+/);e[i]=e[i][0];for(var s=0;s<r.emotion.negativeWords.length;s++){var o=r.emotion.negativeWords[s];if(e[i].search(o)!==-1){for(var u=0;u<r.emotion.subjects.length;u++){if(e[i-1]!==undefined){if(e[i-1]===r.emotion.subjects[u]){t++}}if(e[i-2]!==undefined){if(e[i-2]===r.emotion.subjects[u]){t++}}}}}}for(var i=0;i<e.length;i++){for(var s=0;s<r.emotion.negativeWordsB.length;s++){var o=r.emotion.negativeWordsB[s];if(e[i].search(o)!==-1){for(var u=0;u<r.emotion.subjects.length;u++){if(e[i+1]!==undefined){if(e[i+1]===r.emotion.subjects[u]){t++}}if(e[i+2]!==undefined){if(e[i+2]===r.emotion.subjects[u]){t++}}}}}}for(var i=0;i<e.length;i++){e[i]=e[i].split(/[.,!?]+/);e[i]=e[i][0];for(var s=0;s<r.emotion.positiveWords.length;s++){var a=r.emotion.positiveWords[s];if(e[i].search(a)!==-1){for(var u=0;u<r.emotion.subjects.length;u++){if(e[i-1]!==undefined){if(e[i-1]===r.emotion.subjects[u]){n++}}if(e[i-2]!==undefined){if(e[i-2]===r.emotion.subjects[u]){n++}}}}}}for(var i=0;i<e.length;i++){for(var s=0;s<r.emotion.positiveWordsB.length;s++){var a=r.emotion.positiveWordsB[s];if(e[i].search(a)!==-1){for(var u=0;u<r.emotion.subjects.length;u++){if(e[i+1]!==undefined){if(e[i+1]===r.emotion.subjects[u]){n++}}if(e[i+2]!==undefined){if(e[i+2]===r.emotion.subjects[u]){n++}}}}}}for(var i=0;i<e.length;i++){for(var f=0;f<r.emotion.negComb.length;f++){var l=0;var c=r.emotion.negComb[f].length;var h=0;for(var u=i;u<i+c;u++){if(e[u]===r.emotion.negComb[f][h]){l++}else{for(var p=0;p<r.emotion.negCombSep.length;p++){if(e[u]===r.emotion.negCombSep[p]){if(e[u+1]===r.emotion.negComb[f][h]){l++}}}}h++}if(l===c){t++}}}for(var i=0;i<e.length;i++){for(var f=0;f<r.emotion.posComb.length;f++){var l=0;var c=r.emotion.posComb[f].length;var h=0;for(var u=i;u<i+c;u++){if(e[u]===r.emotion.posComb[f][h]){l++}else{for(var p=0;p<r.emotion.posCombSep.length;p++){if(e[u]===r.emotion.posCombSep[p]){if(e[u+1]===r.emotion.posComb[f][h]){l++}}}}h++}if(l===c){n++}}}if(t===n){return"neutral or unknown"}else if(t>n){return"negative"}else{return"positive"}};this.preview=function(e,t){var n="";var r=-10;for(var i=e-6;i<e+6;i++){n+=" "+t[i]}n=braid.replace(n," undefined@w@@n@  @w@");n=n.slice(1,n.length);return n};this.phone={};this.phone.areaCodeLength=3;this.phone.formatPhoneNumber=function(e){var t=e.slice(e.length-7,e.length-4)+"-"+e.slice(e.length-4,e.length);t="("+e.slice(e.length-(r.phone.areaCodeLength+7),e.length-7)+") "+t;if(e.length>r.phone.areaCodeLength+7){t="+"+e.slice(0,e.length-(r.phone.areaCodeLength+7))+" "+t}return t};this.phone.findPhones=function(e){var t=[],n=null;var i=/^\d{7,13}$/;var s=/^\d{3}$/;var o=/^\d{1,3}$/;for(var u=0;u<e.length;u++){n=r.removeCharacters(["-","(",")"],e[u]);if(i.test(n)){if(u>0&&n.length===7){var a=r.removeCharacters(["(",")"],e[u-1]);if(s.test(a)){n=a+n;if(u>1){var f=r.removeCharacters("+",e[u-2]);if(o.test(f)){n=f+n}}}}else if(u>0&&n.length===r.phone.areaCodeLength+7){var f=r.removeCharacters("+",e[u-1]);if(o.test(f)){n=f+n}}if(n.length>=7+r.phone.areaCodeLength){t.push([r.phone.formatPhoneNumber(n),r.preview(u,e)])}}}return t};this.spam={};this.spam.vowCount=function(e){var t=e.match(/[aeiou]/gi);var n=t?t.length:0;return n};this.spam.conCount=function(e){var t=e.match(/[bcdfghjklmnpqrstvwxyz]/gi);var n=t?t.length:0;return n};this.spam.specCount=function(e){var t=e.match(/[1234567890@#$%^&*();]/gi);var n=t?t.length:0;return n};this.spam.isSpam=function(e){var t=false;var n=0;for(var i=0;i<e.length;i++){n+=e[i].length}var s=n/e.length;if(s+15>=5.1&&s-15<=5.1){}else{t=true}var o=0;var u=0;var a=0;for(var i=0;i<e.length;i++){o+=r.spam.vowCount(e[i]);u+=r.spam.conCount(e[i]);a+=r.spam.specCount(e[i])}if(o>=u){t=true}else if(a>o){t=true}var f=u/7;if(e.length>3){if(o+f>=u/1.9&&o-f<=u/1.9){}else{t=true}}else if(e.length>2){if(o+f>=u/1.4&&o-f<=u/1.4){}else{t=true}}else{f=u/3;if(o+f>=u&&o-f<=u){}else{t=true}}var l=[];for(var i=0;i<e.length;i++){var c=e[i];for(var h=0;h<c.length;h++){var p=false;for(var d=0;d<l.length;d++){if(l[d]===c[h]){p=true}}if(p===false){l.push(c[h])}}}var v=l.length;if(v+e.length/7<e.length){t=true}var m=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];for(var i=0;i<e.length;i++){var c=e[i];c=c.split(/[.?! ]+/);c=c[0];var g=0;while(g<c.length-2){for(var h=g+1;h<c.length;h++){var y=true;for(var b=0;b<m.length;b++){if(c[g]===m[b]){y=false}}if(y===false){if(c[h]===c[g]){if(c[h+1]===c[g+1]){if(c[h+2]===c[g+2]){t=true}}}}else{break}}g++}}return t};this.link={};this.link.findLinks=function(e){var t=[];for(var i=0;i<e.length;i++){var s=e[i].replace(new RegExp(/[()!]/g),"");if(/^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i.test(s)){t.push([s,r.preview(i,e)])}else if(s.indexOf("@")==-1&&s.indexOf("://")==-1){for(var o=0;o<n.length;o++){if(s.indexOf("."+n[o])!=-1){t.push([s,r.preview(i,e)]);break}}}}var u=[];for(var i=0;i<t.length;i++){if(t[i][0][t[i][0].length-1]==="."||t[i][0][t[i][0].length-1]==="?"){u.push([t[i][0].slice(0,t[i][0].length-1),t[i][1]])}else{u.push(t[i])}}return u};this.email={};this.email.findEmails=function(e){var n=[],i="";for(var s=0;s<e.length;s++){var o=e[s].split(/[\,\|\(\)\?]/g);for(var u=0;u<o.length;u++){var a=o[u].replace(new RegExp(/[()!]/g),"");a=braid.replace(a,",@wa@");if(t.test(a)){i=a.match(t)[0];n.push([i,r.preview(s,e)])}}}return n};this.hashtags={};this.hashtags.findHashtags=function(e){var t=[],n="";for(var i=0;i<e.length;i++){if(/^#([a-z0-9][a-z0-9\-_]*)\b/i.test(e[i])){n=e[i].match(/^#([a-z0-9][a-z0-9\-_]*)\b/i)[0];t.push([n,r.preview(i,e)])}}return t};this.aliases={};this.aliases.findAliases=function(e){var t=[],n="";for(var i=0;i<e.length;i++){if(/^(@[a-z0-9][a-z0-9\-_]*)\b/i.test(e[i])){n=e[i].match(/^(@[a-z0-9][a-z0-9\-_]*)\b/i)[0];t.push([n,r.preview(i,e)])}}return t};this.places={};this.places.falsePlaces=["January","February","March","April","May","June","July","August","September","October","November","December","His","Hers","Who","Whom","Whose"];this.places.findPlaces=function(e){var t=[];for(var n=0;n<e.length;n++){e[n]=e[n].replace(new RegExp(/[()!,]/g),"");if(e[n]==="at"||e[n]==="in"||e[n]==="near"||e[n]==="close"&&e[n+1]==="to"){var i=[];var s=1;while(e[n+s]!=="at"&&e[n+s]!=="in"&&e[n+s]!=="near"&&!/^.*(\.|\,|\?|\!)+$/.test(e[n+s-1])&&n+s<e.length){var o=e[n+s].replace(/[\,\.]/,"");if(/^[A-Z](.*)$/.test(o)){if(n+4>n+s){i.push(o)}}s++}if(i.length>0&&i.length<3){var u=false;for(var a=0;a<i.length;a++){for(var f=0;f<r.places.falsePlaces.length;f++){if(i[a]===r.places.falsePlaces[f]){u=true}else if(i[a].length<2){u=true}}}if(u===false){t.push([i.join(" "),r.preview(n,e)])}}n+=s-1}}return t};this.init=function(e){var t=e.toLowerCase();r.text.wordCount=t.split(/[ ]+/).length-1;var n=t.split(/[ \n]+/);var i=e.split(/[ \n]+/);t=t.split(/[\n ]+/);for(var s=0;s<t.length;s++){t[s]=braid.replace(t[s]," @w@@n@,@w@"+'@n@"@w@');t[s]=t[s].replace("?","")}var o=t;var u=r.date.findDates(o,n);if(u!==[]){r.addToObj(u,"dates")}var a=r.time.findTimes(o);if(a!==[]){r.addToObj(a,"times")}var f=r.phone.findPhones(o);if(f!==[]){r.addToObj(f,"phones")}var l=r.emotion.findEmotions(o);if(l!==[]){r.addToObj(l,"emotions")}var c=r.link.findLinks(n);if(c!==[]){r.addToObj(c,"links")}var h=r.email.findEmails(i);if(h!==[]){r.addToObj(h,"emails")}var p=r.places.findPlaces(i);if(p!==[]){r.addToObj(p,"places")}var d=r.hashtags.findHashtags(i);if(d!==[]){r.addToObj(d,"hashtags")}var v=r.aliases.findAliases(i);if(v!==[]){r.addToObj(v,"aliases")}var m=r.spam.isSpam(o);r.addToObj(m,"spam");var g=r.text.readingTime(r.text.wordCount);if(g!==[]){r.addToObj(g,"readingTime")}};var r=this}var braid={};braid.vnumber=.02;braid.version=function(){console.log(braid.vnumber)};braid.search=function(e,t,n,r){if(n!==undefined){if(n===false){t=t.toLowerCase();e=e.toLowerCase();if(r!==false){t=braid.replace(t,"aeiouyAEIOUY@wa@");e=braid.replace(e,"aeiouyAEIOUY@wa@")}}}var i=[];var t=t.split("");var e=e.split("");var s;var o=0;for(var u=0;u<t.length;u++){if(t[u]===e[0]){for(var a=0;a<e.length;a++){s=u+a;if(t[s]===e[a]){if(a===e.length-1){var f=s-e.length+1;i.push(f);o++}}}}}if(o===0){return false}else{return i}};braid.replace=function(e,t){var n=t;var t={};t.full=n;var r=false,i=false;t.groups=t.full.split("@n@");if(e instanceof Array){var s=[];r=true;for(var o=0;o<e.length;o++){var u=e[o];if(u===parseInt(u)){u=u.toString();i=true}for(var a=0;a<t.groups.length;a++){var f=t.groups[a];var l=braid.search("@wa@",f,true);if(l===false){var c=f.split("@w@");var h=c[0];var p=c[1];u=deiwo3replace(h,p,u)}else{var c=f.split("@wa@");var h=c[0];if(braid.search("!NUM!",h,true)!==false){h="12345678910"}if(braid.search("!VOWEL!",h,true)!==false){h="aeiouyAEIOUY"}if(braid.search("!SPECIAL!",h,true)!==false){h="~`@#$%^&*()_+-={}|[]:;<>"}h=h.split("");var p=c[1];for(var d=0;d<h.length;d++){u=deiwo3replace(h[d],p,u)}}}if(i===true){u=parseInt(u)}s.push(u);i=false}}else{if(e===parseInt(e)){e=e.toString();i=true}for(var a=0;a<t.groups.length;a++){var f=t.groups[a];var l=braid.search("@wa@",f,true);if(l===false){var c=f.split("@w@");var h=c[0];var p=c[1];e=deiwo3replace(h,p,e)}else{var c=f.split("@wa@");var h=c[0];if(braid.search("!NUM!",h,true)!==false){h="12345678910"}if(braid.search("!VOWEL!",h,true)!==false){h="aeiouyAEIOUY"}h=h.split("");var p=c[1];for(var d=0;d<h.length;d++){e=deiwo3replace(h[d],p,e)}}}if(i===true){e=parseInt(e)}}if(r===false){return e}else{return s}};var deiwo3replace=function(e,t,n){return n.replace(new RegExp(e,"g"),t)};braid.help=function(e){if(!e){console.log('Incorrect santex. Make sure to use the first parameter as a keyword. Example: braid.help("braid.replace"). \n|TIP: You can use this function in the console for quick help.')}else{if(braid.search("replace",e,false)!==false){console.log("*SANTEX FOR braid.replace()*\n\n"+"|RETURNS: braid.replace() will return the output after completing actions on the string.\n"+"|SANTEX: var VARIABLE = braid.replace('this is a test','this@w@that@n@is@w@was');\n"+"|OUTPUT: 'that was a test'\n"+"|NOTE: Using the parameter 'key' (second parameter), '@w@' is used as 'with', so 'apple@w@grape' means 'replace apple with grape'.\n"+"| '@n@ is used as 'next.' It is used to seperate instructions, as follows, 'apple@w@grape@n@cherry@w@bannana'.\n"+"| You can use '@wa@' instead of '@w@' to replace all instances of each character with another, like so, 'aeiouy@wa@#'\n"+"| If the string were 'abcdefghijklmnopqrstuvwxyz', this would output '#bcd#fgh#jklmn#pqrst#vwx#z'.\n"+"| *Input can be an Array, Integer, or String.\n")}else if(braid.search("search",e,false)!==false){console.log("*SANTEX FOR braid.search()*\n\n"+"|RETURNS: if braid.search() finds a match to query, it will return the positions of all matches in an array.\n"+"| If it does not find a match, it will return *false*.\n"+"|SANTEX: var VARIABLE = braid.search('query','complete string',false,false);\n"+"|OUTPUT: *false*\n"+"|NOTE: The third (3) parameter should be *true* or *false*, if *true* the search will be case sensitive, if *false* the search will not.\n| Setting this to false will also search by just consonants, instead of both consonants and vowels.\n"+"| The fourth (4) parameter can be set to *false* to disable the removal of vowels when searching with the third (3) parameter equal to *true*.\n")}else{console.log("~No help available on this topic. Please make sure to check your spelling.\nSANTEX: braid.help('braid.complementary'), etc.\n    ")}}};

<<<<<<< HEAD
=======

>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
//KNWL INIT
var knwl = new Knwl();


//used for basic tasks
var Mg = {};
Mg.validate = {};
Mg.validate.username = function (username) {

	var result = {
		isValid: true,
		reasons: [],
		type: 'username'
	};

	if (typeof username !== "string") {
		result.isValid = false;
		result.reasons.push("Username is not a valid string");
	} else {

		if (username.match(/^[A-Za-z0-9_]+$/)) {} else {
			result.isValid = false;
			result.reasons.push("Username contains special characters");
		}

	}
	if (username.length > 24) {
		result.isValid = false;
		result.reasons.push("Username too long");
	}
	if (username.length < 5) {
		result.isValid = false;
		result.reasons.push("Username too short");
	}


	return result;
};

Mg.validate.password = function (password) {

	var result = {
		isValid: true,
		reasons: [],
		type: 'password'
	};

	if (typeof password !== "string") {
		result.isValid = false;
		result.reasons.push("Password is not a valid string");
	} else {
		if (password.match(/^[A-Za-z]+$/)) {
			result.isValid = false;
			result.reasons.push("Password must contain at least one special character");
		}
	}
	if (password.length > 70) {
		result.isValid = false;
		result.reasons.push("Password too long");
	}
	if (password.length < 5) {
		result.isValid = false;
		result.reasons.push("Password too short");
	}


	return result;

};

Mg.isJSON = function (str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

Mg.convertData = function (data) {
	var isJSON = Mg.isJSON(data);
	if (isJSON === true) {
		return JSON.parse(data);
	} else {
		return data;
	}
};



//CENNY.JS ---------


function Cenny(mainObject) {

<<<<<<< HEAD
	//*** STATS ****
		
		this.stats = {};
		this.stats.obj = {};
		this.stats.getTime = function() {
			var x = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");	
			return x;
		};
		this.stats.obj.log = [];
		this.stats.obj.totalRequests = 0;
		this.stats.get = function() {
			return that.stats.obj;
		};
	
	//***
	
	//****
	this.user = {};
	this.user.clientID = Math.floor(Math.random() * 32973);

	this.group = {};
	this.secure = {};
	//****

	this.groupObject = {};

	//group definitions
	this.groupObject.group = "default";
	this.groupObject.key = "default";

	this.userObject = {};

	//user definitions
	this.userObject.user = "default";
	this.userObject.pass = "default";

	var temp_user_info = localStorage.getItem('cennyUser');
	temp_user_info = JSON.parse(temp_user_info);
	if (temp_user_info !== "null" && temp_user_info !== null) {
		if (typeof temp_user_info === "object") {
			this.userObject.user = temp_user_info.user;
			this.userObject.pass = temp_user_info.pass;
		}
	}

	//scan for new tokens (auth info) on this computer
	this.user.scanForToken = function () { //look for token in another window
		var lastTokenMeta = [];
		setInterval(function () {
			var token = localStorage.getItem('cennyToken');
			token = JSON.parse(token);
			if (token !== null && token !== undefined && token !== []) {
				if (token[2] === that.userObject.user) {
					if (lastTokenMeta !== token[0]) {
						if (token[1] !== that.user.clientID) { //if this client did not set token
							if (that.userObject.pass !== token[0]) {
								that.userObject.pass = token[0];
								lastTokenMeta = token[0];
							}

						}
					}
				}
			}
		}, 500);
	};
	this.user.scanForToken();


	//url to cenny.php (until set)
	this.url = document.URL + "cenny.php";

	//SETUP MAIN OBJECT
	if (mainObject instanceof Object) {
		if (mainObject.group !== undefined && mainObject.group instanceof Array) {

			this.groupObject.group = braid.replace(mainObject.group[0], " @w@");
			this.groupObject.key = braid.replace(mainObject.group[1], " @w@");

		}
		if (mainObject.user !== undefined && mainObject.user instanceof Array) {

			this.userObject.user = braid.replace(mainObject.user[0], ' @w@');
			this.userObject.pass = braid.replace(mainObject.user[1], ' @w@');
		}

		if (mainObject.url !== undefined) {
			this.url = mainObject.url;
		}
	} else {
		console.warn("mainObject should be an Object.");
	}


	this.plugin = {};
	this.plugin.requests = 0;
	this.plugin.requestTimes = []; //(in milliseconds)
	this.plugin.currentRequestTime = 0;

	//returns info on current Cenny instance
	this.plugin.cInfo = function () {

		//generate average request times
		var averageRT = 0;
		for (var i = 0; i < that.plugin.requestTimes.length; i++) {
			averageRT += that.plugin.requestTimes[i];
		}
		averageRT = averageRT / that.plugin.requestTimes.length;


		return { group: [that.groupObject.group, that.groupObject.key], user: that.user.info(), requests: that.plugin.requests, requestTime: averageRT };
=======
	//****
	this.user = {};
	this.user.clientID = Math.floor(Math.random() * 32973);

	this.group = {};
	this.secure = {};
	//****

	this.groupObject = {};

	//group definitions
	this.groupObject.group = "default";
	this.groupObject.key = "default";

	this.userObject = {};

	//user definitions
	this.userObject.user = "default";
	this.userObject.pass = "default";

	var temp_user_info = localStorage.getItem('cennyUser');
	temp_user_info = JSON.parse(temp_user_info);
	if (temp_user_info !== "null" && temp_user_info !== null) {
		if (typeof temp_user_info === "object") {
			this.userObject.user = temp_user_info.user;
			this.userObject.pass = temp_user_info.pass;
		}
	}

	//scan for new tokens (auth info) on this computer
	this.user.scanForToken = function () { //look for token in another window
		var lastTokenMeta = [];
		setInterval(function () {
			var token = localStorage.getItem('cennyToken');
			token = JSON.parse(token);
			if (token !== null && token !== undefined && token !== []) {
				if (token[2] === that.userObject.user) {
					if (lastTokenMeta !== token[0]) {
						if (token[1] !== that.user.clientID) { //if this client did not set token
							if (that.userObject.pass !== token[0]) {
								that.userObject.pass = token[0];
								lastTokenMeta = token[0];
							}

						}
					}
				}
			}
		}, 500);
	};
	this.user.scanForToken();


	//url to cenny.php (until set)
	this.url = document.URL + "cenny.php";

	//SETUP MAIN OBJECT
	if (mainObject instanceof Object) {
		if (mainObject.group !== undefined && mainObject.group instanceof Array) {

			this.groupObject.group = braid.replace(mainObject.group[0], " @w@");
			this.groupObject.key = braid.replace(mainObject.group[1], " @w@");

		}
		if (mainObject.user !== undefined && mainObject.user instanceof Array) {

			this.userObject.user = braid.replace(mainObject.user[0], ' @w@');
			this.userObject.pass = braid.replace(mainObject.user[1], ' @w@');
		}

		if (mainObject.url !== undefined) {
			this.url = mainObject.url;
		}
	} else {
		console.warn("mainObject should be an Object.");
	}


	this.plugin = {};
	this.plugin.requests = 0;
	this.plugin.requestTimes = []; //(in milliseconds)
	this.plugin.currentRequestTime = 0;

	//returns info on current Cenny instance
	this.plugin.cInfo = function () {

		//generate average request times
		var averageRT = 0;
		for (var i = 0; i < that.plugin.requestTimes.length; i++) {
			averageRT += that.plugin.requestTimes[i];
		}
		averageRT = averageRT / that.plugin.requestTimes.length;


		return {
			group: [that.groupObject.group, that.groupObject.key],
			user: that.user.info(),
			requests: that.plugin.requests,
			requestTime: averageRT
		};
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
	};

	//tests user's connection speed
	this.plugin.testConnectionSpeed = function (callback, wantedMS) {
		that.plugin.requestTimes = [];
		if (navigator.onLine === true) {
			that.get(function (d) {
				that.get(function (d) {
					that.get(function (d) {
						that.get(function (d) {
							that.get(function (d) {
								that.get(function (d) {
									that.get(function (d) {
										var cInfoData = that.plugin.cInfo();
										if (cInfoData.requestTime + 300 >= wantedMS && cInfoData.requestTime - 300 <= wantedMS) {
											callback(true);
										} else if (cInfoData.requestTime < wantedMS) {
											callback(true);
										} else {
											callback(false);
										}
									});
								});
							});
						});
					});
				});
			});
		}

	};

	this.plugin.startRequestTimer = function () {
		that.plugin.requestTimer = setInterval(function () {
			that.plugin.currentRequestTime++;
		}, 1);

	};
	this.plugin.stopRequestTimer = function () {
		clearInterval(that.plugin.requestTimer);
		that.plugin.requestTimes.push(that.plugin.currentRequestTime);
		that.plugin.currentRequestTime = 0;
	};


	//SERVER REQUEST METHOD

	this.aj = function (sendData, action, callback, optionalUserInfo) {
		if (callback === undefined || typeof callback !== "function") {
			callback = function (d) {
				console.info(d);
			};
		}
		if (navigator.onLine === true) {
			//check username before sending request

			var shouldContinue = true;

			if (optionalUserInfo !== undefined) {
				if (optionalUserInfo[0].length > 2 && optionalUserInfo[0].length < 25) {
					if (/^\w+$/.test(optionalUserInfo[0])) {
						if (optionalUserInfo[1].length > 4) {

						} else {
							callback({
<<<<<<< HEAD
								cenError: 'password invalid length'
=======
								error: 'password invalid length'
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
							});
							shouldContinue = false;
						}
					} else {
						callback({
<<<<<<< HEAD
							cenError: 'username contains invalid chars'
=======
							error: 'username contains invalid chars'
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
						});
						shouldContinue = false;
					}
				} else {
					callback({
<<<<<<< HEAD
						cenError: 'username length invalid'
=======
						error: 'username length invalid'
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
					});
					shouldContinue = false;
				}
			}
<<<<<<< HEAD
			
=======
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
			if (shouldContinue === true) {
				var xmlhttp;
				xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function () {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var data = xmlhttp.responseText;
						if (callback !== undefined && data !== "") {

							callback(Mg.convertData(data));

							//plugin info
							that.plugin.stopRequestTimer();
						}
					}

				};
				xmlhttp.open("POST", that.url, true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


				if (optionalUserInfo !== undefined && optionalUserInfo instanceof Array) { //used for **.create();**
					var userX = optionalUserInfo[0];
					var passX = optionalUserInfo[1];


					xmlhttp.send("action=" + action + sendData + "&groupName=" + that.groupObject.group + "&groupKey=" + that.groupObject.key + "&userName=" + userX + "&userPass=" + passX);
<<<<<<< HEAD
					
					that.stats.obj.log.push([action,sendData,that.stats.getTime()]);
					if (that.stats.obj[action] === undefined) {
						that.stats.obj[action] = {};
						that.stats.obj[action].count = 0;
						that.stats.obj[action].log = [];
					}
					that.stats.obj[action].count++;
					that.stats.obj[action].log.push([sendData,that.stats.getTime()]);
					that.stats.obj.totalRequests++;
=======
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be

				} else { //otherwise, use global user info

					if (that.userObject.user.length > 2 && that.userObject.user.length < 25) {
						if (/^\w+$/.test(that.userObject.user)) {
							if (that.userObject.pass.length > 4) {

								xmlhttp.send("action=" + action + sendData + "&groupName=" + that.groupObject.group + "&groupKey=" + that.groupObject.key + "&userName=" + that.userObject.user + "&userPass=" + that.userObject.pass);
<<<<<<< HEAD
								
								that.stats.obj.log.push([action,sendData,that.stats.getTime()]);
								if (that.stats.obj[action] === undefined) {
									that.stats.obj[action] = {};
									that.stats.obj[action].count = 0;
									that.stats.obj[action].log = [];
								}
								that.stats.obj[action].count++;
								that.stats.obj[action].log.push([sendData,that.stats.getTime()]);
								that.stats.obj.totalRequests++;
								

							} else {
								callback({
									cenError: 'pass length insufficient.'
=======

							} else {
								callback({
									error: 'pass length insufficient.'
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
								});
							}
						} else {
							callback({
<<<<<<< HEAD
								cenError: 'username contains invalid characters.'
=======
								error: 'username contains invalid characters.'
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
							});
						}
					} else {
						callback({
<<<<<<< HEAD
							cenError: 'username length unsuitable.'
=======
							error: 'username length unsuitable.'
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
						});
					}
				}


				//plugin info
				that.plugin.startRequestTimer();
				that.plugin.requests++; //add to requests
				//end plugin info

			} //end should continue
		} else { //is offline
<<<<<<< HEAD
			that.log.push([action,sendData]);
=======

>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
		}

	};

	this.get = function (callback, user) { //if user variable is array, it will be treated as property list, if it's a string, it will be treated as a username.
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			if (user === undefined || user === '') {
				that.aj("&getProperties=all", "get", callback);
			} else if (user instanceof Array) {
				var propertyString = "";
				for (var i = 0; i < user.length; i++) {
					if (user[i + 1] !== undefined) { //"user@n@" <-- (no user next, but still "@n@")
						propertyString += user[i] + "@n@";
					} else {
						propertyString += user[i];
					}
				}
				that.aj("&getProperties=" + propertyString, "get", callback);
			} else {
				that.aj("&otherUser=" + braid.replace(user, " @w@"), "getOther", callback);
			}
		} else if (isOnline === false) { //user offline
			var offlineObject = that.offline.getOfflineObject();
			if (user === undefined || user === '') {
				callback(offlineObject);
			} else if (user instanceof Array) { //specific properties
				var finalObject = {};
				for (var i = 0; i < user.length; i++) {
					for (key in offlineObject) {
						if (user[i] === key) {
							finalObject[key] = offlineObject[key];
						}
					}
				}
				callback(finalObject);
			} else { //inform that getting data from another user is not possible when offline
				callback({
					error: 'getting properties from user while offline is not possible'
				});
			}
		}
	};

	this.set = function (object, user, callback) {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			if (object instanceof Object) {
				object['cennyJS'] = true;
				if (user === undefined || user === '') {
					that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "set", callback);
				} else if (typeof user === "function") { //for backwards compat
					that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "set", user);
				} else {
					that.aj("&otherUser=" + braid.replace(user, " @w@") + "&data=" + encodeURIComponent(JSON.stringify(object)), "setOther", callback);
				}
			}

		} else if (isOnline === false) { //user offline
			if (object instanceof Object) {

				object['cennyJS'] = true;

				if (user === undefined || user === '') {
					that.offline.set(object);
				} else if (typeof user === "function") { //for backwards compat
					that.offline.set(object);
					user("updated (offline)");
				}
			}
		}


		setTimeout(function () {
			that.offline.updateOfflineObject();
		}, 2000);

	};

	this.update = function (object, user, callback) {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			object['cennyJS'] = true;
			if (user === undefined || user === "" || typeof user === "function") {
				that.aj("&data=" + encodeURIComponent(JSON.stringify(object)), "update", user);
			} else {
				that.aj("&otherUser=" + braid.replace(user, " @w@") + "&data=" + encodeURIComponent(JSON.stringify(object)), "updateOther", callback);
			}
		} else if (isOnline === false) { //offline
			object['cennyJS'] = true;
			if (user === undefined || user === "" || typeof user === "function") {
				that.offline.update(object);
			}
		}
		setTimeout(function () {
			that.offline.updateOfflineObject();
		}, 2000);
	};


	//USER

<<<<<<< HEAD
	this.user.remove = function (password, callback) {
		if (password !== undefined) {
			that.aj("&data=" + encodeURIComponent(password), "removeUser", function(d) {
				if (d.cenError !== "user pass incorrect") {
					that.userObject.user = "default";
					that.userObject.pass = "default";
					that.user.forget();
				}
				callback(d);
			});
			
		} else {
			console.error("must provide user password");	
		}
=======
	this.user.remove = function (callback) {
		that.aj("", "removeUser", callback);
		that.userObject.user = "default";
		that.userObject.pass = "default";
		that.user.forget();
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
	};

	this.user.permissions = function (permObj, callback) {
		var read = permObj.read;
		var write = permObj.write;
		var emailRead = permObj.emailRead;
		var offlinePerm = permObj.allowOffline;
		var readString = "";
		var writeString = "";
		var emailReadString = "";

		//read
		if (read instanceof Array) {
			for (var i = 0; i < read.length; i++) {
				if (read[i + 1] !== undefined) {
					readString += read[i] + "@n@";
				} else {
					readString += read[i];
				}
			}
		} else if (read === true) {
			readString = "allowAll";
		} else if (read === false) {
			readString = "blockAll";
		} else if (read === undefined) {
			readString = "DoNotEdit";
		} else {
			readString = "blockAll";
		}

		//write
		if (write instanceof Array) {
			for (var i = 0; i < write.length; i++) {
				if (write[i + 1] !== undefined) {
					writeString += write[i] + "@n@";
				} else {
					writeString += write[i];
				}
			}
		} else if (write === true) {
			writeString = "allowAll";
		} else if (write === false) {
			writeString = "blockAll";
		} else if (write === undefined) {
			writeString = "DoNotEdit";
		} else {
			writeString = "blockAll";
		}

		//emailRead
		if (emailRead instanceof Array) {
			for (var i = 0; i < emailRead.length; i++) {
				if (emailRead[i + 1] !== undefined) {
					emailReadString += emailRead[i] + "@n@";
				} else {
					emailReadString += emailRead[i];
				}
			}
		} else if (emailRead === true) {
			emailReadString = "allowAll";
		} else if (emailRead === false) {
			emailReadString = "blockAll";
		} else if (emailRead === undefined) {
			emailReadString = "DoNotEdit";
		} else {
			emailReadString = "allowAll";
		}

		if (offlinePerm === true) {
			offlinePerm = "allowAll";
		} else if (offlinePerm === false) {
			offlinePerm = "blockAll";
		} else if (offlinePerm === undefined) {
			offlinePerm = "DoNotEdit";
		} else {
			offlinePerm = "allowAll";
		}

		var propertyObj = {};
		for (key in permObj) {

			if (key !== "read" && key !== "write" && key !== "emailRead" && key !== "allowOffline") {
				var propertyString = "";
				if (permObj[key] instanceof Array) {
					for (var i = 0; i < permObj[key].length; i++) {
						if (permObj[key][i + 1] !== undefined) {
							propertyString += permObj[key][i] + "@n@";
						} else {
							propertyString += permObj[key][i];
						}
					}

				} else if (permObj[key] === true) {
					propertyString = "allowAll";
				} else if (permObj[key] === false) {
					propertyString = "blockAll";
				} else {
					propertyString = "blockAll";
				}
				propertyObj[key] = propertyString;
			}
		}
		if (propertyObj === {}) {
			propertyObj = "DoNotEdit";
		}

		that.aj('&write=' + writeString + '&read=' + readString + '&offlinePerm=' + offlinePerm + '&emailRead=' + emailReadString + '&propertyObj=' + JSON.stringify(propertyObj), "permissions", callback);
	};


	this.user.remember = function () {
		localStorage.setItem('cennyUser', JSON.stringify({
			user: that.userObject.user,
			pass: that.userObject.pass
		}));
	};

	this.user.forget = function () {
		localStorage.setItem('cennyUser', "null");
	};

	this.user.password = function (newPassword, callback) {
<<<<<<< HEAD
		if (Mg.validate.password(newPassword).isValid === true) {
			that.aj("&newPassword=" + newPassword, "newPass", callback);
		} else {
			callback(Mg.validate.password(newPassword));
		}
	};

	this.user.signin = function (mainObject, callback) {
		if (callback === undefined) {
			callback = function(d) {
				console.log(d);
			};
		}
=======
		that.aj("&newPassword=" + braid.replace(newPassword, ' @w@'), "newPass", callback);
	};

	this.user.signin = function (mainObject, callback) {
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
		if (mainObject instanceof Object) {
			if (mainObject['user'] !== undefined && mainObject['user'] instanceof Array) {

				//once signed in, check if should update backend with offline data
				that.offline.syncWithBackend();

				var userX = braid.replace(mainObject['user'][0], ' @w@');
				var passX = braid.replace(mainObject['user'][1], ' @w@');
				if (typeof callback === "function") {
					that.aj("", "generateAuthToken", function (d) {
						if (d.cenError !== undefined) {
							callback(d);
						} else {
							//set local user information
							that.userObject.user = braid.replace(mainObject['user'][0], ' @w@');
							that.userObject.pass = braid.replace(mainObject['user'][1], ' @w@');

							that.userObject.pass = d; //set pass to token
							localStorage.setItem('cennyToken', JSON.stringify([d, that.user.clientID, that.userObject.user])); //set token in localStorage

							that.user.remember();

<<<<<<< HEAD
							callback(true); //call provided callback
						}
					}, [userX, passX]);
					
				} 
=======
							callback(d); //call provided callback
						}
					}, [userX, passX]);

				} else {
					that.aj("", "generateAuthToken", function (d) {
						if (d.cenError !== undefined) {
							callback(d);
						} else {
							//set local user information
							that.userObject.user = braid.replace(mainObject['user'][0], ' @w@');
							that.userObject.pass = braid.replace(mainObject['user'][1], ' @w@');

							that.userObject.pass = d; //set pass to token
							localStorage.setItem('cennyToken', JSON.stringify([d, that.user.clientID, that.userObject.user])); //set token in localStorage

							that.user.remember();
						}
					}, [userX, passX]);
				}
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be

			}
		} else {
			console.warn("mainObject should be an Object.");
		}

	};

	this.user.signout = function () { //signs into default user.
		that.userObject.pass = "default";
		that.userObject.user = "default";
		that.aj("", "generateAuthToken", function (d) {});
		that.user.forget();
	};

<<<<<<< HEAD
	this.user.exists = function (callback, username) {
=======
	this.user.exists = function (username, callback) {
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
		that.aj("&data=" + username, "userExists", function (d) {
			if (d === true) {
				callback(true);
			} else {
				callback(false);
			}

		});
	};

	this.user.create = function (mainObject, callback) {
		if (mainObject instanceof Object) {
			if (mainObject['user'] !== undefined && mainObject['user'] instanceof Array) {
				var usrValid = Mg.validate.username(mainObject['user'][0]);
				var passValid = Mg.validate.password(mainObject['user'][1]);
				if (usrValid.isValid === true) {
					if (passValid.isValid === true) {
						var userX = braid.replace(mainObject['user'][0], ' @w@');
						var passX = braid.replace(mainObject['user'][1], ' @w@');
<<<<<<< HEAD
						that.aj("&data=" + JSON.stringify({username: userX, password:encodeURIComponent(passX)}), "createuser", callback);
=======

						var objX = {};
						objX.username = userX;
						objX.password = encodeURIComponent(passX);
						objX = JSON.stringify(objX);
						that.aj("&data=" + objX, "createuser", callback);
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
					} else {
						callback(passValid);
					}
				} else {
					callback(usrValid);
				}
			}
		} else {
			console.warn("mainObject should be an Object.");
		}
	}

	this.user.info = function () {
		return [that.userObject.user, that.userObject.pass];
	};


	this.user.setEmail = function (email, callback) {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (filter.test(email) === true) {
			that.aj("&data=" + email, "setEmail", callback);
		} else {
			if (callback !== undefined) {
				callback("Email invalid.");
			} else {
				console.error("email invalid.")
			};
		}

	};

	this.user.getEmail = function (callback, username) {
		if (username === undefined) {
			var username = that.user.info();
			username = username[0];
			username = braid.replace(username, " @w@");
			that.aj("&otherUser=" + username, "getEmailOther", callback);
		} else {
			username = braid.replace(username, " @w@");
			that.aj("&otherUser=" + username, "getEmailOther", callback);
		}
	};


	this.user.metadata = function (callback, user) {
		if (user !== undefined) {
			that.get(function (d) {
				if (d.cenError === undefined) {
					var metaOBJ = {};
					for (key in d) {
						var str = d[key];
						if (typeof str === "string") {
							knwl.init(str);
							var x = knwl.get();
							metaOBJ[key] = x;
						}
					}
					callback(metaOBJ);
				} else {
					callback(d.cenError);
				}
			}, user);
		} else {
			that.get(function (d) {
				if (d.cenError === undefined) {
					var metaOBJ = {};
					for (key in d) {
						var str = d[key];
						if (typeof str === "string") {
							knwl.init(str);
							var x = knwl.get();
							metaOBJ[key] = x;
						}
					}
					callback(metaOBJ);
				} else {
					callback(d.cenError);
				}
			});
		}
	};


	//END USER



	//START OFFLINE - - - - - - - -

	this.offline = {};
	this.offline.update = function (object) {
		var offlineQueueObject = localStorage.getItem('cennyOfflineUpdate');
		if (offlineQueueObject === undefined || offlineQueueObject === null) {
			offlineQueueObject = {};
		} else {
			offlineQueueObject = JSON.parse(offlineQueueObject);
		}

		for (key in object) {
			if (key === "DELETE") {
				var offlineObject = JSON.parse(localStorage.getItem('cennyOffline'));
				for (var i = 0; i < object[key].length; i++) {
					delete offlineQueueObject[object[key][i]];
					delete offlineObject[object[key][i]];
				}
				localStorage.setItem('cennyOffline', JSON.stringify(offlineObject));
			} else {
				offlineQueueObject[key] = object[key];
			}
		}

		offlineQueueObject = JSON.stringify(offlineQueueObject);
		localStorage.setItem('cennyOfflineUpdate', offlineQueueObject);

		that.offline.setDataUsername();

	};

	this.offline.setDataUsername = function () { //so that data isn't updated in the wrong user
		localStorage.setItem('cennyOfflineUsername', that.userObject.user);
	};

	this.offline.set = function (object) {
		object = JSON.stringify(object);
		localStorage.setItem('cennyOffline', object);
		localStorage.setItem('cennyOfflineUpdate', object);

		that.offline.setDataUsername();

	};

	this.offline.syncWithBackend = function () {
		that.aj("", "getOfflinePerm", function (d) {
			if (d !== "blockAll") {
				var isOnline = navigator.onLine;
				if (isOnline === true) {
					var offlineObject = localStorage.getItem('cennyOfflineUpdate');
					var dataUsername = localStorage.getItem('cennyOfflineUsername'); //username that set data
					if (offlineObject === undefined || offlineObject === null) {
						offlineObject = {};
					} else {
						offlineObject = JSON.parse(offlineObject);
					}
					if (dataUsername === that.userObject.user) {
						that.update(offlineObject);
						localStorage.setItem('cennyOfflineUpdate', JSON.stringify({})); //clear update queue
					}
				}
			} else {
				localStorage.setItem('cennyOfflineUpdate', JSON.stringify({})); //clear update queue
			}

		});
	};

	this.offline.getOfflineObject = function () { //used for get / modified
		var offlineObjectUpdate = localStorage.getItem('cennyOfflineUpdate');
		var offlineObject = localStorage.getItem('cennyOffline');
		if (offlineObject === undefined || offlineObject === null) {
			offlineObject = {};
		} else {
			offlineObject = JSON.parse(offlineObject);
		}
		if (offlineObjectUpdate === undefined || offlineObjectUpdate === null) {
			offlineObjectUpdate = {};
		} else {
			offlineObjectUpdate = JSON.parse(offlineObjectUpdate);
		}

		var finalObject = {};

		for (key in offlineObject) {
			finalObject[key] = offlineObject[key];
		}
		for (key in offlineObjectUpdate) {
			finalObject[key] = offlineObjectUpdate[key];
		}

		return finalObject;
	};

	//check if should sync with backend
	setTimeout(function () {
		var updateData = JSON.parse(localStorage.getItem('cennyOfflineUpdate'));
		if (updateData !== {}) {
			var shouldSync = true;
			var x = localStorage.getItem('lastOffline');
			if (x !== null) {
				if (x === "false") {
					shouldSync = false;
				}
			} else {
				shouldSync = false;
			}
			if (shouldSync === true) {
				localStorage.setItem("lastOffline", "false");
				that.offline.syncWithBackend();
			}
		}
	}, 100);

	this.offline.lastState = navigator.onLine;
	setInterval(function () {
		if (navigator.onLine !== that.offline.lastState) {
			if (navigator.onLine === true) {
				that.offline.syncWithBackend();
				localStorage.setItem('lastOffline', "false");
			} else {
				localStorage.setItem('lastOffline', "true");
			}
			that.offline.lastState = navigator.onLine;
		}

	}, 300);

	this.offline.updateOfflineObject = function () {
		var isOnline = navigator.onLine;
		if (isOnline === true) {
			that.get(function (d) {
				var offlineObject = d;
				localStorage.setItem('cennyOffline', JSON.stringify(offlineObject));
			});
		} else {
			//user offline
		}
<<<<<<< HEAD
	}
	
	this.offline.updateOfflineInterval = setInterval(function () {
		that.offline.updateOfflineObject();
	}, 30500);
	
=======
	};

	this.offline.updateOfflineInterval = setInterval(function () {
		that.offline.updateOfflineObject();
	}, 30500); //updates offline object every 30.5 seconds

>>>>>>> 932edc459d685aded53c1b84a268053b59f506be
	//END OFFLINE - - - - - - - -

	function watchBackendProperty(callback, pArray) {
		var lastData = "";
		setInterval(function () {
			that.get(function (d) {

				var output = {};
				if (pArray !== undefined) {
					for (var i = 0; i < pArray.length; i++) {
						output[pArray[i]] = d[pArray[i]];
					}
				} else {
					output = d;
				}

				var vexput = JSON.stringify(output); //for comparing.

				if (vexput !== lastData) {
					callback(output);
					lastData = JSON.stringify(output);
				}
			}, pArray);
		}, 1500);
	}


<<<<<<< HEAD

	this.modified = function (callback, pArray) {
		var x = new watchBackendProperty(callback, pArray);
	};
=======

	this.modified = function (callback, pArray) {
		var x = new watchBackendProperty(callback, pArray);
	};


	var that = this;
>>>>>>> 932edc459d685aded53c1b84a268053b59f506be


	var that = this;

};
