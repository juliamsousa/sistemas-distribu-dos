import express from 'express';
import routes from './routes';
import {Kafka, logLevel } from 'kafkajs';

const username = 'QZRZVRJP2MXHBF5M';
const password = 'XckVtyJnX97X66xSg5pp0IP5aG/gobfWBwX66Fb6RkgmFtzK0Z/D+T7UZiK8AH/c'
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const app = express();


// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
// const kafka = new Kafka({
//   clientId: 'api',
//   brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
//   ssl,
//   sasl
// });

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

app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

app.use(routes);

async function run () {
  await producer.connect;
  app.listen(3333);
}

run().catch(console.error);