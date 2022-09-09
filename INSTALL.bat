CALL npm install http-server --verbose
CALL npm install website-scraper --verbose
CALL npm install website-scraper-puppeteer --verbose


SET base_path=%~dp0
SET "move_to_extrapath=node_modules\website-scraper-puppeteer\lib\"
SET "move_from_extrapath=util\index.js"
SET move_to_path=%base_path%%move_to_extrapath%
SET move_from_path=%base_path%%move_from_extrapath%

MOVE /Y %move_from_path% %move_to_path%

CALL node index.js %~dp0

wget -r -np -nH -P EatTheDungeon/ --wait=0.2 https://bewilderedgames.com/img/
wget -r -np -nH -P EatTheDungeon/ --wait=0.2 https://bewilderedgames.com/sfx/
wget -r -np -nH -P EatTheDungeon/ --wait=0.2 https://bewilderedgames.com/fonts/
wget -r -np -nH -P EatTheDungeon/ --wait=0.2 https://bewilderedgames.com/bgm/