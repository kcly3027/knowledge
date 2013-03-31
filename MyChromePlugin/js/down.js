(function(window){
	var URL = {
	    getParameter: function(parameter, url){
	        return url.match(new RegExp("[?#&]"+parameter+"=(.*?)(?:[#&]|$)", "i")) == null ? "" : RegExp.$1;
	    }
	}
	alert(window.location);
	var $P = function (parameter, url){
	    url = url || window.location.href;
	    return URL.getParameter(parameter, url);
	};

	var cid = $P('cid');
	var f = $P('f');
	var bt = $P('bt');
	var batch = $P('batch');
	var dl_url = decodeURIComponent(f);
	var thunder_instance = new Thunder();

	if(thunder_instance == false )
	{
	    alert("无法调用迅雷。");
	    return 0;
	}

	rtitle = '';
	if (bt == '1')
	{
	    dl_url = "http://bt.box.n0808.com/"+cid.substr(0,2)+"/"+cid.substr(cid.length-2,2)+"/"+cid+".torrent";
	}
	if (batch == '1')
	{
	    var filelist = window.opener.filelist.concat();
	    thunder_instance.batch(filelist, location.href);
	    return 0;
	}
	else if (batch != '')
	{
	    var listArr = eval("window.opener.filelist"+batch);
	    var filelist = listArr.concat();
	    thunder_instance.batch(filelist, location.href);
	    return 0;
	}
	console.log(dl_url);
	thunder_instance.down(cid, dl_url, location.href, rtitle, location.href);
})(window.Window);