const fetch = require('node-fetch');
const fs = require('fs');
const fsPromises = require('fs').promises
const async = require('async');


async function getData(id, intervalname, intervaldays) {
    console.log(id, intervalname, intervaldays);   
    var now_start = new Date();
    var hour_start = now_start.getHours();
    var min_start = now_start.getMinutes();
    var sec_start = now_start.getSeconds();
    var msec_start = now_start.getMilliseconds();
    var time_start = hour_start +':'+ min_start +':'+ sec_start +':'+ msec_start;

    var now_from = new Date(new Date().setDate(new Date().getDate() - intervaldays));
    var year_from = now_from.getFullYear();
    var month_from = (now_from.getMonth() + 1);
    var monthasstr_from = month_from.toString();
    var month2_from = monthasstr_from.padStart(2, '0');
    var day_from = ("0" + now_from.getDate()).slice(-2);
    var from = year_from +'-'+ month2_from +'-'+ day_from;

    var now_to = new Date(new Date().setDate(new Date().getDate() - 1));
    var year_to = now_to.getFullYear();
    var month_to = (now_to.getMonth() + 1);
    var monthasstr_to = month_to.toString();
    var month2_to = monthasstr_to.padStart(2, '0');
    var day_to = ("0" + now_to.getDate()).slice(-2);
    var to = year_to +'-'+ month2_to +'-'+ day_to;

    let result_json = await await fetch("https://www.avanza.se/_cqbe/fund/chart/" + id + "/" + from + "/" + to, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,sv;q=0.8,da;q=0.7",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "_ga=GA1.2.424461689.1521150369; AZACOOKIEMESSAGE=1; __couid=4e093aa2-15dd-46ca-a994-d100fdeeecbb; _fbp=fb.1.1549137111112.1151006543; AZAHLI=bankId; AZA_ONBOARDING_PERSONAL-MENU-ONBOARDING=true; AZA_ONBOARDING_MY-ECONOMY-ONBOARDING-2019=true; __gads=ID=c6213a5d73ceaf09:T=1583075494:S=ALNI_Mb73WEr_IRAEg6YgmFpL7D95ZkBUQ; _gcl_au=1.1.326852944.1589623979; AZAPERSISTANCE=0253c8bd2e-1942-40ntpmfxE1_ERCIujtXymO3cCLV4u67ipcfEYxOWp0HVrCK6wroaW_YTXKcOUljCub60A; JSESSIONID=1gqpio0cdki6n1fcpbreishoyp; _gid=GA1.2.206532994.1596622924"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
        });
    
    async function waitForJson(id) {
        try {
            var result_json1 = await result_json.json();
    //            console.log(result_json1);       
            var x = result_json1.dataSerie[result_json1.dataSerie.length - 1];    
            console.log(x);
            var x2 = x.y;
            console.log(x2);
            var fromdate = result_json1.fromDate;    
            var todate = result_json1.toDate;    
            console.log(fromdate);
            console.log(todate);
            fs.writeFile('./Avanza/Result/Progress_' + intervalname +'.txt', id +'@'+ x2 +'@'+ fromdate +'@'+ todate + '\r\n', {flag: 'a'}, function(err) { 
                console.log(err);
            });
        }
        catch(error) {
            fs.writeFile('./Avanza/Result/Errors.txt', id +'@'+ intervalname +'@'+ error + '\r\n', {flag: 'a'}, function(err) { 
                console.log(err);
            });
        }
    }   
    waitForJson(id)
};

fs.writeFile('./Avanza/Result/Progress_d2.txt', 'id@d2@fromdate@todate' + '\r\n', function(err) {  
    console.log(err);
});
fs.writeFile('./Avanza/Result/Progress_d3.txt', 'id@d3@fromdate@todate' + '\r\n', function(err) {  
    console.log(err);
});

fs.writeFile('./Avanza/Result/Progress_w2.txt', 'id@2w@fromdate@todate' + '\r\n', function(err) {  
    console.log(err);
});

var result = [];
var array = fs.readFileSync("./Avanza/Result/FinalArray.txt", 'utf-8',);
//console.log(array);
var array2 = array.split('\r\n');
console.log(array2);
for (var i = 0; i < array2.length; i++) {
    result[i] = array2[i].split("@");
}

var result2 = result.filter(value => value.length > 2);

console.log(result2);


let count = 0;
const compareVariable = result2.length;
console.log('About to start from ' + count + ' to ' + compareVariable);
async.whilst(
    function functionName1(callbackFunction) {
    // perform before each execution of iterFunctionInside, you need a condition(or other related condition) in 2nd params.
        callbackFunction(null, count < compareVariable)
    },
    // this func is called each time when functionName1 invoked
    function iterFunctionInside(callback) {
        // increase counter to compare with compareVariable
        console.log('iteration', count);
        getData(result2[count][0], result2[count][1], result2[count][2])
        count++;
        // if you want to show like tick time, you can set timeout here or comment out if you dont want
        setTimeout(() => {
            callback(null, count);
        }, 300)
    },
    function (err, n) {
        console.log('Done');
    },
);
