import { Database } from "../database";
import { FourChoiceQuiz, Quiz, QuizPoint, QuizType } from "../interfaces";
import { Memory } from "../memory";
import { Router, BasePage } from "../router";

export class Item extends BasePage {
        private router: Router;
        private timer: number;
        private point: string;
        private quizInfo: Partial<Quiz>;
        private question: HTMLInputElement;
        private completeBtn: HTMLDivElement;
        quizType: QuizType;
        quizTimer: number;
        quizPoint: QuizPoint;
        quizItemIndex: number;
        choices: NodeListOf<Element>;
        constructor() {
                super("#quiz");
                this.router = Router.getInstance();

                document.querySelector("#create_back_btn").addEventListener("click", () => {
                        this.router.showPage("home");
                });
                this.completeBtn = document.querySelector("#quiz_item_complete_btn");
                this.question = document.querySelector("#quiz_question");

                this.completeBtn.addEventListener("click", this.complete.bind(this));
                this.choices = document.querySelectorAll(".quiz_answer");
                this.quizType = "four";
                this.quizTimer = 20000;
                this.quizPoint = "standard";
        }

        async render(): Promise<void> {
                this.quizItemIndex = Memory.getInstance().getNowQuizItemKey();
        }

        clear() {
                this.question.value = "";
                this.choices.forEach((item: HTMLTextAreaElement) => {
                        item.value = "";
                });
        }

        complete() {
                if (this.question.value === "") {
                        console.log("제목을 입력해주세요.");
                }

                switch (this.quizType) {
                        case "four": {
                                const choices = [];
                                document.querySelectorAll(".quiz_answer").forEach((item: HTMLTextAreaElement) => {
                                        choices.push(item.value);
                                });
                                const completedQuizItem: FourChoiceQuiz = {
                                        type: this.quizType as "four",
                                        point: this.quizPoint,
                                        timer: this.quizTimer,
                                        question: this.question.value,
                                        answer: 1,
                                        choices: choices,
                                };

                                const quiz = Memory.getInstance().getNowQuiz();
                                quiz.list[this.quizItemIndex] = completedQuizItem;
                                const quizKey = Memory.getInstance().getNowQuizKey();
                                Database.getInstance().updateQuiz(quizKey, quiz);
                                this.clear();
                                Router.getInstance().showPage("create");
                                break;
                        }
                        case "ox": {
                                break;
                        }
                        case "typing": {
                                break;
                        }
                }
        }
}
