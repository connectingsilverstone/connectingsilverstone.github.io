// jquery.Browser was deprecated for no good reason http://www.jquery4u.com/deprecated/fix-jquery-browser-function/
// if you need to detect features use Modernizr
// if you need to fix bug for specific browser here are some method for detection

function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	return rv;
}

function isFirefox() {
	return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function isChrome() {
	return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}

function isSafari() {
	return navigator.userAgent.toLowerCase().indexOf('safari') > -1;
}

function isSafariPc() {
	return isSafari() && !isIPad() && !isIPhone() && !isIPod();
}

function isIPad() {
	return navigator.userAgent.toLowerCase().indexOf('ipad') > -1;
}

function isIPhone() {
	return navigator.userAgent.toLowerCase().indexOf('iphone') > -1 && navigator.userAgent.toLowerCase().indexOf('ipad') == -1 && navigator.userAgent.toLowerCase().indexOf('ipod') == -1;
}

function isIPod() {
	return navigator.userAgent.toLowerCase().indexOf('ipod') > -1 ;
}