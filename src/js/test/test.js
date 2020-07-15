import { TestContent } from './testContent'

export class Test {
    constructor(page) {
        this.page = page;

        this.contentCl = new TestContent();
    }

    /**
     * Отвечает за загрузку страницы.
     * 
     * @param {object} contentBd DOM элемент, в которое должно вставляться основное содержимое.
     */
    runPage(contentBd) {
        contentBd.innerHTML = this.contentCl.getPage();
    }
}