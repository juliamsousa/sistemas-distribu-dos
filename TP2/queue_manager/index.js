import {Kafka, logLevel} from 'kafkajs';

/**
 * Faz conexão com o Kafka - Confluent Cloud
 */
const username = 'QZRZVRJP2MXHBF5M';
const password = 'XckVtyJnX97X66xSg5pp0IP5aG/gobfWBwX66Fb6RkgmFtzK0Z/D+T7UZiK8AH/c'
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const kafka = new Kafka({
 clientId: 'printer',
 brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
 logLevel: logLevel.WARN,
 ssl,
 sasl,
 retry: {
   initialRetryTime: 300,
   retries: 10
 },
});

// Array responsável por armazenar as requisições
const RequestList = [];

// Função responsável por consumir as mensagens do tópico 'requests' e adicioná-los à fila de execução
async function manage_requests() {
  const topic = 'requests';
  const consumer = kafka.consumer({groupId: 'managers'})
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({topic});

  const cont = 0;

  // para cada mensagem, adiciona o request a uma lista
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      console.log(`\nRequest nº ${cont} acknowledged and added to queue \n`);
      cont++;
      /**
       * O request é adicionado ao final da lista
       * A ordem de prioridade da lista é FIFO
       * 
       * Eles são adicionados ao final da fila e o primeiro é retirado 
       * para processamento por meio de um pop
       */

      RequestList.push(JSON.parse(message.value));

      // Retorna a mensagem de request processado e adicionado à fila
      await producer.connect();
      await producer.send({
        topic: 'resource_manager',
        messages: [
          { value: `Request added to queue`}
        ]
      })
    }
  }); 
}


function run () {
  // adicionar aqui a primeira mensagem de release para desencadear a execução do manager
  manage_requests();
}

try {
  run ();
} catch(error) {
  console.error
};

export default RequestList;