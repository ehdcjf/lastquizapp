import "./style/index.css";
import "./style/ready.css";
import "./style/play.css";
import "./style/playUser.css";
import "./style/result.css";


import { Router } from "./router";
import { PlayUser } from "./pages/playUser";
import { ACTION, SDK } from "./sdk";
async function main() {
        const play = new PlayUser()
        SDK.getInstance().init();
        Router.getInstance().addPage(play).initPage("play_user");
        SDK.getInstance().listen((action:string,message:string)=>{
                if(action===ACTION.Q_SEND){
                    play.getQuiz(JSON.parse(message));
                }
            })
}



window.addEventListener('DOMContentLoaded',()=>{
    main();
    document.querySelectorAll("textarea").forEach((element: HTMLTextAreaElement) => {
        element.addEventListener("keydown", resize);
        element.addEventListener("keyup", resize);
});

// rem 으로 변경하기
function resize(obj: any) {
        (obj.target as HTMLTextAreaElement).style.height = "1px";
        (obj.target as HTMLTextAreaElement).style.height = 12 + obj.target.scrollHeight + "px";
}
})
