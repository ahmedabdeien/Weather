//==================--| global |--====================//
let searchCity = document.querySelector("#searchCity")
//==================--| start |--====================//
async function getJson_search(CountriesChange){
   let apiResponseI = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0687c383d84844cba40130405230308&q=${CountriesChange}&days=3`);
   if(apiResponseI.ok && 400 != apiResponseI.status){
      let finalResult = await apiResponseI.json();
      displayOne(finalResult.location,finalResult.current)
      displayTwo(finalResult.forecast.forecastday)
   }
   searchCity.addEventListener("keyup",refer =>{
    getJson_search(refer.target.value);
   });
   
}
var myDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//==================--| functions |--====================//

function displayOne(refer, e){
   if(null != e){
    var copyData = new Date(e.last_updated.replace("",""))
     document.querySelector("#days").innerHTML = myDays[copyData.getDay()]
     document.querySelector("#months").innerHTML = copyData.getDate() + ` - ` + monthNames[copyData.getMonth()]
     document.querySelector("#locationCity").innerHTML = refer.name
     document.querySelector("#hOne").innerHTML = e.temp_c + `<sup>o</sup>C`
     document.querySelector("#icnsOneD").innerHTML= ` <img  src="${e.condition.icon}" alt="" width="90px">`
     document.querySelector("#SunnyOne").innerHTML = e.condition.text
    }
}

function displayTwo(a){
   let cartona ="";
   for(let s = 1; s<a.length; s++) {
      cartona +=`
      <div class="col-lg-6 col-md-12 my-2">
      <div class="bg-black-default rounded-5 shadow-sm border-bottom border-end border-white border-opacity-10 p-3 text-center">
      <div class="py-2 border-bottom border-white border-opacity-25">
      <h4 class="fs-6">${myDays[new Date(a[s].date.replace("","")).getDay()]}</h4>
      </div>
      <div class="py-4">
      <div>
      <div class="brightness rounded-pill shadow-sm border-top border-end border-white border-opacity-10">
      <img src="https:${a[s].day.condition.icon}" alt="" width="60px">
      </div>
      </div>
      <div>
      <h3>${a[s].day.maxtemp_c}<sup>o</sup>C</h3>
      <p>${a[s].day.mintemp_c}<sup>o</sup></p>
      </div>
      <p class="mt-3 Sunny">${a[s].day.condition.text}</p>
      </div>
      </div>
      </div>
      `
      document.getElementById("tBodyCard").innerHTML = cartona
   }
}
getJson_search("cairo")