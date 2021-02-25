'use strict';

const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const logFile = 'logFile.json';

function logger(data = null) {
    let log;

    if (fs.existsSync(logFile)) {
        readFilePromise(logFile, 'utf8')
            .then((fdata) => {
                log = JSON.parse(fdata);
                log.data.push(data);

                writeFilePromise(logFile, JSON.stringify(log))
                    .then((fdata) => {
                        // console.log('Log updated')
                    })
                    .catch((err) => {
                        console.log('error:', err);
                    });
            })
            .catch((err) => {
                console.log('error:', err);
            });
    } else {
        console.log('err')
    }   
}

module.exports = logger;