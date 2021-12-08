const nodemailer = require('nodemailer');
const storage = require('node-persist');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let addID = 0;

async function getNoticia(){
    await storage.init();
    const aux = await storage.getItem('Noticia');
    return aux;
}

app.get('/noticia', async (req, res) =>{
    const auxReceb = getNoticia();
    auxReceb.then(n => {
        res.send(n);
    });
})

async function postNoticia(noticia, geraid){
    await storage.init();
    const recebeNoticia = await storage.getItem('Noticia');
    if(recebeNoticia == null){
        await storage.setItem('Noticia', [{"ID":0,"titulo":"O primeiro","resumo":"Primeiro","url":"www.primeiro.com.br"}]);
    }else{
        recebeNoticia.push({ID: geraid, titulo: noticia.titulo, resumo: noticia.resumo, url: noticia.url});
        await storage.updateItem('Noticia', recebeNoticia);
    }
}

app.post('/noticia', async (req, res) => {
    const nova = req.body;
    addID++;
    postNoticia(nova, addID);
    res.send('Noticia salva!');
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})