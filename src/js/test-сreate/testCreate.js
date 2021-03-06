import { Subject } from '../subject';
import { FileLoad } from '../fileLoad';

import { Question } from '../question/question';

import { TestCreateContent } from './testCreateContent';

/**
 * Класс создания теста.
 */
export class TestCreate {
    constructor(page) {
        this.page = page;

        this.attachments = [];

        this.contentCl = new TestCreateContent();
        this.questionCl = new Question(page);
    }

    /**
     * Отвечает за выбор основного предмета теста.
     * 
     * @param {object} select кнопка выбора (select) предмета теста.
     */
    selectSubject(select) {
        let selectOptionData = select.getElementsByClassName('select_hd-value')[0].dataset.selectOptionValue,
            logo = this.page.content.getElementsByClassName('js-test-subject-logo')[0],
            subjectCl = new Subject();

        for (let subject of subjectCl.list) {
            if (subject.num === selectOptionData) {
                if (!logo.classList.contains(subject.color)) {
                    logo.classList.add(subject.color);
                    logo.innerText = subjectCl.getShortName(subject.num);
                }
            }
            else {
                if (logo.classList.contains(subject.color)) {
                    logo.classList.remove(subject.color);
                }
            }
        }
    }

    /**
     * Выделяет ключевое слово.
     * Написанное слово выделяется после нажатия клавиш "Tab", "Space", "Enter".
     * 
     * @param {object} event объект события.
     * @param {object} input поле для ввода.
     */
    highlightKeyword(event, input) {

        // Проверят наличие ключевых слов в поле
        if (!this.checkKeywordsQuantity(input)) {
            if (event.code !== 'Backspace' && event.code !== 'Delete') {
                event.preventDefault();
            }
            return;
        }

        if (event.code === 'Space' ||
            event.code === 'Tab' ||
            event.code === 'Semicolon' ||
            event.code === 'Enter') {

            if (event.code === 'Space' || event.code === 'Enter' || event.code === 'Semicolon') {
                event.preventDefault();
            }

            let inputWords = input.textContent.split(';');

            input.innerHTML = '';

            for (let wordWithSemicolon of inputWords) {
                for (let word of wordWithSemicolon.split(';')) {
                    word = word.replace(/\s+/g, '');

                    if (word !== ";" && word !== "") {
                        input.insertAdjacentHTML('beforeend', `<span class="keyword js-test-create-keyword" data-test-keyword-value="${word}">${word};</span>`);
                    }
                }
            }

            if (input.textContent.trim().length > 0) {
                let range = new Range();
                range.setStartAfter(input.lastElementChild);
                range.collapse(true);

                let selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    /**
     * Проверяет наличие ключевых слов в поле для ввода.
     * Возвращает true - если количество слов меньше 5 и false, если больше или равно. 
     * 
     * @param {object} input поле для ввода.
     */
    checkKeywordsQuantity(input) {
        if (input.getElementsByClassName('js-test-create-keyword').length >= 5) {
            return false;
        }
        return true;
    }

    /**
     * Добавляет вложения.
     * 
     * @param {object} event объект события.
     */
    uploadAttachment(event) {
        let fileLoadCl = new FileLoad(),
            files = fileLoadCl.readFile(event),
            wrapper = document.getElementsByClassName('js-test-create-attachments-files')[0];

        for (let file of files) {
            if (this.attachments.length >= 5) {
                this.page.messageCl.show('Ошибка! Количество вложений не может быть больше 5.');
                return;
            }

            this.attachments[this.attachments.length] = file;

            // Если вложенный файл является изображеним, то выводится его превью,
            // если нет, то иконка
            let attachmentLogo;
            if (file.type && file.type.indexOf('image') !== -1) {
                attachmentLogo = `<img class="test-attachments-file--img js-test-create-attachment-img" data-action="show" data-run-in-frame="photoFrame">`;
            }
            else {
                attachmentLogo = `<span class="i-file icon"></span>`;
            }

            wrapper.insertAdjacentHTML('afterbegin',
                `<div class="test-attachments-file test-create-attachments-file js-test-create-attachment">
                    ${attachmentLogo}
                    <div class="test-attachments-file-info">
                        <a class="link js-test-create-attachment-name" title="${file.name}">${file.name}</a>
                        <span class="size">${fileLoadCl.convertBytesToKilobytes(file.size)} KB</span>
                    </div>
                    <button class="i-cross btn delete js-test-create-attachment-delete-btn" data-action="deleteAttachment"></button>
                </div>`);


            let attachment = wrapper.getElementsByClassName('js-test-create-attachment')[0],
                delBtn = attachment.getElementsByClassName('js-test-create-attachment-delete-btn')[0];

            // Если прикрепленный файл является изображением, вешается обработчик события загрузки файла 
            if (file.type && file.type.indexOf('image') !== -1) {
                fileLoadCl.readImage(file, this.showImage, {
                    attachmentTag: attachment
                });
            }
        }
    }

    /**
     * Выводит превью изображения вложения и вешает обработчик.
     * Срабатывает после загрузки файла.
     * 
     * @param {string} path путь к загруженному изображению.
     * @param {object} params передаваемые параметры.
     */
    showImage(path, params) {
        const img = params.attachmentTag.getElementsByClassName('js-test-create-attachment-img')[0];

        img.src = path;
    }

    /**
     * Удаляет вложение.
     * 
     * @param {object} attachment вложение, необходимое для удаления.
     */
    deleteAttachment(target) {

        // Поиск вложения, необходимого для удаления
        let attachment;
        while ((target = target.parentElement) && target.classList.contains('js-test-create-attachment')) {
            attachment = target;
        }

        let i = 0;
        for (let file of this.attachments) {
            let attachmentName = attachment.getElementsByClassName('js-test-create-attachment-name')[0].innerText;

            if (file.name === attachmentName) {
                attachment.remove();
                this.attachments.splice(i, 1);
                break;
            }
            i++;
        }
    }

    addQuestion() {
        this.questionCl.addQuestion();
    }

    /**
     * Собирает варианты ответов вопроса.
     * 
     * @param {object} question вопрос, в котором производится поиск.
     */
    collectAnswers(question) {
        let answersData = [],
            answers = question.getElementsByClassName('js-test-question-answer'),
            answerNum = 1;

        for (let answer of answers) {

            // Проверка на то, выбран ли вариант ответа в качестве верного
            let answerIsTrue = false;
            if (question.dataset.answersType === '3' ||
                question.dataset.answersType === '4') {
                answerIsTrue = true;
            }
            else {
                if (answer.getElementsByClassName('js-test-question-answer-choice-inp')[0].checked) {
                    answerIsTrue = true;
                }
            }

            answersData[answersData.length] = {
                num: answerNum,
                text: answer.getElementsByClassName('js-test-question-answer-inp')[0].value,
                isTrue: answerIsTrue
            };

            answerNum++;
        }

        return answersData;
    }

    /**
     * Собирает вопрос и сопуствующие данные.
     */
    collectQuestions() {
        const questions = this.page.content.getElementsByClassName('js-test-question');

        let questionsData = [],
            questionNum = 1;
        for (let question of questions) {

            let questionImg = question.getElementsByClassName('js-test-create-question-image-inp')[0].files[0];
            if (questionImg === undefined) {
                questionImg = null;
            }

            questionsData[questionsData.length] = {
                num: questionNum,
                title: question.getElementsByClassName('js-test-create-question-title')[0].value,
                answersType: question.dataset.answersType,
                image: questionImg,
                answers: this.collectAnswers(question)
            }

            questionNum++;
        }

        return questionsData;
    }

    /**
     * Собирает данные теста.
     */
    collectData() {
        const form = this.page.content.getElementsByClassName('js-test-bd-form')[0],
            titleInp = form.getElementsByClassName('js-test-create-title')[0],
            descriptionInp = form.getElementsByClassName('js-test-create-title')[0],
            subjectInp = form.getElementsByClassName('js-test-create-subject-select')[0].getElementsByClassName('js-select-value-inp')[0],
            timeToPassInp = form.getElementsByClassName('js-test-create-time-to-pass-select')[0].getElementsByClassName('js-select-value-inp')[0],
            keywordsInp = form.getElementsByClassName('js-test-create-kewords-inp')[0],
            attachmentsInp = form.getElementsByClassName('js-test-create-attachments-inp')[0];


        let data = {
            title: titleInp.value,
            description: descriptionInp.value,
            subject: subjectInp.value,
            time: timeToPassInp.value,
            keyWords: keywordsInp.value,
            attachments: attachmentsInp.files,
            questions: this.collectQuestions()
        };

        console.log(data);
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

    setHandlers() {
        this.questionCl.setHandlers();

        // Вешает обработчик на кнопку выбора предмета теста
        const testCreateSubjectSelect = this.page.content.getElementsByClassName('js-test-create-subject-select')[0],
            testCreateSubjectSelectInp = testCreateSubjectSelect.getElementsByClassName('js-select-value-inp')[0];
        if (testCreateSubjectSelect !== undefined) {
            testCreateSubjectSelectInp.oninput = () => this.selectSubject(testCreateSubjectSelect);
        }

        // Вешает обработчик на поле для ввода ключевых слов
        const testCreateKeywordsInput = this.page.content.getElementsByClassName('js-test-create-kewords-inp')[0];
        if (testCreateKeywordsInput !== undefined) {
            testCreateKeywordsInput.onkeyup = (event) => this.highlightKeyword(event, testCreateKeywordsInput);
            testCreateKeywordsInput.onkeydown = (event) => this.highlightKeyword(event, testCreateKeywordsInput);
        }

        // Вешает обработчик на кнопку прикрепления вложений
        const testCreateAttchmentsInput = this.page.content.getElementsByClassName('js-test-create-attachments-inp')[0];
        if (testCreateAttchmentsInput !== undefined) {
            testCreateAttchmentsInput.onchange = (event) => this.uploadAttachment(event, testCreateAttchmentsInput);
        }
    }
}