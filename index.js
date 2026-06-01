let searchicon = $(".searchicon");

console.log("the search icon printed", searchicon);

searchicon.click(fetchingData);

async function fetchAQIData(lat, lon) {
  let fetchAQIData = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=35e7a86ea971168ae3229e2dde630340`,
  );
  let formatedAQIData = await fetchAQIData.json();

  console.log("AQI DATA === ", formatedAQIData);

  let list = formatedAQIData.list[0].components;
  console.log("Components List :", list);

  $("#no2")[0].innerText = "No2";
  $("#no2Value")[0].innerText = list.no2;

  $("#o3")[0].innerText = "O3";
  $("#o3Value")[0].innerText = list.no2;

  $("#co")[0].innerText = "CO";
  $("#coValue")[0].innerText = list.no2;

  $("#so2")[0].innerText = "SO2";
  $("#so2Value")[0].innerText = list.no2;
}

async function fetchingData() {
  // alert("Featching Data");

  // CHANGING TIME AND DATE SECONDS TO MILLISECONDS

  function dateFormat(timeStamp) {
    const date = new Date(timeStamp * 1000);
    console.log(date.toUTCString());
    // console.log(date.toLocaleString());
    // return date.toLocaleString();
    return date.toLocaleString("en-US", {
      hour12: true,
    });
  }

  let cityName = document.querySelectorAll(".inputfield")[0].value;
  console.log("current City", cityName);

  let requestData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=35e7a86ea971168ae3229e2dde630340&units=metric`,
  );
  let formatedData = await requestData.json();
  console.log("Fetched Data ", formatedData);

  let responseCityName = formatedData.name;
  let responseTemp = formatedData.main.temp;
  let skyDescription = formatedData.weather[0].description;
  let humidity = formatedData.main.humidity;
  let pressure = formatedData.main.pressure;
  let feels_like = formatedData.main.feels_like;
  let visibility = formatedData.visibility;

  $("#humidityvalue")[0].innerText = humidity;
  $("#pressurevalue")[0].innerText = pressure;
  $("#feelslikevalue")[0].innerText = feels_like;
  $("#visibilityvalue")[0].innerText = visibility;
  $("#cityDesc")[0].innerText = skyDescription;

  // DATE AND TIME UPDATED
  let properdate = dateFormat(formatedData.dt);
  let date = properdate.split(",")[0];
  let time = properdate.split(",")[1];
  $("#date")[0].innerText = date;
  $("#time")[0].innerText = time;
  // DATE AND TIME UPDATED
  $("#cityName")[0].innerText = responseCityName;
  $("#cityTemp")[0].innerText = responseTemp;
  // $("#cityDesc")[0].innerText = skyDescription;

  // DATE AND TIME UPDATED

  // UPDATING SUNRISE AND SUNSET

  let sunriseTimeStamp = formatedData.sys.sunrise;
  let sunsetTimeStamp = formatedData.sys.sunset;
  let propersunriseTime = dateFormat(sunriseTimeStamp).split(",")[1];
  let propersunsetTime = dateFormat(sunsetTimeStamp).split(",")[1];
  $("#sunrisetime")[0].innerText = propersunriseTime;
  $("#sunsettime")[0].innerText = propersunsetTime;

  // UPDATING SUNRISE AND SUNSET

  let lat = formatedData.coord.lat;
  let lon = formatedData.coord.lon;
  fetchAQIData(lat, lon);
  fetnextfivDays(lat, lon);

  console.log("sunrise : == :", propersunriseTime);
  console.log("sunset : == :", propersunsetTime);
  console.log("Changed Date And Time", date, time);
  console.log("Response in city Name : ", responseCityName);
  console.log("Response Temp  :", responseTemp);
  console.log("Sky Description  :", skyDescription);
  console.log("Date And Time ", properdate);
}

function stampTimeFive(timeone) {
  let date = new Date(timeone * 1000);

  console.log(date.toUTCString());
  console.log(date.toLocaleString());

  let fullDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return fullDate;
}

