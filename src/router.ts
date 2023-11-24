export class Router {
        private static instance: Router;
        private main: HTMLElement;
        private viewMap: Map<any, BasePage>;

        private constructor() {
                if (Router.instance) return Router.instance;
                this.main = document.querySelector("main");
                this.viewMap = new Map();
                Router.instance = this;
                return this;
        }

        public static getInstance() {
                Router.instance ??= new Router();
                return Router.instance;
        }

        addPage(component: any) {
                const key = component.root.id;
                const value = component;
                value.hide();
                this.viewMap.set(key, value);
                return this;
        }

        hideAllPages() {
                this.viewMap.forEach((v: BasePage) => v.hide());
        }

        showPage(name: string) {
                this.hideAllPages();
                const component = this.viewMap.get(name);
                component.show();
        }

        initPage(name: string) {
                this.viewMap.get(name).show();
        }
}

export abstract class BasePage {
        root: HTMLDivElement;
        constructor(elementId: string) {
                this.root = document.querySelector(elementId);
        }
        hide() {
                this.root.style.display = "none";
        }

        show() {
                this.root.style.display = "flex";
                this.render();
        }

        abstract render(): void;
}
