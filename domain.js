/*global $*/

let domainDesired = '';

function setOutputText(response) {
  let domainName = (domainDesired.split(' ').join(''));
  let linkName = ('https://domains.google.com/registrar?s=' + domainName + '&hl=en&_ga=1.16682866.51685226.1485377312')

  if (response.available) {
    $('#analyzeOutput').text("Good news! it's available! ");
    $('#analyzeOutput').append('<a class="googleLink href="" target="_blank">Buy it</a>');
      $('.googleLink').attr("href", linkName);
  } else {
    $('#analyzeOutput').text("Sorry! that domain is taken");
  }
}

function setWebsiteNameIfError(response) {
  let domainName = (domainDesired.split(' ').join(''));
  let linkName = ('https://domains.google.com/registrar?s=' + domainName + '&hl=en&_ga=1.16682866.51685226.1485377312')
  $('#analyzeOutput').text("That's a long website name.  It's probably available? ");
  $('#analyzeOutput').append('<a class="googleLink href="" target="_blank">let\'s check</a>');
    $('.googleLink').attr("href", linkName);
}

$('.domain').click(() => {
  domainDesired = '';
  let domainInput = $('.secondBox').val();
  if (domainInput && !domainInput.startsWith("www.") && !domainInput.endsWith('.com'))  {
  domainDesired = domainInput.replace(/[^\d\w\s\t]/gi, '');
  const domainInputVar = 'www.' + domainDesired.split(' ').join('') + '.com';

  let domainOriginalWords = domainInputVar;
  const domainPromises = [];
  $('.secondBox').val(domainInputVar);
  $.post({
    url: `https://domainstatus.p.mashape.com/`,
    headers: {
      'X-Mashape-Key': 'STfM3L97YAmshG3cU4uC9XeDg1Tup1oO2npjsnSL8RC3ql8h53',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: JSON.stringify({
      domain: domainInputVar
    }),
  })
    .then((response) => {
      setOutputText(response);
    })
    .catch((response) => {
      console.log(response);
      setWebsiteNameIfError(response)
    });
  }
  });
