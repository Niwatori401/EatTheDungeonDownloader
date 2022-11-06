<h2>ABOUT</h2>
This project will allow you to download a local copy of "Eat the Dungeon". It uses several js plugins utilizing puppeteer and wget to scrape the site and then uses the http-server package to allow you to play it. The purpose of this project is to enable individuals to add custom content, change the function or balance of the game as they see fit or play the game offline.

<h2>HOW TO USE</h2>

You **MUST** have Node.js installed for this to work. I suggest checking the box to install the tools for chocolatey as I have not tested without them.<br>
In addition, **you need wget.exe**. Put it in the main directory (with index.js and INSTALL.bat).

You can download Node.js from here:<br>
(Windows / Mac) <br>
https://nodejs.org/en/download/ <br>
You can download wget from here (click the **EXE** option for either 32-bit or 64-bit):<br>
(Windows) <br>
https://eternallybored.org/misc/wget/ <br>

0. Download the repo. Extract the folder somewhere where the folder path <b>doesn't have spaces</b>. It will break if there is a space in the folder path.

1. Install Node.js. Click the link above and follow the installer. As written above, I suggest checking the box at the end to also install extra tools.

2. "Install" wget. Download wget.exe from the link above using the "EXE" option. Place the downloaded executable in the folder with INSTALL.bat and RUN_GAME.bat. Note: you don't need to actually _use_ the exe, but the scripts need it to function. Also note the exe MUST be named "wget.exe". It should come that way from the site so just don't rename it.

3. After installing Node and placing wget.exe in the directory, run INSTALL.bat. This will download the game. This can take a *really* long time, so be patient! At some points it may appear frozen. This is *probably* not the case. It should take around 20-30 minutes to complete, but if it takes more than an hour to install the game on a normal internet connection then there may be a problem. If its not frozen though, I advise to just wait it out. 

Note: Part of the install process opens a tab in a Chromium instance! Just leave it be and it will close itself.

4. After all is done in the previous step, hit RUN_GAME.bat. This should open a new tab in your web browser with the game loaded. **If it has nothing on it, try refreshing the page.**

<h2>FINAL NOTES</h2>

* That should be all! Now that you have a local copy you can modify or view any of the files for the game. To run the game again you **do not** need to use INSTALL again. Just hit RUN_GAME and it will relaunch the virtual server. 
* When you are done playing you can close the terminal spawned from RUN_GAME.
* I recommend making a local copy of the entire EatTheDungeon folder so that you don't need to redownload the game from the website to get a fresh copy if you decide to mess with the files. 
* Take care not to rename any files or move any directories unless you know how to change the scripts appropriately.

Do try to be responsible with this tool, as while it <b>shouldn't</b> place any more stress on the server than just playing the game, it very well might. Also, keep in mind the game _is_ bewildered_angel's intellectual property and should be handled appropriately with regard to redistribution.
