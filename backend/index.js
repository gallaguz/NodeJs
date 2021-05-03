const express = require('express');

const {sequelize, User} = require('./models');

const app = express();
app.use(express.json());

app.post('/users', async (request, response) => {
    const {name, username, password, email, role} = request.body;

    try {
        const user = await User.create({name, username, password, email, role});

        return response.json(user);
    } catch (e) {
        console.log(e);
        return response.status(500).json(e);
    }
})

app.listen({port: 5000}, async () =>{
    console.log('Server up in http://localhost:5000')
    await sequelize.authenticate();
    console.log('DB Connected');
})

