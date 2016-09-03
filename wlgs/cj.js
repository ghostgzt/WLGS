var ids = new Array();
var pages=getpage();
var runnowpage=1;
var runnowid=0;
var runnowids=0;


run(1);




function getpage(){
try{
var xx=($("div.pagination ul li:last a[href]")[0]).href;
return ((xx.split("="))[1]);
}catch(e){
alert(e);
}
}


function run(page){
runnowpage=page;
document.body.innerHTML=("<iframe id=\"theone\" src=\"about:blank\"><\/iframe>");

var iframe=document.getElementById("theone");
iframe.src = "http://www.weiligongshe.com/activities?page="+page;
 
if (iframe.attachEvent){
    iframe.attachEvent("onload", function(){

getmid();
    });
} else {
    iframe.onload = function(){

	getmid();
    }
}

}




function getmid(){
var a=$("#theone").contents().find("div#tagContent0 a.button-109");
for(var i=0;i<a.length;i++){
ids.push([a[i].href.toString().replace(/http\:\/\/www\.weiligongshe\.com\/activities\//ig,''),[0]]);
}
		if(runnowpage<pages){
		runnowpage++;
	run(runnowpage);
	}
	else{
	runnowids=ids.length;
	 runnext(0);
	}
}















function runnext(id){
runnowid=id;
var iframe=document.getElementById("theone");
iframe.src = "http://www.weiligongshe.com/activities/"+ids[runnowid][0];
if (iframe.attachEvent){
    iframe.attachEvent("onload", function(){
		gettid();
    });
} else {
    iframe.onload = function(){
		gettid();
    }
}
}

function gettid(){
var a=$("#theone").contents().find("input#user_share_ad_activity_detail_id");
for(var i=0;i<a.length;i++){

ids[runnowid][1][i]=a[i].value;

}
	if(runnowid<runnowids-1){
		runnowid++;
	runnext(runnowid);
	}
	else{
	
	alert(JSON.stringify(ids));
	}
}
