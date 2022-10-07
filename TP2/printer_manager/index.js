import { Kafka, logLevel } from "kafkajs";
const fs = require("fs");

/**
 * Faz conexão com o Kafka - Confluent Cloud
 */
const username = "QZRZVRJP2MXHBF5M";
const password = "XckVtyJnX97X66xSg5pp0IP5aG/gobfWBwX66Fb6RkgmFtzK0Z/D+T7UZiK8AH/c";
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

// Função responsável por consumir a fila de requisições e enviar para a impressão
async function manage_printer() {
  // faz a criação de produtor e consumidor, criando e inscrevendo nos topicos correspondentes
  const topic = "release_resource_1";
  const consumer = kafka.consumer({ groupId: "printer_manager" });
  const producer = kafka.producer();

  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Array responsável por armazenar as requisições
      const data = fs.readFileSync("../request_queue.json");
      const RequestList = JSON.parse(data);

      if (RequestList.length > 0) {
        const current_request = RequestList.shift();
        const current_request_string = JSON.stringify(current_request);
  
        if (current_request_string != null) {
          await producer.connect();
          await producer.send({
            topic: "acquire_resource_1",
            messages: [{ value: current_request_string }],
          });
          console.log("Resource Acquired");
          // Faz o parse da request list para string para poder ser escrita de volta no arquivo JSON
          const AddRequestList = JSON.stringify(RequestList);
          fs.writeFile("../request_queue.json", AddRequestList, (err) => {
            // error checking
            if (err) throw err;
          });
        }
      } else {
        console.log("A lista de requests está vazia");
      }
    },
  });
}

function run() {
  manage_printer();
}

try {
  run();
} catch (error) {
  console.error;
}
