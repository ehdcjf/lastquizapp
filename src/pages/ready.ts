import { Memory } from "../memory";
import { Router, BasePage } from "../router";

var SDK = (window as any).AFREECA.ext;

var extensionSdk = SDK();


// type Result = {
//     qeustionId: number;
//     answer:string| boolean;
// }

export class Ready extends BasePage {
        router: Router;
        // sdk: any;
         constructor() {
                super("#ready");
                // this.sdk = SDK();
                document.querySelector('#ready_btn').addEventListener('click',this.goPlay.bind(this))

        }

        async render() {
           
        }


        goPlay(){
            Memory.getInstance().setPlayQuizItemKey(0);
            extensionSdk.chat.send("BJ_NOTICE","퀴즈를 시작합니다");
            Router.getInstance().showPage('play');
            
            

        }
}
