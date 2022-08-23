import express from 'express';
import { Kafka, logLevel } from 'kafkajs';

import routes from './routes';

const app = express();

/**
 * Faz conexão com o Kafka - Confluent Cloud
 */
//  const username = 'QZRZVRJP2MXHBF5M';
//  const password = 'XckVtyJnX97X66xSg5pp0IP5aG/gobfWBwX66Fb6RkgmFtzK0Z/D+T7UZiK8AH/c'
//  const sasl = username && password ? { username, password, mechanism: 'plain' } : null
//  const ssl = !!sasl

// const kafka = new Kafka({
//   clientId: 'api',
//   brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
//   logLevel: logLevel.WARN,
//   ssl,
//   sasl,
//   retry: {
//     initialRetryTime: 300,
//     retries: 10
//   },
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

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

/**
 * Disponibiliza o producer para todas rotas
 */
app.use((req, res, next) => {
  req.producer = producer;

  return next();
})

/**
 * Cadastra as rotas da aplicação
 */
app.use(routes);

async function run() {
  await producer.connect()
  await consumer.connect()

  await consumer.subscribe({ topic: 'voto_felipe_prior' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Voto computado', String(message.value));
    },
  });
  
  console.log("\nFelipe Prior API Running on port 3334\n");
  app.listen(3335);
}

run().catch(console.error)