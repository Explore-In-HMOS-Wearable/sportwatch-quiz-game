import storage from '@system.storage';
import router from '@ohos.router';

export default {
    data: {
        sportsQuestions: [
            { id: 1, question: 'How many players are on a basketball team on court?', options: ['4', '5', '6', '7'], correctAnswer: 1},
            { id: 2, question: 'In which sport would you perform a slam dunk?', options: ['Volleyball', 'Tennis', 'Basketball', 'Baseball'], correctAnswer: 2},
            { id: 3, question: 'How often are the Summer Olympics held?', options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'], correctAnswer: 2},
            { id: 4, question: 'Which country won the 2018 FIFA World Cup?', options: ['Germany', 'Brazil', 'France', 'Argentina'], correctAnswer: 2},
            { id: 5, question: 'In golf, what is one stroke under par called?', options: ['Eagle', 'Birdie', 'Bogey', 'Ace'], correctAnswer: 1},
            { id: 6, question: 'How many Grand Slam tournaments are there in tennis?', options: ['3', '4', '5', '6'], correctAnswer: 1},
            { id: 7, question: `Which sport is known as 'The Beautiful Game'?`, options: ['Basketball', 'Soccer/Football', 'Tennis', 'Cricket'], correctAnswer: 1},
            { id: 8, question: 'In which sport do you use a shuttlecock?', options: ['Tennis', 'Squash', 'Badminton', 'Table Tennis'], correctAnswer: 2},
            { id: 9, question: 'How many holes are there in a standard golf course?', options: ['16', '17', '18', '19'], correctAnswer: 2},
            { id: 10, question: 'Which country invented baseball?', options: ['Canada', 'United States', 'United Kingdom', 'Japan'], correctAnswer: 1}
        ],
        currentQuestionIndex: 0,
        score: 0,
        selectedOptions: {}
    },

    selectOption(index) {
        const current = this.sportsQuestions[this.currentQuestionIndex]
        this.selectedOptions[current.id] = index
        if (index === current.correctAnswer) {
            this.score = this.score + 10
        }
        this.currentQuestionIndex++
        console.info(index)
        console.info(this.score)
    },

    finishQuiz() {
        console.info(`Your Score: ${this.score} / ${this.sportsQuestions.length*10}`);
        storage.set({
            key: 'sports_quiz',
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
