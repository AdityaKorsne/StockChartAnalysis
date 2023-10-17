//Jimp module is used to analyse the image
const Jimp = require("jimp");

async function extractMarkedLevels(imagePath) {
  try {
    // Open the stock chart image and convert the image to greyscale
    const image = (await Jimp.read(imagePath)).grayscale();

    //thresholding to identify marked levels
    image.threshold({ max: 200 });

    //Declaring an array to store the JSON object to store Co-ordinate(x, y)
    const markedLevels = [];

    // Loop through the image and find marked levels (e.g., using color comparison)
    for (let x = 0; x < image.bitmap.width; x++) {
      for (let y = 0; y < image.bitmap.height; y++) {
        const color = Jimp.intToRGBA(image.getPixelColor(x, y));
        //console.log(color);
        //add the detected levels coordinates to the Array in the form of JSON object
        if (color.r === 0 && color.g === 0 && color.b === 0) {
          markedLevels.push({ x, y });
        }
      }
    }

    return markedLevels;
  } catch (error) {
    throw error;
  }
}

// Adding the image path
const imagePath = "/home/aditya/adityaa/chart.jpg";
extractMarkedLevels(imagePath)
  .then((markedLevels) => {
    console.log("Marked Levels:", markedLevels);
  })
  .catch((error) => {
    console.log(error);
  });
