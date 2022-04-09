let pairs = [
  {
    class: "parrot1",
    src: "./images/pair1.gif",
  },
  {
    class: "parrot2",
    src: "./images/pair2.gif",
  },
  {
    class: "parrot3",
    src: "./images/pair3.gif",
  },
  {
    class: "parrot4",
    src: "./images/pair4.gif",
  },
  {
    class: "parrot5",
    src: "./images/pair5.gif",
  },
  {
    class: "parrot6",
    src: "./images/pair6.gif",
  },
  {
    class: "parrot7",
    src: "./images/pair7.gif",
  },
];

let numbersOfPlays = 0;
let ended = false;

//Função para solicitar número de cards do jogo
function cardsNumber() {
  let cards = 0;
  while (cards % 2 !== 0 || cards == 0) {
    cards = prompt("Informe o número de cartas entre 4 e 14");
  }

  generateCards(cards);
}

//Função para gerar os cards no container
function generateCards(numb) {
  const container = document.querySelector(".card-container");

  pairs.sort(comparador);

  let cards = [];

  for (let i = 0; i < numb / 2; i++) {
    cards.push(
      `<div onclick="flip(this)"class="card ${pairs[i].class}">
          <div class="front">
            <img src="./front.png" alt="">
          </div>
          <div class="back">
            <img src="${pairs[i].src}" alt="">
          </div>
        </div>`
    );

    cards.push(
      `<div onclick="flip(this)"class="card ${pairs[i].class}">
             <div class="front">
               <img src="./front.png" alt="">
             </div>
             <div class="back">
               <img src="${pairs[i].src}" alt="">
             </div>
           </div>`
    );
  }

  cards.sort(comparador);

  for (item of cards) {
    container.innerHTML += item;
    if(cards.indexOf(item) ==  (cards.length/2)-1){
      container.innerHTML += '<div class="break"></div>';
    }
  }
}

//Função chamada quando a carta é clicada
//Vira a carta, testa e desvira
function flip(el) {
  if (!el.classList.contains("found")) {
    const list = [...document.querySelectorAll(".selected")];

    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.remove("flipped");
    } else {
      el.classList.add("selected");
      el.classList.add("flipped");

      if (list.length > 0) {
        for (item of list) {
          if (el.classList + "" == item.classList + "") {
            el.classList.remove("selected");
            el.classList.add("found");
            item.classList.remove("selected");
            item.classList.add("found");
          } else {
            function unflip() {
              el.classList.remove("selected");
              item.classList.remove("selected");
              el.classList.remove("flipped");
              item.classList.remove("flipped");
            }
            setTimeout(unflip, 1000);
          }
        }
      }
    }
  }

  if(!ended){
    setTimeout(countPlays, 500);
  }
  
}

function countPlays() {
  let numbersOfCards = [...document.querySelectorAll(".card")];
  let numbersOfFounds = [...document.querySelectorAll(".found")];

  if (numbersOfCards.length >= numbersOfFounds.length) {
    numbersOfPlays++;
  }

  if (numbersOfCards.length == numbersOfFounds.length) {
    ended = true;
    alert(`Você ganhou em ${numbersOfPlays} jogadas!`);
  }
}

//Função auxiliar do embaralhador de cards
function comparador() {
  return Math.random() - 0.5;
}
