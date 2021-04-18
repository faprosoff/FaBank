import { html, css, LitElement } from 'lit-element';
import { registerUrl } from '../helpers/routes';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-snackbar';
import '@material/mwc-select';
import { saveToken } from '../helpers/token';
import { loginStyles } from '../css/loginStyles';

export class RegisterView extends LitElement {
  static get styles() {
    return [
      loginStyles,
      css`
        .some-page-wrapper {
          margin: 15px;
        }

        .row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
        }

        .column {
          display: flex;
          flex-direction: column;
          flex-basis: 100%;
          flex: 1;
        }

        .double-column {
          display: flex;
          flex-direction: column;
          flex-basis: 100%;
          flex: 2;
        }

        a {
          text-align: center;
        }
      `,
    ];
  }

  static get properties() {
    return {
      nombre: {
        type: String,
      },
      apellido: {
        type: String,
      },
      tipoDocumento: {
        type: String,
      },
      documento: {
        type: Number,
      },
      direccion: {
        type: String,
      },
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
    this.firstName = '';
    this.lastName = '';
    this.documentType = '';
    this.document = '';
    this.address = '';
    this.email = '';
    this.password = '';
    this.idUser = '';
  }

  render() {
    return html`
          
              <div class="app-title">
                <h1>Registrarme</h1>
              </div>
              
              <div class="some-page-wrapper">
              
                <div class="row">
                  <div class="column">
                    <mwc-textfield outlined id="firstName" label="Nombre" required validationMessage="Nombre inválido" type="text"
                      value="${this.firstName}">
                    </mwc-textfield>
                  </div>
                  <div class="column">
                    <mwc-textfield outlined id="lastName" label="Apellido" required validationMessage="Apellido inválido" type="text"
                      value="${this.lastName}">
                    </mwc-textfield>
                  </div>
                </div>
              
                <div class="row">
                  <div class="column">
                    <mwc-select outlined id="documentType" label="Tipo Documento" validationMessage="Tipo Documento Obligatorio">
                      <mwc-list-item value="dni">DNI</mwc-list-item>
                      <mwc-list-item value="cuit">CUIT</mwc-list-item>
                    </mwc-select>
                  </div>
                  <div class="column">
                    <mwc-textfield outlined id="document" label="Documento" required validationMessage="Documento inválido"
                      type="text" pattern="[0-9]+" value="${this.document}">
                    </mwc-textfield>
                  </div>
                </div>
              
                <div class="row">
                  <div class="double-column">
                    <mwc-textfield outlined id="address" label="Dirección" required validationMessage="Dirección inválida" type="text"
                      value="${this.address}">
                    </mwc-textfield>
                  </div>
                </div>
              
                <div class="row">
                  <div class="double-column">
                    <mwc-textfield outlined id="email" label="Email" required validationMessage="Email inválido" type="email"
                      value="${this.email}">
                    </mwc-textfield>
                  </div>
                </div>
              
                <div class="row">
                  <div class="double-column">
                    <mwc-textfield outlined label="Contraseña" id="password" required validationMessage="Contraseña inválida"
                      type="password" value="${this.password}">
                    </mwc-textfield>
                  </div>
                </div>
              
                <div class="row">
                  <div class="double-column">
                    <a class="btn btn-primary btn-large btn-block" @click="${this.register}">Registrarme</a>
                  </div>
                </div>
              
                <br>
              
                <div class="row">
                  <div class="double-column">
                    <a class="btn btn-primary btn-large btn-block" @click="${this.closeRegisterDialog}">Salir</a>
                  </div>
                </div>
              </div>
              
              <mwc-snackbar id="snackMessage"></mwc-snackbar>
    `;
  }

  async register(e) {
    const firstName = this.getFieldById('firstName');
    const lastName = this.getFieldById('lastName');
    const document = this.getFieldById('document');
    const documentType = this.getFieldById('documentType');
    const email = this.getFieldById('email');
    const password = this.getFieldById('password');
    const address = this.getFieldById('address');

    if (
      firstName.checkValidity() &&
      lastName.checkValidity() &&
      document.checkValidity() &&
      documentType.checkValidity() &&
      email.checkValidity() &&
      password.checkValidity() &&
      address.checkValidity()
    ) {
      const data = {
        name: {
          firstName: firstName.value,
          lastName: lastName.value,
        },
        document: document.value,
        documentType: documentType.value,
        email: email.value,
        password: password.value,
        address: address.value,
      };

      await fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log('Error:', err))
        .then((response) => {
          if (response.ok) {
            this.idUser = response.user;
            saveToken(response.token);
            this.registerOk();
          } else {
            this.throwError(response.error);
          }
        });
    } else {
      firstName.reportValidity();
      lastName.reportValidity();
      document.reportValidity();
      documentType.reportValidity();
      email.reportValidity();
      password.reportValidity();
      address.reportValidity();
    }
  }

  registerOk() {
    const message = {
      idUser: this.idUser,
    };
    this.triggerEvent(message, 'register');
  }

  triggerEvent(message, event) {
    const eventToDispatch = new CustomEvent(event, {
      detail: {
        message,
      },
    });
    this.dispatchEvent(eventToDispatch);
  }

  closeRegisterDialog() {
    this.triggerEvent({}, 'closeRegisterDialog');
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

customElements.define('register-view', RegisterView);
