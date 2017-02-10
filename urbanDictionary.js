/* global $ blacklist*/

let synonymCurrent = [];
let synonymStrings = [];
let originalSentences = '';
let originalWord = [];
let count = 0;

function replaceInputWords(newWords) {
  let inputWordsSeperated = originalSentences.split(' ');
  inputWordsSeperated.forEach((word, i) => {
    inputWordsSeperated[i] = word.replace(originalWord[i], newWords[i]);
  });
  inputWordsSeperated = inputWordsSeperated.join(' ');
  $('.secondBox').val(inputWordsSeperated);
}

function chooseTag(synonymArrays) {
  const arrayFiltered = [];
  synonymArrays.forEach((wordArray) => {
    const arrLength = wordArray.length;
    arrayFiltered.push(wordArray[Math.floor(Math.random() * arrLength)]);
  });
  replaceInputWords(arrayFiltered);
}

function checkIfWordHasTags(arrayOfWords) {
  const synonymCollection = [];
  arrayOfWords.forEach((word) => {
    synonymCurrent = [];
    if (word.tags) {
      word.tags.forEach((tagWord) => {
        synonymCurrent.push(tagWord);
      });
    } else {
      synonymCurrent.push(word);
    }
    synonymCollection.push(synonymCurrent);
  });
  chooseTag(synonymCollection);
}

function urbanResetVar() {
  synonymCurrent = [];
  synonymStrings = [];
  originalSentences = '';
  originalWord = [];
  count = 0;
}

function getInputWords(wordCurrent) {
  console.log(count);
  if (blacklist.includes(wordCurrent)) {
    return wordCurrent;
  } else if (wordCurrent.length < 5) {
    return wordCurrent;
  }
  return $.ajax({
    url: `https://mashape-community-urban-dictionary.p.mashape.com/define?term=${wordCurrent}`,
    headers: {
      'X-Mashape-Key': 'STfM3L97YAmshG3cU4uC9XeDg1Tup1oO2npjsnSL8RC3ql8h53',
      Accept: 'text/plain',
    },
    method: 'GET',
    dataType: 'json',
  })
  .catch(error => wordCurrent);
}


$('.urbanDictionary').click(() => {
  urbanResetVar();
  let urbanInput = '';
  urbanInput = $('.firstBox').val();
  if (urbanInput) {
    originalSentences = urbanInput;
    const urbanDesired = urbanInput.replace(/[^\d\w\s]/gi, '');
    const urbanInputVar = urbanDesired.split(' ');
    originalWord = urbanInputVar;
    const urbanPromise = [];
    urbanInputVar.forEach((word) => {
      urbanPromise.push(getInputWords(word));
    });
    Promise.all(urbanPromise)
  .then((response) => {
    checkIfWordHasTags(response);
  });
  } else {
    $('.secondBox').val('');
  }
});
