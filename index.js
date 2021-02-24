const beep = require('beepbeep');
const fs = require('fs');
const execa = require('execa');
const Listr = require('listr');
const chalk = require('chalk')

console.log(chalk.yellow('Hello!!!'))
console.log(chalk.red('This is my first NodeJs APP'))

new Listr([
    {
        title: 'Start + BEEP',
        task: () => {
            beep ();
        }
    },
    {
        title: 'Scan current dir, save result in file - "list.txt". + BEEP',
        task: () => {
            const list = execa('ls');
            //list.then(result => console.log(result.stdout));
            list.stdout.pipe(fs.createWriteStream('list.txt'));
            beep ([500]);
        }
    },
    {
        title: 'End + BEEP',
        task: () => {
            beep ([1000]);
        }
    },
]).run();