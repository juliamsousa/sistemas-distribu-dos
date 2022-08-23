# Trabalho Prático 1 - Apache Kafka

![Capa Apache Kafka](https://media-exp1.licdn.com/dms/image/C4D12AQHfzynVTuXI6w/article-cover_image-shrink_600_2000/0/1650307448706?e=1663804800&v=beta&t=9K3thBAKzsiy0epk3nMhbaAlxiv5zcLarOwvNfyBplM)

Primeiro trabalho prático da disiciplina de Sistemas Distribuídos.

## Descrição da Solução Middleware Utilizada

A arquitetura do Apache Kafka se basea em 4 conceitos: consumers, producers, cluster (brokers) e topics. 

De forma básica, um producer é aquele que envia as mensagens para o cluster. Por outro lado, os consumers são aqueles que leem as informações disponibilizadas no cluster.

O cluster do Kafka é composto de um ou vários brokers, que são responsáveis por armazenar as mensagens enviadas pelo producer em tópicos. Os tópicos são compostos por uma ou várias partições, que contêm as mensagens. Essas partições permitem que as informações contidas nos tópicos sejam acessadas simultaneamente por vários consumers. 

![Funcionamento Geral do Kafka](https://imgopt.infoq.com/fit-in/1200x2400/filters:quality(80)/filters:no_upscale()/articles/apache-kafka-licoes/pt/resources/Figura2-1565808316941.jpeg)

O Kafka se destaca em: Performance, com alto throughput no recebimento e distribuição; Escalabilidade, muitos consumidores, isolamento entre consumidores, e; Mensagens pequenas, não estruturadas / opacas (bytes).

## Formas de Instalação

Para executar a aplicação utilizando Docker Compose um arquivo do tipo .yml foi criado. Nesse arquivo são definidas as imagens, tanto do Kafka quando do Zookeper, as portas, hostnames e também a criação de tópicos. 

### Docker
Desse modo, para a criação e para colocar o cluster no ar basta realizar o seguinte comando: 

```bash
$ docker compose up -d
```

Após a execução desses comandos é possível visualizar os containers e a aplicação criada em execução no Docker Desktop:

![Docker Desktop](https://user-images.githubusercontent.com/39354498/185271121-40d00ea8-b8e1-4fb3-8d17-1b325536e7db.png)

Para visualizar de forma mais detalhada o cluster do Kafka - seus brokers, topics e consumers - a [Offset Explorer IDE for Kafka](https://www.kafkatool.com/download.html) é utilizada. A tela a seguir demonstra como adicionar a conexão do cluster para visualização:

![Offset Explorer](https://user-images.githubusercontent.com/39354498/185271000-528bd5e3-ad14-45e3-bfe0-524433f0bac4.png)

Após o preenchimento dos dados como nome, porta, caminho e outros é possível analisar a estrutura do cluster. A conexão deve ser feita com o container do Zookeper e não no container do Kafka de forma direta.

![TP1 Cluster](https://user-images.githubusercontent.com/39354498/185271539-090d43b5-f828-4a10-a671-7c4623cebcf2.png)

### Confluent Cloud

Para utilizar a Confluent Cloud é necessário criar uma conta, um cluster e gerar as chaves de API necessárias para integrar a aplição à nuvem. A criação de cluster e chaves na ferramenta é bastante simplificada, uma vez que abstrai muitas configurações para que os devenvolvedores foquem apenas naquilo que é importante.

Visão geral do cluster criado:

![Captura de tela 2022-08-22 233055](https://user-images.githubusercontent.com/39354498/186056038-ea121cf0-b3a0-489a-bb2b-e4bc859ceb3c.png)

Visão geral do arquivo de conexão do cluster:

![image](https://user-images.githubusercontent.com/39354498/186056246-493a3906-2389-4ced-8a56-22a7cc9acd7b.png)


## Aplicação Escolhida

A aplicação escolhida foi desenvolvida em Node.js, emulando o sistema de votação do Big Brother Brasil de forma simplificada. A Globo utiliza o Kafka em várias de suas aplicações e, inclusive, aparece na lista de empresas que utiliza o Apache Kafka na página oficial. 

        👇 O primeiro lugar do ranking trouxe um recorde internacional! O paredão entre Prior, Manu Gavassi e Mari Gonzalez, no BBB 20, teve nada menos que 1.532.944.337 votos e entrou para o Guinness World Records como a maior votação de um programa de televisão no mundo.

Pensando nisso, desenvolvemos este trabalho emulando - de forma simplificada - o sistema de votação do Big Brother Brasil. A ideia geral foi criar producers e consumers separados para cada participante, tornando o processamento de votos independente.

Os votos são recebidos de um front end, que faz requisições do tipo post as APIs de cada participantes. A cada voto, um evento é disparado e o consumer correspondente fica responsável por processar cada voto.

Estrutura da aplicação:




[Big Data na Globo](https://cirocavani.github.io/post/bigdata-na-globocom/)


## Referências do Trabalho

### Principal link de referência: [Code Challenge: Micro-serviços com Node e Kafka](https://www.youtube.com/watch?v=-H8pD7sMcfo)

### Tutoriais

- [Curso DIO: Introdução a Mensageria na Nuvem com Kafka e Python](https://web.dio.me/course/introducao-mensageria-na-nuvem-com-kafka-e-python/learning/ffe8d5c7-ba73-49ff-bba5-27e81379df41)

- [Curso DIO: Arquitetura Orientada a Eventos com Java Spring Boot e Kafka](https://web.dio.me/course/arquitetura-orientada-a-eventos-com-java-spring-boot-e-kafka/learning/2ca710ba-6a28-481c-a663-6f85aaec329b)

- [Curso DIO: Introdução a orquestração de contêineres com Docker](https://web.dio.me/course/introducao-a-orquestracao-de-conteineres-com-docker/learning/c85d8e63-3431-4769-8d8d-39b019ad979f)

- [Youtube: Docker Kafka Image from Scratch | Broker | Producer | Consumer | Build your own Kafka Docker Image](https://www.youtube.com/watch?v=SEY1iXVDpNo)

- [Youtube: Spring Boot Kafka Real-World Project Tutorial - Spring Boot Kafka Microservices](https://www.youtube.com/watch?v=TkhU8d-uao8)

- [Youtube: Introduction to Apache Kafka [Apache Kafka Tutorials #1]](https://www.youtube.com/watch?v=cmzhqv1ZqGA&list=PLa6iDxjj_9qVGTh3jia-DAnlQj9N-VLGp&index=2)

- [Youtube: Running Kafka on Docker with Compose](https://www.youtube.com/watch?v=ncTosfaZ5cQ)

- [Cloud Kafka - Node.js: Code Example for Apache Kafka® ](https://docs.confluent.io/platform/6.2.1/tutorials/examples/clients/docs/nodejs.html)


### Ferramentas

- [Site Oficial Kafka](https://kafka.apache.org/)

- [Cloud Karafka](https://www.cloudkarafka.com/)

- [Offset Explorer IDE for Kafka](https://www.kafkatool.com/download.html)

### Livros e Artigos

- [Confluent Kafka Definite Guide](https://assets.confluent.io/m/1b509accf21490f0/original/20170707-EB-Confluent_Kafka_Definitive-Guide_Complete.pdf)


### Troubleshooting

- [Installing Docker Desktop Error](http://www.dark-hamster.com/software/how-to-solve-error-message-docker-failed-to-initialize-docker-desktop-is-shutting-down-when-running-docker-in-microsoft-windows/)

- [Unresolved Reference to @EnableKafka](https://stackoverflow.com/questions/64639836/plugin-org-springframework-bootspring-boot-maven-plugin-not-found)

- [Config Nodejs With Confluent](https://developer.confluent.io/get-started/nodejs/)
