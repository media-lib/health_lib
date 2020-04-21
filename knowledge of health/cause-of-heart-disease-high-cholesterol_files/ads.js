document.write('<div id="container_VieRelcejIrbT9f4" style="width:160px;height:300px"></div>');

setTimeout(function() {
   var c = document.getElementById("container_VieRelcejIrbT9f4");
   if (c) {
       var o = c.parentNode;
       o.style.height = "300px";
       o.style.width = "160px";
   } else {
       setTimeout(arguments.callee, 5);
   }
}, 5);

/*
* Adapted from jQuery 1.3.1 
* Copyright (c) 2009 John Resig
* Dual licensed under the MIT and GPL licenses.
* http://docs.jquery.com/License
*/
if (typeof __wb__getOffset__ === "undefined") {
    if ( document.documentElement["getBoundingClientRect"] ) {
    	__wb__getOffset__ = function(elem) {
    		var box  = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement,
    			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
    			top  = box.top  + (self.pageYOffset || docElem.scrollTop  || body.scrollTop ) - clientTop,
    			left = box.left + (self.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
    		return { top: top, left: left };
    	};
    } else  {
    	__wb__getOffset__ = function(elem) {
    		__wb__offset__.initialized || __wb__offset__.initialize();

    		var offsetParent = elem.offsetParent, prevOffsetParent = elem,
    			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
    			body = doc.body, defaultView = doc.defaultView,
    			prevComputedStyle = defaultView.getComputedStyle(elem, null),
    			top = elem.offsetTop, left = elem.offsetLeft;

    		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
    			computedStyle = defaultView.getComputedStyle(elem, null);
    			top -= elem.scrollTop, left -= elem.scrollLeft;
    			if ( elem === offsetParent ) {
    				top += elem.offsetTop, left += elem.offsetLeft;
    				if ( __wb__offset__.doesNotAddBorder && !(__wb__offset__.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName)) )
    					top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
    					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
    				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
    			}
    			if ( __wb__offset__.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" )
    				top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
    				left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
    			prevComputedStyle = computedStyle;
    		}

    		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" )
    			top  += body.offsetTop,
    			left += body.offsetLeft;

    		if ( prevComputedStyle.position === "fixed" )
    			top  += Math.max(docElem.scrollTop, body.scrollTop),
    			left += Math.max(docElem.scrollLeft, body.scrollLeft);

    		return { top: top, left: left };
    	};

    	__wb__offset__ = {
    	    initialize: function() {
        		if ( this.initialized ) return;
        		var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
        			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

        		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
        		for ( prop in rules ) container.style[prop] = rules[prop];

        		container.innerHTML = html;
        		body.insertBefore(container, body.firstChild);
        		innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

        		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
        		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

        		innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
        		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

        		body.style.marginTop = '1px';
        		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
        		body.style.marginTop = bodyMarginTop;

        		body.removeChild(container);
        		this.initialized = true;
        	}
    	}
    }
    
    __WB_LOG_EVENT_PARAMS__ = ["eventcode", "location", "uid", "swfname", "xy", "wh", "vchannel", "cid", "pageurl", "publisher", "duration"];
    __WB_LOG_EVENT__ = function() {
            }

    __WB_LOG_AD_IMPRESSION__ = function(winToUse, location, uid, swfname, xy, wh, vchannel, cid, pageurl, publisher) {
            }
    
    __WB_INIT_WINDOW_TIMER__ = function(winToUse, location, uid, swfname, xy, wh, vchannel, cid, pageurl, publisher) {
        var timeStart = new Date().getTime();
        var start = function() {
            timeStart = new Date().getTime();
        }
        
        var end = function() {
            var duration = new Date().getTime() - timeStart;
            __WB_LOG_EVENT__("000_000_4", location, uid, swfname, xy, wh, vchannel, cid, pageurl, publisher, duration);
        }
        
        if (winToUse.addEventListener) {
            winToUse.addEventListener("focus", start, false);
            winToUse.addEventListener("unload", end, false);
        } else {
            winToUse.attachEvent("onfocus", start);
            winToUse.attachEvent("onunload", end);
        }
    }

    __WB_WIDGET_IN_VIEW__ = function(id, uid, swfname, w, h, vchannel, cid, pageurl, publisher, inViewFn, outOfViewFn) {
        var useInner = navigator.userAgent.indexOf("AppleWebKit") != -1;        
        var container, firstPass = true, currentlyInView = false, firstInView = true;
        var inViewStart; // timer
        var pecentThreshold = .25;        
        
        var location;
        var currentWin = window, winToUse = window, j = 0;
        while (currentWin != top && j < 10) {
            var nextWin = currentWin.parent;
            try {
                if (nextWin.location.href) {
                    // we're on the same domain if we get here
                    for (var frames = nextWin.document.body.getElementsByTagName("iframe"), len = frames.length, i = 0; i < len; ++i) {
                        var frame = frames[i];
                        if (frame.contentWindow == currentWin &&
                            (frame.width == w || frame.style.width.replace("px", "") == w) &&
                            (frame.height == h || frame.style.height.replace("px", "") == h))
                        {
                            winToUse = nextWin;
                            container = frame;
                            location = winToUse.location;
                            break;
                        }
                    }
                }
            } catch (ex) { }
            
            currentWin = nextWin;
            ++j;
        }
        var docToUse = winToUse.document;
        
        if (!location) {
            if (winToUse.parent != winToUse && winToUse.document.referrer) {
                location = winToUse.document.referrer;
            } else {
                location = winToUse.document.location;
            }
        }
                
        return function() {
            if (!container) {
                var el = document.getElementById(id);
                if (el) {
                    container = el.parentNode;
                } else {
                    setTimeout(arguments.callee, 100);
                    return;
                }
            }
            
            // determine whether we are in view
            var winHeight = useInner && winToUse.innerHeight || docToUse.compatMode == "CSS1Compat" && docToUse.documentElement.clientHeight || docToUse.body.clientHeight;
            var winWidth = useInner && winToUse.innerWidth || docToUse.compatMode == "CSS1Compat" && docToUse.documentElement.clientWidth || docToUse.body.clientWidth;
            var yScroll = winToUse.pageYOffset || docToUse.documentElement.scrollTop || docToUse.body.scrollTop;
            var xScroll = winToUse.pageXOffset || docToUse.documentElement.scrollLeft || docToUse.body.scrollLeft;
            var bottomFold = winHeight + yScroll, rightFold = winWidth + xScroll;
            var position = __wb__getOffset__(container);

            var topPos = Math.max(yScroll, position.top);
            var bottomBos = Math.min(bottomFold, position.top + h);
            var leftPos = Math.max(xScroll, position.left);
            var rightPos = Math.min(rightFold, position.left + w);
            var heightInView = Math.max(0, bottomBos - topPos), widthInView = Math.max(0, rightPos - leftPos);

            var widgetArea = w * h, areaInView = heightInView * widthInView;
            var percentInView = areaInView / widgetArea;
            
            var inView = percentInView >= pecentThreshold;
            
            if (firstPass) {
                // first time we've been called, so set up event handlers
                firstPass = false;
                if (winToUse.addEventListener) {
                    winToUse.addEventListener("scroll", arguments.callee, false);
                    winToUse.addEventListener("resize", arguments.callee, false);
                } else {
                    winToUse.attachEvent("onscroll", arguments.callee);
                    winToUse.attachEvent("onresize", arguments.callee);
                }
                
                // ...and log our ad impression
                var xy = Math.round(position.left)+","+Math.round(position.top), wh = winWidth+","+winHeight
                __WB_LOG_AD_IMPRESSION__(winToUse, location, uid, swfname, xy, wh, vchannel, cid, pageurl, publisher);
                __WB_INIT_WINDOW_TIMER__(winToUse, location, uid, swfname, xy, wh, vchannel, cid, pageurl, publisher)
            }
            
            if (inView) {
                // transitioning into view, fire an event
                if (!currentlyInView) {
                    inViewStart = new Date().getTime();
                    inViewFn && inViewFn(location);
                    __WB_LOG_EVENT__(firstInView ? "000_000_2" : "000_000_9", location, uid, swfname, Math.round(position.left)+","+Math.round(position.top), winWidth+","+winHeight, vchannel, cid, pageurl, publisher);
                    firstInView = false;
                }
            } else if (currentlyInView) {
                // transitioning out-of-view, fire event with duration
                var timeInView = new Date().getTime() - inViewStart;
                outOfViewFn && outOfViewFn(location);
                __WB_LOG_EVENT__("000_000_3", location, uid, swfname, Math.round(position.left)+","+Math.round(position.top), winWidth+","+winHeight, vchannel, cid, pageurl, publisher, timeInView);
            }
            
            currentlyInView = inView;
        }
    }
}

