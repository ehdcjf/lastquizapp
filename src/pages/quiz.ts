import { Router, BasePage } from "../router";
import { Database } from "../database";
import { Memory } from "../memory";
import { FourChoiceQuiz, OXQuiz, Quiz, QuizList, TypingQuiz } from "../interfaces";
export class Create extends BasePage {
        router: Router;
        quizTitle: HTMLInputElement;
        quiz: QuizList;
        quizUL: HTMLUListElement;
        validQuiz: boolean;
        invalidQuizText: HTMLSpanElement;
        constructor() {
                super("#create");
                document.querySelector("#create_back_btn").addEventListener("click",this.goHome.bind(this));
                document.querySelector("#create_quiz_item_btn").addEventListener("click",this.goNewQuiz.bind(this) );
                document.querySelector('#create_quiz_start_btn').addEventListener('click',this.goReady.bind(this))

                this.invalidQuizText = document.querySelector('#invalid_quiz');
                this.quiz = null;
                this.quizTitle = document.querySelector("#create_quiz_name_input");
                this.quizUL = document.querySelector("#create_quiz_list");
        }
        // 만들기 버튼 => 만들기 페이지
        // 퀴즈 아이템 => 시작 => 퀴즈 시작 페이지
        // 퀴즈 아이템 => 수정 => 만들기 페이지
        // 퀴즈 아이템 => 삭제 => 퀴즈 삭제 팝업

        async render(): Promise<void> {
                while(this.quizUL.firstChild){
                        this.quizUL.removeChild(this.quizUL.firstChild);
                }
                const key = Memory.getInstance().getNowQuizKey();
                this.quiz = await Database.getInstance().getQuiz(key);
                Memory.getInstance().setNowQuiz(this.quiz);
                this.validQuiz = true;
                this.quizTitle.value = this.quiz.title;
                this.invalidQuizText.style.color='#666'
                if(this.quiz.list.length===0){
                        this.invalidQuizText.innerText = '퀴즈를 추가해주세요'
                        return;
                        
                }
                this.quiz.list.forEach((quizItem: Quiz,index:number) => {
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

                        const quizIndex = document.createElement('i');
                        quizIndex.classList.add('create_quiz_item_index');
                        quizIndex.innerText = (index+1).toString()+'. ';

                        const content = document.createElement("div");
                        content.classList.add("create_quiz_item_content");
                        content.innerText = quizItem.question;

                        const deleteBtn = document.createElement("div");
                        deleteBtn.classList.add("create_quiz_item_delete_btn");
                        const deleteImg = document.createElement("img");
                        deleteImg.src = "./assets/icons8-delete-50.png";
                        deleteImg.style.width = "20px";
                        deleteImg.style.height = "20px";
                        deleteBtn.addEventListener('click',(e)=>{
                                e.stopPropagation();
                                this.quiz.list.splice(index,1);
                                Memory.getInstance().setNowQuiz(this.quiz);
                                Database.getInstance().updateQuiz(key,this.quiz)
                                this.render()
                        })
                        deleteBtn.appendChild(deleteImg);

                        item.appendChild(typeIcon);
                        item.appendChild(quizIndex);
                        item.appendChild(content);
                        item.appendChild(deleteBtn);

                        item.addEventListener('click',()=>{
                                console.log(index);
                                Memory.getInstance().setNowQuizItemKey(index);
                                Router.getInstance().showPage("quiz");
                        });

                        const isValid = this.validate(quizItem);
                        if(!isValid){
                                item.style.background='pink'
                                this.validQuiz = false;

                        }else{
                                item.style.background='#4DEB52'
                        }

                        this.quizUL.appendChild(item);
                });

                if(this.validQuiz){
                        this.invalidQuizText.innerText = ''
                }else if(!this.validQuiz){
                        this.invalidQuizText.innerText = '퀴즈를 완성해주세요'
                }
        }

        validate(quiz:Quiz){
                if(quiz.question==''){
                        return false;
                }
                switch(quiz.type){
                        case "four":
                                quiz  = quiz as FourChoiceQuiz;
                                if(!(quiz as FourChoiceQuiz).answer) return false;
                                if((quiz as FourChoiceQuiz).choices?.length==0) return false;
                                break;
                        case "ox":
                                if((quiz as OXQuiz).answer===null) return false;
                                break;
                        case "typing":
                                if((quiz as TypingQuiz).answers.length==0) return false;
                                break;
                }
                return true;
        }

        async goHome() {
                const key = Memory.getInstance().getNowQuizKey();
                this.quiz.title = this.quizTitle.value;
                await Database.getInstance().updateQuiz(key, this.quiz)
                Router.getInstance().showPage("home");
        }

        goNewQuiz() {
                Memory.getInstance().setNowQuizItemKey(this.quiz.list.length);
                Router.getInstance().showPage("quiz");
        }

        goReady(){
                if(this.invalidQuizText.innerText!==''){
                        this.invalidQuizText.style.color='red'
                }else{
                        Memory.getInstance().setPlayQuiz(this.quiz);
                        Router.getInstance().showPage('ready');

                }

        }
}
