import { fromEvent, Observable } from "rxjs";

export class NavigationStickyAndDroppable {
  introSection!: HTMLElement;
  navigation!: HTMLDivElement;
  navigationButton!: HTMLDivElement;
  backgroundExpandable!: HTMLDivElement;
  navigationListItems!: HTMLUListElement;
  navbar!: HTMLElement;
  body!: HTMLBodyElement;
  navIconMenu!: HTMLDivElement;
  navIconMenuTop!: HTMLDivElement;
  navIconMenuBot!: HTMLDivElement;

  constructor() {
    this.selectors();
    this.toggleMenu();
    this.hideNavAfterIntro();
    this.displayNavOnScrollUp();
    this.navigateTo();
    // this.navCollapase();
  }
  selectors(): void {
    this.introSection = document.querySelector("#intro");
    this.navigation = document.querySelector("#navigation");
    this.navigationButton = document.querySelector(".navigation__button");
    this.backgroundExpandable = document.querySelector(
      ".navigation__background"
    );
    this.navigationListItems = document.querySelector(".nav-items");
    this.navbar = document.querySelector(".nav");
    this.body = document.querySelector("body");
    this.navIconMenu = document.querySelector(
      ".navigation__icon--2"
    ) as HTMLDivElement;
    this.navIconMenuTop = document.querySelector(
      ".navigation__icon--1"
    ) as HTMLDivElement;
    this.navIconMenuBot = document.querySelector(
      ".navigation__icon--3"
    ) as HTMLDivElement;
  }
  hideNavAfterIntro(): void {
    const stickyNavigation: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer$
    ) => {
      // console.log(observer$)
      const [entry] = entries;
      console.log(entry.target);
      if (entry.isIntersecting === false) {
        this.navigation.classList.add("hide");
      }
    };
    const obsOptions = {
      // root: null,
      // threshold: [0.1],
      rootMargin: "-90% 0px 0px 0px",
    };
    const introObserver$ = new IntersectionObserver(
      stickyNavigation,
      obsOptions
    );
    introObserver$.observe(this.introSection);
  }
  displayNavOnScrollUp(): void {
    const observer = {
      next: (val: any) => console.log("next", val),
      error: (error: any) => console.log("error", error),
      complete: () => console.log("Completed"),
    };

    const scrollObs$ = fromEvent<Event>(document, "scroll");

    // scrollObs$.subscribe(observer)
    let scrollCurrentPosition = 0;

    scrollObs$.subscribe((_event) => {
      if (document.body.getBoundingClientRect().width <= 600) {
        return;
      }
      if (document.body.getBoundingClientRect().top > scrollCurrentPosition) {
        this.navigation.classList.remove("hide");
        this.navigation.classList.remove("back");
      } else {
        this.navigation.classList.add("hide");
        this.navigation.classList.add("back");
      }
      scrollCurrentPosition = document.body.getBoundingClientRect().top;
    });
  }
  toggleMenu() {
    this.navigationButton.addEventListener(
      "click",
      this.toggleMenuHandler.bind(this)
    );
  }
  blockScrollWhenMenuDisplayed() {
    this.body.classList.toggle("menu-open");
  }
  toggleMenuHandler() {
    this.blockScrollWhenMenuDisplayed();
    if (this.navigation.classList.contains("hide")) {
      this.navigation.classList.remove("hide");
    }
    this.backgroundExpandable.classList.toggle("bg__shown");
    this.navbar.classList.toggle("nav__shown");
    this.navIconMenu.classList.toggle("icon-hide__partial");
    this.navIconMenuTop.classList.toggle("icon-rotate--right");
    this.navIconMenuBot.classList.toggle("icon-rotate--left");
  }

  navigateTo(): void {
    this.navigationListItems.addEventListener("click", (event: Event) => {
      if (document.body.getBoundingClientRect().width <= 600) {
        this.navigationButton.click(); 
      }
      const liItem = event.target as HTMLLIElement;
      if (!liItem.classList.contains("navigation__link--app")) {
        event.preventDefault();
        const id = liItem.getAttribute("href");
        document.querySelector(id!)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}
