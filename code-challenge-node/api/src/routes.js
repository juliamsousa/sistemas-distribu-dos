import express from 'express';
import {Router} from 'express';

const routes = express.Router();

routes.post ('/certifications', async (req, res) => {
  await req.producer.send({
    topic: 'test_topic',
    messages: [
      {
        value: "Hello World Kafka"
      },
      {
        value: "Another test"
      }
    ]
  })
  return res.json({ok: true});
});

export default routes;