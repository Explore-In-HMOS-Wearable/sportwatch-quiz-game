import storage from '@system.storage';
import router from '@ohos.router';

export default {
    data: {
        musicQuestions: [
            { id: 1, question: 'How many strings does a standard guitar have?', options: ['4', '5', '6', '7'], correctAnswer: 2 },
            { id: 2, question: `Which composer wrote 'The Four Seasons'?`, options: ['Bach', 'Mozart', 'Vivaldi', 'Beethoven'], correctAnswer: 2 },
            { id: 3, question: `What does 'piano' mean in musical terms?`, options: ['Fast', 'Slow', 'Loud', 'Soft'], correctAnswer: 3 },
            { id: 4, question: 'Which instrument did Miles Davis famously play?', options: ['Saxophone', 'Trumpet', 'Piano', 'Guitar'], correctAnswer: 1 },
            { id: 5, question: 'How many keys does a standard piano have?', options: ['76', '84', '88', '92'], correctAnswer: 2 },
            { id: 6, question: `Which band released the album 'Abbey Road'?`, options: ['The Rolling Stones', 'Led Zeppelin', 'The Beatles', 'Queen'], correctAnswer: 2 },
            { id: 7, question: 'What is the highest female singing voice?', options: ['Alto', 'Mezzo-soprano', 'Soprano', 'Contralto'], correctAnswer: 2 },
            { id: 8, question: 'Which composer became deaf later in life?', options: ['Mozart', 'Bach', 'Beethoven', 'Chopin'], correctAnswer: 2 },
            { id: 9, question: 'How many movements does a typical symphony have?', options: ['2', '3', '4', '5'], correctAnswer: 2 },
            { id: 10, question: 'Which country is the birthplace of reggae music?', options: ['Cuba', 'Brazil', 'Jamaica', 'Trinidad'], correctAnswer: 2 }
        ],
        currentQuestionIndex: 0,
        score: 0,
        selectedOptions: {}
    },

    selectOption(index) {
        const current = this.musicQuestions[this.currentQuestionIndex]
        this.selectedOptions[current.id] = index
        if (index === current.correctAnswer) {
            this.score = this.score + 10
        }
        this.currentQuestionIndex++
        console.info(index)
        console.info(this.score)
    },

    finishQuiz() {
        console.info(`Your Score: ${this.score} / ${this.musicQuestions.length*10}`);
        storage.set({
            key: 'music_quiz',
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
