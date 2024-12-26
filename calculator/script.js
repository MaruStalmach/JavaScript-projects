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
};

const calculate = () => {
  for (let element = 0; element < equation.length; element++) {
    
  }
};
