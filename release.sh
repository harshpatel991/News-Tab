#!/usr/bin/env bash

printf "${RED}------------Building Release------------${NC}\n"

DATE=`date +%Y-%m-%d`

lastVersion=$(git tag | tail -n1)
echo "---Tag version [last was ${lastVersion}]"
read tag

#Update the app version in the index.html file and background.js file
sed -i .bak "s/\<\!-- app-version --\>.*\<\!-- app-version --\>/\<\!-- app-version --\>${tag}\<\!-- app-version --\>/g" index.html
sed -i .bak "s/\<\!-- app-date --\>.*\<\!-- app-date --\>/\<\!-- app-date --\>${DATE}\<\!-- app-date --\>/g" index.html
sed -i .bak "s;/\*app-version\*/.*/\*app-version\*/;/\*app-version\*/\"${tag}\"/\*app-version\*/;g" js/background.js

#Remove the backup files created by sed
rm index.html.bak
rm js/background.js.bak

echo "---Minifying JS and CSS"
gulp

sed "s/\"version.*/\"version\": \"${tag}\",/" manifest.json > manifest.tmp;
mv manifest.tmp manifest.json
git commit -m "Release $tag" manifest.json
git tag -a "$tag" -m "$tag"

zip -r "../rtab-$tag.zip" . -x *.git* *.ds_store* *DS_Store* *.idea* *.npmignore* gulpfile.js js/\* node_modules/\* css/\*