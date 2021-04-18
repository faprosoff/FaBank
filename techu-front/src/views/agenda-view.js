import { html } from 'lit-element';
import { PageViewElement } from './page-view-element';
import { contactsUrl } from '../helpers/routes';
import { getToken } from '../helpers/token';
import '@material/mwc-textfield';
import '@material/mwc-dialog';
import '@material/mwc-button';
import { tableStyles } from '../css/tableStyles';
import { globalStyles } from '../css/globalStyles';

class AgendaView extends PageViewElement {
  static get styles() {
    return [globalStyles, tableStyles];
  }

  static get properties() {
    return {
      contacts: { type: Array },
      referenceName: { type: String },
      fullName: { type: String },
      cbu: { type: String },
      alias: { type: String },
    };
  }

  constructor() {
    super();
    this.contacts = [];
    this.referenceName = '';
    this.fullName = '';
    this.cbu = '';
    this.alias = '';
  }

  firstUpdated() {
    this.getContacts();
  }

  render() {
    return html`
      <div class="main">
        <h1>Agenda de contactos</h1>
      
        <mwc-dialog id="dialogCreateContact" heading="Crear contacto">
        <br>
          <mwc-textfield outlined id="referenceName" label="Nombre de referencia" required
            validationMessage="Nombre de referencia inválido" type="text" value="${this.referenceName}"></mwc-textfield>
      
          <mwc-textfield outlined id="fullName" label="Nombre" required validationMessage="Nombre inválido" type="text"
            value="${this.fullName}"></mwc-textfield>
      
          <mwc-textfield outlined id="cbu" label="CBU" validationMessage="CBU inválido" type="text" value="${this.cbu}">
          </mwc-textfield>
      
          <mwc-textfield outlined id="alias" label="Alias" validationMessage="Alias inválido" type="text"
            value="${this.alias}"></mwc-textfield>
      
          <mwc-button class="primaryButton" raised label="Crear" @click="${this.createContact}"></mwc-button>
          <mwc-button class="closeButton" raised label="Cerrar" id="closeDialog" @click="${this.closeDialogCreateContact}"></mwc-button>

        </mwc-dialog>
      
        ${this.contacts.length > 0
          ? html`
        <table class="table">
          <thead>
            <tr>
              <th>Nombre de referencia</th>
              <th>Nombre</th>
              <th>Alias</th>
              <th>CBU</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${this.contacts.map(
                (contact) =>
                  html`
            <tr>
              <td>
                ${contact.referenceName ? contact.referenceName : '-'}
              </td>
              <td>${contact.fullName ? contact.fullName : '-'}</td>
              <td>${contact.alias ? contact.alias : '-'}</td>
              <td>${contact.cbu ? contact.cbu : '-'}</td>
              <td>
                <mwc-button class="deleteButton" raised label="Borrar" @click="${(e) => this.deleteContact(contact._id)}"></mwc-button>
              </td>
            </tr>
            `
              )}
          </tbody>
        </table>
        `
          : html`<h2>No tiene contactos</h2>`}
      
        <br>
        <br>
      
        <mwc-button raised label="Crear contacto" @click="${this.openDialogCreateContact}">
        </mwc-button>
      
        <mwc-snackbar id="snackMessage"></mwc-snackbar>
      </div>
    `;
  }

  async createContact() {
    let referenceName = this.getFieldById('referenceName');
    let fullName = this.getFieldById('fullName');
    let cbu = this.getFieldById('cbu');
    let alias = this.getFieldById('alias');

    if (cbu) {
      alias.required = false;
    } else {
      cbu.required = false;
    }

    if (
      referenceName.checkValidity() &&
      fullName.checkValidity() &&
      cbu.checkValidity() &&
      alias.checkValidity()
    ) {
      const data = {
        referenceName: referenceName.value,
        fullName: fullName.value,
      };
      cbu = cbu.value;
      alias = alias.value;

      if (cbu.length > 0) {
        data.cbu = cbu;
      }

      if (alias.length > 0) {
        data.alias = alias;
      }

      const token = getToken();
      await fetch(contactsUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'auth-token': token },
      })
        .then((res) => res.json())
        .catch((err) => console.log('Error:', err))
        .then((response) => {
          if (response.ok) {
            this.showMessage('El contacto ha sido creado');
            this.clear();
            this.getContacts();
            this.closeDialogCreateContact();
          } else {
            this.showMessage(response.error);
          }
        });
    } else {
      referenceName.reportValidity();
      fullName.reportValidity();
      cbu.reportValidity();
      alias.reportValidity();
    }
  }

  async getContacts() {
    const token = getToken();
    await fetch(contactsUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'auth-token': token },
    })
      .then((res) => res.json())
      .catch((err) => console.log('Error:', err))
      .then((response) => {
        if (response.ok) {
          this.contacts = response.contacts;
        } else {
          this.showMessage(response.error);
        }
      });
  }

  async deleteContact(contactId) {
    const token = getToken();
    const url = contactsUrl + '/' + contactId;
    await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'auth-token': token },
    })
      .then((res) => res.json())
      .catch((err) => console.log('Error:', err))
      .then((response) => {
        if (response.ok) {
          this.getContacts();
        } else {
          this.showMessage(response.error);
        }
      });
  }

  openDialogCreateContact() {
    this.getFieldById('dialogCreateContact').show();
  }

  closeDialogCreateContact() {
    this.getFieldById('dialogCreateContact').close();
  }

  clear() {
    this.getFieldById('referenceName').value = '';
    this.getFieldById('fullName').value = '';
    this.getFieldById('cbu').value = '';
    this.getFieldById('alias').value = '';
  }

  getFieldById(name) {
    return this.shadowRoot.getElementById(name);
  }

  showMessage(message) {
    const snack = this.getFieldById('snackMessage');
    snack.stacked = false;
    snack.leading = false;
    snack.timeoutMs = 5000;
    snack.labelText = message;
    snack.show();
  }
}

customElements.define('agenda-view', AgendaView);
