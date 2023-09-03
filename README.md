# El Chupacabra :goat:
Um framework para testes com voluntários de provas de conceito voltado para aplicações web do lado cliente.

## :owl: Índice
1. Demo TLDR
2. Coleta dados usando o Google Sheets
3. Exemplo de uso

## :japanese_ogre: Demo TLDR
Como executar em poucos passos a demonstração do framework.

1. Certifique-se de ter instalado em sua máquina o [Node.js](https://nodejs.org/en) e o [npm](https://www.npmjs.com).
2. Dentro do diretório `src`, execute o comando abaixo para instalar as dependências.
    ```bash
    npm install
    ```
3. Ainda dentro de `src`, execute o comando abaixo para executar a demo usando o Node.js.
    ```bash
    npm run demo
    ```
4. Veja a saída da demonstração no arquivo `/src/result.json`.


## :rocket: Exemplo usando coleta dados via Google Sheets

Uma das principais vantagens de usar o framework El Chupacabra é sua capacidade de realizar a coleta de métricas por meio do Google Sheets com esforço mínimo. Deste modo, a coleta de métricas em diferentes ambientes se torna simples, pois os dados de todas as execuções são centralizado em uma única planilha. Além disso, a análise dos dados também é facilitada, por contar com todo do aparato do próprio Google Sheets.

### Configurando planilha para receber os dados

1. Acesse a planilha: [Exemplo El Chupacabra](https://docs.google.com/spreadsheets).

2. Clique em `Arquivo` do menu superior e selecione a opção `Fazer uma cópia`.

    ![Abrindo modal de cópia de planilha](./repo-images/arquivo-copia.png)

3. Clique no botão `Fazer uma cópia`.


    ![Modal de cópia de planilha](./repo-images/modal-copia.png)

> Após a criar a planilha, precisamos obter algumas informações dela para usarmos mais a frente Recomendamos que as guardem em algum editor de texto, como um bloco de notas ou gedit.

4. Obtenha o ID da planilha na barra de endereço do navegador.

    ![Obtendo ID da planilha da barra de endereço do navegador](./repo-images/getting-sheet-id.png)

5. Obtenha o nome da aba da sua planilha onde os dados serão inseridos.

    ![Obtendo nome da aba da planilha](./repo-images/sheet-name.png)

### Configurando API de recebimento dos dados

Para isso usamos o [Sheetson](https://sheetson.com/), o qual é uma API que simplifica a interação o Google Sheets.

1. Se autentique no site do Sheetson usando uma conta Google e acesse o [console](https://sheetson.com/console).

2. Compartilhe a planilha criada anteriormente com o e-mail `google@sheetson.com`

    ![Compartilhando planilha com a API](./repo-images/sharing-sheet-with-sheetson.png)

3. No [console](https://sheetson.com/console), obtenha a sua API Key.

    ![Compartilhando planilha com a API](./repo-images/getting-api-key.png)

### Configurando a aplicação para enviar os dados para sua planilha

1. Abra o arquivo `src/Index.ts` e vá até o seguinte trecho:
    ```ts
    const persister = new SheetsonPersister(
        "NOME_DA_ABA_DA_SUA_PLANILHA",
        "API_KEY",
        "ID_DA_PLANILHA"
    ) as IPersister
    ```

2. Substitua os templates `NOME_DA_ABA_DA_SUA_PLANILHA`, `API_KEY` e `ID_DA_PLANILHA`, pelos respectivos dados que obtivemos anteriormente.

3. Com tudo isso feito, agora podemos rodar a aplicação. Para isso, execute a aplicação de dentro da pasta `src`:
    ```bash
    npm run dev
    ```

4. Veja o resultado da execução em sua planilha no Google Sheets.
