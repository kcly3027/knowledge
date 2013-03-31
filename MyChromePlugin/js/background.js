chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.action == "tabs_create"){
			var _downurl = chrome.tabs.create({
				url:chrome.extension.getURL("downurl.html?dl_url=" + request.dl_url )
			},function(){
				sendResponse({farewell: "finish"});
			});
		}
		else if(request.action == "getParam"){
			alert(window);
			//sendResponse({farewell: window});
		}
		else
			sendResponse({}); 
	}
);