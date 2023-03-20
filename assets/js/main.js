/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati
abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina.
Altrimenti
la cella cliccata si colora di azzurro
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
 */

// Seleziono la select
const select = document.getElementById("mode_selected");

// Genero una variabile per lo score
let score = 0;

// Seleziono l'h3 dello score

const scoreBoard = document.getElementById("score");

// Seleziono l'h3 del risultato

const result = document.getElementById("result");

// Genero un array vuoto di bombe dinamico

let bombsArray = [];

// Genero una variabile per controllare se una bomba è stata trovata
let bombFound = false;

// Seleziono il bottone Play da dove dovrà partire un eventListener che genererà una griglia quadrata

const play = document.querySelector(".play");

// Genero un eventListener sul play quando è selezionata la current option

play.addEventListener("click", function () {
  // Seleziono l'option
  let getValue = select.selectedOptions[0].value;
  console.log("Ho premuto Play in modalità:", getValue);
  displayGrid(getValue);
  // Seleziono la length di tutte le .cell
  const numberCells = document.querySelectorAll(".cell").length;
  console.log(numberCells, "celle generate");
  // Svuoto l'array nel caso stessi ripremendo play
  bombsArray = [];
  // Al richiamo della funzione, si sostiuisce il return (cit. Fox90)
  // Richiamo la funzione di generazione delle bombe per riempire l'array vuoto delle bombe
  bombsArray = createBombs(numberCells);
  // il console.log dell'array delle bombe, se fosse visibile, darebbe degli aiuti ai giocatori
  // ***console.log(bombsArray, "posizione della bomba");
  // Testo dello scoreboard alla generazione delle celle
  scoreBoard.innerHTML = `your current score is <span>${score}</span>`;
  result.innerText = "";
});

// Seleziono il bottone Reset

const reset = document.querySelector(".reset");

// Creo un eventListener sul reset che cancellerà tutto il contenuto

reset.addEventListener("click", function () {
  defaultOption();
});

// Seleziono il futuro contenitore dei miei elementi dinamici

const gridEl = document.getElementById("grid");

// Inserisco un H2 di Default all'inizializzazione del documento html

let optionShowed = `<h2 class="color_boolean text-center py-5">No mode selected</h2>`;
gridEl.insertAdjacentHTML("beforeend", optionShowed);

// Funzione per abilitare il bottone Play quando una option è selezionata

select.addEventListener("change", function () {
  let getValue = select.selectedOptions[0].value;
  if (getValue !== "") {
    play.innerHTML = "PLAY";
    play.disabled = false;
    console.log("Modalità Selezionata Correttamente");
  } else {
    play.innerHTML = "Choose";
    play.disabled = true;
  }
});

// Switch case ad hoc per la modalità selezionata dove il PARAM (mode) sarà sostituito dalle stringhe del case ("Easy, Medium, Hard")

function displayGrid(mode) {
  switch (mode) {
    case "Easy":
      gridEl.innerHTML = "";
      createCell(100);
      break;

    case "Medium":
      gridEl.innerHTML = "";
      createCell(81);
      break;

    case "Hard":
      gridEl.innerHTML = "";
      createCell(49);
      break;

    default:
      defaultOption();
      break;
  }
}

// Funzione per riportare al valore di default il contenuto di gridEl

function defaultOption() {
  let defaultOption = `<h2 class="color_boolean text-center py-5">No mode selected</h2>`;
  gridEl.innerHTML = "";
  gridEl.insertAdjacentHTML("beforeend", defaultOption);
}

// Funzione per settare con un If/ElseIf/Else la width delle celle dinamicamente

function getCellClass(cellNumber) {
  if (cellNumber === 100) {
    return "easy";
  } else if (cellNumber === 81) {
    return "medium";
  } else {
    return "hard";
  }
}

// Funzione per la generazione di celle dinamiche, il numero di celle da creare sarà determinato dalla funzione interna getCellClass()

function createCell(cellNumber) {
  const cellClass = getCellClass(cellNumber);
  for (let i = 1; i <= cellNumber; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell", cellClass);
    cell.addEventListener("click", function () {
      if (cell.className.includes("bg")) {
        return;
      } else if (bombsArray.includes(Number(cell.innerText))) {
        cell.style.backgroundColor = "red";
        bombFound = true;
        cell.innerHTML = "";
        cell.innerHTML = `<i class="fa-solid fa-bomb fa-4x tilt"></i>`
        score.innerText = "";
        result.innerText = "YOU LOST!";
        result.classList.add("lost");
      } else if (bombFound != true) {
        cell.classList.add("bg");
        console.log("Numero Selezionato", cell.innerText);
        score++;
        scoreBoard.innerHTML = `your current score is <span>${score}</span>`;
        console.log(score, "Score Attuale");
        if (score == cellNumber - 99) {
          result.innerText = "YOU WIN!";
          result.classList.add("win");
        }
      }
    });
    cell.innerHTML = i.toString();
    gridEl.appendChild(cell);
  }
}

// Funzione che genera le bombe

function createBombs(totalCells) {
  // Genero un numero randomico tra 1 e ${numberCells}, 16 volte
  for (let i = 0; i < 16; i++) {
    let bomb = Math.floor(Math.random() * totalCells) + 1;
    // Controllo se il numero generato è già dentro l'array delle bombe
    while (bombsArray.includes(bomb)) {
      bomb = Math.floor(Math.random() * totalCells) + 1;
    }
    bombsArray.push(bomb);
  }
  // Ordino gli elementi all'interno dell'array delle bombe in ordine crescente
  bombsArray.sort((a, b) => a - b);
  return bombsArray;
}
