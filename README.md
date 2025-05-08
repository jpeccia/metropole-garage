
# Garagem FiveM - Backend e Frontend

Este projeto é um sistema de garagem para servidor FiveM, com funcionalidades de gerenciamento de veículos e integração entre frontend e backend. O backend foi desenvolvido utilizando **TypeScript** e o frontend foi feito com **React**, **TypeScript**, **Tailwind CSS**, **ShadCN** e **Toast**.

## Funcionalidades

- **Armazenamento de veículos**: Permite guardar, buscar e remover veículos com base na placa e identificação do jogador.
- **Spawn de veículos**: Permite que o jogador spawne seus veículos na garagem.
- **Administração**: Comandos de administração para gerenciamento de veículos e acesso a funcionalidades extras.
- **Comandos**:
  - `/giveVehicle [modelo] [placa] [cor] [tipo]`: Adiciona um veículo a um jogador.
  - `/removeVehicle [placa]`: Remove um veículo da garagem do jogador.
  - `/car [modelo]`: Spawn de um modelo de veículo para o admin.
  - `/toggleGarage`: Alterna a visibilidade da garagem para o jogador.
  - **G**: Tecla de atalho para abrir ou fechar a garagem.

## Tecnologias Usadas

### Backend:
- **Node.js** com **TypeScript**: Para construção do backend que comunica com o servidor FiveM.
- **Express**: Framework para criação de rotas e estrutura de API.
- **MySQL (via `oxmysql`)**: Banco de dados utilizado para armazenar as informações dos veículos.
- **Docker**: Containerização do ambiente de desenvolvimento.

## Como Rodar o Projeto

### Requisitos

- **Docker**: Para rodar o banco de dados em ambiente isolado.
- **Node.js**: Para buildar.
- **npm/yarn**: Gerenciadores de pacotes para o frontend e backend.

### Configuração do Banco de Dados

Para rodar o banco de dados em um ambiente de desenvolvimento, você pode usar o `docker-compose` que está configurado para subir uma instância do MySQL:

1. Clone o repositório:
   ```bash
   git clone https://github.com/jpeccia/metropolegarage.git
   cd metropolegarage
   ```

2. Suba o banco de dados usando o Docker:
   ```bash
   docker-compose up -d
   ```

   Isso irá iniciar o MySQL em um container Docker, acessível via `localhost:3307`.

### Configuração do Backend

1. No diretório geral, instale as dependências:
   ```bash
   npm install
   ```

2. Compile o código TypeScript:
   ```bash
   npm run build
   ```

### Integração com o Server FiveM

1. Após compilar e rodar o projeto, copie a pasta `metropole-garage` para a pasta `resources` do seu servidor FiveM:
   ```bash
   cp -r metropole-garage /caminho/para/seu/server/resources/
   ```

2. adicione oxmysql para sua pasta resources  

3. adicione `ensure oxmysql`  
 `ensure metropole-garage` para seu server.cfg 

1. Agora, inicie o servidor do FiveM

### Acessando a Garagem

- **Abrir a garagem**: Aperte a tecla **G** ou digite o comando `/toggleGarage` no chat para abrir a garagem.

  Com isso, o sistema de garagem será exibido e o jogador poderá interagir com seus veículos.

## Comandos Extras

### Comandos Admin

- **/giveVehicle [modelo] [placa] [cor] [tipo]**: Adiciona um veículo para um jogador.
  - Exemplo de uso: `/giveVehicle t20 ABC123 Red sports`

- **/removeVehicle [placa]**: Remove um veículo da garagem do jogador.
  - Exemplo de uso: `/removeVehicle ABC123`

- **/car [modelo]**: Spawn de um modelo de veículo para o admin.
  - Exemplo de uso: `/car sultan`

### Funcionalidades Adicionais

- **Gerenciamento de veículos**: Adicionar, remover e listar veículos com base na placa e status do veículo.
- **Sistema de spawn**: Permite que os jogadores spawnem veículos armazenados em sua garagem.
- **Guardar seus veiculos**: Permite que os jogadores guardem seus veiculos spawnados em sua garagem.


## Futuras Melhorias

- **Visualização 3D dos veículos**: No futuro, pretende-se substituir as imagens estáticas dos veículos por visualizações em 3D utilizando os arquivos OBJ dos modelos reais do GTA V.
  Isso permitirá que os veículos sejam exibidos com suas personalizações aplicadas em um cenário fictício e interativo, proporcionando uma experiência visual mais fiel ao jogo.


## Contribuições

Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch com a sua funcionalidade: `git checkout -b minha-funcionalidade`.
3. Faça as alterações necessárias e commit as mudanças: `git commit -am 'Adiciona nova funcionalidade'`.
4. Envie o código para o seu fork: `git push origin minha-funcionalidade`.
5. Abra um pull request para a branch `main`.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Se tiver dúvidas ou sugestões, entre em contato comigo através do meu e-mail: [joaootaviopeccia0@gmail.com](mailto:joaootaviopeccia0@gmail.com).