/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
if(typeof mpireWidget=="undefined"){var mpireWidget=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in mpireWidget){mpireWidget[q]=null}mpireWidget=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();}

function __WB_SET_STYLES__(id, styles, parent) {
   var e = document.getElementById(id);
   if (parent) {
       e = e.parentNode;
   }
   for (var s in styles) {
       e.style[s] = styles[s];
   }
}

setTimeout(__WB_WIDGET_IN_VIEW__("container_VieRelcejIrbT9f4", "VieRelcejIrbT9f4", "bar_wbtw160x300.swf", 160, 300,  null ,  null ,  null ,  null , (function() {
    var displayed = false;
    
    return function(location) {
        if (displayed) return;
        displayed = true;
        
        var date = new Date();
        var day = ""+date.getMonth()+date.getDate()+date.getYear();

                var params = { "allowScriptAccess": "always", "base":"http://images.widgetbucks.com/widgets/" };
        
                mpireWidget.embedSWF("http://images.widgetbucks.com/widgets/bar_wbtw160x300.swf?userip=71.247.11.45&originState=NY&originCity=Bronx&uid=VieRelcejIrbT9f4&searchURL=http://search.mpire.com&apiURL=http://api.widgetbucks.com&day="+day+"&referer="+encodeURIComponent(document.referrer),"container_VieRelcejIrbT9f4", "160", "300", "8.0.0", false, false, params);
            }
})()), Math.floor((Math.random() * 150) + (Math.random() * 150) + 200));

_qoptions = {
    qacct:"p-40acRCArRS5KQ",
    labels:"RON",
    media:"ad"
};
document.write('<'+'script language="javascript" type="text/javascript" src="http://edge.quantserve.com/quant.js"'+'>'+'</'+'script'+'>');


