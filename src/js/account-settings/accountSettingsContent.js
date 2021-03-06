export class AccountSettingsContent {

  getPage() {
    return `<div class="cnt_bd-settings js-account-bd">
    <div class="settings_hd">
      <div class="settings_hd-menu pivot-menu">
        <button class="settings_hd-menu--btn btn pivot-menu--btn pivot-menu--btn-active js-link-btn"
          data-link="/acconut/settings" data-link-page-num="6" data-action="goToPage"
          data-run-in-frame="true">Аккаунт</button>
        <button class="settings_hd-menu--btn btn pivot-menu--btn js-link-btn" data-link="/acconut/settings"
          data-link-page-num="7" data-action="goToPage" data-run-in-frame="true">Сервис</button>
      </div>
    </div>
    <div class="settings_bd">
      <div class="cnt-block">
        <div class="cnt-block_hd">
          <div class="cnt-block_hd-title">Публичные данные</div>
        </div>
        <div class="settings-acc-info-block_bd cnt-block_bd js-account-settings-public-data-form">
          <label class="settings-acc-info-label">
            <span class="label-txt">Фамилия</span>
            <div class="inp_wr inp-limit-value-visisble js-inp-wrapper" data-characters-limit="true"
              data-auto-hang-handler="true">
              <input class="inp js-inp" name="firstName" data-characters-max-limit-value="50" type="text">
              <span class="inp-limit--value js-inp-limit-value">50</span>
              <div class="inp-error-mess">
                <div class="inp-error-mess--txt js-inp-error-txt"></div>
              </div>
            </div>
          </label>
          <label class="settings-acc-info-label">
            <span class="label-txt">Имя</span>
            <div class="inp_wr inp-limit-value-visisble js-inp-wrapper" data-characters-limit="true"
              data-auto-hang-handler="true">
              <input class="inp js-inp" name="lastName" data-characters-max-limit-value="50" type="text">
              <span class="inp-limit--value js-inp-limit-value">50</span>
              <div class="inp-error-mess">
                <div class="inp-error-mess--txt js-inp-error-txt"></div>
              </div>
            </div>
          </label>
          <label class="settings-acc-info-label">
            <span class="label-txt">Отчество</span>
            <div class="inp_wr inp-limit-value-visisble js-inp-wrapper" data-characters-limit="true"
              data-auto-hang-handler="true">
              <input class="inp js-inp" name="patronymic" data-characters-max-limit-value="50" type="text">
              <span class="inp-limit--value js-inp-limit-value">50</span>
              <div class="inp-error-mess">
                <div class="inp-error-mess--txt js-inp-error-txt"></div>
              </div>
            </div>
          </label>
          <label class="settings-acc-info-label">
            <span class="label-txt">Дата рождения</span>
            <div class="date-inp_wr">
              <span class="date-inp--icon inp--icon i-calendar"></span>
              <input class="inp date--inp js-date-inp" name="dateOfBirth" type="text" placeholder="03.07.2020">
            </div>
          </label>
          <label class="settings-acc-info-label">
            <span class="label-txt">Имя пользователя</span>
            <div class="inp_wr inp-limit-value-visisble js-inp-wrapper" data-characters-limit="true"
              data-auto-hang-handler="true">
              <input class="inp js-inp" name="username" data-characters-max-limit-value="20" type="text">
              <span class="inp-limit--value js-inp-limit-value">20</span>
              <div class="inp-error-mess">
                <div class="inp-error-mess--txt js-inp-error-txt"></div>
              </div>
            </div>
            <span class="label-dsc">Имя пользователя позволяет найти Ваш профиль не зная Вашего личного
              идентификатора.</span>
            <span class="label-dsc">Можно использовать латиницу (a-z), цифры (0-9) и тире. Минимальная длина — 5
              символов.</span>
            <span class="label-dsc">Ваш профиль будет доступен по ссылке
              <span class="settings-acc-info-username-link-example">
                https://tedgent.org/<span class="js-settings-account-info-username-link-example"></span>
              </span>
            </span>
          </label>
        </div>
        <div class="settings-acc-info-block_ft cnt-block_ft">
          <button class="btn btn-1 settings-save--btn"
            data-settings-account-action="collectDataFromPublic">Сохранить</button>
        </div>
      </div>
      <div class="cnt-block">
        <div class="cnt-block_hd">
          <div class="cnt-block_hd-title">Безопасность</div>
        </div>
        <div class="settings-acc-security-block_bd cnt-block_bd js-account-settings-security-data-form">
          <label class="settings-acc-security-label">
            <span class="label-txt">Старый пароль</span>
            <div class="inp_wr js-inp-wrapper" data-characters-limit="true" data-auto-hang-handler="true"
              data-validation-nums="6">
              <input class="inp js-inp" name="currentPassword" data-characters-max-limit-value="30" type="password">
              <div class="inp-error-mess">
                <div class="inp-error-mess--txt js-inp-error-txt"></div>
              </div>
            </div>
          </label>
          <label class="settings-acc-security-label">
            <span class="label-txt">Новый пароль</span>
            <div class="inp_wr js-inp-wrapper" data-characters-limit="true" data-auto-hang-handler="true">
              <input class="inp js-inp js-account-settings-new-password-inp" name="newPassword"
                data-characters-max-limit-value="30" type="password">
              <div class="inp-error-mess">
                <div class="inp-error-mess--txt js-inp-error-txt"></div>
              </div>
            </div>
            <span class="label-dsc">Пароль должен быть на латинице (a-z), содержать цифры (0-9), один знак в верхнем
              регистре (A) и один в нижнем (a).</span>
          </label>
          <label class="settings-acc-security-label">
            <span class="label-txt">Повторите новый пароль</span>
            <div class="inp_wr js-inp-wrapper" data-characters-limit="true" data-auto-hang-handler="true">
              <input class="inp js-inp js-account-settings-new-password-retry-inp" name="newPasswordRetry"
                data-characters-max-limit-value="30" type="password">
              <div class="inp-error-mess">
                <div class="inp-error-mess--txt js-inp-error-txt"></div>
              </div>
            </div>
          </label>
        </div>
        <div class="settings-acc-security-block_ft cnt-block_ft">
          <button class="btn btn-1 settings-save--btn"
            data-settings-account-action="collectDataFromSecurity">Сохранить</button>
        </div>
      </div>
    </div>
  </div>`;
  }
}