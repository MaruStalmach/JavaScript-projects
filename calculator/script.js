let equation = []; //global

const updateEquationDisplay = (button) => {
  //updates text visible in the display 
  const display = document.querySelector(".display");
  const value = button.innerText;

  if (!isNaN(value)) {
    display.innerText += value;
    equation = addToEquation(equation, value);
  } else if (value === "=") {
    const result = calculate();
    display.innerText = result !== undefined ? result : "Error";
  } else if (["+", "-", "*", "%"].includes(value)) {
    display.innerText += value;
    equation = addToEquation(equation, value);
  }
  console.log(equation);
};

const addToEquation = (array, value) => {
  //pushes new elements to the equation 
  if (!isNaN(value)) {
    if (array.length > 0 && !isNaN(array[array.length - 1])) {
      array[array.length - 1] = array[array.length - 1] + value;
    } else {
      array.push(value);
    }
  } else {
    array.push(value);
  }
  return array;
};

const clearDisplay = () => {
  //clears the display
  const display = document.querySelector(".display");
  display.innerText = "";
  console.log("Display cleared");
  equation = [];
};


const evaluate = (operator) => {
  //evaluates if operators are placed correctly within an equation
  for (let i = 0; i < equation.length; i++) {

    //end conditions
    if (equation[i] === operator) {
      if (isNaN(equation[i - 1]) || isNaN(equation[i + 1])) {
        console.log(`Invalid syntax near ${equation[i]}`);
        return false;
      }
    }

    let result;
    switch (operator) {
      case "*":
        result = parseFloat(equation[i - 1]) * parseFloat(equation[i + 1]);
        break;
      case "%":
        if (parseFloat(equation[i + 1]) === 0) {
          console.log("Cannot divide by 0");
          return false;
        }
        result = parseFloat(equation[i - 1]) / parseFloat(equation[i + 1]);
        break;
      case "+":
        result = parseFloat(equation[i - 1]) + parseFloat(equation[i + 1]);
        break;
      case "-":
        result = parseFloat(equation[i - 1]) - parseFloat(equation[i + 1]);
        break;
    }
    equation.splice(i - 1, 3, parseFloat(result.toFixed(10)).toString());
    i--;
  }
  return true;
};

const calculate = () => {
  //calculates the equation with operator priority handling

  //end conditions
  if (!equation || isNaN(equation[0]) || isNaN(equation[equation.length - 1])) {
    console.log("Invalid syntax");
    return;
  }

  while (equation.includes("*") || equation.includes("%")) {
    if (!evaluate("*") || !evaluate("%")) {
      return;
    }
  }
  while (equation.includes("+") || equation.includes("-")) {
    if (!evaluate("+") || !evaluate("-")) {
      return;
    }
  }

  console.log(equation[0])
  return equation[0];

};



