import { QuizList } from "../interfaces";
import { Memory } from "../memory";
import { Router, BasePage } from "../router";
// import { ACTION, SDK } from "../sdk";
export class Play extends BasePage {
    key: number;
    quiz: QuizList;
    typeImg: HTMLImageElement;
    type:HTMLSpanElement
    timer:HTMLSpanElement
    point:HTMLSpanElement
    time: number;
    question: HTMLParagraphElement;
    fourChoiceContent: NodeListOf<HTMLDivElement>;
    fourChoiceLi: NodeListOf<HTMLLIElement>;
    playAnswerContainer: NodeListOf<HTMLDivElement>;
    answerO: HTMLDivElement;
    answerX: HTMLDivElement;
    typingAnswer: HTMLDivElement;
    actionBtn: HTMLDivElement;
        
         constructor() {
                super("#play");
                //DOM
                this.typeImg = document.querySelector('#play_quiz_type_img');
                this.type = document.querySelector('#play_quiz_type');
                this.timer = document.querySelector('#play_quiz_timer');
                this.point = document.querySelector('#play_quiz_point');
                this.question = document.querySelector('#play_quiz_question');
                this.fourChoiceContent = document.querySelectorAll('.play_quiz_choice_content')
                this.fourChoiceLi = document.querySelectorAll('.play_quiz_choices_li')

                this.playAnswerContainer = document.querySelectorAll('.play_quiz_answer_container');



                this.answerO = document.querySelector('#play_o_answer');
                this.answerX = document.querySelector('#play_x_answer');
        
                this.typingAnswer = document.querySelector('#play_typing_answer_list')

                this.actionBtn = document.querySelector('#quiz_item_next_btn')
                this.actionBtn.addEventListener('click',()=>{
                    Memory.getInstance().checked.clear();
                    if(this.key<this.quiz.list.length-1){
                        const nowKey =  Memory.getInstance().getPlayQuizItemKey();
                        Memory.getInstance().setPlayQuizItemKey(nowKey+1);
                        this.render();
                    }else{
                        Memory.getInstance().setPlayQuizItemKey(-1);
                        Router.getInstance().showPage('result');    
                    }
            })
                //Property
               
                this.time = 0;
        }

        async render() {
            this.key = Memory.getInstance().getPlayQuizItemKey();
            this.quiz = Memory.getInstance().getPlayQuiz();
            const nowQuiz = this.quiz.list[this.key];
            switch(nowQuiz.type){
                case "four":
                    this.typeImg.src='./assets/choose.png'
                    this.type.innerText='객관식'

                    this.fourChoiceContent.forEach((v,i)=>{
                        v.innerText = nowQuiz.choices[i];
                    })
                    break;
                case "ox":
                    this.typeImg.src='./assets/vote.png'
                    this.type.innerText='OX'
                    
                    break;
                case "typing":
                    this.typeImg.src='./assets/keyboard.png'
                    this.type.innerText='단답형'
                    break;
            }

            this.fourChoiceLi.forEach((v,i)=>{
                    v.style.background='white';
            })
            this.renderOX(null);
            this.typingAnswer.innerText = ``

            this.playAnswerContainer.forEach(v=>{
                if(v.dataset.value===nowQuiz.type){
                        v.style.display='flex';
                }else{
                        v.style.display='none';
                }
        })

            this.time = nowQuiz.timer;
            this.timer.innerText = this.time.toString()+'초';
            const timeout = setInterval(()=>{
                this.time--;
                this.timer.innerText = this.time.toString()+'초';
                if(this.time===0){
                    clearInterval(timeout);
                    this.actionBtn.style.display='flex'
                    
                    this.showAnswer(nowQuiz);
                    //TODO: 정답 보내기 SDK
                }
            },1000)

            switch(nowQuiz.point){
                case "standard":
                    this.point.innerText = '표준'
                    break;
                case "double":
                    this.point.innerText = '더블'
                    break;
                case "none":
                    this.point.innerText = '없음'
                    break;
            }
            
            this.question.innerText = nowQuiz.question;

            this.actionBtn.style.display='none'
            if(this.key<this.quiz.list.length-1){
                this.actionBtn.innerText='다음'
            }else{
                this.actionBtn.innerText='결과보기'    
            }
            /// 문제보내기 SDK
            Memory.getInstance().setTimestamp(Date.now())

            // const sendQuestion = JSON.parse(JSON.stringify({...this.quiz.list[this.key]}))
            // delete sendQuestion.answer;
            // delete sendQuestion.answers;

            // SDK.getInstance().send(ACTION.Q_SEND,sendQuestion);

        }

        showAnswer(quiz){
            switch(quiz.type){
                case "four":
                    // 정답에 색칠하기
                    this.fourChoiceLi.forEach((v,i)=>{
                        if(i+1 == quiz.answer){
                            v.style.background='#4DEB52';
                        }
                    })
                    break;
                case "ox":
                    this.renderOX(quiz.answer);
                    break;
                case "typing":
                    this.typingAnswer.innerText = `정답: ${quiz.answers.join(', ')}`
                    break;
            }
        }

        


        renderOX(ox:boolean){
            if(ox===null){
                    this.answerO.style.backgroundColor = '#26890C';
                    this.answerX.style.backgroundColor = '#D01937';
            }else if(ox===true){
                    this.answerO.style.backgroundColor = '#26890C';
                    this.answerX.style.backgroundColor = '#444';
            }else if(ox===false){
                    this.answerO.style.backgroundColor = '#444';
                    this.answerX.style.backgroundColor = '#D01937';
            }
    }
        
}
