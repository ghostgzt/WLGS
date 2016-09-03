<?php
include_once('../lib_link.php');
chmod("../../bin/phantomjs",0777);
function getMillisecond() {
    list($s1, $s2) = explode(' ', microtime());
    return (float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
}
$timecc=file_get_contents("wlgs_check.ini");
echo $timecc+300000;
echo '<br>';
echo getMillisecond();
echo '<br>';
if($timecc+300000<(int)getMillisecond()){
file_put_contents("wlgs_check.ini",getMillisecond());
ffopen("http://xkz.sturgeon.mopaas.com/phantomjs/shell/wlgs/wlgs_run.php");
echo "Starting!";
}else{
echo "Running!";
}
?>