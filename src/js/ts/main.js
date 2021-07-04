"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("./navigation");
const sectionsEffects_1 = require("./sectionsEffects");
const initDomFeatures = () => {
    const navigationInit = new navigation_1.NavigationStickyAndDroppable();
    const sectionEffects = new sectionsEffects_1.SectionFaders();
};
initDomFeatures();
//# sourceMappingURL=main.js.map