import { Database } from "../database";
import { FourChoiceQuiz, OXQuiz, Quiz, QuizItemType, QuizPoint, QuizType, TypingQuiz } from "../interfaces";
import { Memory } from "../memory";
import { Router, BasePage } from "../router";

export class Item extends BasePage {
        private question: HTMLInputElement;
        private completeBtn: HTMLDivElement;
        private cancleBtn: HTMLDivElement;
        private quizType: QuizType;
        private quizTimer: number;
        private quizPoint: QuizPoint;
        private quizItemIndex: number;
        private fourAnswerText: NodeListOf<HTMLTextAreaElement>;
        private answer: any;
        private answers: string[];
        private typeBtn: NodeListOf<HTMLDivElement>;
        private answerContainer: NodeListOf<HTMLDivElement>;
        private answerO: HTMLDivElement;
        private answerX: HTMLDivElement;
        private typingAnswerInput: HTMLInputElement;
        private typingAnswerUL: HTMLUListElement;
        private typingAnswerAddBtn: HTMLDivElement;
        private checkBox: NodeListOf<HTMLLabelElement>;
        private choices: string[];
        private fourRequire: HTMLDivElement
        private oxRequire: HTMLDivElement
        timerPopup: HTMLDivElement;
        pointPopup: HTMLDivElement;
        timerBtn: HTMLDivElement;
        pointBtn: HTMLDivElement;
        timerSaveBtn: HTMLDivElement;
        pointSaveBtn: HTMLDivElement;
        pointLi: NodeListOf<HTMLLIElement>;
        timerText: HTMLDivElement;
        pointText: HTMLDivElement;
        timerItem: NodeListOf<HTMLDivElement>;
        
        constructor() {
                super("#quiz");
                this.answers = [];

                this.completeBtn = document.querySelector("#quiz_item_complete_btn");
                this.cancleBtn = document.querySelector("#quiz_item_cancle_btn");
                this.question = document.querySelector("#quiz_question");

                this.typeBtn = document.querySelectorAll('.quiz_type_btn');

                this.typeBtn.forEach((v)=>{
                        v.addEventListener('click',(e:any)=>{this.changeType(e.currentTarget.dataset.value)})
                })

                this.answerContainer = document.querySelectorAll('.quiz_answer_container');
                

                document.getElementsByName("choice").forEach(v=>{
                        v.addEventListener('click',this.setGoodChoice.bind(this))
                })


                this.fourRequire = document.querySelector('#four_require_text');
                this.oxRequire = document.querySelector('#ox_require_text');
                this.answerO = document.querySelector('#o_answer');
                this.answerX = document.querySelector('#x_answer');
                this.answerO.addEventListener('click',()=>{this.renderOX(true)})
                this.answerX.addEventListener('click',()=>{this.renderOX(false)})


                this.typingAnswerInput = document.querySelector('#typing_answer_input');
                this.typingAnswerAddBtn = document.querySelector('#typing_answer_add_btn');
                this.typingAnswerInput.addEventListener('keyup',(e)=>{

                        const target = (e.target as HTMLInputElement);
                        if(e.key==='Enter' && target.value!=''&& this.answers.length<3 ){
                                
                                this.answers.push(target.value);
                                target.value = ''
                                this.renderTypingAnswer()
                        }
                })

                this.typingAnswerInput.addEventListener('keyup',(e)=>{

                        const target = (e.target as HTMLInputElement);
                        if(e.key==='Enter' && target.value!=''&& this.answers.length<3 ){
                                
                                this.answers.push(target.value);
                                target.value = ''
                                this.renderTypingAnswer()
                        }
                })

                this.typingAnswerAddBtn.addEventListener('click',(e)=>{

                        const target = (this.typingAnswerInput as HTMLInputElement);
                        if(target.value!=''&& this.answers.length<3 ){
                                this.answers.push(target.value);
                                target.value = ''
                                this.renderTypingAnswer()
                        }
                })
                
                this.typingAnswerUL = document.querySelector('#typing_answer_list');


                this.timerPopup = document.querySelector('#timer_popup');
                this.pointPopup = document.querySelector('#point_popup');

                this.timerBtn = document.querySelector('#timer_btn');
                
                this.timerBtn.addEventListener('click',()=>{
                        this.timerPopup.style.display='flex';
                })

                // this.timerSaveBtn = document.querySelector('#timer_popup_action_btn');
                // this.timerSaveBtn.addEventListener('click',()=>{
                //         this.timerPopup.style.display='none'

                // })

                this.timerItem = document.querySelectorAll('.timer_item');
                this.timerItem.forEach(item=>{
                        item.addEventListener('click',(e)=>{
                                const target = e.currentTarget as any
                                this.quizTimer = target.dataset.value;
                                this.renderTimer()
                                this.timerPopup.style.display='none'
                        })
                })     


                this.timerText = document.querySelector('#timer_text');
                this.pointText = document.querySelector('#point_text');


                this.pointLi = document.querySelectorAll('.point_box');

                this.pointLi.forEach(li=>{
                        li.addEventListener('click',(e)=>{
                                const target = e.currentTarget as any
                                this.quizPoint = target.dataset.value;
                                this.renderPoint()
                                this.pointPopup.style.display='none'
                        })
                })



                this.pointBtn = document.querySelector('#point_btn');
                this.pointBtn.addEventListener('click',()=>{
                        this.pointPopup.style.display='flex';
                })
                
                // this.pointSaveBtn = document.querySelector('#point_popup_action_btn');
                // this.pointSaveBtn.addEventListener('click',()=>{
                //         this.pointPopup.style.display='none'

                // })
                this.completeBtn.addEventListener("click", this.complete.bind(this));
                this.cancleBtn.addEventListener("click", this.cancle.bind(this));
                this.fourAnswerText = document.querySelectorAll(".quiz_answer");
                this.quizType = "four";
                this.quizTimer = 20;
                this.quizPoint = "standard";
                this.answer = null;
        }

