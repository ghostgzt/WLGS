<?php
include_once('../lib_link.php');
chmod("../../bin/phantomjs",0777);
if($_GET['run']){
echo shell_exec("nohup ../../bin/phantomjs fortrabbit.js &");
}else{
ffopen("http://xkz.sturgeon.mopaas.com/phantomjs/shell/fortrabbit/fortrabbit_run.php?run=1");
echo "Unfreeze Setted!";
}
?>