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

async function print() {
  // mudar de requests para acquire posteriormente
  const topic = 'acquire_resource_1';  
  const consumer = kafka.consumer({groupId: 'printers'})
  const producer = kafka.producer();
  
  await consumer.connect();
  await consumer.subscribe({topic});

  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      console.log(`\nImprimindo os arquivos... ${message.value.fileList}
      `)

       /**
       * TODO: separar a mensagem em uma lista e iterar sobre ela
       * */

      const prefix = `topic: ${topic}[partition: ${partition} | message: ${message.offset}] / timestamp: ${message.timestamp}`
      console.log(`\n- ${prefix} \n`)

      /**
       * TODO: colocar um await com tempo aleatorio
       * */

      await producer.connect();
      await producer.send({
        topic: 'release_resource_1',
        messages: [
          { value: `Impressão de arquivos finalizada. Resource released` }
        ]
      })
    }
  }); 
}

function run () {
  print();
}

try {
  run();
} catch(error) {
  console.error
};