        async render(): Promise<void> {
                this.quizItemIndex = Memory.getInstance().getNowQuizItemKey();
                const quiz = Memory.getInstance().getNowQuiz();
                const nowQuiz = quiz.list[this.quizItemIndex];
                this.question.value = nowQuiz?.question ?? '';
                this.quizType = nowQuiz?.type ?? 'four'
                this.quizTimer = nowQuiz?.timer ?? 20;
                this.quizPoint = nowQuiz?.point ?? 'standard';
                
                this.changeType(this.quizType)

                switch(this.quizType){
                        case 'four':
                                {
                                this.answer = (nowQuiz as FourChoiceQuiz)?.answer ?? null;
                                this.choices = (nowQuiz as FourChoiceQuiz)?.choices ?? [];
                                this.renderFourAnswer()
                                        break;
                                }
                        case 'ox':{
                                this.answer = (nowQuiz as OXQuiz)?.answer ?? null;
                                        this.renderOX(this.answer);
                        }
                                break;
                        case 'typing':
                                this.answers = (nowQuiz as TypingQuiz)?.answers ?? [];
                                this.renderTypingAnswer()
                                break;
                }

        }

        clear() {
                this.question.value = "";
                this.fourAnswerText.forEach((item: HTMLTextAreaElement) => {
                        item.value = "";
                });
                this.answer = null;
                this.answers = [];
                
        }

        cancle(){
                Memory.getInstance().setNowQuizItemKey(null);
                this.clear();
                Router.getInstance().showPage("create");
        }

        changeType(quizType:QuizType){
                this.quizType = quizType;
                this.typeBtn.forEach(v=>{
                        if(v.dataset.value===quizType){
                                v.classList.add('selected_quiz_type')
                        }else{
                                v.classList.remove('selected_quiz_type')
                        }
                })
                
                // 퀴즈 답안 UI 변경
                this.answerContainer.forEach(v=>{
                        if(v.dataset.value===quizType){
                                v.style.display='flex';
                        }else{
                                v.style.display='none';
                                
                        }
                })
                
                this.fourAnswerText.forEach((item: HTMLTextAreaElement) => {
                        item.value = "";
                });
                this.answer = null;
                this.answers = [];
                this.choices = [];
                if(quizType==='four') this.renderFourAnswer()
                else if(quizType==='ox') this.renderOX(null)
                else if(quizType==='typing') this.renderTypingAnswer();
        }


        renderPoint(){
                switch(this.quizPoint){
                        case "standard":
                                this.pointText.innerText='표준'
                                break;
                        case "double":
                                this.pointText.innerText='더블'
                                break;
                        case "none":
                                this.pointText.innerText='없음'
                                break;
                        default:
                                this.pointText.innerText='표준'
                                break;
                }
        }


        renderTimer(){
                this.timerText.innerText = this.quizTimer + '초';
        }