async function fetnextfivDays(lat, lon) {
  let fivdata = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=35e7a86ea971168ae3229e2dde630340&units=metric`,
  );

  let formatfivdata = await fivdata.json();

  console.log("Next five Days Data ===== :", formatfivdata);

  // ================= UNIQUE DAYS =================

  let uniqueDays = [];

  formatfivdata.list.forEach((item) => {
    let onlyDate = item.dt_txt.split(" ")[0];

    if (!uniqueDays.includes(onlyDate)) {
      uniqueDays.push(onlyDate);
    }
  });

  console.log(uniqueDays);

  // ================= DAY 1 =================

  let dayoneData = formatfivdata.list.find((item) => {
    return item.dt_txt.startsWith(uniqueDays[1]);
  });

  let dayone = dayoneData.dt;

  let oneday = stampTimeFive(dayone).split(",")[0];

  let formatdayone = stampTimeFive(dayone).split(",")[1];


  

  $("#dayone")[0].innerText = oneday;

  $("#dayonedate")[0].innerText = formatdayone;

  let dayonetemp = dayoneData.main.temp;

  $("#tempone")[0].innerText = dayonetemp;

  if (dayonetemp >= 20 && dayonetemp <= 26) {
    $("#cloud-img-1").attr("src", "Images/cool.png");
  } else if (dayonetemp >= 27 && dayonetemp <= 31) {
    $("#cloud-img-1").attr("src", "Images/normal.png");
  } else if (dayonetemp >= 32 && dayonetemp <= 38) {
    $("#cloud-img-1").attr("src", "Images/high.png");
  } else if (dayonetemp >= 38) {
    $("#cloud-img-1").attr("src", "Images/veryhigh.png");
  }

  // ================= DAY 2 =================

  let daytwoData = formatfivdata.list.find((item) => {
    return item.dt_txt.startsWith(uniqueDays[2]);
  });

  let daytwo = daytwoData.dt;

  let twoday = stampTimeFive(daytwo).split(",")[0];

  let formatdaytwo = stampTimeFive(daytwo).split(",")[1];

  $("#daytwo")[0].innerText = twoday;

  $("#daytwodate")[0].innerText = formatdaytwo;

  let daytwotemp = daytwoData.main.temp;

  $("#temptwo")[0].innerText = daytwotemp;

  if (daytwotemp >= 20 && daytwotemp <=26) {
    $("#cloud-img-2").attr("src", "Images/cool.png");
  } else if (daytwotemp >= 27 && daytwotemp <= 31) {
    $("#cloud-img-2").attr("src", "Images/normal.png");
  } else if (daytwotemp >= 32 && daytwotemp <= 38) {
    $("#cloud-img-2").attr("src", "Images/high.png");
  } else if (daytwotemp >= 38) {
    $("#cloud-img-2").attr("src", "Images/veryhigh.png");
  }

  // ================= DAY 3 =================

  let daythreeData = formatfivdata.list.find((item) => {
    return item.dt_txt.startsWith(uniqueDays[3]);
  });

  let daythree = daythreeData.dt;

  let threeday = stampTimeFive(daythree).split(",")[0];

  let formatdaythree = stampTimeFive(daythree).split(",")[1];

  $("#daythree")[0].innerText = threeday;

  $("#daythreedate")[0].innerText = formatdaythree;

  let daythreetemp = daythreeData.main.temp;

  $("#tempthree")[0].innerText = daythreetemp;

  if (daythreetemp >= 20 && daythreetemp <= 26) {
    $("#cloud-img-3").attr("src", "Images/cool.png");
  } else if (daythreetemp >= 27 && daythreetemp <= 31) {
    $("#cloud-img-3").attr("src", "Images/normal.png");
  } else if (daythreetemp >= 32 && daythreetemp <= 38) {
    $("#cloud-img-3").attr("src", "Images/high.png");
  } else if (daythreetemp >= 38) {
    $("#cloud-img-3").attr("src", "Images/veryhigh.png");
  }

  // ================= DAY 4 =================

  let dayfourData = formatfivdata.list.find((item) => {
    return item.dt_txt.startsWith(uniqueDays[4]);
  });

  let dayfour = dayfourData.dt;

  let fourday = stampTimeFive(dayfour).split(",")[0];

  let formatdayfour = stampTimeFive(dayfour).split(",")[1];

  $("#dayfour")[0].innerText = fourday;

  $("#dayfourdate")[0].innerText = formatdayfour;

  let dayfourtemp = dayfourData.main.temp;

  $("#tempfour")[0].innerText = dayfourtemp;

  if (dayfourtemp >= 20 && dayfourtemp <= 26) {
    $("#cloud-img-4").attr("src", "Images/cool.png");
  } else if (dayfourtemp >= 27 && dayfourtemp <= 31) {
    $("#cloud-img-4").attr("src", "Images/normal.png");
  } else if (dayfourtemp >= 32 && dayfourtemp <= 38) {
    $("#cloud-img-4").attr("src", "Images/high.png");
  } else if (dayfourtemp >= 38) {
    $("#cloud-img-4").attr("src", "Images/veryhigh.png");
  }

  // ================= DAY 5 =================

  let dayfiveData = formatfivdata.list.find((item) => {
    return item.dt_txt.startsWith(uniqueDays[5]);
  });

  let dayfive = dayfiveData.dt;

  let fiveday = stampTimeFive(dayfive).split(",")[0];

  let formatdayfive = stampTimeFive(dayfive).split(",")[1];

  $("#dayfive")[0].innerText = fiveday;

  $("#dayfivedate")[0].innerText = formatdayfive;

  let dayfivetemp = dayfiveData.main.temp;

  $("#tempfive")[0].innerText = dayfivetemp;

  if (dayfivetemp >= 20 && dayfivetemp <= 26) {
    $("#cloud-img-5").attr("src", "Images/cool.png");
  } else if (dayfivetemp >= 27 && dayfivetemp <= 31) {
    $("#cloud-img-5").attr("src", "Images/normal.png");
  } else if (dayfivetemp >= 32 && dayfivetemp <= 38) {
    $("#cloud-img-5").attr("src", "Images/high.png");
  } else if (dayfivetemp >= 38) {
    $("#cloud-img-5").attr("src", "Images/veryhigh.png");
  }


//   let today = formatfivdata.list[0].dt_txt.split(" ")[0];

// let todayAllData = formatfivdata.list.filter((item) => {
//   return item.dt_txt.startsWith(today);
// });

// console.log("TODAY ALL DATA =====", todayAllData);

let uniuedates = [];

formatfivdata.list.forEach((items)=>{
  let td = items.dt_txt.split(" ")[0];
  if(!uniuedates.includes(td)) {
    uniuedates.push(td)
  }
})

console.log("88888888888888888888******************",uniuedates);

let todayAllData = formatfivdata.list.filter((filteritems)=> {
  return filteritems.dt_txt.startsWith(uniuedates[1])
})

console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",todayAllData);
 


//===========
let specificTimeData = todayAllData.find((itemone) => {
  return itemone.dt_txt.split(" ")[0] === "06:00:00";
});


if (specificTimeData) {
  let zero =  specificTimeData.main.temp;

  // $("#time1")[0].innerText = specificTimeData.dt_txt.split(" ")[1];
  $("#time1")[0].innerText =
  new Date(specificTimeData.dt_txt)
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
   $("#time1t")[0].innerText = zero
} else {
  $("#time1")[0].innerText = "No data";
}

console.log("SPECIFIC TIME DATA ONE =====", specificTimeData);

//===========

//===============
let specificTimeDataTwo = todayAllData.find((itemtwo)=>{
  return itemtwo.dt_txt.split(" ")[0] === "09:00:00";
})


if (specificTimeDataTwo) {
  let one =  specificTimeDataTwo.main.temp;

  // $("#time2")[0].innerText = specificTimeDataTwo.dt_txt.split(" ")[1];
  $("#time2")[0].innerText =
  new Date(specificTimeDataTwo.dt_txt)
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
   $("#time2t")[0].innerText = one;
} else {
  $("#time2")[0].innerText = "No data";
}



console.log("TIME DATA 2",specificTimeDataTwo);
//===========

//==========
let specificTimeDataThree = todayAllData.find((itemthree)=>{
  return itemthree.dt_txt.split(" ")[0] === "12:00:00"
})


if (specificTimeDataThree) {
  let three =  specificTimeDataThree.main.temp;

  // $("#time3")[0].innerText = dateFormat(specificTimeDataThree.dt_txt.split(" ")[1]);
  $("#time3")[0].innerText =
  new Date(specificTimeDataThree.dt_txt)
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
   $("#time3t")[0].innerText = three;
} else {
  $("#time3")[0].innerText = "No data";
}

console.log("TIME DATA 3",specificTimeDataThree);

//=======


//===================

let specificTimeDataFour = todayAllData.find((itemfour)=>{
  return itemfour.dt_txt.split(" ")[0] === "15:00:00"
})

if (specificTimeDataFour) {

  let four =  specificTimeDataFour.main.temp;

  // $("#time4")[0].innerText = specificTimeDataFour.dt_txt.split(" ")[1];
  $("#time4")[0].innerText =
  new Date(specificTimeDataFour.dt_txt)
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
   $("#time4t")[0].innerText = four;
} else {
  $("#time4")[0].innerText = "No data";
}

console.log("TIME DATA 4",specificTimeDataFour);

//=================

//==================

let specificTimeDataFive = todayAllData.find((itemfive)=>{
  return itemfive.dt_txt.split(" ")[0] === "18:00:00"
})


if (specificTimeDataFive) {

  let five =  specificTimeDataFive.main.temp;

  // $("#time5")[0].innerText = specificTimeDataFive.dt_txt.split(" ")[1];
  $("#time5")[0].innerText =
  new Date(specificTimeDataFive.dt_txt)
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
   $("#time5t")[0].innerText = five;
} else {
  $("#time5")[0].innerText = "No data";
}

console.log("TIME DATA 5",specificTimeDataFive);
//==================

//=============

let specificTimeDataSix = todayAllData.find((itemsix) => {
  return itemsix.dt_txt.split(" ")[0] === "21:00:00";
});

if (specificTimeDataSix) {

  let six = specificTimeDataSix.main.temp;  

  $("#time6")[0].innerText =
    new Date(specificTimeDataSix.dt_txt)
      .toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

  $("#time6t")[0].innerText = six;

} else {
  $("#time6")[0].innerText = "No data";
}

console.log("TIME DATA 6", specificTimeDataSix);
//==============











}
