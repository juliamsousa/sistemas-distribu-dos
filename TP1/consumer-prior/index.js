import {Kafka, logLevel} from 'kafkajs';

/**
 * Faz conexão com o Kafka - Confluent Cloud
 */

// const username = 'QZRZVRJP2MXHBF5M';
// const password = 'XckVtyJnX97X66xSg5pp0IP5aG/gobfWBwX66Fb6RkgmFtzK0Z/D+T7UZiK8AH/c'
// const sasl = username && password ? { username, password, mechanism: 'plain' } : null
// const ssl = !!sasl

// const kafka = new Kafka({
//  clientId: 'certificate',
//  brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
//  logLevel: logLevel.WARN,
//  ssl,
//  sasl,
//  retry: {
//    initialRetryTime: 300,
//    retries: 10
//  },
// });

/**
 * Faz conexão com o Kafka Docker
 */

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
});


async function consumir_votos_prior() {
  const topic = 'voto_felipe_prior';  
  const consumer = kafka.consumer({groupId: 'response-group-prior'})
  const producer = kafka.producer();
  
  await consumer.connect();
  await consumer.subscribe({topic});

  let counter = 0;
  
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      const prefix = `topic: ${topic}[partition: ${partition} | message: ${message.offset}] / timestamp: ${message.timestamp}`
      console.log(`\n- ${prefix} ${message.key}#${message.value}`)

      counter ++;
      
      await producer.connect();
      await producer.send({
        topic: 'voto_prior_response',
        messages: [
          { value: `${counter} votos em Felipe Prior computados.` }
        ]
      })
    }
  }); 
}

function run () {
  consumir_votos_prior();
}

try {
  run();
} catch(error) {
  console.error
};