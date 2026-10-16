# Clima Agora

## Autor

Damylle dos Santos Oliveira — Matrícula: 22553445

## Descrição

O Clima Agora é uma aplicação web que permite consultar informações climáticas de diferentes cidades. O usuário informa o nome de uma cidade e recebe dados como temperatura, umidade e velocidade do vento.

## API utilizada

* Open-Meteo
* API de Geocoding da Open-Meteo
* API de previsão do tempo da Open-Meteo

## Funcionalidades

* Busca de cidades pelo nome.
* Consulta da temperatura atual.
* Consulta da umidade do ar.
* Consulta da velocidade do vento.
* Exibição das coordenadas da cidade.
* Mensagem quando a cidade não é encontrada.
* Mensagem de erro caso não seja possível consultar a API.
* Interface adaptada para dispositivos menores.

## Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/damyllee/bootcamp2-app.git
```

2. Abra a pasta do projeto no IntelliJ ou outro editor.
3. Abra o arquivo `index.html` no navegador.

## Links

- **Aplicação no ar (GitHub Pages):** https://damyllee.github.io/bootcamp2-app/
* **Repositório:** https://github.com/damyllee/bootcamp2-app.git
* 
## Docker

O projeto Clima Agora pode ser executado utilizando Docker e Docker Compose.

### Docker Hub

As imagens do projeto estão disponíveis em:

https://hub.docker.com/r/damyllee/clima-agora

**Versões publicadas:**
- 1.0
- 1.1
- latest

### Como executar com Docker

```bash
docker pull damyllee/clima-agora:latest
docker run -d -p 8080:80 --name clima-agora damyllee/clima-agora:latest
```

Acesse no navegador: http://localhost:8080

### Como executar com Docker Compose

Na pasta do projeto, execute:

```bash
docker compose up -d --build
```

Acesse no navegador: http://localhost:8082

### Verificar os contêineres

```bash
docker ps
```

### Tecnologias utilizadas

- HTML, CSS e JavaScript
- Open-Meteo API
- Docker
- Docker Compose
- Nginx
Nginx

## Orquestração com Kubernetes
Se eu tivesse 100 contêineres, seria difícil administrar todos manualmente. Para resolver isso, utilizaria o Kubernetes, uma ferramenta que ajuda a gerenciar vários contêineres automaticamente.
O Kubernetes organiza os servidores em um cluster. As aplicações são executadas dentro de pods, que podem conter um ou mais contêineres.
Também é possível criar réplicas, permitindo executar várias cópias da aplicação. Se uma delas apresentar problemas, o Kubernetes pode criar outra para manter o serviço funcionando. 
Assim, o Kubernetes facilita o gerenciamento, a disponibilidade e o crescimento da aplicação.

## Evidência dos contêineres Docker

A imagem abaixo mostra os contêineres do Clima Agora em execução nas portas 8080, 8081 e 8082.

![Contêineres Docker em execução](docker-ps.png)
