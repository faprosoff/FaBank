import {LitElement, html, css} from 'lit-element';
import {saveToken, decodeToken} from '../helpers/token';
import {loginUrl} from '../helpers/routes';
import {loginStyles} from '../css/loginStyles';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-snackbar';

class LoginView extends LitElement {
  static get styles() {
    return loginStyles;
  }

  static get properties() {
    return {
      email: {
        type: String,
      },
      password: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.idUser = '';
  }

  render() {
    return html`

      <div class="login">
        <div class="login-screen">
          <div class="app-title">
            <h1>Ingresar</h1>
          </div>

          <div class="login-form">
            <div class="control-group">

            <mwc-textfield
              outlined
              id="email"
              label="Email"
              required
              validationMessage="Email inválido"
              type="email"
              value="${this.email}"
            ></mwc-textfield>
            </div>

            <div class="control-group">
              
            
            <mwc-textfield
              outlined
              label="Contraseña"
              id="password"
              required
              validationMessage="Contraseña inválida"
              type="password"
              value="${this.password}"
            ></mwc-textfield>
            <a class="btn btn-primary btn-large btn-block" @click="${this.login}">Ingresar</a>
            <br>
            <a class="btn btn-primary btn-large btn-block" @click="${this.closeLoginDialog}">Salir</a>
            </div>
          </div>
        </div>
      </div>

      <mwc-snackbar id="snackMessage"></mwc-snackbar>
    </div>
  `;
  }

  async login(e) {
    const email = this.getFieldById('email');
    const password = this.getFieldById('password');

    if (email.checkValidity() && password.checkValidity()) {
      const data = {
        email: email.value,
        password: password.value,
      };

      await fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log('Error: ', err))
        .then((response) => {
          if (response.ok) {
            saveToken(response.token);
            const infoDecoded = decodeToken(response.token);
            this.idUser = infoDecoded._id;
            this.loginOk();
          } else {
            this.throwError(response.error);
          }
        });
    } else {
      email.reportValidity();
      password.reportValidity();
    }
  }

  loginOk() {
    const message = {
      idUser: this.idUser,
    };
    this.triggerEvent(message, 'loginOk');
  }

  closeLoginDialog() {
    this.triggerEvent({}, 'closeLoginDialog');
  }

  triggerEvent(message, event) {
    const eventToDispatch = new CustomEvent(event, {
      detail: {
        message,
      },
    });
    this.dispatchEvent(eventToDispatch);
  }

  getFieldById(name) {
    return this.shadowRoot.getElementById(name);
  }

  throwError(error) {
    const snack = this.getFieldById('snackMessage');
    snack.stacked = false;
    snack.leading = false;
    snack.timeoutMs = 5000;
    snack.labelText = error;
    snack.show();
    console.log('Error:', error);
  }
}

customElements.define('login-view', LoginView);
