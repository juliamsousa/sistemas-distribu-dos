import {Kafka, logLevel} from 'kafkajs';
// import RequestList from '../queue_manager'

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

// Função responsável por consumir a fila de requisições e enviar para a impressão
async function manage_printer_1() {
  const topic = 'release_resource_1';
  const consumer = kafka.consumer({groupId: 'printer_manager'})
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({topic});

  // const current_request = RequestList.pop();
  console.log(`Lista de requisições: `);

  // Verifica se a lista de requisicoes esta vazia para nao entrar em loop
  // if (RequestList.length > 0) {
    await consumer.run({
      eachMessage: async({topic, partition, message}) => {
        await producer.connect();
        await producer.send({
          topic: 'acquire_resource_1',
          messages: [
            { value: 'current_request'}
          ]
        })
      }
    }); 
  // }
}

function run () {
  // adicionar aqui a primeira mensagem de release para desencadear a execução do manager
  manage_printer_1();
}

try {
  run ();
} catch(error) {
  console.error
};