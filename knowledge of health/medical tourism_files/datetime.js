
function DateStamp() {
var d = new Array(
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
);

var m = new Array(
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
);

var today = new Date();
var day = today.getDate();
var year = today.getYear();
if (year < 2000) year += 1900; 
document.write(d[today.getDay()]+", "+m[today.getMonth()]+" "+day+", " + year);
}

function TimeStamp() {
	var Stamp = new Date();
	var Hours;
	var Mins;
	var Time;
	Hours = Stamp.getHours();
	Mins = Stamp.getMinutes();
	if (Hours >= 12) Time = " P.M.";
		else Time = " A.M.";
	if (Hours > 12) Hours -= 12;
	if (Hours == 0) Hours = 12;
	if (Mins < 10) Mins = "0" + Mins;
	document.write(Hours + ":" + Mins + Time);
}