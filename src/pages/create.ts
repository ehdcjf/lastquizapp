import { Router, BasePage } from "../router";

export class Create extends BasePage {
        router: Router;
        constructor() {
                super("#create");
                this.router = Router.getInstance();
                document.querySelector("#create_back_btn").addEventListener("click", () => {
                        this.router.showPage("home");
                });
        }
        // 만들기 버튼 => 만들기 페이지
        // 퀴즈 아이템 => 시작 => 퀴즈 시작 페이지
        // 퀴즈 아이템 => 수정 => 만들기 페이지
        // 퀴즈 아이템 => 삭제 => 퀴즈 삭제 팝업

        render(): void {
                // 로컬스토리지에서 내 퀴즈 불러오기
                //퀴즈아이템 만들기
        }
}
