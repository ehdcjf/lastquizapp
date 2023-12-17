import { QuizList } from "./interfaces";

export class Memory {
        private static instance: Memory;
        private nowQuizKey: IDBValidKey;
        private nowQuiz: QuizList;
        private quizItemKey: number|null;
        private playQuiz:QuizList;
        private playQuizItemKey: number;
        private users:any;
        result:any;
        private timestamp: number;
        checked: Set<string>
        private constructor() {
                this.nowQuizKey = null;
                this.playQuiz = null;
                this.nowQuiz = null;
                this.quizItemKey = -1;
                this.playQuizItemKey = -1;
                this.users = {}
                this.result = {};
                this.timestamp = null;
                this.checked = new Set();
        }

        public static getInstance() {
                Memory.instance ??= new Memory();
                return Memory.instance;
        }

        getNowQuizKey() {
                return this.nowQuizKey;
        }

        setNowQuizKey(key: IDBValidKey) {
                this.nowQuizKey = key;
        }
        getNowQuizItemKey() {
                return this.quizItemKey;
        }

        setNowQuizItemKey(key: number) {
                this.quizItemKey = key;
        }

        getNowQuiz() {
                return this.nowQuiz;
        }

        setNowQuiz(newQuiz: QuizList) {
                this.nowQuiz = newQuiz;
        }

        getPlayQuiz() {
                return this.playQuiz;
        }

        setPlayQuiz(quiz) {
                this.playQuiz = quiz;
        }

        getTimestamp() {
                return this.timestamp;
        }

        setTimestamp(timestamp:number) {
                this.timestamp = timestamp;
        }

        getPlayQuizItemKey() {
                return this.playQuizItemKey;
        }

        setPlayQuizItemKey(key: number) {
                this.playQuizItemKey = key;
        }

        setUser(userId,userInfo){
                this.users[userId] = userInfo;
        }

        getUser(){
                return this.users;
        }


        getResult(userId){
                return this.result[userId];
        }



        setResult(userId, userInfo){
                this.result[userId] = userInfo
        }
}
