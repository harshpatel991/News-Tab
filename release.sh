#!/usr/bin/env bash

printf "${RED}------------Building Release------------${NC}\n"

echo "---Minifying JS and CSS"
gulp

lastVersion=$(git tag | tail -n1)
echo "---Tag version [last was ${lastVersion}]"
read tag
git commit -m "Release $tag" public/css/app.css
git tag -a "$tag" -m "$tag"
