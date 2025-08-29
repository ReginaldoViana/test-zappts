# Zappts Test Project

Este é um projeto Angular desenvolvido com Angular CLI versão 9, demonstrando boas práticas de desenvolvimento e organização de código.

## Estrutura do Projeto

```
src/
├── app/
│   ├── form/              # Componente de formulário
│   ├── services/          # Serviços da aplicação
│   │   └── auth.service   # Serviço de autenticação
│   └── sliders/          # Componente de sliders
├── assets/               # Recursos estáticos
└── environments/         # Configurações de ambiente
```

## Tecnologias Utilizadas

- Angular 9
- TypeScript
- SASS
- JSON Server (para mock de API)

## Pré-requisitos

- Node.js (versão 12 ou superior)
- NPM ou Yarn
- Angular CLI

## Como Executar

1. **Instalação das Dependências**
   ```bash
   npm install
   # ou
   yarn
   ```

2. **Iniciar o JSON Server (Mock API)**
   ```bash
   json-server --watch db.json
   ```

3. **Iniciar a Aplicação**
   ```bash
   ng serve
   ```

4. Acesse a aplicação em `http://localhost:4200`

## Scripts Disponíveis

- `ng serve`: Inicia o servidor de desenvolvimento
- `ng build`: Gera o build de produção
- `ng test`: Executa os testes unitários
- `ng e2e`: Executa os testes end-to-end

## Build

Para gerar uma versão de produção:

```bash
ng build --prod
```

Os arquivos serão gerados no diretório `dist/`.

## Testes

- **Testes Unitários**
  ```bash
  ng test
  ```

- **Testes E2E**
  ```bash
  ng e2e
  ```

## Estrutura de Componentes

- **Form Component**: Gerencia formulários da aplicação
- **Sliders Component**: Responsável pela exibição de sliders/carrossel
- **Auth Service**: Gerencia a autenticação da aplicação

## Contribuição

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Ajuda Adicional

Para mais informações sobre o Angular CLI, utilize `ng help` ou consulte a [documentação do Angular CLI](https://github.com/angular/angular-cli/blob/master/README.md).
