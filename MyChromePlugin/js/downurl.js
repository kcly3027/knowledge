(function(window){
	var URL = {
	    getParameter: function(parameter, url){
	        return url.match(new RegExp("[?#&]"+parameter+"=(.*?)(?:[#&]|$)", "i")) == null ? "" : RegExp.$1;
	    }
	}
	var $P = function (parameter, url){
	    url = url || window.location.href;
	    return URL.getParameter(parameter, url);
	};
	var dl_url = $P("dl_url");
	window.document.write(dl_url);
})(window);