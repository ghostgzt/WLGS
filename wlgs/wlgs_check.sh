#!/bin/bash
i=20000
a=$(cat wlgs_check.ini)
n=$(date -d now +%s)
n=$[n*1000]
g=$[n-a]
echo ${a}'|'
echo ${n}'|'
echo ${g}'|'
if [ $g -gt $i ];then
sh wlgs_run.sh
fi
