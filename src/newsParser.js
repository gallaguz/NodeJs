const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

router.get("/",
    (req, res) => {

        getNews().then((content) => {

            res.send(content);
        }).catch((error) => {
            res.render("error", error);
        })
    });


app.use('/', router);
app.listen(process.env.port || port, () => {
    console.log(`http://localhost:${port}`)
});

function getNews() {
    return axios.get('http://ria.ru/').then((res) => {

        let content = [];
        const $ = cheerio.load(res.data);
        $('.cell-list__item-desc').each(function(i, element){
            content.push($(this).text());
        });

        return content;
    }).catch((err) => {
        console.log(err);
    })
}