        renderFourAnswer(){
                console.log(this.answer)
                if(this.answer){
                        this.fourRequire.innerText = ""
                        document.getElementsByName('choice').forEach((v:HTMLInputElement,i)=>{
                                if(i==Number(this.answer)){
                                        v.checked=true;
                                }
                        })
                }else{
                        this.fourRequire.innerText = "정답을 선택해주세요"

                        document.getElementsByName('choice').forEach((v:HTMLInputElement,i)=>{
                                v.checked=false;
                        })
                }       
                if(this.choices.length>0){
                        this.fourAnswerText.forEach((v,i)=>{
                                v.value = this.choices[i];
                        })
                }else{
                        this.fourAnswerText.forEach((v,i)=>{
                                v.value = '';
                        })
                }
        }


        
        setGoodChoice(e:any){
                document.getElementsByName("choice")
                .forEach((element:any)=>{
                        element.checked = false;
                })
                e.target.checked = true;
                this.fourRequire.innerText = ""
                this.answer = e.target.value;
        }

        
        renderOX(ox:boolean){
                this.answer = ox;
                if(ox===null){
                        this.oxRequire.innerText = "정답을 선택해주세요"
                        this.answerO.style.backgroundColor = '#666';
                        this.answerX.style.backgroundColor = '#666';
                }else if(ox===true){
                        this.oxRequire.innerText = ""
                        this.answerO.style.backgroundColor = '#26890C';
                        this.answerX.style.backgroundColor = '#666';
                }else if(ox===false){
                        this.oxRequire.innerText = ""
                        this.answerO.style.backgroundColor = '#666';
                        this.answerX.style.backgroundColor = '#D01937';
                }
        }

        
        renderTypingAnswer(){
                while(this.typingAnswerUL.firstChild){
                        this.typingAnswerUL.removeChild(this.typingAnswerUL.firstChild);
                }
                const answerLength = this.answers.length;
                if(answerLength==0){
                        
                        const li = document.createElement('li');
                        li.innerText='정답을 추가해주세요 (최대 3개)';
                        li.classList.add('type_placeholer');
                        this.typingAnswerUL.appendChild(li);
                        return;
                }else{
                        const li = document.createElement('li');
                        li.innerText=`정답(${answerLength}/3, 최대 3개)`;
                        li.classList.add('type_answer_head');
                        this.typingAnswerUL.appendChild(li);
                }
                this.answers.forEach((answer,index)=>{
                        const li = document.createElement('li');
                        li.classList.add('typing_answer_item');
                        const strong = document.createElement("strong");
                        strong.innerText = answer;
                        

                        const btn = document.createElement("div");
                        btn.classList.add("answer_btn");
                        btn.addEventListener('click',(e)=>{
                                ((e.target as HTMLDivElement).parentNode.parentNode as HTMLLIElement).remove();
                                this.answers.splice(index,1);
                                this.renderTypingAnswer()

                        })
                        const minus = document.createElement("img");
                        minus.src = "assets/minus.png";
                        btn.appendChild(minus);

                        li.appendChild(strong);
                        li.appendChild(btn);
                        this.typingAnswerUL.appendChild(li);
                })
        }



        complete() {
                let completedQuizItem: QuizItemType;
                switch (this.quizType) {
                        case "four": {
                                const choices = [];
                                document.querySelectorAll(".quiz_answer").forEach((item: HTMLTextAreaElement) => {
                                        choices.push(item.value);
                                });
                                completedQuizItem = {
                                        type: this.quizType as "four",
                                        point: this.quizPoint,
                                        timer: this.quizTimer,
                                        question: this.question.value,
                                        answer: this.answer,
                                        choices: choices,
                                };
                                break;
                        }
                        case "ox": {
                                completedQuizItem = {
                                        type: this.quizType as "ox",
                                        point: this.quizPoint,
                                        timer: this.quizTimer,
                                        question: this.question.value,
                                        answer: this.answer,
                                };

                                break;
                        }
                        case "typing": {
                                completedQuizItem = {
                                        type: this.quizType as "typing",
                                        point: this.quizPoint,
                                        timer: this.quizTimer,
                                        question: this.question.value,
                                        answers: this.answers,
                                };
                                break;
                        }
                }
                const quiz = Memory.getInstance().getNowQuiz();
                quiz.list[this.quizItemIndex] = completedQuizItem;
                const quizKey = Memory.getInstance().getNowQuizKey();
                Database.getInstance().updateQuiz(quizKey, quiz);
                Memory.getInstance().setNowQuizItemKey(null);
                this.clear();
                Router.getInstance().showPage("create");
        }
}
