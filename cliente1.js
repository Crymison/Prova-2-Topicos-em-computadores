const axios = require('axios').default;

// NOTICIAS
// 1
setTimeout(() =>{
    axios.post('http://localhost:3000/noticia', {
        ID: 1,
        titulo: 'Primeiro teste',
        resumo: 'Realizando o primeiro teste',
        url: 'http://www.example.com/'
    }).then((response) => {
        console.log(response.data);
    });
    setTimeout(() =>{
        //2
        axios.post('http://localhost:3000/noticia', {
            ID: 2,
            titulo: 'Segundo teste',
            resumo: 'Realizando o segundo teste',
            url: 'http://www.example.edu/bit'
        }).then((response) => {
            console.log(response.data);
        });
        setTimeout(() =>{
            //3
            axios.post('http://localhost:3000/noticia', {
                ID: 3,
                titulo: 'Terceiro teste',
                resumo: 'Realizando o Terceiro teste',
                url: 'http://argument.example.com/#badge'
            }).then((response) => {
                console.log(response.data);
            });
            //4
            setTimeout(() =>{
                axios.post('http://localhost:3000/noticia', {
                    ID: 4,
                    titulo: 'Quarto teste',
                    resumo: 'Realizando o Quarto teste',
                    url: 'http://example.com/books.html'
                }).then((response) => {
                    console.log(response.data);
                });
                //5
                setTimeout(() =>{
                    axios.post('http://localhost:3000/noticia', {
                        ID: 5,
                        titulo: 'Quinto teste',
                        resumo: 'Realizando o Quinto teste',
                        url: 'https://www.example.com/act/argument?brake=brick#blade'
                    }).then((response) => {
                        console.log(response.data);
                    });
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)

// EMAILS
setTimeout(() =>{
    // 1
    axios.post('http://localhost:3000/inscricao', {
        user: 'mckayla.carroll80@ethereal.email',
        pass: 'mmPRa4qaeeRspypBjp'
    }).then((response) => {
        console.log(response.data);
    });
    setTimeout(() =>{
        //2
        axios.post('http://localhost:3000/inscricao', {
            user: 'madeline.bernhard56@ethereal.email',
            pass: 'rW69BjXsGKJfGBn49K'
        }).then((response) => {
            console.log(response.data);
        });
        setTimeout(() =>{
            //3
            axios.post('http://localhost:3000/inscricao', {
                user: 't3ufmk3k2nntbcfd@ethereal.email',
                pass: 'a2hYegFx6VR3Uq4TAH'
            }).then((response) => {
                console.log(response.data);
            });
            //4
            setTimeout(() =>{
                axios.post('http://localhost:3000/inscricao', {
                    user: 'rogers.lowe68@ethereal.email',
                    pass: '4qjFkZz6fNEknXznDd'
                }).then((response) => {
                    console.log(response.data);
                });
                //5
                setTimeout(() =>{
                    axios.post('http://localhost:3000/inscricao', {
                        user: 'glennie.flatley3@ethereal.email',
                        pass: 'sZ7SvbANWfbdjq3xPs'
                    }).then((response) => {
                        console.log(response.data);
                    });
                    setTimeout(() =>{
                        axios.post('http://localhost:3000/inscricao', {
                            user: 'tiffany.howell61@ethereal.email',
                            pass: 'ySrTWFBGRk2k75XUxQ'
                        }).then((response) => {
                            console.log(response.data);
                        });
                        setTimeout(() =>{
                            axios.post('http://localhost:3000/inscricao', {
                                user: 'dana.west58@ethereal.email',
                                pass: '	XKEWBqTm6zxYTE6bKF'
                            }).then((response) => {
                                console.log(response.data);
                            });
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)