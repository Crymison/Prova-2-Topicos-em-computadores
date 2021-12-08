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
    if(recebeNoticia == null){//Gera a noticia caso ela não exista
        await storage.setItem('Noticia', [{"ID":0,"titulo":"O primeiro","resumo":"Primeiro","url":"www.primeiro.com.br"}]);
    }else{//Atualiza com uma nova noticia
        recebeNoticia.push({ID: geraid, titulo: noticia.titulo, resumo: noticia.resumo, url: noticia.url});
        await storage.updateItem('Noticia', recebeNoticia);
    }
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
    var auxNoticiaId = recebeNoticia1;
    auxNoticiaId = recebeNoticia1.find(b => b.ID == ID);
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
    if(recebEmail == null){//Gera um email caso ele não exista
        await storage.setItem('Email', [{user: 'lavinia.schinner60@ethereal.email', pass: 'qQNWuaB47qvh6wnseg'}]);
    }else{//Atualiza com um novo email
        recebEmail.push({user: email.user, pass: email.pass});
        await storage.updateItem('Email', recebEmail);
    }
}

app.post('/inscricao', async (req, res) => {
    const novoEmail = req.body;
    postInscricao(novoEmail);
    res.send('Noticia salva!');
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})