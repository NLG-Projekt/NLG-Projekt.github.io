const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:5500/play_game', true); // Change the port here
xhr.setRequestHeader('Content-Type', 'application/json');

const app = express();
const port = 5500; // Change this to your preferred port

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.use(cors()); // Add this line
app.use(bodyParser.json());

app.post('/play_game', (req, res) => {
    const jsonData = JSON.stringify(req.body);

    const pythonProcess = spawn(pythonCommand, [...pythonArgs, jsonData]);

    let resultData = '';

    pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            const result = JSON.parse(resultData);
            res.status(200).json(result);
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
xhr.open('POST', 'http://localhost:3000/play_game', true);
