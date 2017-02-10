/* global $*/
let analyze = '';
let analysisOfAnalysis = '';

function analyzeScore(response) {
  let percentage = ((response.score / 2) * 100).toFixed(1);
  if (percentage < 0) {
    percentage *= -1;
  }
  const output = `${percentage}% sure the inflection is ${response.sentiment}`;
  $('#analyzeOutput').text(output);

}

function secondAnalysis(response) {
  let percentage = ((response.score / 2) * 100).toFixed(1);
  if (percentage < 0) {
    percentage *= -1;
  }
  const output = `${percentage}% sure the inflection of THAT analysis is ${response.sentiment}, probably`;
  $('#analyzeOutput').text(output);

}

function checkToSeeIfAnalyized(bullLeon) {
  console.log("hello!");
  analyze = $('.secondBox').val();
  $.ajax({
    url: `https://jamiembrown-tweet-sentiment-analysis.p.mashape.com/api/?text=${analyze}`,
    headers: {
      'X-Mashape-Key': 'STfM3L97YAmshG3cU4uC9XeDg1Tup1oO2npjsnSL8RC3ql8h53',
      Accept: 'application/json',
    },
    method: 'GET',
    dataType: 'json',
  })
.then((response) => {
  console.log(response);
  if(bullLeon){
  secondAnalysis(response);
  } else {
  analyzeScore(response);
}
})
.catch((response) => {
  console.log('error');
});
}


$('.analyze').click(() => {
  analyze = '';
  analysisOfAnalysis = '';
  if($('.secondBox').val()){
    if (!$('#analyzeOutput').text().endsWith('probably')){
    console.log($('#analyzeOutput').text());
    if ($('#analyzeOutput').text().endsWith('positiive') || $('#analyzeOutput').text().endsWith('negative')) {
      $('.secondBox').val($('#analyzeOutput').text());
      checkToSeeIfAnalyized(true);
  } else {
    checkToSeeIfAnalyized(false);
  }
}
}
});
