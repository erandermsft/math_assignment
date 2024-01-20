let correctAnswers = 0;
let startTime = Date.now();

// A function to generate a random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// A function to create a math assignment of a given type
function createAssignment(type) {
  // Initialize the variables
  let a, b, c, question, answer, equals;
  // Depending on the type, generate the numbers and the question
  switch (type) {
    case "doubles":
      // a + a = ?
      a = randomInt(1, 10);
      b = a;
      c = a + b;
      question = `${a} + ${b} = `;
      answer = c;
      break;
    case "sum10":
      // a + ? = 10
      a = randomInt(1, 9);
      b = 10 - a;
      c = 10;
      question = `${a} + `;
      equals = '= 10'
      answer = b;
      break;
    case "sum20":
      // a + ? = 20
      a = randomInt(1, 19);
      b = 20 - a;
      c = 20;
      question = `${a} + `;
      equals = '= 20'
      answer = b;
      break;
    default:
      // Invalid type
      return null;
  }
  // Return an object with the question and the answer
  return { question, answer, equals };
}

// A function to check the user's input and color the assignment accordingly
// function checkAnswer(input, answer, assignment) {
//   // Get the user's input as a number
//   let userInput = Number(input.value);
//   // If the input is correct, color the assignment green
//   if (userInput === answer) {
//     assignment.style.backgroundColor = "green";
//   } else {
//     // Otherwise, color it red
//     assignment.style.backgroundColor = "red";
//   }
// }

function checkAnswer(input, answer, assignment) {
  let userInput = Number(input.value);
  if (userInput === answer) {
    assignment.style.backgroundColor = "green";
    correctAnswers++;
    if (correctAnswers === 20) {
      let endTime = Date.now();
      let elapsedTime = (endTime - startTime) / 1000; // in seconds
      console.log(`All assignments completed correctly in ${elapsedTime} seconds.`);
      displayTimer(elapsedTime);
    }
  } else {
    assignment.style.backgroundColor = "red";
  }
}

function displayTimer(time){
  let timeCompleted = document.createElement("span");
  timeCompleted.innerText = "Du klarade alla uppgifter på " + time + " sekunder. Bra jobbat!";
  document.body.appendChild(timeCompleted);

}

// A function to create and display an assignment on the web page
function displayAssignment(type) {
  // Create a div element for the assignment
  let assignment = document.createElement("div");
  // Create a span element for the question
  let question = document.createElement("span");
  // Create an input element for the user's answer
  let input = document.createElement("input");
  // Create a button element for checking the answer
  let button = document.createElement("button");
  // Create a span element for the question
  let equals = document.createElement("span");

  // Generate an assignment of the given type
  let mathAssignment = createAssignment(type);
  // If the assignment is valid, set the elements' properties and append them to the div
  if (mathAssignment) {
    question.textContent = mathAssignment.question;
    equals.textContent = mathAssignment.equals;
    input.type = "number";
    input.placeholder = "?";
    button.textContent = "Check";
    // Add an event listener to the button to check the answer when clicked
    // button.addEventListener("click", function () {
    //   checkAnswer(input, mathAssignment.answer, assignment);
    // });
    input.addEventListener("focusout", function () {
        checkAnswer(input, mathAssignment.answer, assignment);
      });
    assignment.appendChild(question);
    assignment.appendChild(input);
    if(mathAssignment.equals)
      assignment.appendChild(equals)
    // assignment.appendChild(button);
  } else {
    // Otherwise, display an error message
    assignment.textContent = "Invalid assignment type";
  }
  // Append the div to the body of the document
  
  document.body.appendChild(assignment);
}

// A function to generate and display 20 assignments of random types
function generateAssignments() {
  // Define an array of possible types
  let types = ["doubles", "sum10", "sum20"];
  // Loop 20 times
  for (let i = 0; i < 20; i++) {
    // Pick a random type from the array
    let type = types[randomInt(0, types.length - 1)];
    // Display an assignment of that type
    displayAssignment(type);
  }
}

window.onload = function() {
  generateAssignments();
  startTime = Date.now();
}

// Call the function to generate the assignments
