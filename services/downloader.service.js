const axios = require('axios');
const logService = require('./log.service');

exports.getImageUrlBing = async function(){
    try {
        const { data } = await axios.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR');
        logService.logTimestamp(console.log, 'Dados obtidos no Bing com sucesso');

        if (data &&
            data.images &&
            data.images.length)
            {
                return 'https://www.bing.com' + data.images[0].url
            }

        return null;
        
    } catch (error) {
        logService.logTimestamp(console.error, 'Erro ao obter dados do Bing: ' + error.message);

        return null;
    }    
}

exports.getImageUrlChromecast = () => 'https://clients3.google.com/cast/chromecast/home';