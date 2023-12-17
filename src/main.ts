import "./style/index.css";
import "./style/home.css";
import "./style/quiz.css";
import "./style/item.css";
import "./style/ready.css";
import "./style/play.css";

import { Database } from "./database";
import { Memory } from "./memory";
import { Router } from "./router";
import { Home } from "./pages/home";
import { Create } from "./pages/quiz";
import { Item } from "./pages/item";
import { Ready } from "./pages/ready";
import { Play } from "./pages/play";
import { Result } from "./pages/result";
// import { SDK } from "./sdk";
type Message = {
        userId :string;
        userNickname :string;
        message :string;
        imageUrl :string;
        color :string;
        followMonths :string;
        userStatus :{
            isBJ :string;
            isManager:string;
            isGuest:string;
            isTopFan :string;
            isFemale :string;
            isHideSex :string;
            isFan:string;
            isFollower :string;
            isSupporter :string;
            hasAppliedQuickview :string;
        }
    }
    

var SDK = (window as any).AFREECA.ext;

var extensionSdk = SDK();

async function main() {
        // SDK.getInstance().init();
        await Database.getInstance().init();
        Router.getInstance().addPage(new Home()).addPage(new Create()).addPage(new Result()).addPage(new Item()).addPage(new Ready()).addPage(new Play()).initPage("home");
}

window.addEventListener('DOMContentLoaded',()=>{
        main();
        document.querySelectorAll("textarea").forEach((element: HTMLTextAreaElement) => {
            element.addEventListener("keydown", resize);
            element.addEventListener("keyup", resize);
    });
    
    extensionSdk.chat.listen(handleChatRecieve)

    function handleChatRecieve(action, chat:Message){
        Memory.getInstance().setUser(chat.userId, chat);
        if(action==='MESSAGE'){
            const result = chat as Message;
            if(Memory.getInstance().getPlayQuizItemKey()<0) return;
            const message = result.message;
            const timestamp = Date.now();
            const startTime = Memory.getInstance().getTimestamp();
            const nowQuiz = Memory.getInstance().getPlayQuiz().list[ Memory.getInstance().getPlayQuizItemKey()];
            if(Memory.getInstance().checked.has(result.userId)) return;
            Memory.getInstance().checked.add(result.userId)
            


            const timer = nowQuiz.timer*1000;
            const diff = timestamp - startTime;
            if(diff<0) return;
            const pointType = nowQuiz.point;
            let point = Math.floor(((timer - diff)/timer)*1000);
            if(pointType==='double'){
                point*=2; 
            }else if( pointType==='none'){
                point = 0;
            }


            if(nowQuiz.type==='four'){
                if(String(nowQuiz.answer)!= message) point=0;
            }else if(nowQuiz.type==='ox'){
                if(nowQuiz.answer===true){
                    if(!(message=='O' || message=='o'))point=0;
                    
                }else if(nowQuiz.answer===false){
                    if(!(message=='X' || message=='x'))point=0;
                    
                }
            }else if(nowQuiz.type==='typing'){
                if(!nowQuiz.answers.includes(message)) point=0;
            }

            if(Memory.getInstance().result[result.userId]){
                const info = Memory.getInstance().result[result.userId];
                info.point = Number(info.point)+point;
                info.timer = timer;
                info.diff = diff;
                Memory.getInstance().setResult(result.userId, info);
            }else{
                const info:any = result;
                info.point = point;
                info.timer = timer;
                info.diff = diff;
                Memory.getInstance().setResult(result.userId, info);
            }
        }
       
    }
    // rem 으로 변경하기
    function resize(obj: any) {
            (obj.target as HTMLTextAreaElement).style.height = "1px";
            (obj.target as HTMLTextAreaElement).style.height = 12 + obj.target.scrollHeight + "px";
    }
    })
    