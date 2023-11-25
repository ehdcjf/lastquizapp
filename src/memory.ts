import { QuizList } from "./interfaces";

export class Memory {
        private static instance: Memory;
        private nowQuizKey: IDBValidKey;
        private nowQuiz: QuizList;
        private quizItemKey: number;
        private constructor() {
                this.nowQuizKey = null;
                this.nowQuiz = null;
                this.quizItemKey = -1;
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
}
