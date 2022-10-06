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

// lista responsável por armazenar as requisições
const RequestList = [];

async function manage_requests() {
  const topic = 'requests';
  const consumer = kafka.consumer({groupId: 'managers'})
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({topic});

  // para cada mensagem, adiciona o request a uma lista
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      console.log('Request Acknowledged', String(message.value), '\n');
      // adiciona o request à lista
      RequestList.push(message);
      console.log(RequestList);
      // retorna a mensagem de request reconhecido
      await producer.connect();
      await producer.send({
        topic: 'resource_manager',
        messages: [
          { value: `Request Acknowledged`}
        ]
      })
    }
  }); 
}

// async function manage_printers() {
//   const topic1 = 'release_resource_1';
//   // const topic2 = 'release_resource_2';

//   const consumer = kafka.consumer({groupId: 'managers'})
//   const producer = kafka.producer();

//   await consumer.connect();
//   await consumer.subscribe({topic1});
//   // await consumer.subscribe({topic2});

//   const current_request = RequestList.pop();
//   console.log(current_request);

//   await consumer.run({
//     eachMessage: async({topic, partition, message}) => {
//       await producer.connect();
//       await producer.send({
//         topic: 'acquire_resource_1',
//         messages: [
//           { value: current_request}
//         ]
//       })
//     }
//   }); 
// }

function run () {
  // adicionar aqui a primeira mensagem de release para desencadear a execução do manager
  manage_requests();
  // manage_printers();
}

try {
  run ();
} catch(error) {
  console.error
};