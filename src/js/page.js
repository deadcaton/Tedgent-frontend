// Основные области
import { Sidebar } from './sidebar';
import { Select } from './select';
import { PhotoFrame } from './photoFrame';
import { MoreMenu } from './moreMenu';
import { Message } from './message';
import { DialogWindow } from './dialogWindow';
import { Preloader } from './preloader';

// Элементы управления (кнопки, поля для ввода)
import { Delegation } from './delegation';
import { Controls } from './controls';
import { Fields } from './fields';

// Страницы
import { Profile } from './profile/profile';
import { TestCreate } from './test-сreate/testCreate';
import { Test } from './test/test';
import { TestResultForCreator } from './test-result-for-creator/testResultForCreator';
import { TestResultForUser } from './test-result-for-user/testResultForUser';
import { AccountSettings } from './account-settings/accountSettings';
import { ServiceSettings } from './service-settings/serviceSettings';
import { Search } from './search/search';

// Для страниц
import { PageTitles } from './pageTitles';

/**
 * Класс для работы со страницами.
 */
export class Page {
    constructor() {

        // Области
        this.body = document.getElementById('body');
        this.backgroundImg = this.body.getElementsByClassName('js-background-img')[0];
        this.content = document.getElementById('bodyContent');
        this.menu = this.body.getElementsByClassName('js-menu')[0];
        this.menuPageTitle = this.menu.getElementsByClassName('js-menu-page-title')[0];
        this.photoFrame = this.body.getElementsByClassName('js-photo-frame')[0];
        this.message = this.body.getElementsByClassName('js-message')[0];
        this.dialogWindow = this.body.getElementsByClassName('js-dialog-window')[0];
        this.preloader = this.body.getElementsByClassName('js-preloader')[0];

        // Для работы с областями
        this.selectCl = new Select();
        this.messageCl = new Message(this);
        this.dialogWindowCl = new DialogWindow(this);
        this.photoFrameCl = new PhotoFrame(this);
        this.preloaderCl = new Preloader(this);
        this.sidebarCl = new Sidebar();

        // Для работы с элементами управления
        this.delegationCl = new Delegation(this);
        this.controlsCl = new Controls(this);
        this.fieldCl = new Fields(this);

        // Номер текущей страницы
        this.num = this.body.dataset.pageNum;
        this.currentPageCl;
    }

    /**
     * Закрывает все активные всплывающие окна, селекты и подобные элементы по клику на body.
     * 
     * @param {object} event объект события.
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

    /**
     * Изменяет заголовок страницы в меню.
     * 
     * @param {string} pageNum номер страницы. 
     */
    changePageTitle(pageNum = this.num) {
        this.menuPageTitle.innerText = new PageTitles().getTitle(pageNum);
    }

    /**
     * Отвечает за переход на страницу.
     * 
     * @param {object} linkBtn кнопка-ссылка на которой произошел click.
     */
    goToPage(linkBtn) {
        let link = linkBtn.dataset.link,
            linkPageNum = linkBtn.dataset.linkPageNum;

        this.preloaderCl.show('Загрузка страницы...');
        this.runPageContent(linkPageNum);
        this.preloaderCl.close();
    }

    /**
     * Загружает содержимое страницы.
     * 
     * @param {string} pageNum номер страницы.
     */
    runPageContent(pageNum = this.num) {
        let contentBd = this.content.getElementsByClassName('js-content-bd')[0];

        // Изменяет номер страницы
        this.body.dataset.pageNum = pageNum;
        this.num = this.body.dataset.pageNum;

        // Определяет необходимый метод для активации по номеру страницу 
        switch (this.num) {

            case '0':
                break;

            // Profile page
            case '1':
                this.currentPageCl = new Profile(this);
                this.currentPageCl.runPage(contentBd);
                break;

            // Test create page
            case '2':
                this.currentPageCl = new TestCreate(this);
                this.currentPageCl.runPage(contentBd);
                break;

            // Test page
            case '3':
                new Test(this).runPage(contentBd);
                break;

            // Test result for creator page
            case '4':
                new TestResultForCreator(this).runPage(contentBd);
                break;

            // Test result for user
            case '5':
                new TestResultForUser(this).runPage(contentBd);
                break;

            // Account settings page
            case '6':
                this.currentPageCl = new AccountSettings(this);
                this.currentPageCl.runPage(contentBd);
                break;

            // Service settings page
            case '7':
                this.currentPageCl = new ServiceSettings(this);
                this.currentPageCl.runPage(contentBd);
                break;

            // Search page
            case '8':
                this.currentPageCl = new Search(this);
                this.currentPageCl.runPage(contentBd);
                break;
        }

        this.changePageTitle();
        this.setHandlers();
    }

    /**
     * Устанавливает обработчики событий.
     */
    setHandlers() {
        this.selectCl.setHandlers();
        new MoreMenu().setHandlers();
        this.controlsCl.setHandlers();
        this.fieldCl.setHandlers();

        this.body.onclick = (event) => this.delegationCl.callAction(event);
    }
}