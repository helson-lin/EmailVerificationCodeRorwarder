// author: helsonlin
// email: helsonlin@163.com
// date: 2024-07-26

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


const readConfig = () => {
    return new Promise((resolve, reject) => {
        const configPath = path.join(process.cwd(), 'config.yml');
        if (!fs.existsSync(configPath)) {
            console.log('没有找到 config.yml 文件，请先创建 config.yml 文件');
            reject(new Error('没有找到 config.yml 文件，请先创建 config.yml 文件'));
        }
        const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
        // 校验 config.yml 文件是否合法
        if (!config.emailConfigs || !Array.isArray(config.emailConfigs) || !config.barkServer) {
            reject(new Error('config.yml 文件格式不合法，请按照正确格式创建'));
        } else {
            resolve(config);
        }
    });
}

module.exports = {
    readConfig
}