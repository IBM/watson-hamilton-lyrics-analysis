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

var tone_analyzer = new ToneAnalyzerV3({"username": ta.credentials.username, "password": ta.credentials.password, version_date: '2017-09-21'});

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
    "file": "1-01 Alexander Hamilton.lrc",
    "title": "Alexander Hamilton"
  }, {
    "act": 1,
    "order": 2,
    "file": "1-02 Aaron Burr, Sir.lrc",
    "title": "Aaron Burr, Sir"
  }, {
    "act": 1,
    "order": 3,
    "file": "1-03 My Shot.lrc",
    "title": "My Shot"
  }, {
    "act": 1,
    "order": 4,
    "file": "1-04 The Story of Tonight.lrc",
    "title": "The Story of Tonight"
  }, {
    "act": 1,
    "order": 5,
    "file": "1-05 The Schuyler Sisters.lrc",
    "title": "The Schuyler Sisters"
  }, {
    "act": 1,
    "order": 6,
    "file": "1-06 Farmer Refuted.lrc",
    "title": "Farmer Refuted"
  }, {
    "act": 1,
    "order": 7,
    "file": "1-07 You'll Be Back.lrc",
    "title": "You'll Be Back"
  }, {
    "act": 1,
    "order": 8,
    "file": "1-08 Right Hand Man.lrc",
    "title": "Right Hand Man"
  }, {
    "act": 1,
    "order": 9,
    "file": "1-09 A Winter's Ball.lrc",
    "title": "A Winter's Ball"
  }, {
    "act": 1,
    "order": 10,
    "file": "1-10 Helpless.lrc",
    "title": "Helpless"
  }, {
    "act": 1,
    "order": 11,
    "file": "1-11 Satisfied.lrc",
    "title": "Satisfied"
  }, {
    "act": 1,
    "order": 12,
    "file": "1-12 The Story of Tonight (Reprise).lrc",
    "title": "The Story of Tonight (Reprise)"
  }, {
    "act": 1,
    "order": 13,
    "file": "1-13 Wait for it.lrc",
    "title": "Wait for it"
  }, {
    "act": 1,
    "order": 14,
    "file": "1-14 Stay Alive.lrc",
    "title": "Stay Alive"
  }, {
    "act": 1,
    "order": 15,
    "file": "1-15 Ten Duel Commandments.lrc",
    "title": "Ten Duel Commandments"
  }, {
    "act": 1,
    "order": 16,
    "file": "1-16 Meet Me Inside.lrc",
    "title": "Meet Me Inside"
  }, {
    "act": 1,
    "order": 17,
    "file": "1-17 That Would Be Enough.lrc",
    "title": "That Would Be Enough"
  }, {
    "act": 1,
    "order": 18,
    "file": "1-18 Guns and Ships.lrc",
    "title": "Guns and Ships"
  }, {
    "act": 1,
    "order": 19,
    "file": "1-19 History Has Its Eyes on You.lrc",
    "title": "History Has Its Eyes on You"
  }, {
    "act": 1,
    "order": 20,
    "file": "1-20 Yorktown (The World Turned Upside Down).lrc",
    "title": "Yorktown (The World Turned Upside Down)"
  }, {
    "act": 1,
    "order": 21,
    "file": "1-21 What Comes Next.lrc",
    "title": "What Comes Next"
  }, {
    "act": 1,
    "order": 22,
    "file": "1-22 Dear Theodosia.lrc",
    "title": "Dear Theodosia"
  }, {
    "act": 1,
    "order": 23,
    "file": "1-23 Non-Stop.lrc",
    "title": "Non-Stop"
  }, {
    "act": 2,
    "order": 1,
    "file": "2-01 What'd I Miss.lrc",
    "title": "What'd I Miss"
  }, {
    "act": 2,
    "order": 2,
    "file": "2-02 Cabinet Battle #1.lrc",
    "title": "Cabinet Battle #1"
  }, {
    "act": 2,
    "order": 3,
    "file": "2-03 Take a Break.lrc",
    "title": "Take a Break"
  }, {
    "act": 2,
    "order": 4,
    "file": "2-04 Say No to This.lrc",
    "title": "Say No to This"
  }, {
    "act": 2,
    "order": 5,
    "file": "2-05 The Room Where It Happens.lrc",
    "title": "The Room Where It Happens"
  }, {
    "act": 2,
    "order": 6,
    "file": "2-06 Schuyler Defeated.lrc",
    "title": "Schuyler Defeated"
  }, {
    "act": 2,
    "order": 7,
    "file": "2-07 Cabinet Battle #2.lrc",
    "title": "Cabinet Battle #2"
  }, {
    "act": 2,
    "order": 8,
    "file": "2-08 Washington on Your Side.lrc",
    "title": "Washington on Your Side"
  }, {
    "act": 2,
    "order": 9,
    "file": "2-09 One Last Time.lrc",
    "title": "One Last Time"
  }, {
    "act": 2,
    "order": 10,
    "file": "2-10 I Know Him.lrc",
    "title": "I Know Him"
  }, {
    "act": 2,
    "order": 11,
    "file": "2-11 The Adams Administration.lrc",
    "title": "The Adams Administration"
  }, {
    "act": 2,
    "order": 12,
    "file": "2-12 We Know.lrc",
    "title": "We Know"
  }, {
    "act": 2,
    "order": 13,
    "file": "2-13 Hurricane.lrc",
    "title": "Hurricane"
  }, {
    "act": 2,
    "order": 14,
    "file": "2-14 The Reynolds Pamphlet.lrc",
    "title": "The Reynolds Pamphlet"
  }, {
    "act": 2,
    "order": 15,
    "file": "2-15 Burn.lrc",
    "title": "Burn"
  }, {
    "act": 2,
    "order": 16,
    "file": "2-16 Blow Us All Away.lrc",
    "title": "Blow Us All Away"
  }, {
    "act": 2,
    "order": 17,
    "file": "2-17 Stay Alive (reprise).lrc",
    "title": "Stay Alive (reprise)"
  }, {
    "act": 2,
    "order": 18,
    "file": "2-18 It's Quiet Uptown.lrc",
    "title": "It's Quiet Uptown"
  }, {
    "act": 2,
    "order": 19,
    "file": "2-19 The Election of 1800.lrc",
    "title": "The Election of 1800"
  }, {
    "act": 2,
    "order": 20,
    "file": "2-20 Your Obedient Servant.lrc",
    "title": "Your Obedient Servant"
  }, {
    "act": 2,
    "order": 21,
    "file": "2-21 Best of Wives and Best of Women.lrc",
    "title": "Best of Wives and Best of Women"
  }, {
    "act": 2,
    "order": 22,
    "file": "2-22 The World Was Wild Enough.lrc",
    "title": "The World Was Wild Enough"

  }, {
    "act": 2,
    "order": 23,
    "file": "2-23 Who Lives, Who Dies, Who Tells Your Story.lrc",
    "title": "Who Lives, Who Dies, Who Tells Your Story"
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

for (var song = 0; song < songlist.length; song++) {
  // console.log(song)

  lineReader.eachLine(path.join('lrc', songlist[song].file), function(line, last, song) {

    // console.log(song.title)

    var cue = checkforCharacterChange(line);

    /* if no change of character, then add the lines to that character's
       set of lines */

    if (cue.change === false) {
      var cleanedLine = line.substr(10, line.length);
      lines[CURRENTCHARACTER] = lines[CURRENTCHARACTER] + ' ' + cleanedLine;
    }

    if (last) {

      console.log(songlist[song].title);
      console.log('\n-----------------\n')

      /* if we've reached the last line, then we are ready to get Personality Insights
        for each chatacter of the play */

      // index = 0;

      /* recusrisvely call getPersonalityInsights for each character */

      songlist[song].lines = lines['HAMILTON'];

      fs.writeFile("tonedata.json", JSON.stringify(songlist), function(err) {
        if (err) {
          return console.log(err);
        }
      })

      var params = {
        // Get the text from the JSON file.
        text: songlist[song].lines,
        tones: 'emotion'
      };

      // tone_analyzer.tone(params, function(error, response) {
      //   if (error)
      //     console.log('error:', error);
      //   else
      //
      //     songlist[s].tone = response;
      //
      //
      //
      //   // console.log(JSON.stringify(response, null, 2));
      // });

      // lines['HAMILTON'] = '';

      // console.log(songlist[s].lines)

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
