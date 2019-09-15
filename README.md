# 7egend project



## Objetivos do desafio

- [x] Apresentar lista de produtos (**image**, **name**, **price**, **colors**, **rating**) 
  - [x] Image
  - [x] Name
  - [x] Price
  - [x] Colors
  - [x] Rating
- [ ] A lista deve ser paginada 
- [x] Permitir filtrar os produtos usando tags (o filtro deve persistir mesmo no reload da página)
- [x] Rating deve ser apresentados numa escala de 0 a 100
- [x] Os produtos devem ser apresentados ordenados por rating
- [x] Deve existir um loader visível enquanto a informação é carregada da API
- [ ] Clicando numa "linha" deve abrir a página do produto e mudar o URL
- [x] Clicando na imagem deve abrir um modal apresentando nome e imagem
- [x] Layout deve ser responsivo



## Algumas notas

- Foi implementado um sistema de local cache, para que o sistema só vá à API uma vez, caso contrário sempre que existia um refresh iria demorar eternidades até que respondesse.
  - Falta implementar um sistema de expiration para a informação local.
- O filtro é guardado localmente.
- Não consegui entender o que querem dizer com linha, acredito mais que pretendessem dizer produto, ou que estivessem a considerar que cada produto era uma linha.
- Ordenação implementada, mas acho que pelo menos um outro deveria ser implementado, o do preço.
- Nem todos os valores tinham Rating :/
- Questões que ficaram por implementar:
  - Paginação
    - seria uma questão de adicionar ao showList um controlador para esse efeito.
  - Página de produto
    - acabei por implementar a questão do URL na abertura do modal



## Alguns porquês

Sei que uma das coisas que informaram era para a não utilização de jQuery, a não ser que realmente necessitasse. Como falei na nossa reunião, é algo que venho a usar à já algum tempo (para não dizer tempo demais), assim como tenho interesse de utilizar novas tecnologias, mas sendo que para algo tão rápido e pela minha falta de tempo nas últimas semanas, não valeria a pena estar a impedir o avanço da aplicação e prejudicar outros projetos que tinha.

A utilização do bootstrap foi mesmo para acelerar o processo na parte da interface, e porque muitas das coisas que estavam a pedir já se encontram implementadas agregando também ao jQuery.

Infelizmente o tempo que tinha para o desenvolvimento deste desafio foi muito menor do que pensava, o que levou a que tudo o que poderão ver implementado, que não é muito foi em cerca de 8H de trabalho.