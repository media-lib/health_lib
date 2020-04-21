		var newWindow = null
		function makeNewWindow(theURL,winName,features) { 
			//test to see if window aleady exists
			if (!newWindow || newWindow.closed) {
				newWindow = window.open(theURL,winName,features);
			} else {
				//window exists, so load the proper page and bring it forward
				newWindow = window.open(theURL,winName,features);
				newWindow.location = theURL
				newWindow.focus();
			}
		}
