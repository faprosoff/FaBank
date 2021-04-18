import {LitElement, html, css} from 'lit-element';
import 'dile-tabs/dile-tabs';
import 'dile-pages/dile-pages';
import './header-view';
import './private-view';
import './footer-view';
import './public-home';
import './register-view';

class FabankView extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-tab-background-color: transparent;
        --dile-tab-selected-background-color: transparent;
        --dile-tab-selected-text-color: #1020c0;
      }

      .main {
        font-size: 1.7rem;
        line-height: 0.5;
        padding: 10px 0px;
        text-align: center;
      }

      .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 20%;
      }

      .page {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      loggedIn: {type: Boolean},
      idUser: {type: String},
    };
  }

  constructor() {
    super();
    this.loggedIn = false;
    this.idUser = '';
  }

  render() {
    return html`
      <header-view
        @login="${this.login}"
        @logout="${this.logout}"
        .loggedIn="${this.loggedIn}"
      >
      </header-view>

      ${!this.loggedIn
        ? html` <public-home></public-home> `
        : html` <private-view @logout="${this.logout}"></private-view> `}

      <footer-view footer="© 2021 FaBank Argentina S.A."></footer-view>
    `;
  }

  selectedChanged(e) {
    this.selected = e.detail;
  }

  login(e) {
    this.idUser = e.detail.message;
    this.loggedIn = true;
  }

  register(e) {
    this.loggedIn = true;
  }

  logout(e) {
    this.loggedIn = false;
  }
}

customElements.define('fabank-view', FabankView);
