@echo off
if %1==dev  gsutil -m rsync -r -d contents gs://wiesen-website.appspot.com/contents-dev
if %1==prod gsutil -m rsync -r -d contents gs://wiesen-website.appspot.com/contents