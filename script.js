data = [];    // the entire dataset
entry = [];   // current entry
old = [];     // the history of previously seen words (indecies)
current = -1; // current index
utf8 = false; // display ascii or utf8
langs = [];   // keep track of languages
MIN = 4;      // min word length
MAX = 10;     // max word length

$(document).ready(function() {
  $.get('be/be-processed.csv', function(z) {
    data = $.csv.toArrays(z);
    langs.push([data.length, 'Belarusian']);
    loadLT();
  });
});

function loadLT() {
  $.get('lt/lt-processed.csv', function(z) {
    data.push.apply(data, $.csv.toArrays(z));
    langs.push([data.length, 'Lithuanian']);
    init();
  });
}

/**
 * Capitalizes the first character of a string
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * Updates the HTML with the current entry
 */
function refreshCurrent() {
  var title = utf8 ? entry[0] : entry[1];
  var translation = entry[2];
  var lang = '';

  for (i in langs) {
    if (current < langs[i][0]) {
      lang = langs[i][1];
      break;
    }
  }

  $('#title').text(title.capitalize());
  $('#language').text('(' + lang + ')');
  $('#translation').text(translation);
  $('#domaincheck').attr('href', 'https://www.name.com/domain/search/' + entry[1]);
}

/**
 * When all data is loaded, show the first word
 */
function init() {
  $('body').keydown(function(e) {
    switch(e.which) {
      case 39:  // right arrow
        nextWord();
        $('#arrows .fa-long-arrow-right').css('color', 'green');
        $('#arrows .fa-long-arrow-right').animate({color: '#aaa'}, 200);
        break;
      case 37:  // left arrow
        prevWord();
        $('#arrows .fa-long-arrow-left').css('color', 'green');
        $('#arrows .fa-long-arrow-left').animate({color: '#aaa'}, 200);
        break;
      case 32:  // space
        $('#encoding input').click();
        break;
    }
  });

  $('#encoding input').on('change', function() {
    utf8 = $(this).prop('checked');
    refreshCurrent();
  });

  $('#arrows .fa-long-arrow-left').on('click', function() {
    prevWord();
  });

  $('#arrows .fa-long-arrow-right').on('click', function() {
    nextWord();
  });

  $('#nextWord i').on('click', nextWord);
  $('#prevWord i').on('click', nextWord);

  nextWord();
}


/**
 * Randomly selects a new entry from the dataset
 */
function nextWord() {
  if (current > -1) {
    old.push(current);
  }
  current = Math.floor(Math.random() * data.length);
  entry = data[current];
  refreshCurrent();
}

function prevWord() {
  if (old.length > 0) {
    current = old.pop();
    entry = data[current];
    refreshCurrent();
  }
}
