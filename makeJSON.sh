#!/bin/bash
mkdir temp
cd temp
curl http://our.niche.team/about/our-team/ | grep -oP 'http:\/\/our.niche.team\/wp-content\/uploads\/\d*\/\d*[^.]*.\w\w\w' | xargs wget
find -type f -name '*mural*' | xargs rm
find -type f -name '*Headshot*' | xargs rm
ls > names.txt
echo 'export const TEAM = [' >> team.js
firstPass="true"
PAGE=$(curl http://our.niche.team/about/our-team/)
while read filename
do
    #echo $filename
    if [ "$filename" != "names.txt" ]
    then
        RAWLINE=$(echo ${PAGE} | grep -oP 'http:\/\/our.niche.team\/wp-content\/uploads\/\d*\/\d*\/'${filename}'" alt="[^>]+')
        CLEANNAME=$(echo ${RAWLINE} | grep -oP '\w+ [^"]+')
        FIRSTNAME=$(echo ${CLEANNAME} | grep -oP '^\w+')
        LASTNAME=$(echo ${CLEANNAME} | grep -oP ' .+' | head -1 | grep -oP '.+')
        if [ "$firstPass" == true ]
        then
            echo '{firstName: "'${FIRSTNAME}'", lastName: "'${LASTNAME}'", src: "'${filename}'", title: ""}' >> team.js
            firstPass="false"
        else
            echo ',{firstName: "'${FIRSTNAME}'", lastName: "'${LASTNAME}'", src: "'${filename}'", title: ""}' >> team.js
        fi
    fi
done <names.txt

echo '];' >> team.js
rm names.txt

#SPECIAL CASE NAMES
#sed -i 's/firstName: "Juan", lastName: "Angel",/firstName: "Juan", lastName: "Angel Rojas",/g' team.js

#Node can't understand the accent on the filename
mv Kelly-Munié.jpg Kelly-Munie.jpg
sed -i 's/firstName: "Kelly", lastName: " Munie", src: "Kelly-Munié.jpg"/firstName: "Kelly", lastName: "Munié", src: "Kelly-Munie.jpg"/g' team.js


#END SPECIAL CASE NAMES

cd ..
cp temp/. src/images/ -r
cp temp/team.js src/constants/
rm temp -rf
