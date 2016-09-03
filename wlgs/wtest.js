var page = require('webpage').create();
var fs = require('fs'),
system = require('system');
fs.write('wlgs_paint.ini', '0', 'w');
fs.write('wlgs_run.ini', '0', 'w');
fs.write('wlgs_logs.log', getnow() + ' Starting WLGS Money System...\n', 'w');
console.log('Starting WLGS Money System...');
page.onAlert = function(msg) {
	console.log('ALERT: ' + msg);
	page.render('wlgs_alert.png');
	fs.write('wlgs_logs.log', getnow() + ' ALERT: ' + msg + '\n', 'a');
};
setInterval(function() {
var ptime = ((new Date()).valueOf());
fs.write('wlgs_check.ini', ptime, 'w');
},
		10000);
function calcTime(offset) {
d = new Date();
utc = d.getTime() + (d.getTimezoneOffset() * 60000);
nd = new Date(utc + (3600000*offset));
return nd.toLocaleString();
}
function getnow() {
	return calcTime('+8');
}
function runcode() {
	page.includeJs('http://gentle.cdn.duapp.com/gentle_libs.js',
	function() {
		console.log('Gentle_Libs Loaded!');
		fs.write('wlgs_logs.log', getnow() + ' Gentle_Libs Loaded!\n', 'a');
		page.includeJs('http://gentle.cdn.duapp.com/wlgs_tsk.js',
		function() {
			console.log('Tsk_Libs Loaded!');
			fs.write('wlgs_logs.log', getnow() + ' Tsk_Libs Loaded!\n', 'a');
		});
	});
}

page.open('http://www.weiligongshe.com/',
function(status) {
	if (status !== 'success') {
		console.log('Unable to load the address!');
		fs.write('wlgs_logs.log', getnow() + ' Unable to load the address!Ending...\n', 'a');
		fs.write('wlgs_run.ini', '0', 'w');
		phantom.exit();
	} else {
		var firstrun = 1;
		var yurl="http://www.weiligongshe.com/activities";
		var thref = yurl;

		page.evaluate(function() {
			document.getElementById('name').value = 'xxx@xxx.com';
			document.getElementById('password').value = 'xxxxxx';
			document.getElementsByTagName('form')[0].submit();
		});
		setInterval(function() {
			if (page.url == thref) {

				if (firstrun == 1) {
					firstrun = 0;
					fs.write('wlgs_run.ini', '1', 'w');
					fs.write('wlgs_logs.log', getnow() + ' Logined!\n', 'a');
					page.render('wlgs_new.png');
					var xthref = page.evaluate(function() {
						try {
							var ttmmppss = ttmmpps = document.getElementsByClassName('button sprits button-109 inline-block')[0].href;
							location.href = ttmmppss;
							return ttmmppss;
						} catch(e) {
							return yurl;
						}
					});

					if (xthref == yurl) {
						firstrun = 1;
					} else {
						thref = xthref;

						page.onLoadFinished = function(status) {

							if (status == 'success') {
								console.log('Status: ' + status);
								firstrun = 2;
								
								fs.write('wlgs_logs.log', getnow() + ' Loading! ' + thref + '\n', 'a');
							}
							// Do other things here...
						};

					}
				}

				if ((thref != yurl) && (firstrun == 2)) {
					console.log('Loaded! ' + thref);
					fs.write('wlgs_logs.log', getnow() + ' Loaded! ' + thref + '\n', 'a');
					firstrun = 0;
					runcode();
				}

				try {
					var c = fs.read('wlgs_paint.ini');
				} catch(e) {
					var c = '0';
				}
				if (c == '1') {
				    fs.write('nohup.out', '0', 'w');
					fs.write('wlgs_paint.ini', '0', 'w');
					console.log('Painting...' + (new Date()).valueOf());
					fs.write('wlgs_logs.log', getnow() + ' Painting...\n', 'a');
					var ptime = ((new Date()).valueOf());
					page.render('wtest' + ptime + '.png');
					console.log('Paint Finish! ' + 'wtest' + ptime + '.png');
					fs.write('wlgs_logs.log', getnow() + ' Paint Finish! ' + 'wtest' + ptime + '.png\n', 'a');

				} else {
					try {
						var d = fs.read('wlgs_run.ini');
					} catch(e) {
						var d = '0';
					}
					if (d != '0') {

						//fs.write('wlgs_run.ini', '1', 'w');
						console.log('Running...' + (new Date()).valueOf());
					} else {
					    //fs.write('wlgs_run.ini', '0', 'w');
						fs.write('wlgs_logs.log', getnow() + ' Ending...\n', 'a');
						console.log('Ending...' + (new Date()).valueOf());
						page.close();
						phantom.exit();
					}
				}

			}

		},
		1000);
	}
});