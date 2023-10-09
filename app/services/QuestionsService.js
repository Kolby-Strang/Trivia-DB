import { AppState } from "../AppState.js";
import { Question } from "../models/Question.js";

class QuestionsService {

    async getQuestions(formData) {
        console.log(formData);
        let questionsPOJO = await axios.get(`https://opentdb.com/api.php?amount=${formData.amount}${formData.category ? `&category=${formData.category}` : ''}${formData.difficulty ? `&difficulty=${formData.difficulty}` : ''}${formData.type ? `&type=${formData.type}` : ''}`)
        AppState.questions = questionsPOJO.data.results.map(question => new Question(question))
        AppState.activeQuestion = AppState.questions[0]
        console.log(AppState.activeQuestion);
    }

    cycleQuestions() {
        AppState.questions.splice(0, 1)
        AppState.activeQuestion = AppState.questions[0] || null
    }

    changeScore(amount) {
        AppState.points += amount
    }

    resetScore() {
        AppState.points = 0
    }

}

export const questionsService = new QuestionsService()