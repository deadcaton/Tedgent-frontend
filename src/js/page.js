import { Sidebar } from './sidebar';
import { Select } from './select';
import { PhotoFrame } from './photoFrame';
import { Fields } from './fields';

import { TestCreate } from './testCreate';
import { MoreMenu } from './moreMenu';

export class Page {
    constructor() {
        this.body = document.getElementById('body');
        this.num = this.body.dataset.pageNum;
    }

    /**
     * Заркывает все активные всплывающие окна, селекты и подобные элементы по клику на body.
     * 
     * @param {*} event событие.
     */
    closeWindows(event) {
        const items = this.body.getElementsByClassName('active'),
            itemsCount = items.length;

        for (let i = 0; itemsCount > i; i++) {
            if (!items[0].contains(event.target)) {
                items[0].classList.remove('active');
            }
        }
    }

    setHandlers() {
        switch (this.num) {
            // Profile page
            case '1':
                break;

            // Tests list page
            case '2':
                break;

            // Test create page
            case '3':
                new TestCreate().setHandlers()
                break;
        }

        new PhotoFrame().setHandlers();
        new Sidebar().setHandlers();
        new Select().setHandlers();
        new MoreMenu().setHandlers();

        this.body.onclick = (event) => this.closeWindows(event);
    }
}