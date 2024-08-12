# Test Corelab

Este projeto utiliza Next.js e é configurado para ser executado com Node.js v18.17.0. Siga as instruções abaixo para configurar e iniciar o projeto.

## Visão Geral da Aplicação

Veja uma apresentação da aplicação mostrando suas funcionalidades no vídeo abaixo:

[Assista à Demonstração](https://www.loom.com/share/f237711ab50f4687b0670d02ede64205?sid=7e9dc414-9968-4e3d-89f3-60fdaac32793)

### Pré-requisitos

- Node.js: v18.17.0
- Yarn: Certifique-se de que o Yarn esteja instalado em sua máquina. Caso não tenha, você pode instalá-lo com o comando npm install -g yarn.

### Configuração do Projeto

Clone o Repositório

```bash
git clone git@github.com:hendrix97s/corelab-tasks-app.git
cd corelab-tasks-app
```

### Configure as Variáveis de Ambiente

Copie o arquivo .env.example para um novo arquivo .env. Este arquivo deve conter todas as variáveis de ambiente necessárias para a execução do projeto.

```bash
cp .env.example .env
```

### Instale as Dependências

```bash
yarn install
```

### Construa o Projeto

```bash
yarn build
```

### Inicie o Servidor

```bash
yarn start
```

O projeto estará disponível em http://localhost:3000

## Notas Adicionais

- Certifique-se de que todas as variáveis de ambiente estejam corretamente configuradas no arquivo .env para evitar problemas durante a execução.
- Para desenvolvimento, você pode usar yarn dev em vez de yarn build e yarn start.
