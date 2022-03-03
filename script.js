//Global variables
let goalWord;
let rows = document.querySelectorAll(".row");
let row1 = rows[0].children;
let row2 = rows[1].children;
let row3 = rows[2].children;
let row4 = rows[3].children;
let row5 = rows[4].children;
let row6 = rows[5].children;
let currentRound = 1;
let currentLetter = 1;
// Event Listeners
  // Keyboard buttons => letterClick()
document.querySelectorAll(".letter").forEach((item) => {
  item.addEventListener("click", letterClick);
});
  // Delete Button => deleteLetter()
document.getElementById("delete").addEventListener("click", deleteLetter);
  // Enter Button => enterWord()
document.getElementById("enter").addEventListener("click", enterWord);

// Generating a random word from Words API 
  //Then sends the word to be validated => validateRandomWord()
const generateRandomWord = async () => {
  let randomWord;

  await fetch(
    "https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5&frequencymin=7&frequencymax=8",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": config.API_HOST,
        "x-rapidapi-key": config.API_KEY,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      randomWord = data;
    });

   validateRandomWord(randomWord);
};

//If the word is common enough it will set the Goal word
  //Else it will generate a new word
function validateRandomWord(word) {
  if (word.frequency > 3.5) {
    goalWord = word.word;
    document.querySelector("#loader").style.display = "none";
    document.querySelector(".game").style.display = "block";
  } else {
    document.querySelector(".game").style.display = "none";
    document.querySelector("#loader").style.display = "block";
    generateRandomWord();
  }
}

// Sets the current tile to the letter clicked and increases currentLetter
function letterClick(e) {
  if (currentRound === 1) {
    row1[currentLetter - 1].innerHTML = e.target.innerHTML;
    currentLetter++;
  }
  if (currentRound === 2) {
    row2[currentLetter - 1].innerHTML = e.target.innerHTML;
    currentLetter++;
  }
  if (currentRound === 3) {
    row3[currentLetter - 1].innerHTML = e.target.innerHTML;
    currentLetter++;
  }
  if (currentRound === 4) {
    row4[currentLetter - 1].innerHTML = e.target.innerHTML;
    currentLetter++;
  }
  if (currentRound === 5) {
    row5[currentLetter - 1].innerHTML = e.target.innerHTML;
    currentLetter++;
  }
  if (currentRound === 6) {
    row6[currentLetter - 1].innerHTML = e.target.innerHTML;
    currentLetter++;
  }
}
// Reduces currentLetter and sets that tile to hold nothing
function deleteLetter() {
  if(currentLetter === 1){ return; }
  if (currentRound === 1) {
    currentLetter--;
    row1[currentLetter - 1].innerHTML = "";
  }
  if (currentRound === 2) {
    currentLetter--;
    row2[currentLetter - 1].innerHTML = "";
  }
  if (currentRound === 3) {
    currentLetter--;
    row3[currentLetter - 1].innerHTML = "";
  }
  if (currentRound === 4) {
    currentLetter--;
    row4[currentLetter - 1].innerHTML = "";
  }
  if (currentRound === 5) {
    currentLetter--;
    row5[currentLetter - 1].innerHTML = "";
  }
  if (currentRound === 6) {
    currentLetter--;
    row6[currentLetter - 1].innerHTML = "";
  }
}
// If the whole row is filled
  // submitGuess()  
  // Increases currentRound and resets currentLetter
async function  enterWord() {
  let row = rows[currentRound - 1].children
  let wordArr = []
  for (let i = 0; i < row.length; i++) {
    wordArr.push(row[i].innerHTML)
  }
  let word = wordArr.join("")
  if (await realWordTest(word)) {
    submitGuess()
    if (currentLetter === 6) {
      currentRound++;
      currentLetter = 1;
    }
  } else {
    alert("this is not a word")
  }
  
}
let realWordTest =  (word) => {
  return fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "45dbd5ac86msh2a349e3f0b0abb5p12f707jsn2f09fe0ed2fe"
	}
})
.then(res => {
  if(res.ok) {
    return true
  }else {
    return false
  }
})
// .then( data => {
//   //console.log(data);
// })
// .catch(err => {
// 	//console.error(err);
// });
}
// Builds the current row into an array
  // Then sends that array and the current row to checkLetters()
function submitGuess() {
  let guess = [];
  if (currentRound === 1) {
    Array.from(row1).forEach((item) => {
      let letter = item.innerHTML;
      let lowerLetter = letter.toLowerCase();
      guess.push(lowerLetter);
    });

    checkLetters(guess, row1);
  }
  if (currentRound === 2) {
    Array.from(row2).forEach((item) => {
      let letter = item.innerHTML;
      let lowerLetter = letter.toLowerCase();
      guess.push(lowerLetter);
    });

    checkLetters(guess, row2);
  }
  if (currentRound === 3) {
    Array.from(row3).forEach((item) => {
      let letter = item.innerHTML;
      let lowerLetter = letter.toLowerCase();
      guess.push(lowerLetter);
    });

    checkLetters(guess, row3);
  }
  if (currentRound === 4) {
    Array.from(row4).forEach((item) => {
      let letter = item.innerHTML;
      let lowerLetter = letter.toLowerCase();
      guess.push(lowerLetter);
    });

    checkLetters(guess, row4);
  }
  if (currentRound === 5) {
    Array.from(row5).forEach((item) => {
      let letter = item.innerHTML;
      let lowerLetter = letter.toLowerCase();
      guess.push(lowerLetter);
    });

    checkLetters(guess, row5);
  }
  if (currentRound === 6) {
    Array.from(row6).forEach((item) => {
      let letter = item.innerHTML;
      let lowerLetter = letter.toLowerCase();
      guess.push(lowerLetter);
    });

    checkLetters(guess, row6);
  }
  //console.log( guess);
}
// Checks each letter and changes the color depending on if it is in the word
function checkLetters(guessArr, row) {
  let goalArr = goalWord.split("");
  //Check eack letter
  for (let i = 0; i < guessArr.length; i++) {
    // If the letter is in the same spot and the same letter of goal then
    // turn that tile and letter on the keyboard green. 
    if (goalArr[i] == guessArr[i]) {
      row[i].style.borderColor = "green";
      row[i].style.backgroundColor = "green";
      document.getElementById(`${guessArr[i]}`).style.backgroundColor = "green";
    // If the letter is in the word but not in the right spot then
    // turn that tile and letter on the keyboard yellow. 
    } else if (goalArr.includes(guessArr[i])) {
      row[i].style.borderColor = "yellow";
      row[i].style.backgroundColor = "yellow";
      document.getElementById(`${guessArr[i]}`).style.backgroundColor =
        "yellow";
    // If it is not in the word turn that tile and letter gray   
    } else {
      document.getElementById(`${guessArr[i]}`).style.backgroundColor = "gray";
      document.getElementById(`${guessArr[i]}`).style.color = "white";
      row[i].style.borderColor = "gray";
      row[i].style.backgroundColor = "gray";
    }
  }
}
//Generate a random word once
generateRandomWord();
