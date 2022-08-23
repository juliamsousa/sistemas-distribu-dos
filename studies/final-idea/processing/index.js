import {Kafka, logLevel} from 'kafkajs';

const username = 'QZRZVRJP2MXHBF5M';
const password = 'XckVtyJnX97X66xSg5pp0IP5aG/gobfWBwX66Fb6RkgmFtzK0Z/D+T7UZiK8AH/c'
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const kafka = new Kafka({
 clientId: 'certificate',
 brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
 logLevel: logLevel.WARN,
 ssl,
 sasl,
 retry: {
   initialRetryTime: 300,
   retries: 10
 },
});

async function consumir_votos_manu() {
  const topic = 'voto_manu_gavassi';
  const consumer = kafka.consumer({groupId: 'response-group'})
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      const prefix = `topic: ${topic}[partition: ${partition} | message: ${message.offset}] / timestamp: ${message.timestamp}`
      console.log(`\n- ${prefix} ${message.key}#${message.value}`)

      await producer.connect();
      await producer.send({
        topic: 'voto_response',
        messages: [
          { value: "Voto em Manu Gavassi computado" }
        ]
      })
    }
  }); 
}

async function consumir_votos_mari() {
  const topic = 'voto_mari_gonzalez';  
  const consumer = kafka.consumer({groupId: 'response-group'})
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      const prefix = `topic: ${topic}[partition: ${partition} | message: ${message.offset}] / timestamp: ${message.timestamp}`
      console.log(`\n- ${prefix} ${message.key}#${message.value}`)

      await producer.connect();
      await producer.send({
        topic: 'voto_response',
        messages: [
          { value: "Voto em Mari Gonzalez computado" }
        ]
      })
    }
  }); 
}

async function consumir_votos_prior() {
  const topic = 'voto_felipe_prior';  

  await consumer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      const prefix = `topic: ${topic}[partition: ${partition} | message: ${message.offset}] / timestamp: ${message.timestamp}`
      console.log(`\n- ${prefix} ${message.key}#${message.value}`)

      await producer.connect();
      await producer.send({
        topic: 'voto_response',
        messages: [
          { value: "Voto em Felipe Prior computado" }
        ]
      })
    }
  }); 
}

function run () {
  consumir_votos_manu();
  consumir_votos_mari();
  consumir_votos_prior();
}

run().catch(console.error);