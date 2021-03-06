import { TestResultForUserContent } from './testResultForUserContent';

export class TestResultForUser {
    constructor(page) {
        this.page = page;

        this.contentCl = new TestResultForUserContent();
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