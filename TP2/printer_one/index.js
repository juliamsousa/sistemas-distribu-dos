import { Kafka, logLevel } from "kafkajs";

/**
 * Faz conexão com o Kafka - Confluent Cloud
 */

const username = "QZRZVRJP2MXHBF5M";
const password ="XckVtyJnX97X66xSg5pp0IP5aG/gobfWBwX66Fb6RkgmFtzK0Z/D+T7UZiK8AH/c";
const sasl = username && password ? { username, password, mechanism: "plain" } : null;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: "printer",
  brokers: ["pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092"],
  logLevel: logLevel.WARN,
  ssl,
  sasl,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

async function print() {
  const topic = "acquire_resource_1";
  const consumer = kafka.consumer({ groupId: "printers" });
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value);
      const file_list = data.fileList.split(",");
      console.log(file_list);
      
      file_list.forEach(file => {
        setTimeout(() => {
          console.log(`\nImprimindo o arquivo... ${file}`);
          console.log(`Impressão de arquivo finalizada. Resource released`);
        }, Math.floor(Math.random() * 10000) + 5000);
      });
      
      const prefix = `topic: ${topic}[partition: ${partition} | message: ${message.offset}] / timestamp: ${message.timestamp}`;
      console.log(`\n- ${prefix} \n`);

      await producer.connect();
      await producer.send({
        topic: "release_resource_1",
        messages: [
          { value: `Impressão de arquivos finalizada. Resource released` },
        ],
      });
    },
  });
}

async function run() {
  const topic = "release_resource_1";
  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "release_resource_1",
    messages: [
      { value: `Impressão de arquivos finalizada. Resource released` },
    ],
  });
  console.log("Resource is available to use");

  print();
}

try {
  run();
} catch (error) {
  console.error;
}
