const cardManu = document.getElementById('card-manu');

cardManu.addEventListener('click', async _ => {

  console.log("Clicou na manu");
  try {     
    const response = await fetch('http://localhost:3333/manu-gavassi', {
      method: 'post',
      // body: {
      //   // Your body
      // }
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});