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

const topic = 'test_topic';
const consumer = kafka.consumer({groupId: 'test-group'})
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage: async({topic, partition, message}) => {
      const prefix = `topic: ${topic}[partition: ${partition} | message: ${message.offset}] / timestamp: ${message.timestamp}`
      console.log(`\n- ${prefix} ${message.key}#${message.value}`)

      await producer.connect();
      await producer.send({
        topic: 'test_topic_response',
        messages: [
          { value: "O teste foi respondido" }
        ]
      })
    }
  }); 
}

run().catch(console.error);