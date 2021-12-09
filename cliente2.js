const axios = require('axios').default;

axios.get('http://localhost:3000/noticia')
.then((response) => {
    console.log(response.data);
});

axios.get('http://localhost:3000/noticia/1')
.then((response) => {
    console.log(response.data);
});

axios.put('http://localhost:3000/enviar/1')
.then((response) => {
    console.log(response.data);
});