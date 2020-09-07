const fetch = require('node-fetch');
const fs = require('fs');

async function getDataTotalCount() {
    const result_json = await fetch("https://www.avanza.se/_cqbe/fund/list", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,sv;q=0.8,da;q=0.7",
          "content-type": "application/json;charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-securitytoken": "-",
          "cookie": "_ga=GA1.2.424461689.1521150369; AZACOOKIEMESSAGE=1; __couid=4e093aa2-15dd-46ca-a994-d100fdeeecbb; _fbp=fb.1.1549137111112.1151006543; AZAHLI=bankId; AZA_ONBOARDING_PERSONAL-MENU-ONBOARDING=true; AZA_ONBOARDING_MY-ECONOMY-ONBOARDING-2019=true; __gads=ID=c6213a5d73ceaf09:T=1583075494:S=ALNI_Mb73WEr_IRAEg6YgmFpL7D95ZkBUQ; _gcl_au=1.1.326852944.1589623979; _gid=GA1.2.444845462.1595943853; AZAPERSISTANCE=0253c8bd2e-1942-40zTzbB06isEzg-FJdNOt_UxskujLI6UQfbGZM4Da8MItrCfLd26Ou2k9vAa58-QQy1eI; JSESSIONID=vodiw1qg1y3mcoklji7m10v4; _gat_UA-1234489-15=1"
        },
        "referrer": "https://www.avanza.se/fonder/lista.html?sortField=name&sortDirection=ASCENDING",
        "referrerPolicy": "origin-when-cross-origin",
        "body": "{\"startIndex\":0,\"indexFund\":false,\"sustainabilityProfile\":false,\"lowCo2\":false,\"noFossilFuelInvolvement\":false,\"regionFilter\":[],\"countryFilter\":[],\"alignmentFilter\":[],\"industryFilter\":[],\"fundTypeFilter\":[],\"interestTypeFilter\":[],\"sortField\":\"developmentOneYear\",\"sortDirection\":\"DESCENDING\",\"name\":\"\",\"recommendedHoldingPeriodFilter\":[],\"companyFilter\":[],\"productInvolvementsFilter\":[],\"ratingFilter\":[],\"sustainabilityRatingFilter\":[],\"environmentalRatingFilter\":[],\"socialRatingFilter\":[],\"governanceRatingFilter\":[]}",
        "method": "POST",
        "mode": "cors"
      });

      async function waitForJson() {
        var result = await result_json.json();
        var TotNoFunds = result.totalNoFunds;
//        console.log(result.totalNoFunds);
        return TotNoFunds;
    };
    var TotalCount =  waitForJson()
    return TotalCount;
    //return 0;
} 
   
//getDataTotalCount()

