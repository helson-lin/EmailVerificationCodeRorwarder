// author: helsonlin
// email: helsonlin@163.com
// date: 2024-07-26

const axios = require('axios');

class Notify {
    constructor(barkServer) {
        this.barkServer = barkServer;
    }

    async notify({
        verificationCode: code,
        subject
    }) {
        if (!code) {
            return false;
        }
        const url = `${this.barkServer}/${subject}/${code}?autoCopy=1&copy=optional&sound=newemail`;
        const res = await axios.get(url);
        return res.status === 200;
    }
}

module.exports = {
    Notify
}