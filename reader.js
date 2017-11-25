/* dependencies */

var lineReader = require('line-reader');

var fs = require('fs');

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var config = require('./config/credentials.json');

/* read credentials and create a personality insights object to work with */

var pi = config.personalityInsights;

var personality_insights = new PersonalityInsightsV3({"username": pi.username, "password": pi.password, version_date: '2016-10-19'});

var index = 0;

var outputFile = 'hamilton.json'

/* hamilton character list */

var characters = [
  'ELIZA',
  'BURR',
  'LAURENS',
  'JEFFERSON',
  'HAMILTON',
  'WASHINGTON',
  'MULLIGAN',
  'LAFAYETTE',
  'KING GEORGE',
  'ANGELICA',
  'MADISON'
  // 'PHILIP',
  // 'PEGGY',
  // 'SCHUYLER SISTERS',
  // 'SEABURY',
  // 'ENSEMBLE',
  // 'LEE',
  // 'EAKER',
  // 'MARIA',
  // 'JAMES',
  // 'DOCTOR'
  // 'WOMEN',
  // 'MEN'
  // 'COMPANY'
]

var lines = [];

var combinedData = [];

var CHANGE = false;
var CURRENTCHARACTER = 'BURR';

function checkforCharacterChange(line) {

  var CHANGE = false;

  /* loop through each character in the play to find who
     speaks the current line */

  for (var c = 0; c < characters.length; c++) {

    if (line.includes(characters[c])) {
      CURRENTCHARACTER = characters[c];
      CHANGE = true;

      /* If we haven't already created a collection of lines
         for a character, we add a new collection for that character */

      if (lines[CURRENTCHARACTER] === undefined) {
        lines[CURRENTCHARACTER] = '';
      }

      break;
    }
  }

  return {change: CHANGE, character: CURRENTCHARACTER};
}

function getPersonalityInsights(callback) {

  var text = lines[characters[index]];

  personality_insights.profile({
    text: text,
    consumption_preferences: true
  }, function(err, response) {
    if (err) {

      if (index < characters.length) {
        index = index + 1;
        getPersonalityInsights();
      }
    } else {

      console.log(characters[index] + ' word count: ' + response.word_count);

      response.character = characters[index];

      combinedData.push(response);

      index = index + 1;

      console.log( 'index count: ' + index )

      if (index < characters.length) {

        console.log( characters)
        console.log(characters.length)

        fs.writeFile(outputFile, JSON.stringify(combinedData), function(err) {
          if (err) {
            return console.log(err);
          }
        })

        /* Getting personality insights is asynchronous, so we're waiting
           to correlate the data for each character, before reading the
           data for the next character. */

        getPersonalityInsights();
      }
    }
  });
}


/* Read the play one line at a time, each time a new
character speaks, their name appears on a single line first.
If we see a change of character, then we add new lines to that
character's collection of lines */

var fs = require('fs');

fs.unlink(outputFile, function(error) {
    if (error) {
        // throw error;
    }
    console.log('deleted ' + outputFile);
});

lineReader.eachLine('show.txt', function(line, last) {

  var cue = checkforCharacterChange(line);

  /* if no change of character, then add the lines to that character's
     set of lines */

  if (cue.change === false) {
    lines[CURRENTCHARACTER] = lines[CURRENTCHARACTER] + ' ' + line;
  }

  if (last) {

    /* if we've reached the last line, then we are ready to get Personality Insights
      for each chatacter of the play */

    index = 0;

    /* recusrisvely call getPersonalityInsights for each character */

    getPersonalityInsights()
  }
});
