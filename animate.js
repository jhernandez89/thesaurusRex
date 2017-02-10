/*global $*/

const img = $('#dino');
const width = img.get(0).width;
const screenWidth = $(window).width();
var dino = ['dinoGif/dinoOne.gif', 'dinoGif/dinoTwo.gif', 'dinoGif/dinoThree.gif', 'dinoGif/dinoFour.gif',
  'dinoGif/dinoFive.gif', 'dinoGif/dinoSix.gif', 'dinoGif/dinoSeven.gif', 'dinoGif/dinoEight.gif',
  'dinoGif/dinoNine.gif', 'dinoGif/dinoTen.gif', 'dinoGif/dinoEleven.gif', 'dinoGif/dinoTwelve.gif',
  'dinoGif/dinoThirteen.gif', 'dinoGif/dinoFourteen.gif', 'dinoGif/dinoFifthteen.gif', 'dinoGif/dinoSixteen.gif']
let duration = 1700;
let margin;
let dinoNumber;

function generateRandom() {
  const num = Math.floor(Math.random() * 180);
  return num;
}


$('.stampede').click(() => {
  console.log(dino[14]);
    for (let i = 0; i < 75; i++) {
      setTimeout(() => {
        margin = generateRandom();
        duration = (Math.floor(Math.random() * 1300)) + 10000;
        dinoNumber = (Math.floor(Math.random() * 15))
        console.log(duration);
        let img = $('<img id=dino class=dinosaur'+i+'>');
        img.attr('src', 'Images/'+dino[dinoNumber]);
        img.attr('height', '100px');
        img.attr('left', '-2000px');
        img.appendTo('.heightController');
        $('.dinosaur'+i).css({
          'margin-top': `${margin}px`,
        });
        img.css('left', (-width-120)).animate({
          left: screenWidth+300,
          bottom: '+=70'
        }, duration);
      }, Math.floor(Math.random() * 70)*i*3);
    }
  $('.heightController').empty();
});
