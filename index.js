import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path'

let errCount = 0;
let promises;

const fetchSingleResource = (urlResource, resolvedIP, status) => {
    status.fileName = urlResource;
    
    return new Promise((resolve, reject) => {
        const maxAttempts = 10;
        
        const call = (url) => {
            const controller = new AbortController();
    
            const totalTimeout = setTimeout(() => {
              if (!status.resolved) {
                const err = new Error("Failed finish download");
                controller.abort();
                reject(err);
              }
            }, 60000);

            fetch (url, {
                method: "GET",
                mode: "cors",
                timeout: 8000,
                signal: controller.signal
            }).then ((response) => {
                const fileName = "EatTheDungeon/" + url.split(resolvedIP + '/').pop();
                fs.rmSync(fileName, {force: true});
                fs.mkdirSync(path.dirname(fileName), {recursive: true});
                const dataStream = response.body;
                const fileStream = fs.createWriteStream(fileName);
                dataStream.pipe(fileStream);
            
                fileStream.on('close', () => {
                    clearTimeout(totalTimeout);
                    console.log(`\x1b[32m[ SUCCESS ]\x1b[0m ${fileName}`);
                    status.resolved = true;
                    resolve();
                });

            }).catch((err) => {
                controller.abort();
                clearTimeout(totalTimeout);
                status.attempts++;
                if (status.attempts < maxAttempts) {
                    console.log(`\x1b[33m[   WARN  ]\x1b[0m Failed to download file at ${url} (${status.attempts}) time(s). Retrying...`);
                    call(urlResource);
                } else {
                    errCount++;
                    console.log(`\x1b[31m[  ERROR  ]\x1b[0m Failed to download file at ${url} after ${maxAttempts} tries. Error details ${err}`);
                    reject();
                }
            })      
        }
    
        call(urlResource);
    })

};
//with last slash
const getUrlsToFetch = async (baseUrlDir) => {
    //const regex = /<a[^>]*>([\s\S]*?)<\/a>/g;
    const regex = /<a\s+[^>]*?href\s*=\s*['"](?!\?)([^'"]+?)['"][^>]*?>(?:(?!Parent Directory).)*<\/a>/g
    ///<a(?!\s*href\s*=\s*['"][^'"]*\?[^'"]*['"])[^>]*>([\s\S]*?)<\/a>/g;
    let filesToDownload = [];
    let foldersToDownload = [];
  
    return new Promise(async (resolve, reject) => {
      try {
        const result = await fetch(baseUrlDir);
        const pageAsText = await result.text();
        
        let match;
        while ((match = regex.exec(pageAsText)) !== null) {
          const matchText = match[1];
          console.log(`Matched ${matchText}`)
          if (matchText.includes('/')) {
            foldersToDownload.push(baseUrlDir + matchText);
          } else {
            filesToDownload.push(baseUrlDir + matchText);
          }
        }
  
        if (foldersToDownload.length > 0) {
          const folderPromises = foldersToDownload.map((folder) => getUrlsToFetch(folder));
          const results = await Promise.all(folderPromises);
  
          for (const result of results) {
            filesToDownload.push(...result);
          }
        }
  
        resolve(filesToDownload);
      } catch (error) {
        console.log(`\x1b[31m[  ERROR  ]\x1b[0m Failed to get file info for directory: ${baseUrlDir}. Error details: ${error}`);
        reject(error);
      }
    });
  };
  

(async () => {
    console.log(`\x1b[34m[  INFO   ]\x1b[0m Starting downloader`);

    let resolvedIP = "bewilderedgames.com";

    let filesToFetch = []
    console.log(`\x1b[34m[  INFO   ]\x1b[0m Fetching file list...`);

    filesToFetch.push(`http://${resolvedIP}/index.html`);
    filesToFetch.push(...(await getUrlsToFetch(`http://${resolvedIP}/img/`)));
    filesToFetch.push(...(await getUrlsToFetch(`http://${resolvedIP}/js/`)));
    filesToFetch.push(...(await getUrlsToFetch(`http://${resolvedIP}/sfx/`)));
    filesToFetch.push(...(await getUrlsToFetch(`http://${resolvedIP}/bgm/`)));
    
    let promiseStatuses = filesToFetch.map(() => ({ fileName: "", resolved: false, attempts: 0 }));
    promises = filesToFetch.map((filename, index) => fetchSingleResource(filename, resolvedIP, promiseStatuses[index]).catch((err) => {}));

    while (promises.length !== 0) {
      await Promise.allSettled(promises);
      promiseStatuses = promiseStatuses.filter(status => status.resolved === false);
      
      promises = promiseStatuses.map((s) => fetchSingleResource(s.fileName, resolvedIP, s));
    }
})().then(() => {
    console.log(`\x1b[34m[  INFO   ]\x1b[0m Finshed downloading with ${errCount} errors.`);
    fs.copyFileSync("EatTheDungeon/img/Bangers-Regular.ttf", "EatTheDungeon/Bangers-Regular.ttf");
});
