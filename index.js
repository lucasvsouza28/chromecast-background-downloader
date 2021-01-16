const
    axios = require('axios'),
    cron = require('node-cron'),
    wallpaper = require('wallpaper'),
    fs = require('fs'),
    Path = require('path'),
    pp = require('puppeteer'),
    os = require('os');

const
    service = require('./services/downloader.service'),
    {log, error: err} = require('./services/log.service');

cron.schedule('00 00 */1 * * * *', async () => {

    try {
        const url = await service.getImageUrlChromecast();

        if (url) {
            const path = os.tmpdir() + '/download.jpg'
            await downloadPuppetter(url, path);            
        }
        
    } catch (error) {
        err('Erro não tratado: ', error.message);
    }    

});

async function downloadPuppetter(url, path) {

    const browser = await pp.launch({ headless: true, args: ['--no-sandbox'] });
    log('browser criado...')

    const page = await browser.newPage();
    log('page criada...')

    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url, { waitUntil: 'networkidle2' });
    log(`navegando para ${ url }`)

    await page.evaluate(() => {
        const els = document.querySelectorAll('.zrH3sf');
        els.forEach((el, k) =>{
            el.setAttribute('style', 'display:none !important');
        });    
    });

    await page.screenshot({path: path})
    log('screenshot');

    await page.close();
    await browser.close();

    await wallpaper.set(path);
    log('Papel de parede atualizado');
}