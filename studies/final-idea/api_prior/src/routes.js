import express from 'express';

const routes = express.Router();


routes.post ('/felipe-prior', async (req, res) => {
  await req.producer.send({
    topic: 'voto_felipe_prior',
    messages: [
      {
        value: "Voto em Felipe Prior"
      }
    ]
  })
  return res.json({ok: true});
});



export default routes;