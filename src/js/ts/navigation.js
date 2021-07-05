"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationStickyAndDroppable = void 0;
const rxjs_1 = require("rxjs");
class NavigationStickyAndDroppable {
    constructor() {
        this.selectors();
        this.toggleMenu();
        this.hideNavAfterIntro();
        this.displayNavOnScrollUp();
        this.navigateTo();
    }
    selectors() {
        this.introSection = document.querySelector("#intro");
        this.navigation = document.querySelector("#navigation");
        this.navigationButton = document.querySelector(".navigation__button");
        this.backgroundExpandable = document.querySelector(".navigation__background");
        this.navigationListItems = document.querySelector(".nav-items");
        this.navbar = document.querySelector(".nav");
        this.body = document.querySelector("body");
        this.navIconMenu = document.querySelector(".navigation__icon--2");
        this.navIconMenuTop = document.querySelector(".navigation__icon--1");
        this.navIconMenuBot = document.querySelector(".navigation__icon--3");
    }
    hideNavAfterIntro() {
        const stickyNavigation = (entries, observer$) => {
            const [entry] = entries;
            if (entry.isIntersecting === false) {
                this.navigation.classList.add("hide");
            }
        };
        const obsOptions = {
            rootMargin: "-90% 0px 0px 0px",
        };
        const introObserver$ = new IntersectionObserver(stickyNavigation, obsOptions);
        introObserver$.observe(this.introSection);
    }
    displayNavOnScrollUp() {
        const observer = {
            next: (val) => console.log("next", val),
            error: (error) => console.log("error", error),
            complete: () => console.log("Completed"),
        };
        const scrollObs$ = rxjs_1.fromEvent(document, "scroll");
        let scrollCurrentPosition = 0;
        scrollObs$.subscribe((_event) => {
            if (document.body.getBoundingClientRect().width <= 600) {
                return;
            }
            if (document.body.getBoundingClientRect().top > scrollCurrentPosition) {
                this.navigation.classList.remove("hide");
                this.navigation.classList.remove("back");
            }
            else {
                this.navigation.classList.add("back");
            }
            scrollCurrentPosition = document.body.getBoundingClientRect().top;
        });
    }
    toggleMenu() {
        this.navigationButton.addEventListener("click", this.toggleMenuHandler.bind(this));
    }
    blockScrollWhenMenuDisplayed() {
        this.body.classList.toggle("menu-open");
    }
    toggleMenuHandler() {
        this.blockScrollWhenMenuDisplayed();
        this.navigation.classList.toggle("hide");
        this.backgroundExpandable.classList.toggle("bg__shown");
        this.navbar.classList.toggle("nav__shown");
        this.navIconMenu.classList.toggle("icon-hide__partial");
        this.navIconMenuTop.classList.toggle("icon-rotate--right");
        this.navIconMenuBot.classList.toggle("icon-rotate--left");
    }
    navigateTo() {
        this.navigationListItems.addEventListener("click", (event) => {
            var _a;
            if (document.body.getBoundingClientRect().width <= 600) {
                this.navigationButton.click();
            }
            const liItem = event.target;
            if (!liItem.classList.contains("navigation__link--app")) {
                event.preventDefault();
                const id = liItem.getAttribute("href");
                (_a = document.querySelector(id)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}
exports.NavigationStickyAndDroppable = NavigationStickyAndDroppable;
//# sourceMappingURL=navigation.js.map