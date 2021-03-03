import express from 'express';
import cookieParser from "cookie-parser";

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cookieParser('secret key'))

app.get('/', (req, res) => {

    res.send(`
        <a href="/set-cookie">set-cookie</a>
        <br>
        <a href="/get-cookie">get-cookie</a>
    `)
})


app.get('/get-cookie', (req, res) => {
    console.log('Cookie: ', req.cookies)
    // console.log('Cookie: ', req.cookies['token'])
    res.send('Get Cookie')
})

app.get('/set-cookie', (req, res) => {
    res.cookie('token', '12345ABCDEFG', {
        maxAge: (3600 * 24),
        //secure: true,
    })
    res.send('Set Cookie')
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}...`)
})