import { Memory } from "../memory";
import { Router, BasePage } from "../router";
export class Result extends BasePage {
        router: Router;
        icons: any;
         constructor() {
                super("#result");

                

                this.icons = {
                        isManager: document.createElement("img"),
                        isTopFan: document.createElement("img"),
                        isFan: document.createElement("img"),
                        isFollower: document.createElement("img"),
                        isSupporter: document.createElement("img"),
                };

                this.icons.isManager.src = "./assets/ic_manager.gif";
                this.icons.isTopFan.src = "./assets/ic_hot.gif";
                this.icons.isFan.src = "./assets/ic_fanclub.gif";
                this.icons.isFollower.src = "./assets/ic_gudok.gif";
                this.icons.isSupporter.src = "./assets/ic_support.gif";
        }

        async render() {
            const result = Object.values(Memory.getInstance().result).sort((a:any,b:any)=>b.point - a.point);
                
            const container = document.querySelector('#result_container');
                
            result.forEach((v:any,i)=>{
                const li = document.createElement('li');
                
                const order = document.createElement('i');
                order.innerText = (i+1).toString()+'.';

                const nick =  document.createElement('strong');
                nick.innerText = v.userNickname
                const id =  document.createElement('span');
                id.innerText =`(${v.userId})` 

                const point = document.createElement('h6');
                point.innerText = v.point;

                const icons = this.getIcons(v);
                li.appendChild(order);
                icons.forEach((icon) => {
                        li.appendChild(icon);
                });
                li.appendChild(nick)
                li.appendChild(id);
                li.appendChild(point);

                container.appendChild(li);
            })
        }

        getIcons(userStatus) {
                const icons = [];
                if (userStatus.isManager) {
                        icons.push(this.icons.isManager);
                        return icons;
                }

                if (userStatus.isFan || userStatus.isTopFan) {
                        if (userStatus.isFan) {
                                icons.push(this.icons.isFan);
                        } else {
                                icons.push(this.icons.isTopFan);
                        }
                }

                if (userStatus.isFollower) {
                        icons.push(this.icons.isFollower);
                }

                if (userStatus.isSupporter) {
                        icons.push(this.icons.isSupporter);
                }

                return icons;
        }
}
