var fs = require('fs');


exports.readJSONFile = function(filePath) {

    try {

        data = fs.readFileSync('./JSON/' + filePath + '.json', 'utf8');

        return JSON.parse(data);

    } catch (exception) {

        console.log(exception);

    }

};

exports.writeJSONFile = function(filePath, object){

    try {
        var objectStr = JSON.stringify(object);

        fs.writeFile('./JSON/' + filePath + '.json', objectStr , function (err) {

            if (err) {  console.log(err);};

            console.log('It\'s saved! in same location.');

        });

    } catch (exception){

        console.error(exception);

    }





}





