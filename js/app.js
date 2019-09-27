
/*
 * Create a list that holds all of your cards
*/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var listHolder =
 ['fa-diamond', 'fa-diamond', 'fa-anchor', 'fa-anchor',
 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
 'fa-leaf', 'fa-leaf','fa-bicycle','fa-bicycle',
 'fa-bomb','fa-bomb','fa-paper-plane-o','fa-paper-plane-o'];

 var deck = document.querySelector('.deck');

 function displyCard()
 {
   shuffle(listHolder);
   for (let i=0; i < listHolder.length; i+=1)
   {
     // console.log(listHolder[i]);
      let li = document.createElement('li');
      li.classList = 'card';
      li.innerHTML ='<i class="fa' + ' '+ listHolder[i] + '"></i></li>';
      deck.appendChild(li);
   }
 }
 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }
     return array;
 }

function gameStar()
{
  displyCard();

}

gameStar()
/////// Restart Button //////
let restart = document.querySelector('.restart');
  restart.addEventListener('click', (e) =>{
    window.location.reload();});
/////////////////////////////

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

  var cards = document.querySelectorAll('.card');
  var openCards =[];
  let moves = document.querySelector('.moves');
  let counter = 0;
  let star = document.querySelector('.stars .fa');
  let stars = document.querySelector('.stars');
  let matchCards = [];

  for (let i=0; i <cards.length; i+=1)
   {
     let oneCard = cards[i];
     oneCard.addEventListener('click', (e) =>{
      if (!oneCard.classList.contains('open') && !oneCard.classList.contains('show') && !oneCard.classList.contains('match') )
        { oneCard.classList.add('open', 'show');

           openCards.push(oneCard);
         if ( openCards.length >= 2)
            {
                movesCounter(); // add moves
               starsIcon();  // manage stars
            if (openCards[0].innerHTML === openCards[1].innerHTML)
             {
              openCards[0].classList.add('match', 'open','show');
              openCards[1].classList.add('match', 'open','show');
              matchCards.push(openCards[0]);
              matchCards.push(openCards[1]);
              console.log(matchCards.length)
              if (matchCards.length == 16)
              {
                window.setTimeout(function(){ winnerWindow(); }, 1000);
                stopTimerCounter();

              }
             }
             setTimeout ((e) => {
                for (let i=0; i< openCards.length; i+=1)
                {
                  let wronOne = openCards[i];
                  wronOne.classList.remove('open', 'show');
                }
                openCards = [];  },300);}
             }

        });

   }
   //////// moves counter/////////
   function movesCounter()
     {
        counter += 1;
        moves.innerHTML = counter;
          return counter;
     }
//////// stars /////////
    let starsNum = 3;
   function starsIcon()
   {
        // let counter = movesCounter();
         if (counter == 15 || counter == 30)
             {  stars.lastElementChild.remove('li');
                starsNum -= 1;

             }
    return starsNum;
   }
//////// modal /////////
   let modal = document.querySelector('.modal');
   let info = document.querySelector('.info');
   let playmore = document.querySelector('button');
   function winnerWindow()
   {
     modal.style.display = 'block';
     let st = starsIcon();
      let tc = timerCounter()
     info.innerHTML = '<p> With total time of '+ tc
     + ' and ' + st + ' star<br> Wooooooo! </p>';
   }
  playmore.addEventListener('click', (e) =>
{
    modal.style.display = 'none';
    window.location.reload();


});
////////// timer ///////
var min    = 0;
var second = 00;
var zeroPlaceholder = 0;
var counterId =
setInterval(function(){ timerCounter(); }, 1000);

function timerCounter ()
{
  second++;
  if(second == 59)
    {  second = 00;
      min = min + 1;
    }
   if(second == 10)
    {  zeroPlaceholder = '';
    }
    else if(second == 00){
       zeroPlaceholder = 0;
           }
  let timer = document.getElementById("timer");
  let b = timer.innerText = min+':'+zeroPlaceholder+second;
  return b;
}
function stopTimerCounter() {
  var c = timerCounter();
  console.log(c);
  clearInterval(counterId );
  return c;
}
