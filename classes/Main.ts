import {expect, Page} from '@playwright/test'

export class Main {
    private page: Page;

    metaTag = (meta) => this.page.locator(`//meta[contains(text(), "${meta}")]`)
    massageBtn = () => this.page.locator(`(//div[contains(@class, 'slick-slide slick-active')]/div/a/figure/div/img)`)
    logoBtn = () => this.page.locator(`//img[@alt='WellnessLiving']`)

    torontoBtn = () => this.page.locator(`//li/a[contains(text(), 'Toronto')]`)
    searchBtn = () => this.page.locator(`//button[@class='h-full w-full rounded-r-lg bg-wl-dark-lizard text-center font-sans text-[16px] font-bold uppercase text-white disabled:opacity-30 lg:hover:opacity-90']`)
    constructor(page: Page) {
        this.page = page;
    }

    async checkTitle(title: string) {
        const pageTitle = await this.getTitle();
        expect(pageTitle).toBe(title);
    }

    async getTitle() {
        const title = await this.page.title();
        return title;
    }

    async metaDescription(meta: string) {
        const metaDescription = await this.page.locator(`//meta[contains(text(), "${meta}")]`);
        return metaDescription
    }

    async checkMeta(meta: string, expectMeta: string) {
        const metaDesc = await this.metaDescription(meta);
        expect(metaDesc).toBe(expectMeta); // Make your assertion here
    }

    async clickOnMassage() {
        return await this.massageBtn().click()
    }

    async clickOnLogoBtn() {
      return this.logoBtn().click()
    }

    async clickOnCity() {
        return this.torontoBtn().click()
    }

    async clickSearchBtn() {
       return  this.searchBtn().click()
    }
}
