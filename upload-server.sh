#! /bin/bash
# @date 20181027 115816
# @author limy
zip -q -r ./dist.zip ./dist
scp ./dist.zip work@192.168.1.111:/home/work/guard/web/
echo "upload success!"