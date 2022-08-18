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

## Aplicação Escolhida


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

