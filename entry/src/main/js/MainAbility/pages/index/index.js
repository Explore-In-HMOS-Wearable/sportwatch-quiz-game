import router from '@ohos.router'
import storage from '@system.storage';

export default {
    data: {
        pageNums: ["1", "2"],
        quizTopics: [
            { name: 'Music' },
            { name: 'History' },
            { name: 'Art' },
            { name: 'Science' },
            { name: 'Sports' },
            { name: 'Geography' }
        ],
        quizResults: [],
        currentIndex: 0,
        dotIndex: 0
    },

    change(e) {
        this.dotIndex = e.index;
        if (this.dotIndex === 1) {
            this.getResults();
        }
    },

    selectTopic(name) {
        console.log('Selected Topic: ' + name);
        name = name[0].toLowerCase() + name.slice(1);
        router.replace({
            uri: `pages/${name}/${name}`
        });
    },

    getResults() {
        this.quizResults = [];
        this.quizTopics.forEach(topic => {
            const key = topic.name.toLowerCase() + '_quiz';
            storage.get({
                key: key,
                success: (data) => {
                    console.log(`Storage get success [${key}]: ${data}`);
                    this.quizResults.push({
                        topic: topic.name,
                        score: data || '0'
                    });
                },
                fail: () => {
                    this.quizResults.push({
                        topic: topic.name,
                        score: 'No Score'
                    });
                }
            });
        });
    }
}
