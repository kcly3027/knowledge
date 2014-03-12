(function(window){
	var FileList = { Count:0 };
	var scripts = document.getElementsByTagName("script");
	for (var i = scripts.length - 1; i >= 0; i--) {
		var rep = /var filelist(\d*)=([^;]*);([^wW]*)ViewSingleCommon\('([^']*)', '([^']*)', '([^']*)', '([^']*)'\);/;
		if(rep.test(scripts[i].innerHTML)){
			var regexpArray = rep.exec(scripts[i].innerHTML);
			eval("regexpArray[2] = " + regexpArray[2]);
			FileList[regexpArray[4]] = regexpArray;
			FileList.Count++;

			var aList = scripts[i].parentElement.getElementsByTagName("a");
			for (var ii = regexpArray[2].length - 1; ii >= 0; ii--) {
				aList[ii].href = regexpArray[2][ii].url;
			};
		}
	};
	function GetDownUrl(down_url){
		var URL = {
		    getParameter: function(parameter, url){
		        return url.match(new RegExp("[?#&]"+parameter+"=(.*?)(?:[#&]|$)", "i")) == null ? "" : RegExp.$1;
		    }
		}
		var $P = function (parameter, url){
		    url = url || window.location.href;
		    return URL.getParameter(parameter, url);
		};

		var cid = $P('cid',down_url);
		var f = $P('f',down_url);
		var bt = $P('bt',down_url);
		var batch = $P('batch',down_url);
		var dl_url = decodeURIComponent(f);

		rtitle = '';
		if (bt == '1')
		{
		    dl_url = "http://bt.box.n0808.com/"+cid.substr(0,2)+"/"+cid.substr(cid.length-2,2)+"/"+cid+".torrent";
		    return dl_url;
		}
		else if (batch != '')
		{
		    return "";
		}
		return dl_url;
	}
	
	var aList = document.getElementsByTagName("a");
	for(var i = 0;i<aList.length;i++){ 
		if(aList[i].href.indexOf("xiazai.html")>=0 || aList[i].href.indexOf("xiazai2.html")>=0)
		{
			var href = GetDownUrl(aList[i].href);
			if(href == "") aList[i].style.display="none";
			else
				aList[i].href = href;
			/*
			aList[i].onclick = function(event){
				var href = GetDownUrl(this.href)
				if(href == "") return true;
				chrome.extension.sendRequest({action:"tabs_create",dl_url: href}, function(response) {});
				return false;			
			}
			*/
		}
	}
})(window);