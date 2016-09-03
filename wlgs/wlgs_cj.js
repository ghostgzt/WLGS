var page = require('webpage').create();
var fs = require('fs'),
system = require('system');
fs.write('wlgs_cj_run.ini', '0', 'w');
fs.write('wlgs_logs.log', getnow() + ' Starting WLGS List Collection...\n', 'w');
console.log('Starting WLGS List Collection...');
page.onAlert = function(msg) {
	console.log('ALERT: ' + msg);
	fs.write('collect_list.json',msg, 'w');
	fs.write('wlgs_logs.log', getnow() + ' ALERT: ' + 'Collection Finished!' + '\n', 'a');
		page.close();
						phantom.exit();
};
setInterval(function() {
var ptime = ((new Date()).valueOf());
fs.write('wlgs_cj_check.ini', ptime, 'w');
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
	page.injectJs('cj.js',
	function() {
		console.log('Gentle_CJ Collection Loaded!');
		fs.write('wlgs_logs.log', getnow() + ' Gentle_CJ Collection Loaded!\n', 'a');
	});
}

page.open('http://www.weiligongshe.com/',
function(status) {
	if (status !== 'success') {
		console.log('Unable to load the address!');
		fs.write('wlgs_logs.log', getnow() + ' Unable to load the address!Ending...\n', 'a');
		fs.write('wlgs_cj_run.ini', '0', 'w');
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

			fs.write('wlgs_cj_run.ini', '1', 'w');
			if(firstrun == 1){
page.onLoadFinished = function(status) {

							if (status == 'success') {
							page.render('665.png');
									console.log('Collection Loaded! ' + thref);
					fs.write('wlgs_logs.log', getnow() + ' Collection Loaded! ' + thref + '\n', 'a');
		
				setInterval(function() {runcode()},5000);
				firstrun = 2;
							}
							// Do other things here...
						};
	}
				
				

				
		
					try {
						var d = fs.read('wlgs_cj_run.ini');
					} catch(e) {
						var d = '0';
					}
					if (d != '0') {

						//fs.write('wlgs_cj_run.ini', '1', 'w');
						console.log('Running...' + (new Date()).valueOf());
					} else {
					    //fs.write('wlgs_cj_run.ini', '0', 'w');
						fs.write('wlgs_logs.log', getnow() + ' Collection Ending...\n', 'a');
						console.log('Ending...' + (new Date()).valueOf());
						page.close();
						phantom.exit();
					}
				

			}

		},
		1000);
	}
});