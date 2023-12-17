import { Memory } from "../memory";
import { Router, BasePage } from "../router";
import { SDK, ACTION } from "../sdk";


type Result = {
    qeustionId: number;
    answer:string| boolean;
}


export class Ready extends BasePage {
        router: Router;
         constructor() {
                super("#ready");
                document.querySelector('#ready_btn').addEventListener('click',this.goPlay.bind(this))

        }

        async render() {
           
        }

        goPlay(){
            Memory.getInstance().setPlayQuizItemKey(0);
            Router.getInstance().showPage('play');
            // SDK.getInstance().listen((action, message, fromId)=>{
            //     switch(action){
            //         case 'IN':
            //                 const userInfo = JSON.parse(message);
            //                 Memory.getInstance().setUser(userInfo.userId, userInfo);
            //             break;
            //         case ACTION.A_RECEIVE:
            //             const result = JSON.parse(message) as Result;
            //             const nowQuizKey = Memory.getInstance().getPlayQuizItemKey();
            //             if(result.qeustionId!=nowQuizKey) return;
            //             const timestamp = Date.now();
            //             const startTime = Memory.getInstance().getTimestamp();
            //             const nowQuiz = Memory.getInstance().getPlayQuiz().list[result.qeustionId];
            //             const timer = nowQuiz.timer*1000;
            //             const diff = timestamp - startTime;
            //             if(diff<0) return;
            //             const pointType = nowQuiz.point;
            //             let point = Math.floor(((timer - diff)/timer)*1000)
            //             if(pointType==='double'){
            //                 point*=2; 
            //             }else if( pointType==='none'){
            //                 point = 0;
            //             }

            //             if(Memory.getInstance().hasResult(fromId)){
            //                 const totalResult = Memory.getInstance().getResult();
            //                 const originPoint= totalResult.get(fromId);
            //                 Memory.getInstance().setResult(fromId,originPoint+point)
            //             }else{
            //                 Memory.getInstance().setResult(fromId,point)
            //             }
            //             break;
            //     }

            // })
            

        }
}
