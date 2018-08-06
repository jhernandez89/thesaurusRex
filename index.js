/* global $ blacklist*/
let currentSynonyms = [];
let originalSentence = '';
let originalWords = [];
let currentPick;
let locallyStoredWords = {};
let allSynonyms = [];

$('.btn-info').click(() => {
  currentPick = 'random';
});
$('.btn-warning').click(() => {
  currentPick = 'longest';
});
$('.btn-success').click(() => {
  currentPick = 'shortest';
});

function replaceWords(newWords) {
  let inputWordsSeperated = originalSentence.split(' ');
  inputWordsSeperated.forEach((word, i) => {
    inputWordsSeperated[i] = word.replace(originalWords[i], newWords[i]);
  });
  inputWordsSeperated = inputWordsSeperated.join(' ');
  $('.secondBox').val(inputWordsSeperated);
}

function shortest(synonymList) {
  const filteredArray = [];
  let min;
  let position = 0;
  synonymList.forEach((arrayOfWords) => {
    min = arrayOfWords[0].length;
    position = 0;
    arrayOfWords.forEach((word, p) => {
      if (word.length < 0) {
        min = word.length;
        position = p;
      }
    });
    filteredArray.push(arrayOfWords[position]);
  });
  replaceWords(filteredArray);
}

function longest(synonymList) {
  const filteredArray = [];
  let max = 0;
  let position = 0;
  synonymList.forEach((arrayOfWords) => {
    max = 0;
    position = 0;
    arrayOfWords.forEach((word, p) => {
      if (word.length > 0) {
        max = word.length;
        position = p;
      }
    });
    filteredArray.push(arrayOfWords[position]);
  });
  replaceWords(filteredArray);
}

function random(synonymList) {
  const filteredArray = [];
  synonymList.forEach((word) => {
    const arrLength = word.length;
    filteredArray.push(word[Math.floor(Math.random() * arrLength)]);
  });
  replaceWords(filteredArray);
}

function chooseSort(synonymList) {
  console.log(currentPick);
  if (currentPick === 'random') {
    random(synonymList);
  } else if (currentPick === 'longest') {
    longest(synonymList);
  } else {
    shortest(synonymList);
  }
}

function checkIfWordIsUsable(currentWord) {
  return currentWord.results
          && currentWord.results.length
          && currentWord.results.some(result => result.synonyms);
}

function addToLocallyStoredWords(arrayOfWords) {
  originalWords.forEach((word, i) => {
    if (!Reflect.ownKeys(locallyStoredWords).includes(word)) {
      locallyStoredWords[word] = arrayOfWords[i];
    }
  });
}

function checkIfWordsHaveSynonyms(wordsArray) {
  wordsArray.forEach((wordObject) => {
    currentSynonyms = [];
    if (checkIfWordIsUsable(wordObject)) {
      wordObject.results.forEach((resultObject, i) => {
        if (resultObject.synonyms) {
          resultObject.synonyms.forEach((synonym) => {
            currentSynonyms.push(synonym);
          });
        }
      });
    } else if (wordObject.word) {
      currentSynonyms.push(wordObject.word);
    } else {
      currentSynonyms.push(wordObject);
    }
    allSynonyms.push(currentSynonyms);
  });
  chooseSort(allSynonyms);
  addToLocallyStoredWords(allSynonyms);
}
function resetGlobals() {
  currentSynonyms = [];
  originalSentence = '';
  originalWords = [];
  locallyStoredWords = {};
  allSynonyms = [];
}

function getWords(currentWord) {
  console.log(currentWord);
  if (blacklist.includes(currentWord)) {
    return currentWord;
  } else if (currentWord.length < 0) {
    return currentWord;
  } else if (Reflect.ownKeys(locallyStoredWords).includes(currentWord)) {
    return { results: [{ synonyms: locallyStoredWords[currentWord] }], word: currentWord };
  }
  return $.ajax({
    url: `https://wordsapiv1.p.mashape.com/words/${currentWord}`,
    headers: {
      'X-Mashape-Key': 'STfM3L97YAmshG3cU4uC9XeDg1Tup1oO2npjsnSL8RC3ql8h53',
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    method: 'GET',
    dataType: 'json',
  })
  .catch(error => currentWord);
}


$('.submitBut').click(() => {
  resetGlobals();
  let input = '';
  input = $('.firstBox').val();
  if (input) {
    originalSentence = input;
    const desired = input.replace(/[^\d\w\s]/gi, '');
    const inputVar = desired.split(' ');
    originalWords = inputVar;
    const promises = [];
    inputVar.forEach((word) => {
      promises.push(getWords(word));
    });
    Promise.all(promises)
  .then((response) => {
    checkIfWordsHaveSynonyms(response);
  });
  } else {
    $('.secondBox').val('');
  }
});
