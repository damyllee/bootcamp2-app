# Clima Agora — Favoritos com Supabase e Docker

## Autora

Damylle dos Santos Oliveira — Matrícula: 22553445

## Descrição

O Clima Agora é uma aplicação web que permite consultar informações climáticas de diferentes cidades, como temperatura, umidade do ar, velocidade do vento e coordenadas geográficas.

A aplicação permite salvar, listar e excluir cidades favoritas, utilizando o Supabase para armazenar os dados em um banco PostgreSQL.

O projeto está disponível pelo GitHub Pages e como imagem Docker no Docker Hub.

## APIs e serviços utilizados

- **Open-Meteo** — consulta de informações meteorológicas.
- **Open-Meteo Geocoding API** — busca de cidades e coordenadas geográficas.
- **Supabase** — banco PostgreSQL utilizado para persistência dos favoritos.
- **Docker Hub** — distribuição das imagens Docker.

## Persistência de dados

O projeto utiliza a tabela `favoritos` do Supabase para armazenar as cidades favoritas.

Os campos informados para a tabela são:

- `id` — identificador do registro.
- `created_at` — data e hora do cadastro.
- `nome_cidade` — nome da cidade favorita.
- `latitude` — latitude da cidade.
- `longitude` — longitude da cidade.

A aplicação permite cadastrar, consultar e excluir cidades favoritas diretamente no banco de dados.

Os registros permanecem armazenados mesmo após atualizar a página ou fechar o navegador.

**Segurança:** caso sejam utilizadas políticas RLS públicas para acesso anônimo, os favoritos podem ficar acessíveis a outros usuários. Em uma aplicação real, seria necessário implementar autenticação e políticas individuais de acesso.

## Funcionalidades

- Busca de cidades pelo nome.
- Consulta da temperatura atual.
- Consulta da umidade do ar.
- Consulta da velocidade do vento.
- Exibição das coordenadas geográficas.
- Salvamento de cidades favoritas no Supabase.
- Listagem dos favoritos armazenados.
- Exclusão de cidades favoritas.
- Persistência dos dados após atualizar ou fechar o navegador.
- Mensagem quando a cidade não é encontrada.
- Mensagem de erro quando ocorre falha na consulta.
- Interface adaptada para dispositivos menores.

## Sidequests concluídas

- [x] B — Docker Compose (`docker compose up -d --build`).
- [x] Segunda sidequest — pendente de confirmação.

### Evidência dos contêineres Docker

O projeto foi executado com contêineres nas portas 8080, 8081 e 8082.

![Contêineres Docker em execução](docker-ps.png)

## Como executar

### No navegador

Acesse:

https://damyllee.github.io/bootcamp2-app/

### Com Docker

Primeiro, baixe a imagem publicada no Docker Hub:

```bash
docker pull damyllee/clima-agora:latest
```

Depois, execute o contêiner:

```bash
docker run -d -p 8080:80 --name clima-agora damyllee/clima-agora:latest
```

Após iniciar o contêiner, abra no navegador:

http://localhost:8080

### Com Docker Compose

Na pasta do projeto, execute:

```bash
docker compose up -d --build
```

Depois, abra:

http://localhost:8082

### Localmente a partir do código

1. Clone o repositório:

```bash
git clone https://github.com/damyllee/bootcamp2-app.git
```

2. Abra a pasta do projeto no IntelliJ ou em outro editor.
3. Abra o arquivo `index.html` no navegador.

### Verificar os contêineres

Para visualizar os contêineres em execução:

```bash
docker ps
```

## Imagens publicadas no Docker Hub

O projeto possui as seguintes versões:

- `damyllee/clima-agora:1.0`
- `damyllee/clima-agora:1.1`
- `damyllee/clima-agora:latest`

As imagens utilizam Nginx para disponibilizar a aplicação web dentro de um contêiner.

## Arquivo .dockerignore

O arquivo `.dockerignore` impede que arquivos desnecessários sejam enviados durante a construção da imagem Docker.

No projeto, são excluídos arquivos como `.git`, `README.md` e arquivos temporários.

Isso reduz o contexto de construção e pode tornar o processo de build mais rápido e eficiente.

## Orquestração com Kubernetes

Se fosse necessário executar 100 contêineres, seria difícil administrar todos manualmente.

Para resolver isso, utilizaria o Kubernetes, uma ferramenta que permite gerenciar contêineres automaticamente.

O Kubernetes organiza os servidores em um **cluster**. As aplicações são executadas dentro de **pods**, que podem conter um ou mais contêineres.

Também é possível criar **réplicas**, permitindo executar várias cópias da aplicação. Caso uma delas apresente problemas, o Kubernetes pode criar outra para manter o serviço funcionando.

Assim, o Kubernetes facilita o gerenciamento, a disponibilidade e o crescimento da aplicação.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Open-Meteo API
- Supabase
- PostgreSQL
- Docker
- Docker Compose
- Nginx

## Links

- **Aplicação no ar (GitHub Pages):** https://damyllee.github.io/bootcamp2-app/
- **Repositório GitHub:** https://github.com/damyllee/bootcamp2-app
- **Imagem no Docker Hub:** https://hub.docker.com/r/damyllee/clima-agora
