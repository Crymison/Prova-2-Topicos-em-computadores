const nodemailer = require('nodemailer');
const storage = require('node-persist');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let addID = 0;
let cont = 0;

//Gera noticia e email quando é iniciado o servidor
async function inicia(){
    await storage.init();
    await storage.setItem('Noticia', [{"ID":0,"titulo":"Iniciado","resumo":"Iniciado","url":"www.Inicio.com.br"}]);
    await storage.setItem('Email', [{user: 'piper.connelly82@ethereal.email', pass: 'HubyYg291uEA1QFUeA'}]);
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

async function enviaEmail(ID, i){
    await storage.init();

    //Pega a noticia que tem o id passado
    const recebeNoticia2 = await storage.getItem('Noticia');
    var auxNoticiaIdParaEmail = recebeNoticia2.find(b => b.ID == ID);

    //Pega todos os e-mails
    const recebEmail2 = await storage.getItem('Email');

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rosalee.kuhn20@ethereal.email',
            pass: 'ncwPb1m5vwDra1quvH'
        }
    });
    
    const info = await transporter.sendMail({
        from: 'rosalee.kuhn20@ethereal.email',
        to: recebEmail2[i].user,
        subject: auxNoticiaIdParaEmail.titulo,
        text: auxNoticiaIdParaEmail.resumo + "\nURL:" + auxNoticiaIdParaEmail.url
    });
    console.log('Message id: ', info.messageId);
    console.log('Message URL: ', nodemailer.getTestMessageUrl(info));
}

async function Dispara(id){
    await storage.init();
    const recebEmail1 = await storage.getItem('Email');

    //Cria um intervalo para enviar os e-mails
    const intervalo = setInterval(() =>{
        if(cont < recebEmail1.length){
            enviaEmail(id, cont);
        }
        cont++;
        //Finaliza o intervalo
        if(cont == recebEmail1.length){
            console.log('Fim da repetição');
            clearInterval(intervalo);
            cont = 0;
        }
    }, 2000)
}

app.put('/enviar/:noticiaId', async (req, res) => {
    const noticiaId1 = parseInt(req.params.noticiaId);
    Dispara(noticiaId1);
    await storage.init();
    const enviaEmail = await storage.getItem('Email');
    res.send(enviaEmail);
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})