const fs = require("fs");

let raw = fs.readFileSync("data/pages.json");
let pagesData = JSON.parse(raw);

export type Page = {
    id: string;
    section: string;
    route: string;
    routeId: string;
    name: string;
    activated: boolean;
}

export const pages: Page[] = [];
for (let section of pagesData.pages.sections) {
    for (let page of section.pages) {
        pages.push({
            id: page.id,
            section: section.name,
            route: "/" + section.name + "/" + page.id,
            routeId: section.name + "/" + page.id,
            name: page.name,
            activated: false
        });
    }
}

export const toc: Page[][] = [];
for (let section_data of pagesData.toc) {
    let section: Page[] = [];
    for (let pageId of section_data) {
        const page = pages.find(page => page.routeId === pageId) as Page;
        section.push(page);
    }
    toc.push(section);
}

console.log("Loaded pages and toc");