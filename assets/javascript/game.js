console.log("JS is linked and working");

var soundWin = new Audio('assets/sound/car_x.wav');
var soundLose = new Audio('assets/sound/car_crash.wav');

var totalActualWins = 0;//completed words
var youWin=0; //to test to see if word is completed
var userGuess; //current typed character choice
var guessesRemaining = 6;
var alreadyGuessed="";  //for typed characters
var hits = 0; //correct keys
var misses = 0; //missed keys
var options =["ford", "dodge", "chrysler", "jeep", "chevrolet", "mazda", "nissan", "toyota", "honda", "mitsubishi", "hyundai", "kia", "bmw", "audi", "volvo", "ram", "suzuki", "maserati", "ferrari", "saab", "mercedes", "volkswagen", "acura", "lexus", "infiniti", "porsche"];

var computerGuess = options[Math.floor(Math.random()*options.length)];//choose car randomly
var carImageOrLogo = "<img src=" + "'assets/images/" + computerGuess + ".jpg'" + ">"; //use the computer guess as src for img tag

var html = "<p>" + "Remaining Guesses : " + guessesRemaining +  "</p>" + "<p>" + "Correctly Guessed Characters : " + hits +  "</p>" + "<p>" + "Incorrectly Guessed Characters : " + misses + "</p>" + "<p>" + "Characters Guessed : " + alreadyGuessed +  "</p>"; //layout for status. All as single variable for easy updating.

console.log("Computer Chose " + computerGuess); //open-book testing!

//refresh html with latest data from variables
function updateStats(){
	html = "<p>" + "Remaining Guesses : " + guessesRemaining +  "</p>" + "<p>" + "Correctly Guessed Characters : " + hits +  "</p>" + "<p>" + "Incorrectly Guessed Characters : " + misses + "</p>" + "<p>" + "Characters Guessed : " + alreadyGuessed +  "</p>";
	document.querySelector("#statCounter").innerHTML = html;
}

updateStats(); /*Place var html on page. initial load*/

var placeholder_underscore = "";

function updateImage(){
	carImageOrLogo = "<img src=" + "'assets/images/" + computerGuess + ".jpg'" + ">";
	document.querySelector("#imageBox").innerHTML = carImageOrLogo;//set image to html
}

updateImage(); //place image on page. initial load.

/*declare constructor function, call on beginning and word complete*/
function buildUnderscore(){
	for(i=0;i<computerGuess.length; i++){
	 	placeholder_underscore += "<p class='placeholder_par'>_</p>"
		document.querySelector("#underScore").innerHTML = placeholder_underscore;
	}
}
buildUnderscore(); /*Place underscores on page*/

//function to run if user guesses a correct letter 
function updateWord(){
	for(i=0; i<computerGuess.length; i++){
		if(userGuess === computerGuess[i]){
			var chosenOnes = document.getElementsByClassName("placeholder_par");
			chosenOnes[i].innerHTML = userGuess;//update the array for display word
			console.log("YES! CORRECT LETTER");//logs for each instance of correct letter hit
			youWin+=1;//increment for each correct letter. you win when counter equals word length
		} 
	}
} 

function reset (){
	computerGuess = options[Math.floor(Math.random()*options.length)];//Reset computer guess
	console.log("Computer Chose " + computerGuess);
	youWin=0; //Reset win counter
	userGuess; //reset character to blank
	guessesRemaining = 6; //reset counter to 8
	alreadyGuessed="";  //reset typed characters
	hits = 0; //reset correct keys
	misses = 0; //reset missed keys
	placeholder_underscore=""; //reset placeholder html
	buildUnderscore();
	updateStats();
	updateImage();
}

//upon enough correctly guessed letters
function bigWin(){
	if(youWin === computerGuess.length){
		soundWin.play();
		alert("YOU ARE A WINNER!!!!");
		totalActualWins +=1;
		alert("You have " + totalActualWins + " Words guessed correctly so far!");
		reset();
	}
}
//upon out of guesses
function bigLose(){
	if(guessesRemaining === 0){
		soundLose.play();
		alert("OUT OF GUESSES! AHAHAHAHAHA!");
		reset();
	}
}

/*counters and contains vs does not contain. call update.*/
document.onkeyup = function(event){
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	console.log("You Typed: " + userGuess);
		if(computerGuess.indexOf(userGuess) !== -1 && alreadyGuessed.indexOf(userGuess) === -1){
		console.log("contains Letter")
		hits +=1;
		alreadyGuessed += userGuess;
		updateStats();
		updateWord();
		bigWin();
	} else {
		console.log("does not contain letter");
		guessesRemaining-=1;
		misses +=1;
		alreadyGuessed += userGuess;
		updateStats();
		bigLose();
	}
}






