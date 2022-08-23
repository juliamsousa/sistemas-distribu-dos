import express from 'express';

const routes = express.Router();

routes.post ('/manu-gavassi', async (req, res) => {
  await req.producer.send({
    topic: 'voto_manu_gavassi',
    messages: [
      {
        value: "Voto em Manu Gavassi"
      },
    ]
  })
  return res.json({ok: true});
});

export default routes;