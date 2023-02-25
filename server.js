const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');
const express = require('express');
const path = require('path');
const dataList = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(dataList)
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuid(),
    };
    readAndAppend(newNote, './db/db.json');
    const response = {
        status: "success",
        body: newNote,
    };
    res.json(response);

})


app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(dataList, 'utf8', (err, data) => {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        // for (let i = 0; i < parsedData.length; i++) {
        //     if (req.params.id === parsedData[i].id) {
        //         delete parsedData[i];
        //     }
        //     fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
        //         err ? console.error(err) : console.info(`\nData written to destination`)
        //     );
        // }

    }
    )

})

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));