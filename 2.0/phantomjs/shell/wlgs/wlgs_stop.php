<?php
include_once('../lib_link.php');
chmod("../../bin/phantomjs",0777);
if($_GET['run']){
echo shell_exec("killall phantomjs");
echo shell_exec("nohup ../../bin/phantomjs wstop.js&");
}else{
ffopen("http://xkz.sturgeon.mopaas.com/phantomjs/shell/wlgs/wlgs_stop.php?run=1");
echo "Stop Setted!";
}
?>