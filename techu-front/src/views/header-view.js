import {LitElement, html, css} from 'lit-element';
import {deleteToken} from '../helpers/token';
import '@material/mwc-button';
import '@material/mwc-dialog';
import './login-view';
import './register-view';
import {headerStyles} from '../css/headerStyles';
import '@vaadin/vaadin-button';

export class HeaderView extends LitElement {
  static get styles() {
    return [headerStyles, css``];
  }

  static get properties() {
    return {
      title: {type: String},
      loggedIn: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.title = 'FABANK';
  }

  render() {
    return html`
      <header>
        <div class="header">
          <a class="logo">${this.title}</a>
          <div class="header-right">
            ${!this.loggedIn
              ? html`
                  <a
                    id="openDialogLogin"
                    @click="${(e) => this.openDialog('loginDialog')}"
                    >Ingresar</a
                  >
                  <a id="openDialogRegister" @click="${this.registerDialog}"
                    >Registrarme</a
                  >

                  <mwc-dialog id="loginDialog">
                    <login-view @loginOk="${this.loginOk}" @closeLoginDialog="${this.closeLoginDialog}"></login-view>
                  </mwc-dialog>

                  <mwc-dialog id="registerDialog">
                    <register-view @register="${this.register}" @closeRegisterDialog="${this.closeRegisterDialog}"></register-view>
                  </mwc-dialog>
                `
              : html` <a id="logout" @click="${this.logout}">Salir</a> `}
          </div>
        </div>
      </header>
    `;
  }

  register(e) {
    this.loginOk();
  }

  loginOk(e) {
    this.loggedIn = true;
    this.triggerEvent({}, 'login');
  }

  logout(e) {
    this.loggedIn = false;
    deleteToken();
    this.triggerEvent({}, 'logout');
  }

  triggerEvent(message, event) {
    const eventToDispatch = new CustomEvent(event, {
      detail: {message},
    });
    this.dispatchEvent(eventToDispatch);
  }

  registerDialog() {
    this.closeDialog('loginDialog');
    this.openDialog('registerDialog');
  }

  closeLoginDialog() {
    this.closeDialog('loginDialog');
  }

  closeRegisterDialog() {
    this.closeDialog('registerDialog');
  }
  
  openDialog(name) {
    this.getFieldById(name).show();
  }

  closeDialog(name) {
    this.getFieldById(name).close();
  }

  getFieldById(name) {
    return this.shadowRoot.getElementById(name);
  }
}

customElements.define('header-view', HeaderView);
