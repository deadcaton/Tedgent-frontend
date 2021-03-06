export class AnswerContent {

    /**
     * Возвращает DOMString сфорированного варианта ответа.
     * 
     * @param {string} answerType тип варианта ответа.
     * @param {number} questionNum номер вопроса
     * @param {number} answerNum номер варианта ответа.
     */
    getAnswer(answerType, questionNum, answerNum) {
        switch (answerType) {
            case '1':
                return `<div class="test_create_bd-question-answer js-test-question-answer" data-answer-num="${answerNum}">
                <div class="test-question-answer-checkbox js-test-question-answer-choice-btn">
                <input class="test-question-answer-checkbox--inp js-test-question-answer-choice-inp" id="answer${questionNum}${answerNum}" name="answerCheck${questionNum}" type="checkbox">
                <label class="js-test-question-answer-choice-label" for="answer${questionNum}${answerNum}"></label>
                </div>
                <div class="inp_wr js-inp-wrapper" data-characters-limit="true" data-auto-hang-handler="false">
                <input class="inp test_create_bd-question-answer--inp js-inp js-test-question-answer-inp"
                name="answer" data-characters-max-limit-value="300" type="text" placeholder="Ответ №${answerNum}"></div>
                <button class="test_create_bd-question-answer--btn btn i-cross js-test-create-question-answer-delete-btn" data-answer-action="deleteAnswer"></button></div>`;

            case '2':
                return `<div class="test_create_bd-question-answer js-test-question-answer" data-answer-num="${answerNum}">
                <div class="test-question-answer-radio js-test-question-answer-choice-btn">
                <input class="test-question-answer-radio--inp js-test-question-answer-choice-inp" id="answer${questionNum}${answerNum}" name="answerRadio${questionNum}" type="radio">
                <label class="js-test-question-answer-choice-label" for="answer${questionNum}${answerNum}"></label>
                </div>
                <div class="inp_wr js-inp-wrapper" data-characters-limit="true" data-auto-hang-handler="false">
                <input class="inp test_create_bd-question-answer--inp js-inp js-test-question-answer-inp"
                name="answer" data-characters-max-limit-value="300" type="text" placeholder="Ответ №${answerNum}"></div>
                <button class="test_create_bd-question-answer--btn btn i-cross js-test-create-question-answer-delete-btn" data-answer-action="deleteAnswer"></button></div>`;

            case '3':
                return `<div class="test_create_bd-question-answer test-question-answer-active js-test-question-answer" data-answer-num="1">
                <div class="inp_wr js-inp-wrapper" data-characters-limit="true" data-auto-hang-handler="false">
                <input class="inp test_create_bd-question-answer--inp js-inp js-test-question-answer-inp" name="answer" data-characters-max-limit-value="500" type="text" placeholder="Ответ...">
                </div>
                </div>`;

            case '4':
                return `<div class="test_create_bd-question-answer test-question-answer-active js-test-question-answer" data-answer-num="1">
                <div class="inp_wr js-inp-wrapper" data-characters-limit="true" data-auto-hang-handler="false">
                <input class="inp test_create_bd-question-answer--inp js-inp js-test-question-answer-inp" name="answer" data-characters-max-limit-value="100" type="number" step="any" placeholder="1">
                </div>
                </div>`;
        }
    }

    /**
     * Возвращает DOMString блока с кнопкой выбора варианта ответа.
     * 
     * @param {string} type тип варианта ответа который нужно вернуть.
     * @param {number} questionNum номер вопроса.
     * @param {number} answerNum номер ответа.
     */
    getAnswerChoiceBtn(answerType, questionNum, answerNum) {
        switch (answerType) {
            case '1':
                return `<div class="test-question-answer-checkbox js-test-question-answer-choice-btn">
                <input class="test-question-answer-checkbox--inp js-test-question-answer-choice-inp" id="answer${questionNum}${answerNum}" name="answerCheck${questionNum}" type="checkbox">
                <label class="js-test-question-answer-choice-label" for="answer${questionNum}${answerNum}"></label>
                </div>`;

            case '2':
                return `<div class="test-question-answer-radio js-test-question-answer-choice-btn">
                <input class="test-question-answer-radio--inp js-test-question-answer-choice-inp" id="answer${questionNum}${answerNum}" name="answerRadio${questionNum}" type="radio">
                <label class="js-test-question-answer-choice-label" for="answer${questionNum}${answerNum}"></label>
                </div>`;
        }
    }
}