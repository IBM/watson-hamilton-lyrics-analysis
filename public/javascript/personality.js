var thisPersona;

var hamitoncast;

function navigate(e) {
  var path = './personality.html?persona=' + e.currentTarget.id;
  window.open(path, '_self', false);
}

function personaData() {
  var url = './data/cast.json';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.self = this;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);

      hamitoncast = data;

      readPersonaData(data);
      console.log('fetched personas');
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function readInsightData(key) {
  var url = './samples/hamilton.json';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.self = this;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);

      data.forEach(function(person) {

        if (person.character === key) {

          console.log('found ' + key);

          person.consumption_preferences.forEach( function(preference){

            if(preference.name === "Purchasing Preferences"){

              preference.consumption_preferences.forEach(function(consumption){
                if( consumption.score = 1 ){

                  var consumptionList = document.getElementById("consumptionList");

                  var li = document.createElement('li');
                  li.innerHTML = consumption.name;
                  li.className = 'assessmentList';

                  consumptionList.appendChild(li);

                  console.log(consumption.name)
                }

              })
            }
          })
        }
      })
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function init() {
  personaData();
}

function readPersonaData(pdata) {

  var persona = getParameterByName('persona');

  console.log('readPersonaData');

  pdata.forEach(function(character) {

    if (character.name === persona) {

      console.log('found ' + persona);

      readInsightData(character.key);

      var characterName = document.getElementById("characterName");
      characterName.innerHTML = persona;

      var characterImage = document.getElementById("characterImage");
      characterImage.src = "images/svg/" + character.image;


      /* show name */

      /* show picture */

      /* show insights */

    } else {}
  });
}

function getParameterByName(name, url) {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
