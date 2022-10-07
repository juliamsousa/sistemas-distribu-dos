import {Kafka, logLevel} from 'kafkajs';
const fs = require('fs');

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



// Função responsável por consumir as mensagens do tópico 'requests' e adicioná-los à fila de execução
async function manage_requests() {
  // Array responsável por armazenar as requisições
  const data = fs.readFileSync('../request_queue.json');
  const RequestList = JSON.parse(data);

  // faz a criação de produtor e consumidor, criando e inscrevendo nos topicos correspondentes
  const topic = 'requests';
  const consumer = kafka.consumer({groupId: 'managers'})
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({topic});

  let cont = 0;

  // para cada mensagem, adiciona o request a uma lista
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      /**
       * O request é adicionado ao final da lista
       * A ordem de prioridade da lista é FIFO
       * 
       * Eles são adicionados ao final da fila e o primeiro é retirado 
       * para processamento por meio de um pop
       */

      RequestList.push(JSON.parse(message.value));
      const AddRequestList = JSON.stringify(RequestList);

      fs.writeFile('../request_queue.json', AddRequestList, err => {
        // error checking
        if(err) throw err;
      });  

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
  
  console.log(`\nRequest nº ${cont} acknowledged and added to queue \n`);
  cont++;
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
