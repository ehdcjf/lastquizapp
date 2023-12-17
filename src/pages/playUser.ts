import { QuizList } from "../interfaces";
import { Memory } from "../memory";
import { Router, BasePage } from "../router";
import { ACTION, SDK } from "../sdk";
export class PlayUser extends BasePage {
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
    typingAnswer: HTMLInputElement;
    typingAnswerBtn: HTMLDivElement;
    actionBtn: HTMLDivElement;
    submit: boolean;
        
         constructor() {
                super("#play_user");
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

                this.answerO.addEventListener('click',()=>{
                    if(!this.submit){
                        this.renderOX(true)
                    }
                })
                this.answerX = document.querySelector('#play_x_answer');
                
                this.answerX.addEventListener('click',()=>{
                    if(!this.submit){
                        this.renderOX(false)
                    }
                })
                this.typingAnswer = document.querySelector('#typing_answer_submit_input')
                this.typingAnswerBtn = document.querySelector('#typing_answer_submit_btn')

                this.typingAnswer.addEventListener('keyup',(e)=>{
                    if(this.submit) return;
                    const target = (e.target as HTMLInputElement);
                    if(e.key==='Enter' && target.value!=''){
                            
                               // 정답 보내기
                    SDK.getInstance().send(ACTION.A_RECEIVE,JSON.stringify({
                        qeustionId: this.key,
                        answer: target.value
                    }))
                    this.typingAnswer.disabled = true;
                    this.submit=true;   
                    }
                })

                this.typingAnswerBtn.addEventListener('click',(e)=>{

                    if(!this.submit){
                        const target = (this.typingAnswer as HTMLInputElement);
                        if(target.value!='' ){
                            SDK.getInstance().send(ACTION.A_RECEIVE,JSON.stringify({
                                qeustionId: this.key,
                                answer: target.value
                            }))
                        this.typingAnswer.disabled = true;
                        this.submit=true; 
                        }
                    }
            })



                
                //Property
                this.submit = false;
                this.time = 0;
        }

        async render() {
            if(this.question.innerText==''){
                this.typeImg.src='./assets/icons8-stop-48.png'
                this.type.innerText='퀴즈 기다리는 중'
                this.playAnswerContainer.forEach(v=>{
                    v.style.display='none';
                })
            }
          
        }
        

        getQuiz(quiz){
            this.submit = false;
            this.key = quiz.questionId;
            
            this.question.innerText = quiz.question;


            switch(quiz.type){
                case "four":
                    this.typeImg.src='./assets/choose.png'
                    this.type.innerText='객관식'

                    this.fourChoiceContent.forEach((v,i)=>{
                        v.innerText = quiz.choices[i];
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

            
            this.playAnswerContainer.forEach(v=>{
                if(v.dataset.value===quiz.type){
                        v.style.display='flex';
                }else{
                        v.style.display='none';
                }
            })


            
            this.fourChoiceLi.forEach((v:HTMLLIElement,i)=>{
                    v.style.background='white';
                    v.addEventListener('click',this.sendFourAnswer.bind(this))
            })

            this.renderOX(null);
            this.typingAnswer.disabled = false;
            this.typingAnswer.value = '';

            this.time = quiz.timer-1;
            this.timer.innerText = this.time.toString()+'초';
            const timeout = setInterval(()=>{
                this.time--;
                this.timer.innerText = this.time.toString()+'초';
                if(this.time===0){
                    clearInterval(timeout);
                    this.submit = true;
                }
            },1000)
           
            switch(quiz.point){
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
            

         
        }


        sendFourAnswer(e){
                if(!this.submit){

                    const li = e.target;
                    li.style.background = '#4DEB52';
                    // 정답 보내기
                    SDK.getInstance().send(ACTION.A_RECEIVE,JSON.stringify({
                            qeustionId: this.key,
                            answer: li.dataset.value
                        }))
                    this.submit=true;   
                    }
        }

        renderOX(ox:boolean){
            if(ox===null){
                    this.answerO.style.backgroundColor = '#26890C';
                    this.answerX.style.backgroundColor = '#D01937';
            }else if(ox===true){
                    this.answerO.style.backgroundColor = '#26890C';
                    this.answerX.style.backgroundColor = '#444';
                    SDK.getInstance().send(ACTION.A_RECEIVE,JSON.stringify({
                        qeustionId: this.key,
                        answer: true
                    }))
                    this.submit = true;

            }else if(ox===false){
                    this.answerO.style.backgroundColor = '#444';
                    this.answerX.style.backgroundColor = '#D01937';
                    SDK.getInstance().send(ACTION.A_RECEIVE,JSON.stringify({
                        qeustionId: this.key,
                        answer: false
                    }))
                    this.submit = true;
            }

    }
        
}
