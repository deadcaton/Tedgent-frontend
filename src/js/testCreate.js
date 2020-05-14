import { Subject } from './subject';

/**
 * Класс создания теста.
 */
export class TestCreate {

    /**
     * Отвечает за выбор основного предмета теста.
     * @param {*} select 
     */
    selectSubject(select) {
        let selectOptionData = select.getElementsByClassName('select_hd-value')[0].dataset.selectOptionValue,
            logo = document.getElementById('bodyContent').getElementsByClassName('js-test-subject-logo')[0],
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
     * Написанное слово выделяется если перед ним (без пробела) присутсвует знак "#", либо после нажатия клавиш "Tab", "Space", "Enter".
     */
    highlightKeyword(event, input) {
        if (event.code === 'Space' ||
            event.code === 'Enter' ||
            event.code === 'Tab') {

            // &nbsp
            const inputWords = input.innerText.split(' ');
            input.innerHTML = '';

            console.log(inputWords);
            for (let word of inputWords) {
                console.log(word);

                if (word !== '' || word !== ' ') {
                    input.insertAdjacentHTML('beforeend', `<span>${word}</span>`);
                }
            }

            console.log(input.textContent);
        }
    }
}