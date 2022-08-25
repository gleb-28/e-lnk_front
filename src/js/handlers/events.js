import burgerMenuEvent from './burgerMenuEvent.js';
import dropdownEvent from './dropdownEvent.js';
import modalsEvent from './modalsEvent.js';
import copyToClipboardEvent from './copyToClipboardEvent.js';
import clearInputEvent from './clearInputEvent.js';
import logoutEvent from './logoutEvent.js';


document.addEventListener('click', (event) => {

	burgerMenuEvent(event);

	dropdownEvent(event);

	modalsEvent(event);

	copyToClipboardEvent(event);
	
	clearInputEvent(event);

	logoutEvent(event);
});