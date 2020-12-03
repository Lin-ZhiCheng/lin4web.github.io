let sum = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value){
 if(isNaN(parseInt(value))){
   handleSymbol(value);
} else {
  handleNumber(value);
  }
  rerender();
}

function handleNumber(value){
  if (buffer === "0"){
    buffer = value;
  } else{
   buffer += value;
  }
}
function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (sum === 0) {
    sum = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
   sum += intBuffer;
  } else {
   sum -= intBuffer;
  } 
}

function handleSymbol(value){
    switch (value) {
        case "C":
          buffer = "0";
          sum = 0;
          break;
        case "=":
          if (previousOperator === null) {
            // need two numbers to do math
            return;
          }
          flushOperation(parseInt(buffer));
          previousOperator = null;
          buffer = +sum;
          sum = 0;
          break;
        case "+":
        case "-":
          handleMath(value);
          break;
      }
}
function rerender() {
  screen.innerText = buffer;
}

function main(){
    document
    .querySelector(".buttons")
    .addEventListener("click",function(event){
        buttonClick(event.target.innerText);
    }
    )}

main();