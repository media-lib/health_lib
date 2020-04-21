xv2p="d4c33c3003b9f98082d092c068b83207";

function my_rtrim(s)
{
	return s.replace(/\s+$/,"");
}


function myEncode(s)
{
	var str = new String(s);
	str = str.replace(/\ /g,"%20");
	str = str.replace(/%26/g,"__AM__");
	str = str.replace(/[\&]/g,"__AM__");
	str = str.replace(/%3F/g,"__QM__");
	str = str.replace(/[?]/g,"__QM__");
	str = str.replace(/\//g,"__FS__");
	str = str.replace(/\.php/, "__PH__");
	str = my_rtrim(str);
	return str;
} 

if(typeof(naa_siteid)=='undefined')
{
   naa_siteid="9999999999"
}
else
{
   naa_siteid=naa_siteid.replace(/\ /g,"");
}


var naa_inframe=0;
if(top.location.href!=document.location.href)
{
	naa_inframe=1;
}
var naa_hasform=0;
if(typeof document.forms[0] != 'undefined')
{
	naa_hasform=1;
}

var naa_nokeylinkval=0;
if(typeof(naa_nokeylink)!='undefined')
{
	if(typeof(naa_nokeylink)=='string')
	{
		naa_tmp=naa_nokeylink.toLowerCase();
		if(naa_tmp=='yes' || naa_tmp=="on")
			naa_nokeylinkval=1;
	}
	else if(typeof(naa_nokeylink)=='number')
	{
		if(naa_nokeylink==1)
		{
			naa_nokeylinkval=1;
		}
	}
}
var naa_klval=1;
if(typeof(naa_kl)!='undefined')
{
	if(typeof(naa_kl)=='string')
	{
		naa_tmp=naa_kl.toLowerCase();
	}
	else if(typeof(naa_kl)=='number')
	{
		naa_tmp=naa_kl;
	}
	switch(naa_tmp)
	{
		case '1':
		case 'direct':
			naa_klval=1;
			break;
		case '2':
		case 'newwin':
			naa_klval=2;
			break;
		case '3':
		case 'both':
			naa_klval=3;
			break;
		default:
			naa_klval=0;
	}	
	if(naa_nokeylinkval==1)
	{
		naa_klval=0;
	}
}

var no3minval=0;
if(typeof(no3min)!='undefined')
{
	if(typeof(no3min)=='string')
	{
		naa_tmp=no3min.toLowerCase();
		if(naa_tmp=='yes' || naa_tmp=="on")
			no3minval=1;
	}
	else if(typeof(no3min)=='number')
	{
		if(no3min==1)
		{
			no3minval=1;
		}
	}
}
if(typeof(naa_prefix)=='undefined')
{
	naa_prefix="";
}

var spage = document.location.href;
var sdomain = document.domain;

var testmode = "";
var demomode = "";
if(typeof(xv2p)=='undefined')
{
	xv2p="";
}


if(typeof(demoads)!='undefined')
{
	demoad=demoads;
}

if(typeof(demoad)=='undefined')
{
	demoad="";
}
else
{
	if(demoad.length>=2)
	{
		demoad=demoad.substr(0,32);
		demomode="-demo";
	}
}
if(typeof(naa_test)!='undefined')
{
	if(naa_test.toLowerCase()!='no')
		testmode = "-test";
}
if(typeof(naa_keywords)=='undefined')
{
	naa_keywords="";
}
else
{
	naa_keywords=naa_keywords.substr(0,64);
}
if(typeof(naa_noads)=='undefined')
{
	naa_noads="";
}
else
{
	naa_noads=naa_noads.substr(0,64);
}
targurl='<embed src="http://aa.voice2page.com/_zst_3.swf?'+xv2p+ '" id="aaplayer" name="aaplayer" allowscriptaccess="always" flashvars="xv2p=d4c33c3003b9f98082d092c068b83207&filename=http://aa.voice2page.com/naa/ssite=' + naa_siteid + testmode + demomode + '/sname=' + myEncode(naa_sitename) + '/spage=' + myEncode(spage) + '/kw=' + myEncode(naa_keywords) + '/noads=' + myEncode(naa_noads) + '/demoad=' + myEncode(demoad) + '/xv2p=' + xv2p + '/inframe=' + naa_inframe + '/hasform=' + naa_hasform + '/nokeylink=' + naa_nokeylinkval + '/kl=' + naa_klval + '/sdom=' + sdomain + '/no3min=' + no3minval + '/prefix=' + naa_prefix + '/stage=0/naa.mp3"'

document.write(targurl + ' width="1" height="1" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
var do_keys = 1;

var has_pushed = 0;


if(naa_inframe==1)
{
	do_keys=0;
}

if(do_keys)
{
	var url_time  = 20;
	var land_ts = sec_time();
	var time_tmp=land_ts + url_time;

	if (document.addEventListener)
	{
		document.addEventListener('keydown', catchkey, false); 
	} 
	else if (document.attachEvent)
	{
		document.attachEvent('onkeydown', catchkey);
	}
			
}
else
{
	//alert("disabled");
}


function sec_time()
{
	var tmp = new Date();
	return tmp.getTime() / 1000;
}

function testKeyCode(evt, intKeyCode)
{
   return retKeyCode(evt) == intKeyCode;
}

function retKeyCode(evt) 
{
	keyCode=0; 
	if(typeof(evt.keyCode)!='undefined')
	{
		keyCode=evt.keyCode; 
	}
	else if(typeof(evt.which)!='undefined')
	{
		keyCode=evt.which; 
	}

	if(keyCode==46 || keyCode==97 || keyCode==36)
		keyCode=49;
	if(keyCode==98 || keyCode==40)
		keyCode=50;

   return keyCode;
}

function getFObject(movieName)
{
  if (window.document[movieName])
  {
      return window.document[movieName];
  }
  if (navigator.appName.indexOf("Microsoft Internet")==-1)
  {
    if (document.embeds && document.embeds[movieName])
      return document.embeds[movieName];
  }
  else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
  {
    return document.getElementById(movieName);
  }

}

function sendtoplayer(objname, loc, loc_value)
{
   if(getFObject(objname)==null)
      return;
   else
   {
     var flashMovie=getFObject(objname);
     flashMovie.SetVariable(loc, loc_value);
   }
}

function catchkey(evt) 
{ 
//	if(has_pushed)
//		return;

	// 1 or 2
	if (testKeyCode(evt, 49) || testKeyCode(evt, 50) || testKeyCode(evt, 90))
	{ 
		var now_ts = sec_time();
		if(now_ts < time_tmp)
		{
			has_pushed++;
			if(has_pushed<=2)
				sendtoplayer("aaplayer", "flashKey", retKeyCode(evt));
		}
		else
		{
			//alert("Past Press Time " + time_tmp);
		}
	}
	// delete	
	if (testKeyCode(evt, 46))
	{
		var now_ts = sec_time();
		if(now_ts < time_tmp)
		{
			has_pushed++;
			sendtoplayer("aaplayer", "flashKey", "46");
		}
		else
		{
			//alert("Past Press Time " + time_tmp);
		}
	}
} 
