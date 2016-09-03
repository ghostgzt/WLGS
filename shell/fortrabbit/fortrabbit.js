var page = require('webpage').create();
var fs = require('fs');
var url = 'https://my.fortrabbit.com/apps/xdpx';
var frist = 1;
fs.write('nohup.out', '0', 'w');
fs.write('fortrabbit.log', getnow() + ' Initing Freeze-Reset...\n', 'w');
function calcTime(offset) {
d = new Date();
utc = d.getTime() + (d.getTimezoneOffset() * 60000);
nd = new Date(utc + (3600000*offset));
return nd.toLocaleString();
}
function getnow() {
	return calcTime('+8');
}
page.open(url,
function(status) {
	if (status == 'success') {
		console.log('Logined!');
		page.evaluate(function() {
			document.getElementById('AccountEmail').value = 'xxx@xxx.com';
			document.getElementById('AccountPassword').value = 'xxxxxx';
			document.getElementById('AccountLoginForm').submit();
		});
		page.onLoadFinished = function(status) {
			if ((status == 'success') && (page.url = url) && (frist == 1)) {
				frist = 0;
				console.log('Freeze-Reset Starting...');
				page.evaluate(function() {
					window.setTimeout(function() {
					document.getElementById('freeze-reset').click();
					},
				5000);
				});
				window.setTimeout(function() {
					console.log('Freeze-Reset Closed!');
					page.render('fortrabbit.png');
					console.log('Paint Finish! fortrabbit.png');
					console.log('End');
					fs.write('fortrabbit.log', getnow() + ' Freeze-Reset Succeeded!\n', 'a');
					page.close();
					phantom.exit();
				},
				10000);

			}
		}
	} else {
		console.log('Unable to load the address!');
		page.render('fortrabbit.png');
		console.log('Paint Finish! fortrabbit.png');
		page.close();
		phantom.exit();
	}
});