import express from 'express';

const routes = express.Router();

routes.post ('/mari-gonzalez', async (req, res) => {
  await req.producer.send({
    topic: 'voto_mari_gonzalez',
    messages: [
      {
        value: "Voto em Mari Gonzalez"
      },
    ]
  })
  return res.json({ok: true});
});

export default routes;