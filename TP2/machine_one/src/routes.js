import express from 'express';

const routes = express.Router();
const parsed_value = JSON.stringify({
  fileList: 'HarryPotter.pdf, Evelyn Hugo.pdf, Orlando.osd, Carol.pdf',
  typeOfResource: 1
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