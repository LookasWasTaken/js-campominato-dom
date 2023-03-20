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

// Seleziono l'h3 del risultato

const scoreBoard = document.getElementById("score")

// Seleziono il bottone Play da dove dovrà partire un eventListener che genererà una griglia quadrata

const play = document.querySelector(".play");

// Creo un eventListener sul play quando è selezionata la current option

play.addEventListener("click", function () {
  // Seleziono l'option
  let getValue = select.selectedOptions[0].value;
  console.log("Ho premuto Play in modalità:", getValue);
  displayGrid(getValue);
  scoreBoard.innerHTML = `your current score is: `
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
      cell.classList.add("bg");
      console.log("Numero Selezionato", cell.innerText);
      score++;
      scoreBoard.innerHTML = `your current score is: ${score}`
      console.log(score, "Score Attuale");
    });
    cell.innerHTML = i.toString();
    gridEl.appendChild(cell);
  }
}
