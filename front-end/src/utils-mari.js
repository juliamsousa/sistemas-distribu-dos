const cardMari = document.getElementById('card-mari');

cardMari.addEventListener('click', async _ => {
  console.log("Clicou na Mari");
  try {     
    const response = await fetch('http://localhost:3334/mari-gonzalez', {
      method: 'post',
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});