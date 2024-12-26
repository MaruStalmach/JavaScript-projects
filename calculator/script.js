let equation = [];

const addToEquation = (button) => {
  const display = document.querySelector(".display");
  const value = button.innerText;

  if (!isNaN(value)) {
    display.innerText += value;
    equation = updateEquation(equation, value);
  } else if (value === "=") {
    calculate(display);
  } else {
    display.innerText += value;
    equation = updateEquation(equation, value);
  }

  console.log(equation);
};

const updateEquation = (array, value) => {
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
  const display = document.querySelector(".display");
  display.innerText = "";
  console.log("Display cleared");
  equation = [];
};

const calculate = () => {
  //end conditions
  if (
    !equation || 
    isNaN(equation[0]) || 
    isNaN(equation[equation.length - 1]) 
  ) {
    console.log("Invalid syntax");
    return;
  }

  const evaluate = (operator) => {
    for (let i = 0; i < equation.length; i++) {
      if (equation[i] === operator) {
        if (isNaN(equation[i - 1]) || isNaN(equation[i + 1])) {
          console.log(`Invalid syntax near ${equation[i]}`);
          return false; 
        }

        // Perform the calculation
        let result;
        switch (operator) {
          case "*":
            result =
              parseFloat(equation[i - 1]) * parseFloat(equation[i + 1]);
            break;
          case "%":
            result =
              parseFloat(equation[i - 1]) % parseFloat(equation[i + 1]);
            break;
          case "+":
            result =
              parseFloat(equation[i - 1]) + parseFloat(equation[i + 1]);
            break;
          case "-":
            result =
              parseFloat(equation[i - 1]) - parseFloat(equation[i + 1]);
            break;
        }

        equation.splice(i - 1, 3, result.toString());
        i--; 
      }
    }
    return true;
  };

  
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

  console.log(`Result: ${parseFloat(equation[0])}`);
};


  // if (isNaN(equation[0]) || isNaN(equation[equation.length - 1])) {
  //   console.log("Invalid syntax")
  // }
  // for (let element = 0; element < equation.length; element++) {
  //   if (equation[element] === "%") {
  //     let product = equation[element - 1] / equation[element + 1]
  //     equation[element - 1].splice(element - 1, element + 1)
  //     equation[element] = product
  //   }
  // }

