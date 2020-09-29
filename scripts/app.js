const view = {
    questions: document.getElementById('questions'),
    formSubmit: document.querySelector('#question-creator [type="submit"]'),
    formQuestion: document.getElementById('question-text'),
    formAnswer: document.getElementById('answer-text'),

    createQuestion: (questionText, answerText) => {
        question = document.createElement('div')
        question.className = 'question'

        upperSection = view.createQuestionUpperSection(questionText)
        question.appendChild(upperSection)

        bottomSection = view.createQuestionBottomSection(answerText)
        question.appendChild(bottomSection)

        view.questions.appendChild(question)
    },
    createQuestionUpperSection: questionText => {
        upperSection = document.createElement('div')
        upperSection.className = 'question-title'

        title = view.createQuestionTitle(questionText)
        upperSection.appendChild(title)

        toggleButton = view.createToggleButtons()
        upperSection.appendChild(toggleButton)

        return upperSection
    },
    createQuestionTitle: questionText => {
        title = document.createElement('h3')
        title.textContent = questionText
        upperSection.appendChild(title)
        return title
    },
    createToggleButtons: () => {
        toggleButton = document.createElement('button')
        toggleButton.innerHTML = `
            <span class="btn-collapsed"><i class="far fa-plus-square"></i></span>
            <span class="btn-expanded hide"><i class="far fa-minus-square"></i></span>
        `
        toggleButton.className = 'btn-toggle-answer btn'
        controller.addNewToggleButton(toggleButton)
        return toggleButton
    },
    createQuestionBottomSection: answerText => {
        bottomSection = document.createElement('p')
        bottomSection.className = 'question-answer hide'
        bottomSection.textContent = answerText
        return bottomSection
    },

    collapseOtherQuestions: currentButton => {
        document.querySelectorAll('#questions .btn-toggle-answer')
            .forEach(button => {
                if (button !== currentButton)
                    view.collapseQuestion(button)
            })
    },
    collapseQuestion: button => {
        view.collapseButton(button)
        view.hideAnswer(button)
    },
    toggleQuestion: button => {
        view.toggleButton(button)
        view.toggleAnswer(button)
    },
    toggleButton: button => {
        button.querySelector('.btn-collapsed').classList.toggle('hide')
        button.querySelector('.btn-expanded').classList.toggle('hide')
    },
    collapseButton: button => {
        button.querySelector('.btn-collapsed').classList.remove('hide')
        button.querySelector('.btn-expanded').classList.add('hide')
    },
    toggleAnswer: button => {
        button.parentNode.parentNode.querySelector('.question-answer').classList.toggle('hide')
    },
    hideAnswer: button => {
        button.parentNode.parentNode.querySelector('.question-answer').classList.add('hide')
    }
}

const controller = {
    submitQuestion: evt => {
        evt.preventDefault()
        if (view.formQuestion.value !== '' && view.formAnswer.value !== '') {
            controller.createQuestion(view.formQuestion.value, view.formAnswer.value)
            view.formQuestion.value = ''
            view.formAnswer.value = ''
        }
    },
    createQuestion: (question, answer) => {
        view.createQuestion(question, answer)
    },
    addNewToggleButton: button => {
        button.addEventListener('click', controller.toggleQuestion)
    },
    toggleQuestion: evt => {
        view.collapseOtherQuestions(evt.currentTarget)
        view.toggleQuestion(evt.currentTarget)
    },
    addEvents: () => {
        view.formSubmit.addEventListener('click', controller.submitQuestion)
    }
}

const questions = [
    ['Do you accept all major credit cards?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, animi sit. Adipisci distinctio, eos vitae corrupti inventore et voluptate ullam.'],
    ['Do you support local farmers?', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor qui laudantium nobis, mollitia assumenda ut culpa, ullam sit ipsum officiis accusantium, dolore iure? Culpa, dolor!'],
    ['Do you use organic ingredients?', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam doloribus earum tenetur impedit quia itaque optio excepturi laborum tempore est?']
]

questions.forEach(question => {
    controller.createQuestion(question[0], question[1])
})

controller.addEvents()