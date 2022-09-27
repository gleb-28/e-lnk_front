const loggedUserHeaderComponent = (email, {panelLink = true, shortenerLink = false, settingsLink = true} = {}) => {
	return `
    <nav class="nav header__nav">
      <ul class="nav__list">
        ${panelLink ? '<li class="nav__item "><a class="button--main burger-menu-link" href="#/panel">Панель управления</a></li>' : ''}
        ${shortenerLink ? '<li class="nav__item "><a class="button--main burger-menu-link" href="#/">Создать ссылку</a></li>' : ''}
        <li class="nav__item">
          <div class="dropdown">
            <a class="dropdown__button nav__link burger-menu-link nav__email" href="#">${email ? email : ''}
							<div class="tooltip premium-sign-tooltip">
								<svg fill="none" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM7.50001 3.5C7.69387 3.5 7.87026 3.61206 7.95263 3.78755L8.92087 5.85035L11.0755 6.17933C11.2607 6.20761 11.4146 6.33713 11.4741 6.51485C11.5336 6.69257 11.4888 6.88864 11.3579 7.02278L9.78412 8.63573L10.1567 10.9195C10.1875 11.1085 10.1077 11.2985 9.95121 11.4087C9.79468 11.519 9.58892 11.5302 9.42134 11.4376L7.50001 10.3755L5.57868 11.4376C5.41111 11.5302 5.20534 11.519 5.04881 11.4087C4.89228 11.2985 4.81248 11.1085 4.84331 10.9195L5.2159 8.63573L3.64214 7.02278C3.51126 6.88864 3.46638 6.69257 3.52588 6.51485C3.58539 6.33713 3.73928 6.20761 3.92454 6.17933L6.07916 5.85035L7.04739 3.78755C7.12976 3.61206 7.30615 3.5 7.50001 3.5Z" fill="#3d96e5" fill-rule="evenodd"/></svg>
								<p class="tooltip__text">Премиум аккаунт</p>
							</div>
						</a>
            <ul class="dropdown__list">
							${settingsLink ? '' : '<li><a class="dropdown__link burger-menu-link" href="#/">Создать ссылку</a></li>'}
							${settingsLink ? '<li><a class="dropdown__link burger-menu-link" href="#/settings">Настройки</a></li>' : ''}
              <li><a class="dropdown__link logout-link burger-menu-link" href="#">Выйти</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
    <button class="burger">
      <span class="burger__line"></span>
    </button>
  `;
};

export default loggedUserHeaderComponent;

