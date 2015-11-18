$(function(){
	var selectors = ['#kw-cookie-policy', '#cookie-bar'];
	var KEY_SELECTOR = "CookiePopUpKiller.personal_selectors";
	var personal_selectors = localStorage[KEY_SELECTOR];
	//TODO add shared selectors from remote sources (P2P)
	if(personal_selectors){
		try{
			personal_selectors = JSON.parse(personal_selectors);
			selectors = selectors.concat(personal_selectors);
		}catch(e){
			localStorage[KEY_SELECTOR] = "[]";
		}
	}else{
		personal_selectors = [];
	}
	var $cookiealert = $();
	$.each(selectors, function(index, selector){
		$cookiealert = $cookiealert.add(selector);
	});
	

	if($cookiealert.length > 0)
	{
		$cookiealert.remove();
		chrome.runtime.sendMessage({ "cookieRemoved" : true });
	}
	
	var addSelector = function(selector){
		if (personal_selectors.indexOf(selector)<0){
			personal_selectors.push(selector);
			localStorage[KEY_SELECTOR] = JSON.stringify(personal_selectors);
		}
	};
	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if(request.kill){
				var $tooltipc = $('<div></div>')
					.appendTo('body');
				var $tooltip = $('<span>').appendTo($tooltipc);
				var $selector = $('<div></div>').appendTo($tooltipc)
				$tooltipc.css({
					"position": "absolute",
					"top": "50%",
					"margin-top": "-60px",
					"height": "120px",
					"background": "rgba(0,0,0,.7)",
					"text-align": "center",
					"width":"100%",
					"padding":"30px",
					"font-size": "30px"
				});
				$tooltip.text("point and click the cookiebar!");
				var mouseOver = function(e){
					var $target = $(e.target);
					var id = $target.attr('id');
					if (id){
						$selector.text("#" + id);
						var original = $target.css("border");
						
						$target.css("border","3px solid red");
						$target.one("mouseout", function(e){
							$(e.target).css("border", original);
						});
						$target.one("click", function(e){
							$("body").off("mouseover", mouseOver);
							$target.remove();
							$tooltipc.remove();
							addSelector('#'+id);
							chrome.runtime.sendMessage({ "cookieRemoved" : true });
						});
					}
				};
				$("body").on("mouseover", mouseOver);
			}
		});
});

