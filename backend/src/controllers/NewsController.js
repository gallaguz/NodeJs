import axios from "axios";
import cheerio from "cheerio";
import urlApi from "url";

let sources = [
    {
        'title' : 'Yandex',
        'src' : 'https://yandex.ru/news',
        'className' : '.news-navigation-menu__item',
        'newsClassName' : '.card__text_short'
    },
    {
        'title' : 'Ria',
        'src' : 'https://ria.ru',
        'className' : '.cell-extension__item-link',
        'newsClassName' : '.list-item__content'
    }
];

export const getCategories = (req, res) => {
    let p = [];

    sources.forEach((el) => {
        p.push(parseCategories(el))
    })

    return Promise.all(p)
        .then(values => res.status(200)
            .json(values)
        )
}

export const getNews = (req, res) => {

    // console.log(req.body)

    return axios.get(req.body.url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
        }
    }).then((response) => {

        let data = [];

        const $ = cheerio.load(response.data);
        $(req.body.source.newsClassName).each(function(i, element){
            data.push($(element).text());
        });

        console.log(data)
        return data
    }).catch((err) => {
        console.log(err);
    })
}

function parseCategories(source) {
    return axios.get(source.src).then((res) => {

        let data = [];
        const $ = cheerio.load(res.data);
        $(source.className).each(function(i, element){

            let url = $(element).attr('href');
            let title = $(element).text();

            if (typeof url === 'string') {
                let categoryUrl = source.title === 'Ria' ? source.src + urlApi.parse(url).path : url;

                data.push({
                    url : categoryUrl,
                    // sourceTitle : source.title,
                    source : source,
                    // host : urlApi.parse(url).host,
                    // path : urlApi.parse(url).path,
                    // port : urlApi.parse(url).port,
                    // search : urlApi.parse(url).search,
                    // hostname : urlApi.parse(url).hostname,
                    // pathname : urlApi.parse(url).pathname,
                    title : title
                });
            }
        });

        return { 'title' : source.title, 'data' : data};
    }).catch((err) => {
        console.error(err);
    })
}