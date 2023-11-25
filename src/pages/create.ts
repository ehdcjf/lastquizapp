import { Router, BasePage } from "../router";
import { Database } from "../database";
import { Memory } from "../memory";
import { Quiz, QuizList } from "../interfaces";
export class Create extends BasePage {
        router: Router;
        quizTitle: HTMLInputElement;
        quiz: QuizList;
        quizUL: HTMLUListElement;
        constructor() {
                super("#create");
                document.querySelector("#create_back_btn").addEventListener("click", () => this.goHome);

                document.querySelector("#create_quiz_item_btn").addEventListener("click", () => this.goQuiz());
                this.quiz = null;
                this.quizTitle = document.querySelector("#create_quiz_name_input");
                this.quizUL = document.querySelector("#create_quiz_list");
        }
        // 만들기 버튼 => 만들기 페이지
        // 퀴즈 아이템 => 시작 => 퀴즈 시작 페이지
        // 퀴즈 아이템 => 수정 => 만들기 페이지
        // 퀴즈 아이템 => 삭제 => 퀴즈 삭제 팝업

        async render(): Promise<void> {
                this.quizUL.replaceChildren();
                const key = Memory.getInstance().getNowQuizKey();
                this.quiz = await Database.getInstance().getQuiz(key);
                Memory.getInstance().setNowQuiz(this.quiz);
                console.log(this.quiz);

                this.quizTitle.value = this.quiz.title;
                this.quiz.list.forEach((quizItem: Quiz) => {
                        const item = document.createElement("li");
                        item.classList.add("create_quiz_item");

                        const typeIcon = document.createElement("div");
                        typeIcon.classList.add("create_quiz_item_type");
                        const typeImg = document.createElement("img");
                        switch (quizItem.type) {
                                case "ox":
                                        typeImg.src = "./assets/vote.png";
                                        break;
                                case "typing":
                                        typeImg.src = "./assets/keyboard.png";
                                        break;
                                case "four":
                                default:
                                        typeImg.src = "./assets/choose.png";
                                        break;
                        }

                        typeImg.style.width = "20px";
                        typeImg.style.height = "20px";
                        typeIcon.appendChild(typeImg);

                        const content = document.createElement("div");
                        content.classList.add("create_quiz_item_content");
                        content.innerText = quizItem.question;

                        const deleteBtn = document.createElement("div");
                        deleteBtn.classList.add("create_quiz_item_delete_btn");
                        const deleteImg = document.createElement("img");
                        deleteImg.src = "./assets/icons8-delete-50.png";
                        deleteImg.style.width = "20px";
                        deleteImg.style.height = "20px";
                        deleteBtn.appendChild(deleteImg);

                        item.appendChild(typeIcon);
                        item.appendChild(content);
                        item.appendChild(deleteBtn);
                        this.quizUL.appendChild(item);
                });
        }

        goHome() {
                Router.getInstance().showPage("home");
        }

        goQuiz() {
                Memory.getInstance().setNowQuizItemKey(this.quiz.list.length);
                Router.getInstance().showPage("quiz");
        }
}
