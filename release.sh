#!/usr/bin/env bash

printf "${RED}------------Building Release------------${NC}\n"

echo "---Minifying JS and CSS"
gulp

lastVersion=$(git tag | tail -n1)
echo "---Tag version [last was ${lastVersion}]"
read tag

sed "s/\"version.*/\"version\": \"${tag}\",/" manifest.json > manifest.tmp;
mv manifest.tmp manifest.json
git commit -m "Release $tag" manifest.json
git tag -a "$tag" -m "$tag"
