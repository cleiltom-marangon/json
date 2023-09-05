const http = require('http');
const request = require('request');

const server = http.createServer((req, res) => {
  const url = req.url.slice(1); // Remove a barra inicial (/) da URL recebida

  // Configure as opções da solicitação para o servidor externo
  const options = {
    url: url,
    headers: {
      'User-Agent': 'request'
    }
  };

  // Faça a solicitação para o servidor externo
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Defina os cabeçalhos CORS na resposta do servidor intermediário
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

      // Encaminhe o corpo da resposta do servidor externo para o cliente
      res.end(body);
    } else {
      res.writeHead(500); // Se ocorrer um erro, retorne um erro interno do servidor
      res.end('Erro ao processar a solicitação.');
    }
  });
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Servidor intermediário em execução na porta ${PORT}`);
});
