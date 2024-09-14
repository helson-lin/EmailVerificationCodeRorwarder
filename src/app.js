// author: helsonlin
// email: helsonlin@163.com
// date: 2024-07-26

const { MailService } = require('./service/mail');
const { Notify } = require('./service/notify');
const { readConfig } = require('./service/config');

let barkServer,emailConfigs,notify;
function initializeMailService(config) {
    const mailService = new MailService(config);
    mailService.initialize()
    mailService.codeNotify(({ 
        verificationCode,
        subject
    }) => {
        notify.notify({
            verificationCode,
            subject
        });
    });
    mailService.connect();
    return mailService;
}

function initializeAllMailServices() {
    const mailServices = emailConfigs.map(config => {
        try {
            initializeMailService(config)
        } catch (error) {
            console.error(`Error initializing mail service: ${error}, config: ${config}`);
        }
    });
    return mailServices;
}


readConfig().then(config => {
    barkServer = config.barkServer;
    emailConfigs = config.emailConfigs;
    notify = new Notify(barkServer);
    initializeAllMailServices();
    console.log('\x1b[36m%s\x1b[0m', 'Email Verification Code Notification Service Started');
}).catch(err => {
    console.log(err);
    process.exit(1);
});



