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

        this.setHandlers();
    }

    /**
     * Устанавливает обработчики событий.
     */
    setHandlers() {

        // Устанавливает обработчики событий на вложения, которые являются изображения, для возможности увеличенного просмотра
        const attachments = this.page.content.getElementsByClassName('js-test-attachment');
        for (let attachment of attachments) {
            let img = attachment.getElementsByClassName('js-test-attachment-img')[0];
            if (img !== undefined) {
                img.onclick = () => this.page.photoFrameCl.showOrCloseFrame(img.src);
            }
        }

        const questionImgs = this.page.content.getElementsByClassName('js-test-question-img');
        for (let questionImg of questionImgs) {
            questionImg.onclick = () => this.page.photoFrameCl.showOrCloseFrame(questionImg.src);
        }
    }
}