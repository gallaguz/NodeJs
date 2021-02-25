'use strict';

const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

const logFile = 'logFile.json';

function streaks (log) {
    // Выбираем из лога только результаты игр
    let arr = log.map((el)=> {
        return el.status;
    })
    
    let current = {"win" : 0, "loss" : 0};
    let max = {"win" : 0, "loss" : 0};

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1 && (arr[i] === arr[i-1])) {
            current.win++;
            max.win = (current.win > max.win) ? current.win : max.win;
        } else {
            current.win = 1;
        }

        if (arr[i] === 0 && (arr[i] === arr[i-1])) {
            current.loss++;
            max.loss = (current.loss > max.loss) ? current.loss : max.loss;
        } else {
            current.loss = 1;
        }
    }
    
    return max;
}

function statistic () {
    let obj = { "statistic" : [] };

    try {
        if (fs.existsSync(logFile)) {
            readFilePromise(logFile, 'utf8')
                .then((fdata) => {
                    let log = JSON.parse(fdata);
                    
                    let gamesCount = log.data.length
                    let winCount = (log.data.filter(g => g.status === 1)).length;
                    let winAvg = Math.round((winCount/gamesCount)*100);
                    let maxStreaks = streaks(log.data);

                    obj.statistic.push({ "games count" : gamesCount });
                    obj.statistic.push({ "win count" : winCount });
                    obj.statistic.push({ "loss count" : (gamesCount - winCount) });
                    obj.statistic.push({ "winAvg (in percents)" : winAvg });
                    obj.statistic.push({ "winning streak" : maxStreaks.win });
                    obj.statistic.push({ "loss streak" : maxStreaks.loss });

                    // Выводим статистику
                    console.log(obj);
                })
                .catch((err) => {
                    console.log('error:', err);
                });
        } else {
            return false;
            console.log('err')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = statistic;
