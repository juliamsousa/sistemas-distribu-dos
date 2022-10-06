import express from 'express';

const routes = express.Router();
const parsed_value = JSON.stringify({
  fileList: 'Lista1.pdf; Prova1.pdf; Material_leitura.osd',
  typeOfResource: 2
});

routes.post ('/request-resource', async (req, res) => {
  await req.producer.send({
    topic: 'requests',
    messages: [
      {
        value: parsed_value
      },
    ]
  })
  return res.json({ok: true});
});

export default routes;