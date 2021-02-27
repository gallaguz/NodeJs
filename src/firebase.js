const axios = require('axios');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function saveToFirebase(data) {
    return axios.post('https://test-2b4b5-default-rtdb.europe-west1.firebasedatabase.app/test.json', data)
        .then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        }
    )
}

function getFromFirebase() {
    return axios.get('https://test-2b4b5-default-rtdb.europe-west1.firebasedatabase.app/test.json')
        .then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        }
    )
}

function firebase () {
    rl.question('"g" - get data, "s" - save data, "q" - exit: ', function(answer) {
        if (answer === 'g') {
            getFromFirebase()
                .then((res) => {
                    console.log(res)
                })

            rl.close();
        } else if (answer === 's') {
            rl.question('What data you wanna save? ', function(answer) {
                let data = JSON.stringify({
                    date: new Date().toJSON(),
                    body: answer
                })

                saveToFirebase(data)
                    .then((res) => {
                        console.log('Success. Saved to firebase store: ');
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    });

                rl.close();
            });
        } else if (answer === 'q') {
            console.log('By by!');
            rl.close();
        } else {
            console.log('Enter correct command.');
            firebase();
        }
    });
}

firebase();