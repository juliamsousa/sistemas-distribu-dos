const cardPrior = document.getElementById('card-prior');

cardPrior.addEventListener('click', async _ => {
  console.log("Clicou no prior")
  try {     
    const response = await fetch('http://localhost:3335/felipe-prior', {
      method: 'post',
      body: {
        // Your body
      }
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});
