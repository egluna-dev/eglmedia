const fs = require('fs');

const fetchImages = (location) => {
    const dir = `./public/images/${location}`;

    // list all files in directory
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(err);
            throw err;
        }

        files.forEach(image => console.log(image));
    });
}

module.exports = fetchImages;