async function getData(TotalPages) {
//console.log('TotalPages = ' + TotalPages);
    for(page = 0; page <= TotalPages; page++) {
//        console.log('start for loop using page');
//        await new Promise(r => setTimeout(r, 2000));
        let offset = page * 20;
//        console.log('Offset = ' + offset + ' and page = ' + page);

        fs.writeFile('./Avanza/Result/IDs_'+ page +'.txt', 'id@isin@Name@Category@Type@TotalFee@Risk@Rating@Index@d1@w1@m1@m3@y1@y3@y5@y10' + '\r\n', 'utf8', function(err) {  
            console.log(err);
        });
            
//        fs.writeFile('./Avanza/Result/ErrorIDs_Errors'+ page +'.txt', 'ID@Error' + '\r\n', function(err) { 
//            console.log(err);
//        });

        let result_json = await await fetch("https://www.avanza.se/_cqbe/fund/list", {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,sv;q=0.8,da;q=0.7",
              "content-type": "application/json;charset=UTF-8",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-securitytoken": "-",
              "cookie": "_ga=GA1.2.424461689.1521150369; AZACOOKIEMESSAGE=1; __couid=4e093aa2-15dd-46ca-a994-d100fdeeecbb; _fbp=fb.1.1549137111112.1151006543; AZAHLI=bankId; AZA_ONBOARDING_PERSONAL-MENU-ONBOARDING=true; AZA_ONBOARDING_MY-ECONOMY-ONBOARDING-2019=true; __gads=ID=c6213a5d73ceaf09:T=1583075494:S=ALNI_Mb73WEr_IRAEg6YgmFpL7D95ZkBUQ; _gcl_au=1.1.326852944.1589623979; _gid=GA1.2.444845462.1595943853; AZAPERSISTANCE=0253c8bd2e-1942-40zTzbB06isEzg-FJdNOt_UxskujLI6UQfbGZM4Da8MItrCfLd26Ou2k9vAa58-QQy1eI; JSESSIONID=vodiw1qg1y3mcoklji7m10v4; _gat_UA-1234489-15=1"
            },
            "referrer": "https://www.avanza.se/fonder/lista.html?sortField=name&sortDirection=ASCENDING&selectedTab=overview",
            "referrerPolicy": "origin-when-cross-origin",
            "body": "{\"startIndex\":" + offset + ",\"indexFund\":false,\"sustainabilityProfile\":false,\"lowCo2\":false,\"noFossilFuelInvolvement\":false,\"regionFilter\":[],\"countryFilter\":[],\"alignmentFilter\":[],\"industryFilter\":[],\"fundTypeFilter\":[],\"interestTypeFilter\":[],\"sortField\":\"developmentOneYear\",\"sortDirection\":\"DESCENDING\",\"name\":\"\",\"recommendedHoldingPeriodFilter\":[],\"companyFilter\":[],\"productInvolvementsFilter\":[],\"ratingFilter\":[],\"sustainabilityRatingFilter\":[],\"environmentalRatingFilter\":[],\"socialRatingFilter\":[],\"governanceRatingFilter\":[]}",
            "method": "POST",
            "mode": "cors"
          });

 
        async function waitForJson(page) {
//            console.log('1st = ' + page);
//            await new Promise(r => setTimeout(r, 1000));
            var result_json1 = await result_json.json();
//            console.log(result_json1);
            for (i = 0; i <= 19; i++) {
//                console.log('start for loop using i');
//                console.log('inside for loop = ' + page);
//                console.log(result_json1.fundListViews[i]);
				var id = await result_json1.fundListViews[i].orderbookId;
                var isin = await result_json1.fundListViews[i].isin;
                var name = await result_json1.fundListViews[i].name;
                var category = await result_json1.fundListViews[i].category;
                var type = await result_json1.fundListViews[i].fundType;
                var totalfee = await result_json1.fundListViews[i].totalFee;
                var risk = await result_json1.fundListViews[i].risk;
                var rating = await result_json1.fundListViews[i].rating;
                var index = await result_json1.fundListViews[i].indexFund;
                var d1 = await result_json1.fundListViews[i].developmentOneDay;
                var w1 = await result_json1.fundListViews[i].developmentOneWeek;
                var m1 = await result_json1.fundListViews[i].developmentOneMonth;
                var m3 = await result_json1.fundListViews[i].developmentThreeMonths;
                var y1 = await result_json1.fundListViews[i].developmentOneYear;
                var y3 = await result_json1.fundListViews[i].developmentThreeYears;
                var y5 = await result_json1.fundListViews[i].developmentFiveYears;
                var y10 = await result_json1.fundListViews[i].developmentTenYears;
            
                console.log(name);
/*
                console.log(isin);
                console.log(category);
                console.log(type);
                console.log(totalfee);
                console.log(risk);
                console.log(rating);
                console.log(index);
                console.log(d1);
                console.log(w1);
                console.log(m1);
                console.log(m3);
                console.log(y1);
                console.log(y3);
                console.log(y5);
                console.log(y10);
*/                       
//                console.log('Result/IDs_' + page + '.txt'); 
                fs.writeFile('./Avanza/Result/IDs_'+ page +'.txt', id +'@'+ isin +'@'+ name +'@'+ category +'@'+ type +'@'+ totalfee +'@'+ risk +'@'+ rating +'@'+ index +'@'+ d1 +'@'+ w1 +'@'+ m1 +'@'+ m3 +'@'+ y1 +'@'+ y3 +'@'+ y5 +'@'+ y10 + '\r\n', {flag: 'a', encoding: 'utf8'}, function(err) { 
                    console.log(err);
                });
//                console.log('end of for loop using i');            
            }   
            
        }
//    console.log('calling waitforjson()');    
    waitForJson(page)
//    console.log('end of for loop using page');
    }
    
};


Promise.all([getDataTotalCount()])
.then(result => {    
    var TotalPages = Math.ceil(result/20);
    getData(TotalPages) 
});