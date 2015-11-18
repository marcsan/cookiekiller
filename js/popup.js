$(function(){
			$("#btnkill").on('click', function(){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {"kill": true}, function(response) {
						console.log(response);
					});
				});
			});
		});