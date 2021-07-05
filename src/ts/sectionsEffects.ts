export class SectionFaders {
  fadableSections!: NodeListOf<HTMLElement>;
  introSection!: HTMLElement;

  constructor() {
    this.selectors();
    this.fadeInSectionConfig();
  }
  selectors(): void {
    this.introSection = document.querySelector("#intro");
    this.fadableSections = document.querySelectorAll("section");
  }
  fadeInSectionConfig(): void {
    const appearsOptions = {
      threshold: 0.3,
    };
    // this.introSection.classList.add('active');
    const sectionAppearsOnScroll$ = new IntersectionObserver(function (
      entries,
      appearsOnScroll
    ) {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("active");
          appearsOnScroll.unobserve(entry.target);
        }
      });
    },
    appearsOptions);
    this.fadableSections.forEach((section) => {
      sectionAppearsOnScroll$.observe(section);
    });
  }
}
