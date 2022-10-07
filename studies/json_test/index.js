const fs = require('fs');

var data = fs.readFileSync('queue.json');
var myObjects = JSON.parse(data);

myObjects.forEach(object => console.log(object));

const first = myObjects.shift();
console.log("\nApós Add:");
console.log(first);
myObjects.forEach(object => console.log(object));

const request1 = {
  fileList: "HarryPotter.pdf, Evelyn Hugo.pdf, Orlando.osd, Carol.pdf",
  typeOfResource: 2
}

const request2 = {
  fileList: "Metodologia.pdf, Prog1.pdf, Eletronica.pdf, Direito.pdf",
  typeOfResource: 2
}

myObjects.push(request1);
myObjects.push(request2);
myObjects = JSON.stringify(myObjects);

fs.writeFile('queue.json', myObjects, err => {
    // error checking
    if(err) throw err;
    
    console.log("New data added");
});  