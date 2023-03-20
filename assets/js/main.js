/* Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
 */

/* Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe; // quindi * 10
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe; // quindi * 9
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; */ // quindi * 7

// Seleziono la select
const select = document.getElementById("mode_selected");

// Seleziono il bottone Play da dove dovrà partire un eventListener che genererà una griglia quadrata

const play = document.querySelector(".play");

// Creo un eventListener sul play quando è selezionata la current option

play.addEventListener("click", function () {
  // Seleziono l'option
  let getValue = select.selectedOptions[0].value;
  console.log("Ho premuto Play in modalità:", getValue);
  displayGrid(getValue);
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
    });
    cell.innerHTML = i.toString();
    gridEl.appendChild(cell);
  }
}