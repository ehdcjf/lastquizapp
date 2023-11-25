import "./style/index.css";
import "./style/home.css";
import "./style/create.css";
import "./style/quiz.css";

import { Database } from "./database";
import { Router } from "./router";
import { Home } from "./pages/home";
import { Create } from "./pages/create";
import { Item } from "./pages/quiz";
// const database = Database.getInstance();

// document.querySelectorAll(".quiz_start_btn").forEach((ele: HTMLDivElement) => {
//         const startImg = document.createElement("img");
//         startImg.src = "./assets/play.png";
//         startImg.style.width = "24px";
//         startImg.style.height = "24px";
//         ele.appendChild(startImg);
// });

// document.querySelectorAll(".quiz_delete_btn").forEach((ele: HTMLDivElement) => {
//         const deleteImg = document.createElement("img");
//         deleteImg.src = "./assets/icons8-delete-50.png";
//         deleteImg.style.width = "24px";
//         deleteImg.style.height = "24px";
//         ele.appendChild(deleteImg);
// });
// document.querySelectorAll(".quiz_update_btn").forEach((ele: HTMLDivElement) => {
//         const pencilImg = document.createElement("img");
//         pencilImg.src = "./assets/pencil.png";
//         pencilImg.style.width = "24px";
//         pencilImg.style.height = "24px";
//         ele.appendChild(pencilImg);
// });

// document.querySelectorAll(".create_quiz_item_type").forEach((ele: Element) => {
//         const typeImg = document.createElement("img");
//         typeImg.src = "./assets/choose.png";
//         typeImg.style.width = "20px";
//         typeImg.style.height = "20px";
//         ele.appendChild(typeImg);
// });
// document.querySelectorAll(".create_quiz_item_delete_btn").forEach((ele: Element) => {
//         const deleteImg = document.createElement("img");
//         deleteImg.src = "./assets/icons8-delete-50.png";
//         deleteImg.style.width = "20px";
//         deleteImg.style.height = "20px";
//         ele.appendChild(deleteImg);
// });

async function main() {
        await Database.getInstance().init();
        Router.getInstance().addPage(Home.getInstance()).addPage(new Create()).addPage(new Item()).initPage("home");
}

document.querySelectorAll("textarea").forEach((element: HTMLTextAreaElement) => {
        element.addEventListener("keydown", resize);
        element.addEventListener("keyup", resize);
});

// rem 으로 변경하기
function resize(obj: any) {
        (obj.target as HTMLTextAreaElement).style.height = "1px";
        (obj.target as HTMLTextAreaElement).style.height = 12 + obj.target.scrollHeight + "px";
}

main();
