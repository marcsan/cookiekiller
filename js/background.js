chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // read `newIconPath` from request and read `tab.id` from sender
    	if (request.cookieRemoved){
	        chrome.browserAction.setIcon({
	            path: "img/icon48green.png",
	            tabId: sender.tab.id
	        });
    	}
    });