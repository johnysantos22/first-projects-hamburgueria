/*
Desafio Node - 1
🚀 Sobre o desafio
Crie uma aplicação que fará o cadastro dos pedidos de uma hamburgueria, e você deve utilizar Node e Express.

Rotas
POST /order: A rota deve receber o pedido do cliente, o nome do cliente e o valor do pedido, essas informações devem ser passadas dentro do corpo(body) da requisição, e com essas informações você deve registrar o novo pedido dentro de um array no seguinte formato: { id: "ac3ebf68-e0ad-4c1d-9822-ff1b849589a8", order: "X- Salada, 2 batatas grandes, 1 coca-cola", clientName:"José", price: 44.50, status:"Em preparação" }. Não se esqueça que o ID deve ser gerado por você, dentro do código utilizando UUID V4, assim que o pedido é criado, você deve sempre colocar o status como "Em preparação".

GET /order: Rota que lista todos os pedidos já feitos.

PUT /order/:id: Essa rota deve alterar um pedido já feito. Pode alterar,um ou todos os dados do pedido.O id do pedido deve ser enviado nos parâmetros da rota.

DELETE /order/:id: Essa rota deve deletar um pedido já feito com o id enviado nos parâmetros da rota.

GET /order/:id: Essa rota recebe o id nos parâmetros e deve retornar um pedido específico.

PATCH /order/:id: Essa rota recebe o id nos parâmetros e assim que ela for chamada, deve alterar o status do pedido recebido pelo id para "Pronto".

Exemplo
Se eu chamar a rota POST /order repassando { order: "X- Salada, 2 batatas grandes, 1 coca-cola", clienteName:"José", price: 44.50 }, o array deve ficar assim:

[
  {
    id: "ac3ebf68-e0ad-4c1d-9822-ff1b849589a8",
    order: "X- Salada, 2 batatas grandes, 1 coca-cola",
    clienteName:"José", 
    price: 44.50,
    status:"Em preparação"
  }
];
Se eu chamar a rota PATCH /order/ac3ebf68-e0ad-4c1d-9822-ff1b849589a8, o array deve ficar assim:

[
  {
    id: "ac3ebf68-e0ad-4c1d-9822-ff1b849589a8",
    order: "X- Salada, 2 batatas grandes, 1 coca-cola",
    clienteName:"José", 
    price: 44.50,
    status:"Pronto"
  }
];
Middlewares
Crie um middleware que será utilizado em todas rotas que recebem o parâmetro ID, então ele deve verificar se o ID passado existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

Crie um middleware que é chamado em todas requisições que tenha um console.log que mostra o método da requisiçao(GET,POST,PUT,DELETE, etc) e também a url da requisição.

Exemplo
[GET] - /order

📅 Entrega
Após finalizar o desafio, suba o projeto para o seu github e compartilhe no Club, para todos verem que você conseguiu.

Feito com ♥ by Dev Club - Rodolfo Mori 
 */


const express = require('express');
const uuid = require('uuid');

const port = 3000;
const app = express();

const orderHamburguer = [];

// Adicione o middleware express.json() aqui
app.use(express.json());

app.get('/order', (request, response) => {
  return response.json(orderHamburguer);
});

app.post('/order', (request, response) => {
  const { order, clienteName, price } = request.body;

  const newOrder = { id: uuid.v4(), order, clienteName, price, status: 'Em preraração' };

  orderHamburguer.push(newOrder);

  return response.status(201).json(newOrder);
});

app.put('/order/:id', (request, response) => {
  const { id } = request.params;
  const { order, clienteName, price } = request.body;

  const updateOrder = { id, order, clienteName, price }

  const ordersIndex = orderHamburguer.findIndex(order => order.id === id);

if (!ordersIndex) {
  return response.status(404).json({ error: "Pedido não encontrado" });
}
 

  orderHamburguer[ordersIndex] = updateOrder;

  return response.json(updateOrder)
});

app.delete('/order', (request, response) => {
  const {id} =  request.params;
  const ordersIndex = orderHamburguer.filter(order => order.id !== id );
   
  if(!id){ 
    return response.status(400 ).json({error:"Não foi possível realizar a exclusão."})
  }

  orderHamburguer.splice(ordersIndex, 1);

  return response.status(204).json();
});
 

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


