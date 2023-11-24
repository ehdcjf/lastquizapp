import { Router, BasePage } from "../router";
import { Database } from "../database";
import { Memory } from "../memory";
import { QuizList } from "../interfaces";
export class Home extends BasePage {
        router: Router;
        private db: Database;
        private memory: Memory;
        private quizUL: HTMLUListElement;
        constructor() {
                super("#home");
                this.router = Router.getInstance();
                this.db = Database.getInstance();
                this.memory = Memory.getInstance();
                this.quizUL = document.querySelector("#my_quiz_list");

                document.querySelector("#create_quiz_btn").addEventListener("click", this.createQuiz.bind(this));
        }
        // 만들기 버튼 =>myquiz 배열 새로 추가, now_zuiz는 새로 추가된 배열 인덱스  =>  만들기 페이지
        // 퀴즈 아이템 => 시작 => 퀴즈 시작 페이지
        // 퀴즈 아이템 => 수정, now_zuiz는 선택된 인덱스 => 만들기 페이지
        // 퀴즈 아이템 => 삭제 => 퀴즈 삭제 팝업

        async render() {
                const quizList = await this.db.getAllQuizWithCursor();
                quizList.forEach((quiz) => {
                        const key = quiz.key;
                        const title = quiz.title;
                        const quizItem = document.createElement("li");
                        quizItem.classList.add("my_quiz_item");
                        quizItem.dataset.key = String(key);

                        const nameText = document.createElement("div");
                        nameText.classList.add("my_quiz_name");
                        nameText.innerText = title;

                        const startBtn = document.createElement("div");
                        startBtn.classList.add("quiz_start_btn");

                        const startImg = document.createElement("img");
                        startImg.src = "./assets/play.png";
                        startImg.style.width = "24px";
                        startImg.style.height = "24px";
                        startBtn.appendChild(startImg);

                        const updateBtn = document.createElement("div");
                        updateBtn.classList.add("quiz_update_btn");
                        const pencilImg = document.createElement("img");
                        pencilImg.src = "./assets/pencil.png";
                        pencilImg.style.width = "24px";
                        pencilImg.style.height = "24px";
                        updateBtn.appendChild(pencilImg);

                        const deleteBtn = document.createElement("div");
                        deleteBtn.classList.add("quiz_delete_btn");

                        const deleteImg = document.createElement("img");
                        deleteImg.src = "./assets/icons8-delete-50.png";
                        deleteImg.style.width = "24px";
                        deleteImg.style.height = "24px";
                        deleteBtn.appendChild(deleteImg);

                        quizItem.appendChild(nameText);
                        quizItem.appendChild(startBtn);
                        quizItem.appendChild(updateBtn);
                        quizItem.appendChild(deleteBtn);

                        this.quizUL.append(quizItem);
                });
        }

        async createQuiz() {
                const newQuizKey = await this.db.createNewQuiz();
                this.memory.setNowQuizKey(newQuizKey);
                this.router.showPage("create");
        }
}
