const express = require('express');
const messageQueue = require('./bull/queue-config');
const consumer = require("./bull/consumer")

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

//start consumer
consumer();

app.get('/ping', async (req, res) => {
    res.sendStatus(200);
});

// Route order to produce message for test purpose
app.get('/produce', async (req, res) => {
    const message = {"date": new Date().getTime()};

    // Add message to queue
    await messageQueue.add(message);

    console.log('Message produced:', message);
    res.status(200).send({ status: 'Message added to queue', message });
});

// Route order to produce error message for test purpose
app.get('/error', async (req, res) => {
    const message = {error:true};

    // Add message to queue
    await messageQueue.add(message);

    console.log('Message produced:', message);
    res.status(200).send({ status: 'Message added to queue', message });
});

// Démarre le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
