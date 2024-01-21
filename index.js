const csv = require('csv-parser')
const fs = require('fs')
const canadaFile = 'canada.txt'
const usaFile = 'usa.txt'
const canadaResults = [];
const usaResults = [];

fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (data) => {
    if(data.country === 'Canada'){
      canadaResults.push(data)
    }
    else if((data.country === 'United States')){
      usaResults.push(data)
    }
  })
  .on('end', () => {
      if(fs.existsSync(canadaFile)){
        fs.unlinkSync(canadaFile)
      }
      else if(fs.existsSync(usaFile)){
        fs.unlinkSync(usaFile)
      }
    
    const canOutputStream = fs.createWriteStream(canadaFile)
    const usaOutputStream = fs.createWriteStream(usaFile)
    canOutputStream.write('country,year,population\n')
    usaOutputStream.write('country,year,population\n')
    canadaResults.forEach(row => canOutputStream.write(`${row.country},${row.year},${row.population}\n`))
    usaResults.forEach(row => usaOutputStream.write(`${row.country},${row.year},${row.population}\n`))
  });