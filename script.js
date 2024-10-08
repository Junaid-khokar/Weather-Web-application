// intialize variables here
let months = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let day = date.getDate();
let check = "" ;

// Access DOM elements here 
let temprature = document.querySelector(".temprature");
let humiDT = document.querySelector(".humper");
let wind = document.querySelector(".wph");
let condition = document.querySelector(".condition");
let city = document.querySelector(".city");
let button = document.querySelector(".btn");
let fullDate = document.querySelector(".fulldate");
let fullYear = document.querySelector(".fullyear");
let nextTemp = document.querySelectorAll(".temp2");
let nextWph = document.querySelectorAll(".wph2");
let nexthumiDT = document.querySelectorAll(".humiDT2");
let nextDays = document.querySelectorAll(".date2");
let input = document.querySelector(".input") ;

// perform Tasks here
button.addEventListener('click', search);

 function search() {

   let loc =  input.value;
    // stops unneccessory API calls
    if(check != loc )
    {
        Display(loc);
    }
}
async function Display(loc) {
    const apikey = "YD6VPTFJNJZ5C9KM5ZS3KQQ2C";
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=${apikey}`;

    let res = await fetch(url)
    try{
            let respons = await res.json();
            humiDT.innerHTML = `${respons.currentConditions.humidity}%`;
            wind.innerHTML = `${parseInt(respons.currentConditions.windspeed * 1.6)}km/h`;
            condition.innerHTML = respons.currentConditions.conditions;
            temprature.innerHTML = `${parseInt(5 / 9 * (respons.currentConditions.temp - 32))}°`;
            city.innerHTML = respons.resolvedAddress;

            for (let i = 0; i < 6; i++) {
                nextTemp[i].innerHTML = `${parseInt(5 / 9 * (respons.days[i + 1].temp - 32))}°`;
                nextDays[i].innerHTML = `${respons.days[i + 1].datetime.split("-")[2]} ${months[(respons.days[i + 1].datetime.split("-")[1][1] - 1)]}`;
                nextWph[i].innerHTML = `${parseInt((respons.days[i + 1].windspeed) * 1.6)}km/h`;
                nexthumiDT[i].innerHTML = `${respons.days[i + 1].humidity}%`;
            }
        }
        catch {
            alert("Something went wrong please re-Enter the Location");
        }
}
fullDate.innerText = `${day} ${months[month]}`;
fullYear.innerText = year;

Display("india");
