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
/*Google翻译*/
var newTranslateTabMenu = chrome.contextMenus.create(
    {"title": '使用 Google Translate 翻译',
     "contexts": ["selection"], "onclick": openInTranslate});
 
function openInTranslate(info, tab){
  var viewer_url = 'https://translate.google.com/?hl=zh#auto/zh-CN/' + encodeURIComponent(info.selectionText);
  chrome.tabs.create({"url": viewer_url});
}