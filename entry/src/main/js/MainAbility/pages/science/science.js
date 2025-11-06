import storage from '@system.storage';
import router from '@ohos.router';

export default {
    data: {
        scienceQuestions: [
            { id: 1, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: 2},
            { id: 2, question: "How many bones are in the adult human body?", options: ["204", "206", "208", "210"], correctAnswer: 1},
            { id: 3, question: "What is the speed of light?", options: ["300,000 km/s", "299,792,458 m/s", "186,000 mph", "All of the above"], correctAnswer: 3},
            { id: 4, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1},
            { id: 5, question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 2},
            { id: 6, question: "Who proposed the theory of evolution?", options: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Gregor Mendel"], correctAnswer: 2},
            { id: 7, question: "What is the smallest unit of matter?", options: ["Molecule", "Atom", "Proton", "Electron"], correctAnswer: 1},
            { id: 8, question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correctAnswer: 2},
            { id: 9, question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], correctAnswer: 2},
            { id: 10, question: "Which blood type is known as the universal donor?", options: ["A+", "B+", "AB+", "O-"], correctAnswer: 3}

        ],
        currentQuestionIndex: 0,
        score: 0,
        selectedOptions: {}
    },

    selectOption(index) {
        const current = this.scienceQuestions[this.currentQuestionIndex]
        this.selectedOptions[current.id] = index
        if (index === current.correctAnswer) {
            this.score = this.score + 10
        }
        this.currentQuestionIndex++
        console.log(index)
        console.log(this.score)
    },

    finishQuiz() {
        console.log(`Your Score: ${this.score} / ${this.scienceQuestions.length*10}`);
        storage.set({
            key: 'science_quiz',
            value: this.score,
            success: function() {
                console.log('call storage.set success.');
            },
            fail: function(data, code) {
                console.log('call storage.set fail, code: ' + code + ', data: ' + data);
            },
        })
        this.score = 0
    },

    redirect(e) {
        if (e.direction === "right") {
            router.replace({
                uri: "pages/index/index"
            })
        }
    }
}
