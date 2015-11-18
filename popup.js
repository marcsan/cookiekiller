
var cookiealert = $('#kw-cookie-policy, #cookie-bar');

if(cookiealert.length > 0)
{
  cookiealert.remove();
  chrome.runtime.sendMessage({ newIconPath : "icon48green.png" });
}
