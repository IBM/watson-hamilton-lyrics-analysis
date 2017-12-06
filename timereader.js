var lineReader = require('line-reader');

var path = require('path');

var fs = require('fs');

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var config = require('./config/credentials.json');

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

/* read credentials and create a personality insights object to work with */

var pi = config[0].personalityInsights;

var personality_insights = new PersonalityInsightsV3({"username": pi.username, "password": pi.password, version_date: '2016-10-19'});

var ta = config[1].tone_analyzer[0];

var tone_analyzer = new ToneAnalyzerV3({
  "username": ta.credentials.username,
  "password": ta.credentials.password,
  version_date: '2017-09-21'
});

var index = 0;

var outputFile = 'hamilton.json';

var lines = [];

var combinedData = [];

var CHANGE = false;
var CURRENTCHARACTER = 'BURR';

var songlist = [
  {
    "act": 1,
    "order": 1,
    "title": "1-01 Alexander Hamilton.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 2,
    "title": "1-02 Aaron Burr, Sir.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 3,
    "title": "1-03 My Shot.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 4,
    "title": "1-04 The Story of Tonight.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 5,
    "title": "1-05 The Schuyler Sisters.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 6,
    "title": "1-06 Farmer Refuted.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 7,
    "title": "1-07 You'll Be Back.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 8,
    "title": "1-08 Right Hand Man.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 9,
    "title": "1-09 A Winter's Ball.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 10,
    "title": "1-10 Helpless.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 11,
    "title": "1-11 Satisfied.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 12,
    "title": "1-12 The Story of Tonight (Reprise).lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 13,
    "title": "1-13 Wait for it.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 14,
    "title": "1-14 Stay Alive.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 15,
    "title": "1-15 Ten Duel Commandments.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 16,
    "title": "1-16 Meet Me Inside.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 17,
    "title": "1-17 That Would Be Enough.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 18,
    "title": "1-18 Guns and Ships.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 19,
    "title": "1-19 History Has Its Eyes on You.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 20,
    "title": "1-20 Yorktown (The World Turned Upside Down).lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 21,
    "title": "1-21 What Comes Next.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 22,
    "title": "1-22 Dear Theodosia.lrc",
    "hamilton": ""
  }, {
    "act": 1,
    "order": 23,
    "title": "1-23 Non-Stop.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 1,
    "title": "2-01 What'd I Miss.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 2,
    "title": "2-02 Cabinet Battle #1.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 3,
    "title": "2-03 Take a Break.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 4,
    "title": "2-04 Say No to This.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 5,
    "title": "2-05 The Room Where It Happens.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 6,
    "title": "2-06 Schuyler Defeated.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 7,
    "title": "2-07 Cabinet Battle #2.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 8,
    "title": "2-08 Washington on Your Side.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 9,
    "title": "2-09 One Last Time.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 10,
    "title": "2-10 I Know Him.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 11,
    "title": "2-11 The Adams Administration.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 12,
    "title": "2-12 We Know.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 13,
    "title": "2-13 Hurricane.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 14,
    "title": "2-14 The Reynolds Pamphlet.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 15,
    "title": "2-15 Burn.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 16,
    "title": "2-16 Blow Us All Away.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 17,
    "title": "2-17 Stay Alive (reprise).lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 18,
    "title": "2-18 It's Quiet Uptown.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 19,
    "title": "2-19 The Election of 1800.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 20,
    "title": "2-20 Your Obedient Servant.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 21,
    "title": "2-21 Best of Wives and Best of Women.lrc",
    "hamilton": ""
  }, {
    "act": 2,
    "order": 22,
    "title": "2-22 The World Was Wild Enough.lrc",
    "hamilton": ""

  }, {
    "act": 2,
    "order": 23,
    "title": "2-23 Who Lives, Who Dies, Who Tells Your Story.lrc",
    "hamilton": ""
  }
]

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
  'MADISON',
  'PHILIP',
  'PEGGY',
  'SCHUYLER SISTERS',
  'SEABURY',
  'ENSEMBLE',
  'LEE',
  'EAKER',
  'MARIA',
  'JAMES',
  'DOCTOR',
  'WOMEN',
  'MEN',
  'COMPANY'
]

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

for (var song = 0; song < 2; song++) {
  // console.log(song)

  var s = song;

  lineReader.eachLine(path.join('lrc', songlist[song].title), function(line, last) {

    // console.log(song.title)

    var cue = checkforCharacterChange(line);

    /* if no change of character, then add the lines to that character's
       set of lines */

    if (cue.change === false) {
      var cleanedLine = line.substr(10, line.length);
      lines[CURRENTCHARACTER] = lines[CURRENTCHARACTER] + ' ' + cleanedLine;
    }

    if (last) {

      console.log(songlist[s].title);
      console.log('\n-----------------\n')

      /* if we've reached the last line, then we are ready to get Personality Insights
        for each chatacter of the play */

      // index = 0;

      /* recusrisvely call getPersonalityInsights for each character */

      songlist[s].lines = lines['HAMILTON'];

      var params = {
        // Get the text from the JSON file.
        text: songlist[s].lines,
        tones: 'emotion'
      };

      tone_analyzer.tone(params, function(error, response) {
        if (error)
          console.log('error:', error);
        else
          console.log(JSON.stringify(response, null, 2));
        }
      );

      // lines['HAMILTON'] = '';

      console.log(songlist[s].lines)

      // getPersonalityInsights()
    }
  });
}

// console.log(songlist);

/* Read each of the lrc files in order */

/* For each file read Hamilton's words */

/* Want one array for the first half of the play,
 a second array for the second half of the play */

/* Want to run tone analysis for */
