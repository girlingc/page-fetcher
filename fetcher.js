const request = require('request');
const fs = require('fs');
let args = process.argv.splice(2);

// Check for if the file name
fs.exists(args[1], exists => {
  if (exists) {
    console.log(`\n${args[1]} already exists!`);
    return;
  }
  request(args[0], (error, response, body) => {
    // Checks for URL errors
    if (error || response.statusCode >= 400) {
      console.log(`\n${args[0]} has given you an error:`, error ? error.message : response.statusMessage);
      return;

    }

    fs.writeFile(args[1], body, writeError => {
      // Checks if the local file path is invalid
      if (writeError) {
        console.log('\nThe local file path does not exist:', writeError.path);
        return;
      }
      // If no error, writes the resource at the URL to a new file
      console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
    });
  });
});



