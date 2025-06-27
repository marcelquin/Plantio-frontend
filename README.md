# Plantio Frontend

Aplicação frontend para o sistema de gestão de plantio.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
   ou
   ```
   yarn install
   ```

## Configuração

Crie um arquivo `.env` baseado no `.env.example` com suas configurações locais.

## Executando o projeto

```
npm start
```
ou
```
yarn start
```

O aplicativo estará disponível em `http://localhost:3000`.

## Build para produção

```
npm run build
```
ou
```
yarn build
```

## Docker

O projeto pode ser executado via Docker usando o arquivo `Compose.yml`.

```
docker-compose up
```

## Estrutura do projeto

- `/src` - Código fonte principal
- `/public` - Arquivos estáticos
- `/app` - Configurações do projeto

## Contribuição

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request