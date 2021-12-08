const nodemailer = require('nodemailer');
const storage = require('node-persist');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let addID = 0;

async function inicia(){
    await storage.init();
    await storage.setItem('Noticia', [{"ID":0,"titulo":"Iniciado","resumo":"Iniciado","url":"www.Inicio.com.br"}]);
    await storage.setItem('Email', [{user: 'lavinia.schinner60@ethereal.email', pass: 'qQNWuaB47qvh6wnseg'}]);
}

app.init = inicia();

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
    recebeNoticia.push({ID: geraid, titulo: noticia.titulo, resumo: noticia.resumo, url: noticia.url});
    storage.updateItem('Noticia', recebeNoticia);
}

app.post('/noticia', async (req, res) => {
    const novaNoticia = req.body;
    addID++;
    postNoticia(novaNoticia, addID);
    res.send('Noticia salva!');
})

async function getNoticiaID(ID){
    await storage.init();
    const recebeNoticia1 = await storage.getItem('Noticia');
    var auxNoticiaId = recebeNoticia1.find(b => b.ID == ID);
    return auxNoticiaId;
}
app.get('/noticia/:noticiaId', (req, res) => {
    const noticiaId = parseInt(req.params.noticiaId);
    if(isNaN(noticiaId)) {
        res.status(500).send('Não inteiro');
        return;
    }else if(noticiaId > addID || noticiaId < 0){
        res.status(500).send('Id da noticia invalido');
        return;
    }else{
        const auxReceb = getNoticiaID(noticiaId);
        auxReceb.then(n => {
            res.send(n);
        });
    }
});

async function postInscricao(email){
    await storage.init();
    const recebEmail = await storage.getItem('Email');
    recebEmail.push({user: email.user, pass: email.pass});
    await storage.updateItem('Email', recebEmail);
}

app.post('/inscricao', async (req, res) => {
    const novoEmail = req.body;
    postInscricao(novoEmail);
    res.send('Email salvo!');
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})