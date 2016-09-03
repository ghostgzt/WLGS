var page = require('webpage').create();
page.onAlert = function(msg) {
	console.log('ALERT: ' + msg);
	page.render('wlgs_alert.png');
	fs.write('wlgs_logs.log', getnow() + ' ALERT: ' + msg + '\n', 'a');
};
page.open('http://www.weiligongshe.com/',
function(status) {
	if (status !== 'success') {
		console.log('Unable to load the address!');
		phantom.exit();
	} else {


		page.evaluate(function() {
			document.getElementById('name').value = 'xxx@xxx.com';
			document.getElementById('password').value = 'xxxxxx';
			document.getElementsByTagName('form')[0].submit();
		});
		page.onLoadFinished = function(status) {
		page.render('665.png');
				page.evaluate(function() {
			var a=$("div#tagContent0 a.button-109");alert(a.length);for(var i=0;i<a.length;i++){alert(a[i])};
		});
		console.log('load the address!');
		page.close();
						phantom.exit();
		}
		}});