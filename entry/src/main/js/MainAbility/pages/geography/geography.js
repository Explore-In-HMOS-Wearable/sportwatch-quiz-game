import storage from '@system.storage';
import router from '@ohos.router';

export default {
    data: {
        geographyQuestions: [{ id: 1, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2},
            { id: 2, question: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: 1},
            { id: 3, question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: 2 },
            { id: 4, question: "Which country has the most natural lakes?", options: ["Russia", "Canada", "Finland", "Norway"], correctAnswer: 1},
            { id: 5, question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "Nauru", "San Marino"], correctAnswer: 1},
            { id: 6, question: "Which mountain range contains Mount Everest?", options: ["Alps", "Andes", "Himalayas", "Rocky Mountains"], correctAnswer: 2},
            { id: 7, question: "What is the deepest ocean trench?", options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"], correctAnswer: 2 },
            { id: 8, question: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Antarctic", "Arabian"], correctAnswer: 2},
            { id: 9, question: "What is the most spoken language in the world?", options: ["English", "Mandarin Chinese", "Spanish", "Hindi"], correctAnswer: 1},
            { id: 10, question: "Which country is both in Europe and Asia?", options: ["Russia", "Turkey", "Kazakhstan", "All of the above"], correctAnswer: 3},
        ],
        currentQuestionIndex: 0,
        score: 0,
        selectedOptions: {}
    },

    selectOption(index) {
        const current = this.geographyQuestions[this.currentQuestionIndex]
        this.selectedOptions[current.id] = index
        if (index === current.correctAnswer) {
            this.score = this.score + 10
        }
        this.currentQuestionIndex++
        console.log(index)
        console.log(this.score)
    },

    finishQuiz() {
        console.log(`Your Score: ${this.score} / ${this.geographyQuestions.length*10}`);
        storage.set({
            key: 'geography_quiz',
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
