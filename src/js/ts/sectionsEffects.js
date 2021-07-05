"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionFaders = void 0;
class SectionFaders {
    constructor() {
        this.selectors();
        this.fadeInSectionConfig();
    }
    selectors() {
        this.introSection = document.querySelector("#intro");
        this.fadableSections = document.querySelectorAll("section");
    }
    fadeInSectionConfig() {
        const appearsOptions = {
            threshold: 0.3,
        };
        const sectionAppearsOnScroll$ = new IntersectionObserver(function (entries, appearsOnScroll) {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) {
                    return;
                }
                else {
                    entry.target.classList.add("active");
                    appearsOnScroll.unobserve(entry.target);
                }
            });
        }, appearsOptions);
        this.fadableSections.forEach((section) => {
            sectionAppearsOnScroll$.observe(section);
        });
    }
}
exports.SectionFaders = SectionFaders;
//# sourceMappingURL=sectionsEffects.js.map