const fs = require('fs');
const fsPromises = require('fs').promises

function filesinfolder (folder, encoding) {
    return new Promise(function(resolve, reject) {
        fs.readdir(folder, encoding, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                var filenames2 = filenames.filter(file => file.substring(0, 4) == 'IDs_'); 
                resolve(filenames2);
        });
    });
};

function readfiles(files, encoding){
    return Promise.all(
        files.map(file => fsPromises.readFile("./Avanza/Result/" +  file, 'utf-8'))
    )
};

function stripresultfromfiles(array) {
    var string = array.toString();
    var string2 = string.replace(/,/g, '|');
    var array2 = string2.split("\r\n");
    var array3 = array2.filter(value => value.length > 3);
    var array4 = array3.filter(value => Number.isInteger(value));
    var ids = [];          
    for (i = 1; i < array3.length; i++) {
        id = array3[i].split('@');
        ids.push(id[0]);    
    } 
    var ids2 = ids.filter(value => !isNaN(value));
    return ids2;
};

async function buildfinalarray(id, intervalname, intervaldays) {
   await fs.writeFile('./Avanza/Result/FinalArray.txt', id +'@'+ intervalname +'@'+ intervaldays + '\r\n', {flag: 'a'}, function(err) { 
        console.log(err);
    });
};

fs.writeFile('./Avanza/Result/FinalArray.txt','', function(err) { 
    console.log(err);
});

fs.writeFile('./Avanza/Result/Errors.txt', 'id@intervalname@error' + '\r\n', function(err) { 
    console.log(err);
});



var intervals = [["d2", 2],["d3", 3],["w2", 14]];

filesinfolder("./Avanza/Result", "utf8")
.then((files) => readfiles(files, "utf8"))
.then((filedata) => stripresultfromfiles(filedata)) 
.then((ids) => ids.map(id => intervals.map(interval => buildfinalarray(id, interval[0], interval[1]))))
.catch((error) => console.log(error));
