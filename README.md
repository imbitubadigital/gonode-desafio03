# Desafio 3

### Cconclusão do desafio 03 do mòdulo 03 do curso GoNode da Rocketseat

Como desafio foi proposto melhorar a aplicação desenvolvida durante o terceiro módulo com as seguintes funcionalidades:

- Armazene as intenções de compra (Purchase) no MongoDB criando um Model e salvando
  os dados da purchase no método store do PurchaseController;
- Crie uma nova rota para o vendedor aceitar uma intenção de compra declarando o item como vendido e a partir desse momento o anúncio não deve ser mais exibido nas
  listagens e não deve ser mais possível realizar uma intenção de compra para esse anúncio;
- O Ad deve possui um campo adicional chamado purchasedBy que armazena o ID da
  Purchase que o vendedor aceitou, caso esse campo esteja presente, quer dizer que o
  anúncio foi vendido;

#### Como desafio pessoal implementei:

- **Envio de email** informando o cliente que sua proposta de compra foi aprovada
- A funcionalidade **cancelar a compra** após a confirmação concluída, retornando o produto a listagem tornando-o novamente ativo para prosposta de compra
- **Envio de email** informando o cliente sobre o cancelamento
