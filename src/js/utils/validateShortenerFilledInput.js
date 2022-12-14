function validateShortenerFilledInput(input) {
	if (input.value === '') return true;

	let inputCorrectCondition = null;
	let inputErrorText = null;

	switch (input.name) {
		case ('longLink'):
			const linkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9][A-Za-zА-Яа-я0-9\-]*\.?)*\.[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@\-\/])*)?/;
			let linkIsCorrect = linkRegExp.test(input.value) && input.value.at(-1) !== '.';
			let linkContainsElnk = input.value.includes('e-lnk.ru');
			let inputIsTooLong = input.value.length > 5000;
			inputCorrectCondition = linkIsCorrect && !linkContainsElnk && !inputIsTooLong;

			if (!linkIsCorrect) {
				inputErrorText = 'Введите корректный адрес ссылки';
			}
			if (linkContainsElnk) {
				inputErrorText = 'Это наша ссылка :) Введите другую';
			}
			if (inputIsTooLong) {
				inputErrorText = 'Вы ввели слишком много символов. Это точно рабочая ссылка?)';
			}
			break;
		case ('linkName'):
			inputCorrectCondition = input.value.length <= 30;
			inputErrorText = 'Имя ссылки не может быть длиннее 30 символов';
			break;
		case ('linkLimit'):
			if (!Boolean(Number(input.value))) input.value = '';
			if (input.value.at(-1) === ' ') input.value = '';
			inputCorrectCondition = true;
			inputErrorText = '';
			break;
		case ('linkPassword'):
			inputCorrectCondition = input.value.length <= 16;
			inputErrorText = 'Пароль не может быть длиннее 16 символов';
			break;
		case ('linkStartDate'):
			inputCorrectCondition = true;
			break;
		case ('linkEndDate'):
			inputCorrectCondition = true;
			break;
	}

	if (!inputCorrectCondition) {
		input.nextElementSibling.innerText = inputErrorText;
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	}
}

export default validateShortenerFilledInput;