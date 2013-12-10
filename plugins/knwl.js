//Cenny.js plugin version of Knwl.js
//currently under early development

//Documentation:
//Include this script AFTER including cenny.js

//1. Create a new instance of the Knwl object and set its first parameter to your Cenny instance (e.g. var xCenny = new Cenny(...); var y = new Knwl(xCenny);

//2. Initiate Knwl on text, e.g. y.init('this is text, it could be a lot, or a little. It could be a user message, a blog post, or whatever.');

//Dates, email addresses, times, links, and phone numbers will then be stored in your Cenny under the property 'knwlData'

//This object will be updated whenever .init() is called on text.
//
//
//@LoadFive - - - - GITHUB REPO FOR KNWL.JS AVAILABLE AT HTTP://LOADFIVE.COM

function Knwl(cennyInstance) {
    
    this.text = {};
    this.text.data = {};
    
    this.addToObj = function(data,name) {
        that.text.data[name] = data;
    };
    
    
    
    this.get = function(label) {
        if (label !== undefined) {
            label = label.toLowerCase();
            if (label === "emotion") {
                return that.text.data.emotions;
            } else if (label === "phones") {
                return that.text.data.phones;
            } else if (label === "dates") {
                return that.text.data.dates;
            } else if (label === "times") {
                return that.text.data.times;
            } else if (label === "links") {
                return that.text.data.links;
            } else if (label === "readingtime") {
                return that.text.data.readingTime;
            } else if (label === "emails") {
                return that.text.data.emails;
            } else if (label === "spam") {
                return that.text.data.spam;
            } else {
                alert("KNWL ERROR: Data type not correct, correct types: 'emotion','phones','dates','times','links','emails'");  
            }
        } else {
            alert("KNWL ERROR: Data type not correct, correct types: 'emotion','phones','dates','times','links','emails'"); 
        }
        
    };
    
    //****************************************************************************************************************************************
    //***************************************************READING TIME*************************************************************************
    //****************************************************************************************************************************************
    
    this.text.readingTime = function(wordCount) { //returns MINUTES
        
        var secounds = wordCount * 0.312;
        return secounds / 60;
    };
    
    //****************************************************************************************************************************************
    //***************************************************DATES*****************************************************************************
    //****************************************************************************************************************************************
    
    this.date = {};
    this.date.days = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd',
                    '24th','25th','26th','27th','28th','29th','30th','31st'];
    this.date.months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    this.date.monthAbbrs = ['jan','feb','mar','apr','may','june','july','aug','sept','oct','nov','dec'];
    this.date.holidays = [['thanksgiving'],['christmas'],['new','years'],['july','4th']];
    this.date.holidaysD = [[28,11],[25,12],[1,1],[4,7]];
    this.date.dateObj = new Date();
    
    //used with .findDates()
    this.date.getDay = function(word) {
        if (!isNaN(word)) {
            if (word > 0 && word < 32) {
                return parseInt(word);
            }
        } else {
          for (var i = 0; i < that.date.days.length; i++) {
            if (that.date.days[i] === word) {   
                return i + 1;
            }
          }
        }
    };
    
    //used with .findDates()
    this.date.getMonth = function(word,type) {
        if (!isNaN(word) && type === 'mdy') {
            return parseInt(word);
        } else {
          for (var i = 0; i < that.date.months.length; i++) {
            if (that.date.months[i] === word) {   
                return i + 1;
            }
          }
            for (var i = 0; i < that.date.monthAbbrs.length; i++) {
                if (that.date.monthAbbrs[i] === word) {   
                    return i + 1;
                }
            }
        }
    };
    
    this.date.findDates = function(words,wordsWithPunc) { //returns "july 16th 1999" as "[7,16,1999, "preview"]"
        var dates = [];
        
        for (var i = 0; i < words.length; i++) {//cleanup
            words[i] = words[i].split(/[.,!?]+/);
            words[i] = words[i][0];   
        }
        
        //for dates like "july 16th 1999" one
        var date = [];
        for (var i = 0; i < words.length; i++) {
            
            var month = that.date.getMonth(words[i]);
            if (month !== undefined) {
                var day = that.date.getDay(words[i + 1]);
                if (day !== undefined) {
                    if (day > 0 && day < 32) {
                        if (!isNaN(words[i + 2]) && words[i + 2] !== "") {
                            var year = parseInt(words[i + 2]);
                            if (year > 32 && year < 10000) {
                                date = [month,day,year,that.preview(i,words)];
                            }
                        } else {
                            date = [month,day,that.date.dateObj.getFullYear(),that.preview(i,words)];
                        }
                    }
                    dates.push(date);
                }
            }
            
        }
        
        //for dates like "7/16/1999" two
        var date = [];
        for (var i = 0; i < words.length; i++) {
            var word = words[i].replace("(","");//remove parenth--- if they are present
            var word = word.replace(")","");//remove parenth--- if they are present
            var testDate = word.split("/");
            if (testDate.length === 3) {
                var isAllNums = 0;
                for (var z = 0; z < testDate.length; z++) {
                    if (!isNaN(testDate[z]) && testDate[z] !== "") {
                        isAllNums++;   
                    }
                }
                if (isAllNums === 3) {
                
                    var month = that.date.getMonth(testDate[0],'mdy');
                    var day = that.date.getDay(testDate[1]);
                    var year = parseInt(testDate[2]);
                    date = [month,day,year,that.preview(i,words)];
                    dates.push(date);
                }
            }
            
        }
        
        //for dates like "24th of december" three
        var date = [];
        for (var i = 0; i < words.length; i++) {
            if (words[i + 1] === "of") {
                if (words[i + 2] !== undefined) {
                var day = that.date.getDay(words[i]);
                
                var month = that.date.getMonth(words[i + 2]); 
                var year = that.date.dateObj.getFullYear();
                if (month !== undefined && day !== undefined) {//make sure month and day defined
                if (words[i + 3] !== undefined) {//words[i + 3] === years
                    if (!isNaN(words[i + 3])) {
                        if (words[i + 3] > 32 && words[i + 3] < 10000) {
                            year = words[i + 3];
                        }
                    } else if (words[i + 3] === "on" || words[i + 3] === "in") {
                        if (words[i + 4] !== undefined) {
                        if (!isNaN(words[i + 4])) {
                            if (words[i + 4] > 32 && words[i + 4] < 10000) {
                                year = words[i + 4];
                            } 
                        }
                        }
                    } else {
                        for (var v = i; v > 0; v--) {
                            
                            if (!isNaN(words[v])) {
                                if (words[v] > 32 && words[v] < 10000) {
                                    year = parseInt(words[v]);
                                    break;
                                }
                            } else if (wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "." || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "?" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "!" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === ";") {
                                break;   
                            }
                        }   
                    }
                } else {
                    for (var v = i; v > 0; v--) {
                        
                        if (!isNaN(words[v])) {
                            if (words[v] > 32 && words[v] < 10000) {
                                year = parseInt(words[v]);
                                break;
                            }
                        } else if (wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "." || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "?" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "!" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === ";") {
                            break;   
                        }
                    }
                }
                date = [month,day,year,that.preview(i,words)];
                dates.push(date);
                }
                }//finish check if month and day defined
            }
        }//end for
        
        
        
        
        var date = [];
        for (var i = 0; i < words.length; i++) {//for dates like "thanksgiving", "chirstmas", or "new years"
            for (var e = 0; e < that.date.holidays.length; e++) {
                var curHol = that.date.holidays[e];
                var pos = i;
                if (words[pos] === curHol[0]) {
                for (var x = 0; x < curHol.length; x++) {
                if (words[pos] === curHol[x]) {
                    if (x === curHol.length - 1) {
                        if (that.date.dateObj.getMonth() <= that.date.holidaysD[e][1] + 1) {
                            date = [that.date.holidaysD[e][1],that.date.holidaysD[e][0],that.date.dateObj.getFullYear(),that.preview(i,words)];        
                        } else {
                            date = [that.date.holidaysD[e][1],that.date.holidaysD[e][0],that.date.dateObj.getFullYear() + 1,that.preview(i,words)]; 
                        }
                        
                        dates.push(date);
                    }
                }
                pos++;
                }
                }
                
            }
        }
        
        
        
        
        return dates;
        
    };
    
    //****************************************************************************************************************************************
    //***************************************************TIMES********************************************************************************
    //****************************************************************************************************************************************
    
    this.time = {};
    this.time.findTimes = function(words) {
        var times = [];
        
        var time = [];
        for (var i = 0; i < words.length; i++) {
            var testTime = words[i].split(":");
            if (testTime.length === 2) {
                if (!isNaN(testTime[0]) && !isNaN(testTime[1])) {
                    if (testTime[0] > 0 && testTime[0] < 13) {
                        if (testTime[1] > 0 && testTime[1] < 61) {
                            if (words[i + 1] === "pm") {
                                time = [testTime[0],testTime[1], "PM",that.preview(i,words)];
                                times.push(time);
                            } else if (words[i + 1] === "am") {
                                time = [testTime[0],testTime[1], "AM",that.preview(i,words)]; 
                                times.push(time);
                            } 
                        }
                    }
                }
            }
        
        }
        return times;
    };
    
    //****************************************************************************************************************************************
    //***************************************************EMOTIONS*****************************************************************************
    //****************************************************************************************************************************************
    this.emotion = {};
    
    this.emotion.negativeWords = ['terrible','horrible','evil','die','noob','dick','bitch','fucked','stupid','idiot','dumb','noob','shit','vain','n00b','dickhead','cocksucker','disgusting','slut'];
     this.emotion.negativeWordsB = ['fuck','shit','kill','rape','hate','hating'];
    this.emotion.positiveWords = ['happy','good','great','amazing','awesome','wonderful','brilliant','smart'];
    this.emotion.positiveWordsB = ['love','like','want',"<3",'kiss'];
    this.emotion.subjects = ["she's","you","him","her","it","this","he's","shes","hes","your","you're","ur","they're","their","theyre"];
    
    //these are negative phrases
    this.emotion.negComb = [['fuck','off'],['go','away'],['go','cry'],['go','and']];
    //that can be seperated by
    this.emotion.negCombSep = ['and','it','&'];
    
    //these are positive phrases
    this.emotion.posComb = [['thank','you'],['thanks','a','million'],['happy','birthday'],['happy','thanksgiving'],['merry','christmas'],['happy','holidays'],['good','day'],['oh','cool']];
    //that can be seperated by
    this.emotion.posCombSep = ['for','and','&'];
    
    this.emotion.findEmotions = function(words) {
        var negative = 0;
        var positive = 0;
        for (var i = 0; i < words.length; i++) {
            words[i] = words[i].split(/[.,!?]+/);
            words[i] = words[i][0];
            for (var e = 0; e < that.emotion.negativeWords.length; e++) {
                var negWord = that.emotion.negativeWords[e];
                if (words[i].search(negWord) !== -1) {//word [i] === negativeword
                        for (var z = 0; z < that.emotion.subjects.length; z++) {
                            if (words[i - 1] !== undefined) {
                            if (words[i - 1] === that.emotion.subjects[z]) {
                                negative++;   
                            }
                            }
                            if (words[i - 2] !== undefined) {
                            if (words[i - 2] === that.emotion.subjects[z]) {
                                negative++;   
                            }
                            }
                        }
                }
            }
        }
        for (var i = 0; i < words.length; i++) {
            for (var e = 0; e < that.emotion.negativeWordsB.length; e++) {
                var negWord = that.emotion.negativeWordsB[e];
                if (words[i].search(negWord) !== -1) {//word [i] === negativeword
                        for (var z = 0; z < that.emotion.subjects.length; z++) {
                            if (words[i + 1] !== undefined) {
                            if (words[i + 1] === that.emotion.subjects[z]) {
                                negative++;   
                            }
                            }
                            if (words[i + 2] !== undefined) {
                            if (words[i + 2] === that.emotion.subjects[z]) {
                                negative++;   
                            }
                            }
                        }
                }
            }
        }
        
        for (var i = 0; i < words.length; i++) {
            words[i] = words[i].split(/[.,!?]+/);
            words[i] = words[i][0];
            for (var e = 0; e < that.emotion.positiveWords.length; e++) {
                var posWord = that.emotion.positiveWords[e];
                if (words[i].search(posWord) !== -1) {//word [i] === negativeword
                        for (var z = 0; z < that.emotion.subjects.length; z++) {
                            if (words[i - 1] !== undefined) {
                            if (words[i - 1] === that.emotion.subjects[z]) {
                                positive++;   
                            }
                            }
                            if (words[i - 2] !== undefined) {
                            if (words[i - 2] === that.emotion.subjects[z]) {
                                positive++;   
                            }
                            }
                        }
                }
            }
        }
        
        for (var i = 0; i < words.length; i++) {
            for (var e = 0; e < that.emotion.positiveWordsB.length; e++) {
                var posWord = that.emotion.positiveWordsB[e];
                if (words[i].search(posWord) !== -1) {//word [i] === negativeword
                        for (var z = 0; z < that.emotion.subjects.length; z++) {
                            if (words[i + 1] !== undefined) {
                            if (words[i + 1] === that.emotion.subjects[z]) {
                                positive++;   
                            }
                            }
                            if (words[i + 2] !== undefined) {
                            if (words[i + 2] === that.emotion.subjects[z]) {
                                positive++;   
                            }
                            }
                        }
                }
            }
        }
        for (var i = 0; i < words.length; i++) {
            for (var x = 0; x < that.emotion.negComb.length; x++) {
                var trueCount = 0;
                var lengthX = that.emotion.negComb[x].length;
                var pos = 0;
                for (var z = i; z < (i + lengthX); z++) {
                    if (words[z] === that.emotion.negComb[x][pos]) {
                        trueCount++;
                    } else {
                        for (var c = 0; c < that.emotion.negCombSep.length;c++) {
                            if (words[z] === that.emotion.negCombSep[c]) {
                                if (words[z + 1] === that.emotion.negComb[x][pos]) {
                                    trueCount++;   
                                }
                            }
                        }
                    }
                    pos++;
                }
                
                if (trueCount === lengthX) {
                    negative++;   
                    
                }
            }
        }
        
        for (var i = 0; i < words.length; i++) {
            for (var x = 0; x < that.emotion.posComb.length; x++) {
                var trueCount = 0;
                var lengthX = that.emotion.posComb[x].length;
                var pos = 0;
                for (var z = i; z < (i + lengthX); z++) {
                    if (words[z] === that.emotion.posComb[x][pos]) {
                        trueCount++;
                    } else {
                        for (var c = 0; c < that.emotion.posCombSep.length;c++) {
                            if (words[z] === that.emotion.posCombSep[c]) {
                                if (words[z + 1] === that.emotion.posComb[x][pos]) {
                                    trueCount++;   
                                }
                            }
                        }
                    }
                    pos++;
                }
                
                if (trueCount === lengthX) {
                    positive++;   
                    
                }
            }
        }
        
        if (negative === positive) {
            return "neutral or unknown";   
        } else if (negative > positive) {
            return "negative";   
        } else {
            return "positive";   
        }
        
    };
    
    
    //FOR SNIPPETS OF TEXT****************************************************************************************************************
    this.preview = function(pos,words) {
        
        var stringX = "";
        var cpos = -10;
        for (var i = (pos - 6); i < (pos + 6); i++) {
            stringX += " " + words[i];
        }
        
        stringX = braid.replace(stringX, " undefined@w@@n@  @w@");
        stringX = stringX.slice(1,stringX.length);
        return stringX;
    };
    //***********************************************************************************************************************************
    
    
    //****************************************************************************************************************************************
    //***************************************************PHONE NUMS***************************************************************************
    //****************************************************************************************************************************************
    this.phone = {};
    this.phone.findPhones = function(words) {
        var phones = [];
        
        var regexp = /^\d{10}$/;
        for (var i = 0; i < words.length; i++) {
            words[i] = braid.replace(words[i], "-@w@");
            words[i] = words[i].replace("(","");
            words[i] = words[i].replace(")","");
            if (regexp.test(words[i])) {
                phones.push([words[i],that.preview(i,words)]);    
            } else if (words[i].length === 11) {
                var testPhone = words[i].slice(1,words[i].length);
                if (regexp.test(testPhone)) {
                    phones.push([words[i],that.preview(i,words)]);
                }
            }
            
        }
        return phones;
    };
    
    //****************************************************************************************************************************************
    //***************************************************SPAM CHECKER*************************************************************************
    //****************************************************************************************************************************************
    this.spam = {};
    this.spam.vowCount = function(str) {
        var matches = str.match(/[aeiou]/gi);
        var count = matches ? matches.length : 0;
        return count;
    };
    this.spam.conCount = function(str) {
        var matches = str.match(/[bcdfghjklmnpqrstvwxyz]/gi);
        var count = matches ? matches.length : 0;
        return count;
    };
    this.spam.specCount = function(str) {
        var matches = str.match(/[1234567890@#$%^&*();]/gi);
        var count = matches ? matches.length : 0;
        return count;
    };
    this.spam.isSpam = function(words) {
        var spam = false;
    	//average word length
    	var totalL = 0;
    	for (var i = 0; i < words.length; i++) {
    		totalL+=words[i].length;
    	}
        var avg = (totalL/words.length);
        if (avg + 15 >= 5.1 && avg - 15 <= 5.1) {} else {
            spam = true; 
        }
        
        var vowelCount = 0;
        var conCount = 0;
        var specCount = 0;
        
        for (var i = 0; i < words.length; i++) {
    		vowelCount += that.spam.vowCount(words[i]);
            conCount += that.spam.conCount(words[i]);
            specCount += that.spam.specCount(words[i]);
    	}
        if (vowelCount >= conCount) {
            spam = true; 
        } else if (specCount > vowelCount) {
            spam = true; 
        }
        
        var giveortake = conCount / 7;
        if (words.length > 3) {
        if (vowelCount + giveortake >= (conCount / 1.9) && vowelCount - giveortake <= (conCount / 1.9)) {} else {
            spam = true;   
        }
        } else if (words.length > 2) {
        if (vowelCount + giveortake >= (conCount / 1.4) && vowelCount - giveortake <= (conCount / 1.4)) {} else {
            spam = true;   
        }
        } else {
        giveortake = conCount / 3;
        if (vowelCount + giveortake >= (conCount) && vowelCount - giveortake <= (conCount)) {} else {
            spam = true;   
        }
        }
        var chars = [];
        for (var i = 0; i < words.length; i++) {
      		var word = words[i];
      		for (var e = 0; e < word.length; e++) {
      			var isThere = false;
      			for (var z = 0; z < chars.length; z++) {
      				if (chars[z] === word[e]) {
      					isThere = true;
      				}
      			}
      			
      			if (isThere === false) {
      				chars.push(word[e]);
      			}
      			
      		} 
      	
        }
        
        var uniquechars = chars.length;
        
        if (uniquechars + (words.length / 7) < (words.length)) {
        	spam = true;
        }
        var useablechars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        for (var i = 0; i < words.length; i++) {
        	var word = words[i];
        	word = word.split(/[.?! ]+/);
        	word = word[0];
        	var currentLoc = 0;
        	while(currentLoc < word.length - 2) {
        	for (var e = currentLoc + 1; e < word.length; e++) {
        		var isunuseable = true;
        		for (var a = 0; a < useablechars.length; a++) {
        		if (word[currentLoc] === useablechars[a]) {
        			isunuseable = false;
        		}
        		}
        		
        		if (isunuseable === false) {
        		if (word[e] === word[currentLoc]) {
        			if (word[e + 1] === word[currentLoc + 1]) {
        				if (word[e + 2] === word[currentLoc + 2]) {
        					spam = true;
        				}
        			}
        		}
        		} else {
        			break;
        		}
        	
        	}
        	currentLoc++;
        	}
        
        
        }
        
        
        return spam;
    
    };
    
    
    //****************************************************************************************************************************************
    //***************************************************LINKS********************************************************************************
    //****************************************************************************************************************************************
    
    this.link = {};
    
    
    this.link.findLinks = function(words) {
        var links = [];
        
        for (var i = 0; i < words.length; i++) {
            
            //clean up
            words[i] = words[i].replace("(","");
            words[i] = words[i].replace(")","");
            words[i] = words[i].replace("!","");
            words[i] = braid.replace(words[i],",@wa@");
            //end clean up
            
            var word = words[i];
            if (braid.search("http://",word,false,false) !== false) {
                links.push([word,that.preview(i,words)]);
            } else if (braid.search("https://",word,false,false) !== false) {
                links.push([word,that.preview(i,words)]);
            }
        }
        
        var finalArray = [];
        for (var i = 0; i < links.length; i++) {
            if (links[i][0][links[i][0].length - 1] === "." || links[i][0][links[i][0].length - 1] === "?") {
               finalArray.push( [ links[i][0].slice(0, (links[i][0].length - 1) ), links[i][1] ] );//removes . and ? 
            } else {
                finalArray.push(links[i]);
            }
        }
        
        return finalArray;
        
    };
    
    
    //****************************************************************************************************************************************
    //***************************************************EMAILS*******************************************************************************
    //****************************************************************************************************************************************

    
    
    this.email = {};
    this.email.findEmails = function(words) {
        var emails = [];
        
        for (var i = 0; i < words.length; i++) {
            
            //clean up
            words[i] = words[i].replace("(","");
            words[i] = words[i].replace(")","");
            words[i] = words[i].replace("!","");
            words[i] = braid.replace(words[i],",@wa@");
            //end clean up
            
            var word = words[i];
            var testEmail = word.split("@");
            if (testEmail.length === 2) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                if (word !== '' && re.test(word)){
                    var namespace = testEmail[1].split("."); //get ending (.com,.net,etc)
                    namespace = namespace[1];
                    if (namespace.length < 4) { //only add to emails if ending (.com,.net,etc) length is less than 4
                        
                        var matches = namespace.match(/\d+/g);//make sure ending does not contain a number
                        if (matches === null) {
                            emails.push([word,that.preview(i,words)]);
                        } 
                    }
                }
            }
        }
        
        return emails;
        
    };
    
    
    
    this.init = function(data) {
        //turn into array of words
        var lowercaseData = data.toLowerCase();
        
        that.text.wordCount = lowercaseData.split(/[ ]+/);
        that.text.wordCount = that.text.wordCount.length - 1;
        
        var linkWords = lowercaseData.split(/[ \n]+/);//for link finding and (third part of date)
        
        lowercaseData = lowercaseData.split(/[\n ]+/);
        
        
        for (var i = 0; i < lowercaseData.length; i++) {
            lowercaseData[i] = braid.replace(lowercaseData[i], " @w@@n@,@w@" + '@n@"@w@');
            lowercaseData[i] = lowercaseData[i].replace("?","");
        }
        var words = lowercaseData;
        
        
        //go
        
        var dates = that.date.findDates(words,linkWords);
        if (dates !== []) {
            that.addToObj(dates,"dates");   
        }
        
        var times = that.time.findTimes(words);
        if (times !== []) {
            that.addToObj(times,"times");   
        }
        
        var phones = that.phone.findPhones(words);
        if (phones !== []) {
            that.addToObj(phones,"phones");   
        }
        
        var emotions = that.emotion.findEmotions(words);
        if (emotions !== []) {
            that.addToObj(emotions,"emotions");   
        }
        
        var links = that.link.findLinks(linkWords);
        if (links !== []) {
            that.addToObj(links,"links");   
        }
        
        var emails = that.email.findEmails(linkWords);
        if (emails !== []) {
            that.addToObj(emails,"emails");   
        }
        
        var spam = that.spam.isSpam(words);
        that.addToObj(spam,"spam");   
        
        
        var readingTime = that.text.readingTime(that.text.wordCount);
        if (readingTime !== []) {
            that.addToObj(readingTime,"readingTime");   
        }
        
        cennyInstance.get(function(d){
        	
        	var knwlData = d['knwlData'];
        	if (knwlData === undefined || knwlData === {}){knwlData = {dates:[],phones:[],times:[],emails:[],links:[]};}
        	for (key in knwlData) {
        		if (key === "dates") {
        			var dates = that.get('dates');
        			for (var i = 0; i < dates.length; i++) {
        				knwlData[key].push(dates[i]);
        			}
        		} else if (key === "phones") {
        			var itemX = that.get('phones');
        			for (var i = 0; i < itemX.length; i++) {
        				knwlData[key].push(itemX[i]);
        			}
        		} else if (key === "times") {
        			var itemX = that.get('times');
        			for (var i = 0; i < itemX.length; i++) {
        				knwlData[key].push(itemX[i]);
        			}
        		} else if (key === "emails") {
        			var itemX = that.get('emails');
        			for (var i = 0; i < itemX.length; i++) {
        				knwlData[key].push(itemX[i]);
        			}
        		}else if (key === "links") {
        			var itemX = that.get('links');
        			for (var i = 0; i < itemX.length; i++) {
        				knwlData[key].push(itemX[i]);
        			}
        		}
			}
			console.log("UPDATING");
        	cennyInstance.update({knwlData:knwlData});
        	cennyInstance.get(function(d){console.log(d)});
        });
        
    };
    
    var that = this;
    
    
    
    
};