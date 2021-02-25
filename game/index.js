const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const statistic = require('./statistic');
const logger = require('./logger');


function recursiveGame () {
    let coin = Math.random();
    rl.question('Choose Heads or Tails ("1" - Heads, "0" - Tails, "q" - exit, "s" - statistic, press Enter for choose Tails) ', function(answer) {
        if (answer === 'q') {
            // Выход
            console.log('See You');

            rl.close();
        }
        else if (answer === 's') {
            // Вывод статистики
            statistic();

            rl.close();
        } else if (+answer >= 0 && +answer <= 1) {
            head = coin >= 0.5 && +answer === 1 ? true : false;
            tail = coin < 0.5 && +answer === 0 ? true : false;

            status = head === false && tail === false ? 'Loss' : 'Win';

            // Пишем лог
            logger({
                status: status === 'Loss' ? 0 : 1,
                date: new Date().getTime()
            });
            
            console.log(status);

            // Рекурсивный вызов
            recursiveGame();
        } else {
            console.log('Enter correct answer - 1 or 0');

            // Рекурсивный вызов
            recursiveGame();
        }
    });
}

// Сделал рекурсивно, а не while (true), поскольку, после изучения вопроса,
// пришел к выводу, что readline в цыкле работает не так, как ожидается.
// Для цикла, видимо, стоит использовать что-то иное.
// https://jttan.com/blog/nodereadline/

recursiveGame();

