const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
 {question: 'What is the date for Aquarius ?',
    answers: [
      { text: 'May 21 to June 21', correct: false },
      { text: 'September 23 to October 23', correct: false },
      { text: 'November 22 to December 21', correct: false },
      { text: 'January 20 to February 18', correct: true }
    ]
  },
  {
    question: 'What is the sign for July 23 to August 22 ?',
    answers: [
      { text: 'Libra', correct: false },
      { text: 'Leo', correct: true },
      { text: 'Capricorn', correct: false },
      { text: 'Taurus', correct: false }
    ]
  },
{ question: 'What is the date for Pisces ?',
    answers: [
      { text: 'February 19 to March 20', correct: true },
      { text: 'July 23 to August 22', correct: false },
      { text: 'March 21 to April 19', correct: false },
      { text: 'June 22 to July 22', correct: false }
    ]
  },
{ question: 'What is the sign for March 21 to April 19 ?',
  answers: [
    { text: 'Sagittarius', correct: false },
    { text: 'Aries', correct: true },
    { text: 'Scorpio', correct: false },
    { text: 'Virgo', correct: false }
  ]
},
{ question: 'What is the date for Gemini ?',
  answers: [
    { text: 'October 24 to November 21', correct: false },
    { text: 'March 21 to April 19', correct: false },
    { text: 'May 21 to June 21 ', correct: true },
    { text: 'August 23 - September 22', correct: false }
  ]
},
{ question: 'What is the sign for October 24 to November 21 ?',
  answers: [
    { text: 'Gemini', correct: false },
    { text: 'Sagittarius', correct: false },
    { text: 'Capricorn', correct: false },
    { text: 'Scorpio', correct: true }
  ]
},
]
