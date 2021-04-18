import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-snackbar';
import { userUrl } from '../helpers/routes';
import { getToken } from '../helpers/token';
import { globalStyles } from '../css/globalStyles';

class PrivateHome extends PageViewElement {
  static get styles() {
    return [
      globalStyles,
      css`
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          max-width: 300px;
          margin: auto;
          text-align: center;
          font-family: arial;
        }

        .documentStyle {
          color: grey;
          font-size: 20px;
        }

        button {
          border: none;
          outline: 0;
          display: inline-block;
          padding: 8px;
          color: white;
          background-color: #000;
          text-align: center;
          cursor: pointer;
          width: 100%;
          font-size: 18px;
        }

        a {
          text-decoration: none;
          font-size: 22px;
          color: black;
        }
      `,
    ];
  }

  static get properties() {
    return {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      document: { type: String },
      documentType: { type: String },
      address: { type: String },
    };
  }

  constructor() {
    super();
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.document = 0;
    this.documentType = '';
    this.address = '';
  }

  firstUpdated() {
    this.getUser();
  }

  render() {
    return html`
      <div class="main">
        <h1>Mis datos</h1>
      
        <div class="card">
          <img src="./src/img/profilePicture.jpg" alt="User" style="width:80%" />
      
          <h2>${this.firstName + ' ' + this.lastName}</h2>
          <p class="documentStyle">${this.document}</p>
      
          <mwc-textfield outlined id="address" label="Dirección" required validationMessage="Dirección obligatoria"
            type="text" value="${this.address}"></mwc-textfield>
      
          <mwc-textfield outlined id="email" label="Email" required validationMessage="Email obligatorio" type="email"
            value="${this.email}"></mwc-textfield>
      
        </div>
      
        <br />
        <br />
      
        <mwc-button id="save" raised label="Actualizar" @click="${this.updateUser}"></mwc-button>
      
        <mwc-snackbar id="snackMessage"></mwc-snackbar>
      </div>
    `;
  }

  async getUser(e) {
    const token = getToken();
    await fetch(userUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'auth-token': token },
    })
      .then((res) => res.json())
      .catch((err) => console.log('Error', err))
      .then((response) => {
        if (response.ok) {
          this.firstName = response.user.name.firstName;
          this.lastName = response.user.name.lastName;
          this.document = response.user.document;
          this.email = response.user.email;
          this.address = response.user.address;
        } else {
          this.showMessage(response.error);
        }
      });
  }

  updateUser() {
    const email = this.getFieldById('email');
    const address = this.getFieldById('address');

    if (email.checkValidity() && address.checkValidity()) {
      const data = {
        email: email.value,
        address: address.value,
      };
      const token = getToken();
      fetch(userUrl, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'auth-token': token },
      })
        .then((res) => res.json())
        .catch((err) => console.log('Error', err))
        .then((response) => {
          if (response.ok) {
            this.showMessage('Tus datos han sido actualizados');
          } else {
            this.showMessage(response.error);
          }
        });
    }
  }

  showMessage(message) {
    const snack = this.getFieldById('snackMessage');
    snack.stacked = false;
    snack.leading = false;
    snack.timeoutMs = 5000;
    snack.labelText = message;
    snack.show();
  }

  getFieldById(name) {
    return this.shadowRoot.getElementById(name);
  }
}

customElements.define('private-home', PrivateHome);
