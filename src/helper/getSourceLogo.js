require('dotenv').config()
module.exports = (sourceName = "") => {
    switch (sourceName.toLowerCase()) {
        case 'twitter':
            return 'https://i.imgur.com/jzz3zPx.png';
    
        case 'pixiv':
            return 'https://i.imgur.com/cbKNx43.png';

        default: // default image
            return process.env.SOURCE_DEFAULT_IMG;
    }
};