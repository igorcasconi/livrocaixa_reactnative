<div style="text-align: justify;">
  <img src="./src/assets/logo.png" alt="Logo" width="250"/> 
  
 # Livro Caixa
 
 App in PlayStore: [LivroCaixa - Aplicativo](https://play.google.com/store/apps/details?id=com.reacttsproject)
 
</div>

#### Aplicativo pensado para aqueles que ainda utilizam um livro ou caderno para escrever as movimentações de caixa, informando a data, produto e valor. 

Construção da ideia para o App
===============================

##### Muito comum ver que nos tempos de hoje pequenos comerciantes e artesões escrevem suas movimentações, seja de entrada ou saída, e tem todo o processo de realizar um cálculo olhando item por item de forma toda manual. 
##### O aplicativo vem para mudar e automatizar esse processo, fornecendo a cada movimentação o seu saldo atualizado e te dando um relatório anual e mensal.

Versão em produção
===============================
### 1.1.6

Screenshots da aplicação
==============================
<img src="./app-apresentcao/2-apresentacao-tela1.png" alt="Tela Inicial" width="250"/> <img src="./app-apresentcao/3-apresentacao-entradas.png" alt="Tela de Movimentação Entrada" width="250"/> <img src="./app-apresentcao/4-apresentacao-saidas.png" alt="Tela de Movimentação Saídas" width="250"/>
<img src="./app-apresentcao/5-apresentacao-adicione.png" alt="Tela Adicionar Movimentação" width="250"/> <img src="./app-apresentcao/6-apresentacao-relatorio-anual.png" alt="Relatório Anual" width="250"/> <img src="./app-apresentcao/7-apresentacao-relatorio-mensal.png" alt="Relatório Mensal" width="250"/>

Linguagem e Tecnologias
===============================
  - Typescript
  - Front-end
    - React Native
  - Back-end
    - NodeJS
      - Sequelize (Conexão, criação de estrutura e querys no banco de dados)
      - Express (rotas e construção da api)
      - Cors (permissão de acesso a api)
    - Firebase Authentication (Criação e conexão do usuário para controle dos dados no banco de dados)

BIbliotecas
=============================
- @react-native-community/datetimepicker
- @react-native-firebase
- @react-navigation
- date-fns
- axios
- react-native-elements
- react-native-paper
- react-nativer-masked-text
- formik
- yup
