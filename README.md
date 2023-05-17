# El Chupacabra
Um framework para testes com voluntários de provas de conceito voltado para aplicações web do lado cliente.

## Diagramas
Os diagramas em `/docs` foram escritos usando [Mermaid syntax](https://mermaid.js.org/) os quais podem ser 
visualizados no vscode com o uso da extensão [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid), além disso, para syntax highlighting a extensão 
[Mermaid Markdown Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting) também é necessária.


## Trabalho com LaTeX
Para conseguir trabalhar com LaTeX no vscode é necessário instalar a extensão [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) e configurar um compilador.

### Configurando LaTeX localmente usando Docker
1. Instale o Docker e configure seu usuário como membro do grupo `docker` para que não seja necessário utilizar sudo.
2. Obtenha a imagem do LaTeX - obs: ela possui mais de 2GB de tamanho.
```bash
docker pull tianon/latex
```
3. Configure a extensão `LaTeX Workshop` para usar a imagem Docker.
    - Abra a `Command Pallet`(Ctrl + Shift + p) do vscode e busque por `Open Settings (JSON)`.
    - Adicione as seguintes configurações ao final do arquivo:
    ```json
    "latex-workshop.view.pdf.viewer": "tab",
    "latex-workshop.docker.enabled": true,
    "latex-workshop.latex.outDir": "./out",
    "latex-workshop.synctex.afterBuild.enabled": true,
    "latex-workshop.docker.image.latex": "tianon/latex",
    ```
