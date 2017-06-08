var thermostat = new Thermostat

var energyColorDisplay = function() {
  $( "#EnergyUsage" ).text("Energy Usage: " + thermostat.energyUsage());
  if (thermostat.energyUsage() === "low-usage") {
    $( "#EnergyUsage" ).css({"color": "green"});
  } else if (thermostat.energyUsage() === "medium-usage") {
    $( "#EnergyUsage" ).css({"color": "black"});
  } else {
    $( "#EnergyUsage" ).css({"color": "red"});
  };
};

function displayWeather(city) {
 var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
 var token = '&appid=50bff27e33c589739e74f1d6baa9a1e4';
 var units = '&units=metric';
 $.get(url + token + units, function(data) {
   $('#current-temperature').text(data.main.temp);
 })
 }

$( document ).ready(function() {

displayWeather('London');

$('#select-city').submit(function(event) {
  event.preventDefault();
  var city = $('#current-city').val();
  displayWeather(city);
})

  $( "#tempDisplay" ).text(thermostat.temperature);
  $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
  energyColorDisplay();

  $( "#psmon" ).click(function( event ) {
    event.preventDefault()
    thermostat.powerSavingModeOn()
    $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
  });

  $( "#psmoff" ).click(function( event ) {
    event.preventDefault()
    thermostat.powerSavingModeOff()
    $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
  });

  $( "#energyusage" ).click(function( event ) {
    event.preventDefault()
    alert( thermostat.energyUsage() );
  });

  $( "#reset" ).click(function( event ) {
    event.preventDefault()
    thermostat.reset()
    $( "#tempDisplay" ).text(thermostat.temperature)
    energyColorDisplay();
  });

  $( "#up" ).click(function( event ) {
    event.preventDefault()
    thermostat.up(1)
    $( "#tempDisplay" ).text(thermostat.temperature)
    energyColorDisplay();
  });

  $( "#down" ).click(function( event ) {
    event.preventDefault()
    thermostat.down(1)
    $( "#tempDisplay" ).text(thermostat.temperature)
    energyColorDisplay();
  });


});
