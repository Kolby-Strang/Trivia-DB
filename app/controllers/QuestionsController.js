import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawActiveQuestion() {
    if (AppState.activeQuestion == null) {
        Pop.toast('Score: ' + AppState.points)
        questionsService.resetScore()
        bootstrap.Modal.getOrCreateInstance(document.getElementById("requestFormModal")).show()
    } else {
        setHTML('question-container', AppState.activeQuestion.cardTemplate)
    }
}


export class QuestionsController {

    constructor() {
        bootstrap.Modal.getOrCreateInstance(document.getElementById("requestFormModal")).show()
        AppState.on('activeQuestion', _drawActiveQuestion)
    }

    async getQuestions(event) {
        event.preventDefault()
        const form = event.target
        const formData = getFormData(form)
        try {

            await questionsService.getQuestions(formData)
            bootstrap.Modal.getOrCreateInstance(document.getElementById("requestFormModal")).hide()

            Pop.success('Questions Retrieved')

        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

    answerQuestion(answer) {
        if (AppState.activeQuestion.correctAnswer == answer) {
            Pop.success()
            questionsService.cycleQuestions()
            questionsService.changeScore(3)
        } else {
            Pop.error('Incorrect')
            questionsService.changeScore(-1)
        }
    }

}