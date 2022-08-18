# Trabalho Prático 1 - Apache Kafka

![Capa Apache Kafka](https://media-exp1.licdn.com/dms/image/C4D12AQHfzynVTuXI6w/article-cover_image-shrink_600_2000/0/1650307448706?e=1663804800&v=beta&t=9K3thBAKzsiy0epk3nMhbaAlxiv5zcLarOwvNfyBplM)

Primeiro trabalho prático da disiciplina de Sistemas Distribuídos.

## Descrição da Solução Middleware Utilizada

## Funcionamento Interno

## Formas de Instalação

A imagem Docker utiliza é a [bitnami/kafka](https://hub.docker.com/r/bitnami/kafka).

Para fazer o download da imagem para a máquina local em sua versão mais recente basta executar o comando:

```bash
$ docker pull bitnami/kafka:latest
```

Para executar a aplicação utilizando Docker Compose os seguintes comandos devem ser executados. O primeiro comando cria ou preenche um 
arquivo docker-compose.yml já existente. O segundo comando executa a aplicação.

```bash
$ curl -sSL https://raw.githubusercontent.com/bitnami/containers/main/bitnami/kafka/docker-compose.yml > docker-compose.yml
$ docker-compose up -d
```

Após a execução desses comandos é possível visualizar os containers e a aplicação criada em execução no Docker Desktop:

![Docker Desktop](https://user-images.githubusercontent.com/39354498/185271121-40d00ea8-b8e1-4fb3-8d17-1b325536e7db.png)

Para visualizar de forma mais detalhada o cluster do Kafka - seus brokers, topics e consumers - a [Offset Explorer IDE for Kafka](https://www.kafkatool.com/download.html) é utilizada. A tela a seguir demonstra como adicionar a conexão do cluster para visualização:

![Offset Explorer](https://user-images.githubusercontent.com/39354498/185271000-528bd5e3-ad14-45e3-bfe0-524433f0bac4.png)

Após o preenchimento dos dados como nome, porta, caminho e outros é possível analisar a estrutura do cluster. A conexão deve ser feita com o container do Zookeper e não no container do Kafka de forma direta.

![TP1 Cluster](https://user-images.githubusercontent.com/39354498/185271539-090d43b5-f828-4a10-a671-7c4623cebcf2.png)


## Aplicação Escolhida

A aplicação escolhida será feita com Java e Spring Boot. Para a geração do projeto inicial é utilizada a ferramenta Spring Initializr, que gera o projeto por meio de configurações e as dependências necessárias. [Clique aqui](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.7.2&packaging=jar&jvmVersion=17&groupId=tp1.sistemas.distribuidos&artifactId=kafka.trabalho.pratico&name=kafka.trabalho.pratico&description=Desenvolvimento%20do%20trabalho%20pr%C3%A1tico%201%20da%20disciplina%20de%20Sistemas%20Distribu%C3%ADdos.&packageName=tp1.sistemas.distribuidos.kafka.trabalho.pratico&dependencies=web,kafka,lombok) para acessar a configuração criada

![spring initializr](https://user-images.githubusercontent.com/39354498/185273108-64c8b858-c610-48c1-835b-d96983f5ce60.png)

## Referências do Trabalho

### Tutoriais

- [Curso DIO: Introdução a Mensageria na Nuvem com Kafka e Python](https://web.dio.me/course/introducao-mensageria-na-nuvem-com-kafka-e-python/learning/ffe8d5c7-ba73-49ff-bba5-27e81379df41)

- [Curso DIO: Arquitetura Orientada a Eventos com Java Spring Boot e Kafka](https://web.dio.me/course/arquitetura-orientada-a-eventos-com-java-spring-boot-e-kafka/learning/2ca710ba-6a28-481c-a663-6f85aaec329b)

- [Curso DIO: Introdução a orquestração de contêineres com Docker](https://web.dio.me/course/introducao-a-orquestracao-de-conteineres-com-docker/learning/c85d8e63-3431-4769-8d8d-39b019ad979f)

- [Youtube: Docker Kafka Image from Scratch | Broker | Producer | Consumer | Build your own Kafka Docker Image](https://www.youtube.com/watch?v=SEY1iXVDpNo)

- [Youtube: Spring Boot Kafka Real-World Project Tutorial - Spring Boot Kafka Microservices](https://www.youtube.com/watch?v=TkhU8d-uao8)

- [Youtube: Introduction to Apache Kafka [Apache Kafka Tutorials #1]](https://www.youtube.com/watch?v=cmzhqv1ZqGA&list=PLa6iDxjj_9qVGTh3jia-DAnlQj9N-VLGp&index=2)

- [Youtube: Running Kafka on Docker with Compose](https://www.youtube.com/watch?v=ncTosfaZ5cQ)


### Ferramentas

- [Site Oficial Kafka](https://kafka.apache.org/)

- [Cloud Karafka](https://www.cloudkarafka.com/)

- [Offset Explorer IDE for Kafka](https://www.kafkatool.com/download.html)

### Livros e Artigos

- [Confluent Kafka Definite Guide](https://assets.confluent.io/m/1b509accf21490f0/original/20170707-EB-Confluent_Kafka_Definitive-Guide_Complete.pdf)

