## Installation

```bash
$ npm install
```

## Enviroment

```bash
$ ren env-example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

```bash
$ docker compose up -d
```

## Swagger

(http://localhost:5000/bonifica/api/swagger)


## Endpoint

Postman / Insomnia

http://localhost:5000/bonifica/api/v1/users


## Security 

O NestJS fornece uma base robusta para implementar criptografia de API graças à sua arquitetura
modular, injeção de dependência e suporte para middleware e interceptadores.

Para criptografar, usaremos o módulo “crypto”. O crypto módulo está disponível por padrão no Node.js. 
Podemos usá-lo sem nenhuma instalação ou dependência adicional. 
Este módulo fornece funcionalidade criptográfica que inclui um conjunto de wrappers para as funções:
hash, HMAC, cipher, decipher, sign e verify do OpenSSL.

**Algoritmo de Criptografia** 
Algoritmo de criptografia seguro, como AES (Advanced Encryption Standard) ou RSA (Rivest-Shamir-Adleman). 
Esses algoritmos oferecem vários níveis de segurança e desempenho.

Vamos utilizar a criptografia AES-256 que é um algoritmo de criptografia por blocos que utiliza uma chave de 256 bits para criptografar dados em blocos de 128 bits. É um padrão internacional de criptografia que é considerado um dos mais seguros e 
é reconhecido pelo governo dos Estados Unidos. 

A criptografia AES-256 funciona da seguinte forma:
*O texto original é dividido em blocos de 128 bits
*Cada bloco recebe uma camada de criptografia
*O AES-256 utiliza 14 etapas para transformar o texto simples em texto cifrado

A criptografia AES é uma chave simétrica, o que significa que utiliza a mesma chave para criptografar e descriptografar o conteúdo. A complexidade da criptografia aumenta exponencialmente com cada bit adicional, o que torna praticamente impossível para um invasor descobrir a sequência exata da chave.

**Gerenciamento de Chaves Seguro** 
Garanta práticas seguras de gerenciamento de chaves armazenando chaves de criptografia com segurança, como usar variáveis ​​de ambiente ou um serviço de gerenciamento de chaves dedicado. 
Nunca codifique chaves de criptografia dentro do código do seu aplicativo ou as exponha inadvertidamente.

**Implementar HTTPS** 
Enquanto a criptografia de API protege os dados em trânsito, implementar HTTPS (Hypertext Transfer Protocol Secure) adiciona uma camada extra de segurança ao criptografar a comunicação entre clientes e servidores usando protocolos SSL/TLS. 
Habilite HTTPS em seu aplicativo NestJS para criptografar todos os dados trocados pela rede.
