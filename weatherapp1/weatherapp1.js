const url="https://api.openweathermap.org/data/2.5/"
const key="7e3f21edee540e6110af347b55eb1ab2";
//hold on text input 

const txtBox=document.getElementById("textbox");

//adding event listener to the txtbox
txtBox.addEventListener('keypress',setQuery) ;

function setQuery(event)
{
    if(event.keyCode==13)//checking the enter key press
    getResults(txtBox.value);//call the fetch method via get result

}

function getResults(txtboxValue)
{
    fetch(`${url}weather?q=${txtboxValue}&units=metric&appid=${key}`)
    .then(weather => weather.json())//returning json object
    .then((response)=>displayResults(response))//reading response and calling to dispaly the result in HTML
    .catch(error=>alert('enter valid city name'));//checking invalid entered name 
}

function displayResults(weather)
{
let city=document.getElementById("city");
city.innerText=`${weather.name}, ${weather.sys.country}`//fetching city name from api

let date=document.getElementById("date");
 var d=new Date();
date.innerText=dateCalculator(d);//calculating the date 


let temp=document.getElementById("temp");
temp.innerText= `${Math.round(weather.main.temp)}°c`;// current temperature
let weath=document.getElementById("weath");
weath.innerText=weather.weather[0].main;//weather

let minMax = document.getElementById('min-max');//min and max temperature 
  minMax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateCalculator(d)
{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}