import express from 'express';

const possible_requests = [
  {
    "fileList": "Lista1.pdf, Prova1.pdf, Material_leitura.osd",
    "typeOfResource": 1
  },
  {
    "fileList": "Carmilla.pdf, Orlando.pdf, Appel_Compiladores.pdf",
    "typeOfResource": 3
  },
  {
    "fileList": "Ementa_SD.pdf, Horarios.pdf",
    "typeOfResource": 4
  },
  {
    "fileList": "Grade.wordx, Contas.csv, Comprovantes.png, Contrato.pdf",
    "typeOfResource": 16
  },
  {
    "fileList": " Material_leitura1.osd, Material_leitura2.osd, Material_leitura3.osd, Material_leitura4.osd",
    "typeOfResource": 4
  },
  {
    "fileList": "HarryPotter.pdf, Evelyn Hugo.pdf, Orlando.osd, Carol.pdf",
    "typeOfResource": 9
  },
  {
    "fileList": "Metodologia.pdf, Prog1.pdf, Eletronica.pdf, Direito.pdf",
    "typeOfResource": 10
  }
];

const routes = express.Router();

routes.post ('/request-resource', async (req, res) => {
  // sorteia um item aleatorio para simular um request
  const randomIndex = Math.floor(Math.random() * possible_requests.length);
  const item = possible_requests[randomIndex];
  const parsed_value = JSON.stringify(item);

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