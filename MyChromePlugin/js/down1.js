(function(window){
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
		if (batch == '1')
		{
			/*
			chrome.extension.sendRequest({action:"getParam"}, function(response) {
			  console.log(response.farewell);
			});
		    //var filelist = window.filelist.concat();
		    //return filelist;
		    */
		    return "";
		}
		else if (batch != '')
		{
		    //var listArr = eval("window.filelist"+batch);
		    //var filelist = listArr.concat();
		    //return filelist;
		    return "";
		}
		return dl_url;
	}
	var aList = document.getElementsByTagName("a");
	for(var i = 0;i<aList.length;i++){ 
		if(aList[i].href.indexOf("xiazai.html")>=0)
		{
			aList[i].onclick = function(event){
				var href = GetDownUrl(this.href)
				if(href == "") return true;
				chrome.extension.sendRequest({action:"tabs_create",dl_url: href}, function(response) {});
				return false;			
			}
		}
	}
})(window);