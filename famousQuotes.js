/* global $*/

const movieOrFamousQuote = ['famous', 'movies'];

$('.famousQuote').click(() => {
  const choice = movieOrFamousQuote[Math.floor(Math.random() * movieOrFamousQuote.length)];
  console.log(choice);
  $.ajax({
    url: `https://andruxnet-random-famous-quotes.p.mashape.com/?cat=${choice}`,
    headers: {
      'X-Mashape-Key': 'STfM3L97YAmshG3cU4uC9XeDg1Tup1oO2npjsnSL8RC3ql8h53',
      Accept: 'application/json',
    },
    method: 'GET',
    dataType: 'json',
  })
.then((response) => {
  console.log(response);
  $('.firstBox').val(response.quote);
  const author = (`- ${response.author}`);
  $('#author').text(author);
})
.catch((response) => {
  console.log('error');
});
});
