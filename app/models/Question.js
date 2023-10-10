export class Question {

    constructor(data) {
        this.category = data.category
        this.type = data.type
        this.difficulty = data.difficulty
        this.question = data.question
        this.correctAnswer = data.correct_answer
        this.incorrectAnswers = data.incorrect_answers

        this.allAnswers = Object.assign([], data.incorrect_answers)
        this.allAnswers.push(data.correct_answer)
    }

    get cardTemplate() {
        if (this.type == 'boolean') {
            return `
        <div class="col-10">
          <div class="row justify-content-around">
            <div class="col-12 card mb-2">
              <p class="fs-3">Question</p>
              <p>${this.question}</p>
            </div>
            <div class="col-5 card p-0 mb-2">
              <button onclick="app.QuestionsController.answerQuestion('True')" class="btn btn-primary">True</button>
            </div>
            <div class="col-5 card p-0 mb-2">
              <button onclick="app.QuestionsController.answerQuestion('False')" class="btn btn-primary">False</button>
            </div>
          </div>
        </div>
        `
        } else {
            return `
        <div class="col-10">
          <div class="row justify-content-around">
            <div class="col-12 card mb-2">
              <p class="fs-3">Question</p>
              <p>${this.question}</p>
            </div>
            ${this.randomizeAnswers}
          </div>
        </div>
        `
        }
    }

    get randomizeAnswers() {
        let content = ''
        this.allAnswers.sort(() => Math.random() - .5)
        this.allAnswers.forEach(answer => {
            content += `
            <div class="col-5 card p-0 mb-2">
              <button onclick="app.QuestionsController.answerQuestion(\`${answer}\`)" class="btn btn-primary h-100">${answer}</button>
            </div>
            `
        })
        return content
    }

}

