import storage from '@system.storage';
import router from '@ohos.router';

export default {
    data: {
        historyQuestions: [{ id: 1, question: 'When did World War II end?', options: ['1944', '1945', '1946', '1947'], correctAnswer: 1},
            { id: 2, question: 'Who was the first President of the United States?', options: ['John Adams', 'Thomas Jefferson', 'George Washington', 'Benjamin Franklin'], correctAnswer: 2 },
            { id: 3, question: 'In which year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2},
            { id: 4, question: 'Which empire was ruled by Julius Caesar?', options: ['Greek Empire', 'Roman Empire', 'Ottoman Empire', 'Persian Empire'], correctAnswer: 1},
            { id: 5, question: 'When did the American Civil War begin?', options: ['1859', '1860', '1861', '1862'], correctAnswer: 2},
            { id: 6, question: 'Who discovered America?', options: ['Vasco da Gama', 'Christopher Columbus', 'Ferdinand Magellan', 'Marco Polo'], correctAnswer: 1},
            { id: 7, question: 'In which year was the Declaration of Independence signed?', options: ['1774', '1775', '1776', '1777'], correctAnswer: 2 },
            { id: 8, question: 'Which ancient wonder was located in Alexandria?', options: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'Statue of Zeus'], correctAnswer: 1 },
            { id: 9, question: 'Who was the last Pharaoh of Egypt?', options: ['Nefertiti', 'Hatshepsut', 'Cleopatra VII', 'Ankhesenamun'], correctAnswer: 2 },
            { id: 10, question: 'When did the French Revolution begin?', options: ['1789', '1790', '1791', '1792'], correctAnswer: 0}
        ],
        currentQuestionIndex: 0,
        score: 0,
        selectedOptions: {}
    },

    selectOption(index) {
        const current = this.historyQuestions[this.currentQuestionIndex]
        this.selectedOptions[current.id] = index
        if (index === current.correctAnswer) {
            this.score = this.score + 10
        }
        this.currentQuestionIndex++
        console.info(index)
        console.info(this.score)
    },

    finishQuiz() {
        console.info(`Your Score: ${this.score} / ${this.historyQuestions.length*10}`);
        storage.set({
            key: 'history_quiz',
            value: this.score,
            success: function() {
                console.info('call storage.set success.');
            },
            fail: function(data, code) {
                console.info(`call storage.set fail, code: ${code} data: ${data}`);
            }
        })
        this.score = 0
    },

    redirect(e) {
        if (e.direction === 'right') {
            router.replace({
                uri: 'pages/index/index'
            })
        }
    }
}
