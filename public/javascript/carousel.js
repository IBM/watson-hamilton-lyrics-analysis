var hamilton;

var currentBowie = 0;


function readCastData() {

  var url = './data/cast.json';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);

      hamilton = data;

      fullBowies();

      var nextBowie;

      setInterval(function () {

          if (currentBowie < ( hamilton.length -1 )) {
              nextBowie = currentBowie + 1;
          } else {
              nextBowie = 0;
          }
          chooseBowie(nextBowie);
      }, 4000);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
  function fullBowies() {

      carousel = document.getElementById('carousel');

      var h = carousel.parentElement.parentElement.clientHeight;

      var personaHeight = h - 360;

      for (var count = 0; count < hamilton.length; count++) {
          var item = document.createElement('div');
          item.dataset.bowie = hamilton[count].name;
          item.className = 'bowieItem';
          var holder = document.createElement('div');
          var index = document.createElement('div');
          index.innerHTML = count + 1;
          index.className = "indexBowie";

          holder.className = "holder";
          var image = document.createElement('img');
          image.src = '/images/svg/' + hamilton[count].image;
          image.className = "imageBowie";

          image.style.height = personaHeight + "px";

          image.id = item.dataset.bowie;

          image.onclick = shareInsight;

          // holder.backgroundColor = hamilton[count].background;

          var description = document.createElement('div');
          description.innerHTML = hamilton[count].name;
          description.className = "aboutBowie";

          // var style = document.createElement('div');
          // style.innerHTML = hamilton[count].style;
          // style.className = "styleBowie";

          // var date = document.createElement('div');
          // date.innerHTML = hamilton[count].date;
          // date.className = "timeBowie";

          holder.appendChild(image);
          holder.appendChild(description);
          //          holder.appendChild(style);
          //          holder.appendChild(date);

          if (count != 0) {
              //              item.style.display = 'block';
              //              item.style.marginTop = '-' + 780 + 'px';

              var gap = hamilton[0].element.clientHeight;
              item.style.marginTop = '-' + gap + 'px';
              item.style.margin
              item.style.top = hamilton[0].element.style.top;
              item.style.opacity = 0;

              carousel.style.marginTop = gap + 'px';

          } else {
              //              item.style.marginTop = '-' + gap + 'px';

          }

          hamilton[count].element = item;

          item.style.zIndex = count + 1;
          item.style.order = hamilton.length - count;

          var c = personaHeight * count;

          item.appendChild(holder);

          carousel.appendChild(item);
      }

      currentBowie = 0;
      var gap = hamilton[0].element.clientHeight;
      hamilton[0].element.style.marginTop = '-' + gap + 'px';
  }

  function chooseBowie(index) {

      hamilton[currentBowie].element.style.opacity = 0;
      // hamilton[currentBowie].node.className = 'nodeDimmed';
      // hamilton[currentBowie].nodeLabel.className = 'startDimmed';

      hamilton[index].element.style.opacity = 1;
      // hamilton[index].node.className = 'nodeLit';
      // hamilton[index].nodeLabel.className = 'startLit';

      currentBowie = index;
  }

  function addTimeLine() {

      var timeline = document.getElementById('timeline');
      var count = 0;

      hamilton.forEach(function (bowie) {
          var entry = document.createElement('div');
          entry.className = 'entry';
          entry.dataset.index = count;
          entry.dataset.bowie = bowie.name;

          entry.onclick = function (e) {
              var index = e.target.dataset.index;
              chooseBowie(index);
          }

          bowie.node = document.createElement('div');
          bowie.node.className = 'nodeDimmed';
          bowie.node.dataset.index = count;
          entry.appendChild(bowie.node);

          bowie.line = document.createElement('div');
          bowie.line.className = 'nodeLine';
          entry.appendChild(bowie.line);

          bowie.nodeLabel = document.createElement('div');
          bowie.nodeLabel.innerHTML = bowie.start;
          bowie.nodeLabel.className = 'startDimmed';
          entry.appendChild(bowie.nodeLabel);

          if (count === 0) {
              bowie.node.className = 'nodeLit';
              bowie.nodeLabel.className = 'startLit';
          }

          timeline.appendChild(entry);
          count++;
      })
  }

  function compare(e) {
      var path = './comparison.html';
      window.open(path, '_self', false);
  }

  function persona(e) {
      var path = './persona.html';
      window.open(path, '_self', false);
  }

  function about(e) {
      var path = './about.html';
      window.open(path, '_self', false);
  }

  function shareInsight(e) {
      //      var path = './static/personality.html?persona=' + e.currentTarget.id;
      var path = './personality.html?persona=' + hamilton[currentBowie].name;
      window.open(path, '_self', false);
  }

  window.onresize = function () {
      carousel = document.getElementById('carousel');
      carousel.innerHTML = null;
      fullBowies();
  }

  window.onload = function () {
      readCastData();
  }
