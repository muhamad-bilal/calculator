class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.curOp = ''
      this.prevop = ''
      this.op = undefined
    }
  
    delete() {
      this.curOp = this.curOp.toString().slice(0, -1)
    }
  
    append(number) {
      if (number === '.' && this.curOp.includes('.')) return
      this.curOp = this.curOp.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.curOp === '') return
      if (this.prevop !== '') {
        this.compute()
      }
      this.op = operation
      this.prevop = this.curOp
      this.curOp = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.prevop)
      const current = parseFloat(this.curOp)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.op) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '/':
          computation = prev / current
          break
        default:
          return
      }
      this.curOp = computation
      this.op = undefined
      this.prevop = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.curOp)
      if (this.op != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.prevop)} ${this.op}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numbut = document.querySelectorAll('[data-num]')
  const opbbut = document.querySelectorAll('[data-op]')
  const eq = document.querySelector('[data-eq]')
  const del = document.querySelector('[data-del]')
  const ac = document.querySelector('[data-ac]')
  const s1 = document.querySelector('[data-sc1]')
  const s2 = document.querySelector('[data-sc2]')
  
  const calculator = new Calculator(s1, s2)
  
  numbut.forEach(button => {
    button.addEventListener('click', () => {
      calculator.append(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  opbbut.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  eq.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  ac.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  del.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

  // ... Your existing Calculator class and code ...

// Function to handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;
  
    // Check if the pressed key is a number or operator
    if (/\d|[\+\-\*\/\.]/.test(key)) {
      event.preventDefault(); // Prevent default behavior (e.g., typing in an input field)
      
      // If it's an operator, chooseOperation, else append the number
      if (/[\+\-\*\/]/.test(key)) {
        calculator.chooseOperation(key);
      } else {
        calculator.append(key);
      }
  
      calculator.updateDisplay();
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      calculator.compute();
      calculator.updateDisplay();
    } else if (key === 'Backspace') {
      event.preventDefault();
      calculator.delete();
      calculator.updateDisplay();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      event.preventDefault();
      calculator.clear();
      calculator.updateDisplay();
    }
  }
  
  // Add event listener for the 'keydown' event on the window object
  window.addEventListener('keydown', handleKeyboardInput);
  