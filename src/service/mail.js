// author: helsonlin
// email: helsonlin@163.com
// date: 2024-07-26

const Imap = require('imap');
const { simpleParser } = require('mailparser');

class MailService {
    constructor({
        user,
        password,
        host,
        port,
        tls
    }) {
        // 如果缺少参数，则抛出错误
        if (!user || !password || !host || !port || !tls) {
            throw new Error('Missing required parameters');
        }
        this.user = user;
        this.password = password;
        this.host = host;
        this.port = port;
        this.tls = tls;
        this.mailbox = [];
    }

    openInbox(cb) {
        this.imap.openBox('INBOX', true, cb);
    }

    initialize() {
        this.imap = new Imap({
            user: this.user,
            password: this.password,
            host: this.host,
            port: this.port,
            tls: this.tls
        });

        this.imap.once('ready', () => {
            // 打印IMAP ready
            console.log(`Email: ${this.user} is ready for message`);
            this.imap.id({
                name: "mailForwarder",
                version: "0.0.1",
                vendor: "mailForwarder",
                "support-email": "helsonlin@163.com"
            }, (err, response) => {
                if (err) {
                    console.log('Error sending ID command:', err);
                    return;
                }
                this.openInbox((err, box) => {
                    if (err) {
                        console.log('Error opening inbox:', err);
                        return;
                    }
                    this.imap.on('mail', () => {
                        console.log('New mail received');
                        
                        this.imap.search(['UNSEEN'], (err, results) => {
                            if (err) throw err;
                            if (results.length === 0) return;

                            const latest = results[results.length - 1];
                            const f = this.imap.fetch(latest, { bodies: '' });
                            f.on('message', (msg, seqno) => {
                                msg.on('body', (stream, info) => {
                                    simpleParser(stream, (err, mail) => {
                                        if (err) throw err;
                                        console.log('New mail:', mail.subject);
                                        // 
                                        const verificationCode = this.extractVerificationCode(mail.text);
                                        if (verificationCode) {     
                                            const subject = mail.subject;
                                            console.log('Verification code:', verificationCode);
                                            this.cb && this.cb({verificationCode, subject});
                                        }
                                    });
                                });
                            });
                            f.once('error', (err) => {
                                console.log('Fetch error: ' + err);
                            });
                        });
                    });
                });
            });
        });

        this.imap.once('error', (err) => {
            console.log(`Email: ${this.user} connection error`);
            console.log(err);
            this.close();
        });
        return this;
    }

    extractVerificationCode(text) {
        const regex = /[\W](\d{6})[\W]/; // 
        const match = text.match(regex);
        return match ? match[1] : null;
    }

    codeNotify(cb) {
        if (cb && typeof cb === 'function') {
            this.cb = cb;
        }
        return this;
    }

    connect() {
        this.imap.connect();
    }

    close() {
        this.imap.end();
    }
}

module.exports = { MailService };