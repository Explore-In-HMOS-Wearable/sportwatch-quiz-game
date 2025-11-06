import storage from '@system.storage';
import router from '@ohos.router';

export default {
    data: {
        artQuestions: [
            { id: 1, question: "Who painted the Mona Lisa?", options: ["Michelangelo", "Leonardo da Vinci", "Picasso", "Van Gogh"], correctAnswer: 1},
            { id: 2, question: "In which museum is the Mona Lisa displayed?", options: ["British Museum", "Metropolitan Museum", "Louvre Museum", "Uffizi Gallery"], correctAnswer: 2},
            { id: 3, question: "Who painted 'Starry Night'?", options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dalí"], correctAnswer: 1},
            { id: 4, question: "Which art movement was Pablo Picasso associated with?", options: ["Impressionism", "Cubism", "Surrealism", "Renaissance"], correctAnswer: 1},
            { id: 5, question: "Who sculpted 'David'?", options: ["Donatello", "Rodin", "Michelangelo", "Bernini"], correctAnswer: 2},
            { id: 6, question: "What type of art is Auguste Rodin famous for?", options: ["Painting", "Sculpture", "Photography", "Architecture"], correctAnswer: 1},
            { id: 7, question: "Which artist cut off his own ear?", options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Edgar Degas"], correctAnswer: 1},
            { id: 8, question: "In which period did Leonardo da Vinci live?", options: ["Baroque", "Renaissance", "Romantic", "Modern"], correctAnswer: 1},
            { id: 9, question: "What is the art technique of painting on wet plaster called?", options: ["Tempera", "Oil painting", "Fresco", "Watercolor"], correctAnswer: 2},
            { id: 10, question: "Who painted 'The Persistence of Memory'?", options: ["René Magritte", "Salvador Dalí", "Joan Miró", "Max Ernst"], correctAnswer: 1}],
        currentQuestionIndex: 0,
        score: 0,
        selectedOptions: {}
    },

    selectOption(index) {
        const current = this.artQuestions[this.currentQuestionIndex]
        this.selectedOptions[current.id] = index
        if (index === current.correctAnswer) {
            this.score = this.score + 10
        }
        this.currentQuestionIndex++
        console.log(index)
        console.log(this.score)
    },

    finishQuiz() {
        console.log(`Your Score: ${this.score} / ${this.artQuestions.length*10}`);
        storage.set({
            key: 'art_quiz',
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
