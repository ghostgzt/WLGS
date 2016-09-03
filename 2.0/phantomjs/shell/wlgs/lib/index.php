<?php
error_reporting(0);
if(!$_GET['key']){die('Not Key!');}
session_start();
include "Snoopy.class.php";
function cleandz($gz,$html){
preg_match_all($gz, $html, $match);
$a=$match[1];
$s=array();
for ($i=0;$i<count($a);$i++){
if($a[$i]){
$s[count($s)]=$a[$i];
}
}
return array_unique($s);
}
$sid=null;

function login($user,$passwd){
$snoopy = new Snoopy;
$snoopy->agent = "(compatible; MSIE 4.01; MSN 2.5; AOL 4.0; Windows 98)";
$snoopy->referer = "http://www.baidu.com/";
$submit_url = "http://www.weiligongshe.com/user_sessions";
$submit_vars["authenticity_token"] = urldecode($_GET['key']);
$submit_vars["type"] = "0";
$submit_vars["name"] = $user;
$submit_vars["password"] = $passwd;
$snoopy->submit($submit_url,$submit_vars);
file_put_contents("snoopy.txt",json_encode($snoopy->cookies));
return $snoopy;
}

$snoopy=login("xxx@xxx.com","xxxxxx");

 
function getpage($rr=null,$snoopy){
if(!$rr){
$snoopy->fetch("http://www.weiligongshe.com/activities");
$rr= $snoopy->results;
}
return cleandz('/activities\?page\=(.*?)\"/is',$rr);
}
function getacts($rr=null,$snoopy,$page){
if(!$rr){
$snoopy->fetch("http://www.weiligongshe.com/activities".'?page='.$page);
$rr= $snoopy->results;
}
return cleandz('/activities\/(.*?)\"/is',$rr);
}
function getact($snoopy,$act){
$snoopy->fetch("http://www.weiligongshe.com/activities/".$act);
$rr= $snoopy->results;
return $rr;
}


function getad_activity_detail_id($rr=null,$snoopy,$acts){
if(!$rr){
$snoopy->fetch("http://www.weiligongshe.com/activities/".$acts);
$rr= $snoopy->results;
}
return cleandz('/ad\_activity\_detail\_id\]\"\ type\=\"hidden\"\ value\=\"(.*?)\"/is',$rr);
}

function getdata($snoopy){
$arr=array();

$snoopy->fetch("http://www.weiligongshe.com/activities");
$rr= $snoopy->results;
$page=getpage($rr,$snoopy);
$page=rand(0,count($page)-1);
$acts=getacts(null,$snoopy,$page);
$acts0=rand(0,count($acts)-1);
$acts=$acts[$acts0];
$snoopy->fetch("http://www.weiligongshe.com/activities/".$acts);
$rr= $snoopy->results;
$tid=getad_activity_detail_id($rr,$snoopy,null);
$tid0=rand(0,count($tid)-1);
$tid=$tid[$tid0];
$arr['user_share']=array("ad_activity_id"=>$acts,"ad_activity_detail_id"=>$tid,"sent_at"=>"0");
return $arr;
}



function out($snoopy){
$data=getdata($snoopy);
if($data['user_share']['ad_activity_id']&&$data['user_share']['ad_activity_detail_id']){
$key=urlencode($_GET['key']);
//$id=$_GET['id'];
$ids=array("4331","4683","20372","48716","52349","60715","97642","97643","97688","97690","97704","97705","97717","97718","97749","97750");
for($i=0;$i<count($ids);$i++){
$id.='&user_auth_ids%5B%5D='.$ids[$i];
}
echo json_encode(array('id'=>$data['user_share']['ad_activity_id'].' '.$data['user_share']['ad_activity_detail_id'],'data'=> 'utf8=%E2%9C%93&authenticity_token='.$key.'&user_share%5Bad_activity_id%5D='.$data['user_share']['ad_activity_id'].'&user_share%5Bad_activity_detail_id%5D='.$data['user_share']['ad_activity_detail_id'].$id.'&user_share%5Bsent_at%5D='));
}else{
//out($snoopy);
return "Can't Get Info!";
}
}
echo out($snoopy);
?>