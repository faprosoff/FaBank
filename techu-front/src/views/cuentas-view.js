import {html} from 'lit-element';
import {PageViewElement} from './page-view-element';
import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import {getToken} from '../helpers/token';
import {accountsUrl, movementsUrl, contactsUrl} from '../helpers/routes';
import {tableStyles} from '../css/tableStyles';
import {dateFormat, locale} from '../helpers/dateFormat';
import moment from 'moment';
import {convertToPesos} from '../helpers/currencyConverter';
import {globalStyles} from '../css/globalStyles';

class CuentasView extends PageViewElement {
  static get styles() {
    return [globalStyles, tableStyles];
  }

  static get properties() {
    return {
      // ACCOUNTS PROPERTIES
      accounts: {type: Array},
      subsidiary: {type: Number},
      alias: {type: String},
      editAlias: {type: String},
      editId: {type: String},
      showAccounts: {type: Boolean},
      // MOVEMENTS PROPERTIES
      accounts: {type: Array},
      contacts: {type: Array},
      description: {type: String},
      amount: {type: Number},
      cbuMovement: {type: String},
      aliasMovement: {type: String},
      accountSelected: {type: String},
    };
  }

  constructor() {
    super();
    // ACCOUNTS PROPERTIES
    this.accounts = [];
    this.subsidiary = '';
    this.alias = '';
    this.editAlias = '';
    this.editId = '';
    this.showAccounts = true;
    // MOVEMENTS PROPERTIES
    this.movements = [];
    this.contacts = [];
    this.description = '';
    this.amount = '';
    this.cbuMovement = '';
    this.aliasMovement = '';
    this.accountSelected = '';
  }

  firstUpdated() {
    this.getAccounts();
    this.getContacts();
  }

  render() {
    return html`
                  <div class="main">
      ${
        this.showAccounts
          ? html`
                <h1>Cuentas</h1>
                <!-- DIALOG CREAR CUENTA -->
                <mwc-dialog id="dialogCreateAccount" heading="Crear cuenta">
                <br>
                  <mwc-textfield
                    outlined
                    id="subsidiary"
                    label="Sucursal"
                    required
                    validationMessage="Sucursal inválida"
                    type="text"
                    value="${this.subsidiary}"
                  ></mwc-textfield>

                  <mwc-textfield
                    outlined
                    id="alias"
                    label="Alias"
                    required
                    validationMessage="Alias inválido"
                    type="text"
                    value="${this.alias}"
                  ></mwc-textfield>

                  <mwc-button raised label="Crear" @click="${this.createAccount}"></mwc-button>
                  <mwc-button class="closeButton" raised label="Cerrar" @click="${this.closeDialogCreateAccount}"></mwc-button>
                </mwc-dialog>

                <!-- LISTADO DE CUENTAS -->
                ${this.accounts.length > 0
                  ? html`
                <table class="table">
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Balance</th>
                    <th>Sucursal</th>
                    <th>Alias</th>
                    <th>CBU</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.accounts.map(
                    (account) =>
                      html`
                      
                        <tr>
                          <td>${account.number ? account.number : '-'}</td>
                          <td>
                            ${account.balance
                              ? convertToPesos(account.balance)
                              : 0}
                          </td>
                          <td>
                            ${account.subsidiary ? account.subsidiary : '-'}
                          </td>
                          <td>${account.alias ? account.alias : '-'}</td>
                          <td>${account.cbu ? account.cbu : '-'}</td>
                          <td>
                            ${account.created
                              ? moment(account.created)
                                  .locale(locale)
                                  .format(dateFormat)
                              : '-'}
                          </td>
                          <td>

                            <mwc-button class="primaryButton" raised label="Ver movimientos" @click="${(e) => this.getMovements(account._id)}"></mwc-button>
                            <mwc-button class="secondaryButton" raised label="Editar" @click="${(e) => this.openDialogEditAccount(account._id)}"></mwc-button>
                            <mwc-button class="deleteButton" raised label="Borrar" @click="${(e) => this.deleteAccount(account._id)}"></mwc-button>

                            <mwc-dialog id="dialogEditAccount" heading="Editar alias">
                            <br>
                              <mwc-textfield
                                outlined
                                id="editAlias"
                                label="Alias"
                                required
                                validationMessage="Alias inválido"
                                type="text"
                                value="${this.editAlias}">
                              </mwc-textfield>

                              <br>

                              <mwc-button class="secondaryButton" raised label="Editar" @click="${this.editAccount}"></mwc-button>
                              <mwc-button class="closeButton" raised label="Cerrar" @click="${this.closeDialogEditAccount}"></mwc-button>
                            </mwc-dialog>
                          </td>
                        </tr>
                      `
                  )}
                  </tbody>
                </table>
                ` : html`<h2>No tiene cuentas</h2>`}

                <!-- BOTÓN QUE ABRE EL DIALOG DE CREAR CUENTA -->
                <br>
                <br>
                <mwc-button raised label="Crear cuenta" @click="${this.openDialogCreateAccount}"></mwc-button>
              </div>
            `
          : html`
              <h1>Movimientos</h1>
              <!-- DIALOG CREAR MOVIMIENTOS -->
              <mwc-dialog id="dialogCreateMovement" heading="Transferir">
              <br>
              <mwc-select outlined id="contact" label="Contacto">
                  ${this.contacts.map(
                    (contact) =>
                      html`
                        <mwc-list-item value="${contact.alias}"
                          >${contact.referenceName}</mwc-list-item
                        >
                      `
                  )}
                </mwc-select>

                <mwc-textfield
                  outlined
                  id="amount"
                  label="Monto"
                  required
                  validationMessage="Monto inválido"
                  type="text"
                  value="${this.amount}"
                ></mwc-textfield>

                <mwc-textfield
                  outlined
                  id="cbuMovement"
                  label="CBU"
                  validationMessage="CBU inválido"
                  type="text"
                  value="${this.cbuMovement}"
                ></mwc-textfield>

                <mwc-textfield
                  outlined
                  id="aliasMovement"
                  label="Alias"
                  validationMessage="Alias inválido"
                  type="text"
                  value="${this.aliasMovement}"
                ></mwc-textfield>

                <mwc-textfield
                  outlined
                  id="description"
                  label="Descripción"
                  required
                  validationMessage="Descripción inválida"
                  type="text"
                  value="${this.description}"
                ></mwc-textfield>

                <br>
                <br>
                <mwc-button raised label="Crear" @click="${this.createMovement}"></mwc-button>
                <mwc-button class="closeButton" raised label="Cerrar" @click="${this.closeDialogCreateMovement}"></mwc-button>              
              </mwc-dialog>

              <!-- LISTADO DE MOVIMIENTOS -->
              ${this.movements.length > 0
                ? html`
              <table class="table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Balance</th>
                  <th>Usuario (Origen)</th>
                  <th>CBU (Origen)</th>
                  <th>Alias (Origen)</th>
                  <th>Usuario (Destino)</th>
                  <th>CBU (Destino)</th>
                  <th>Alias (Destino)</th>
                  <th>Fecha</th>
                </tr>
                </thead>
                <tbody>
                ${this.movements.map(
                  (movement) =>
                    html`
                      <tr class="${movement.amount > 0 ? 'positive' : 'negative'}">
                        <td>
                          ${movement.description ? movement.description : '-'}
                        </td>
                        <td>
                          ${movement.amount
                            ? convertToPesos(movement.amount)
                            : '-'}
                        </td>
                        <td>
                          ${movement.balance
                            ? convertToPesos(movement.balance)
                            : '$0.00'}
                        </td>
                        <td>
                          ${movement.origin.user ? movement.origin.user : '-'}
                        </td>
                        <td>
                          ${movement.origin.cbu ? movement.origin.cbu : '-'}
                        </td>
                        <td>
                          ${movement.origin.alias ? movement.origin.alias : '-'}
                        </td>
                        <td>
                          ${movement.destination.user
                            ? movement.destination.user
                            : '-'}
                        </td>
                        <td>
                          ${movement.destination.cbu
                            ? movement.destination.cbu
                            : '-'}
                        </td>
                        <td>
                          ${movement.destination.alias
                            ? movement.destination.alias
                            : '-'}
                        </td>
                        <td>
                          ${movement.created
                            ? moment(movement.created)
                                .locale(locale)
                                .format(dateFormat)
                            : '-'}
                        </td>
                      </tr>
                    `
                )}
                </tbody>
              </table>
              ` : html`<h2>No tiene movimientos</h2>`}
              </div>
              <!-- BOTÓN QUE ABRE EL DIALOG DE CREAR MOVIMIENTO -->
              <br>
              <br>
              <mwc-button raised label="Transferir" @click="${this.openDialogCreateMovement}"></mwc-button>
              <mwc-button class="closeButton" raised label="Atrás" @click="${this.hideMovements}"></mwc-button>
            `
      }

      <mwc-snackbar id="snackMessage"></mwc-snackbar>
      </div>
    `;
  }

  // MOVEMENTS METHODS

  // GET MOVEMENTS
  async getMovements(accountId) {
    this.accountSelected = accountId;
    const token = getToken();

    await fetch(accountsUrl + '/' + accountId, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'auth-token': token},
    })
      .then((res) => res.json())
      .catch((err) => console.log('Error:', err))
      .then((response) => {
        if (response.ok) {
          this.movements = response.account.movements;
          this.showAccounts = false;
          this.getContacts();
        } else {
          this.showMessage(response.error);
        }
      });
  }

  // CREATE MOVEMENT
  async createMovement() {
    let description = this.getFieldById('description');
    let amount = this.getFieldById('amount');
    let cbuMovement = this.getFieldById('cbuMovement');
    let aliasMovement = this.getFieldById('aliasMovement');
    let contactAlias = this.getFieldById('contact');

    if (description.checkValidity() && amount.checkValidity()) {
      let data = {};
      cbuMovement = cbuMovement.value;
      aliasMovement = aliasMovement.value;
      contactAlias = contactAlias.value;

      if (contactAlias.length > 0) {
        aliasMovement = contactAlias;
      }

      if (aliasMovement.length > 0) {
        data = {
          description: description.value,
          amount: amount.value,
          destination: {
            alias: aliasMovement,
          },
        };
      } else if (cbuMovement.length > 0) {
        data = {
          description: description.value,
          amount: amount.value,
          destination: {
            cbu: cbuMovement,
          },
        };
      }

      const token = getToken();
      const accountId = this.accountSelected;
      await fetch(accountsUrl + '/' + accountId + movementsUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'auth-token': token},
      })
        .then((res) => res.json())
        .catch((err) => console.log('Error:', err))
        .then((response) => {
          if (response.ok) {
            this.showMessage('El movimiento ha sido creado');
          } else {
            this.showMessage(response.error);
          }
          this.getMovements(accountId);
          this.closeDialogCreateMovement();
          this.clearMovement();
          this.getAccounts();
        });
    } else {
      description.reportValidity();
      amount.reportValidity();
    }
  }

  hideMovements() {
    this.showAccounts = true;
    this.getAccounts();
  }

  openDialogCreateMovement() {
    this.getFieldById('dialogCreateMovement').show();
  }

  closeDialogCreateMovement() {
    this.getFieldById('dialogCreateMovement').close();
  }

  clearMovement() {
    this.getFieldById('cbuMovement').value = '';
    this.getFieldById('aliasMovement').value = '';
  }

  // ACCOUNTS METHODS

  // CREATE ACCOUNT
  async createAccount() {
    let subsidiary = this.getFieldById('subsidiary');
    let alias = this.getFieldById('alias');

    if (subsidiary.checkValidity() && alias.checkValidity()) {
      const data = {subsidiary: subsidiary.value, alias: alias.value};
      const token = getToken();

      await fetch(accountsUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'auth-token': token},
      })
        .then((res) => res.json())
        .catch((err) => console.log('Error:', err))
        .then((response) => {
          if (response.ok) {
            this.showMessage('La cuenta ha sido creada');
            this.getAccounts();
            this.closeDialogCreateAccount();
            this.clearAccount();
          } else {
            this.showMessage(response.error);
          }
        });
    } else {
      subsidiary.reportValidity();
      alias.reportValidity();
    }
  }

  // DELETE ACCOUNT
  async deleteAccount(accountId) {
    const token = getToken();
    const url = accountsUrl + '/' + accountId;

    const data = {active: false};
    await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json', 'auth-token': token},
    })
      .then((res) => res.json())
      .catch((err) => console.log('Error:', err))
      .then((response) => {
        if (response.ok) {
          this.getAccounts();
        } else {
          this.showMessage(response.error);
        }
      });
  }

  // EDIT ACCOUNT
  async editAccount() {
    const token = getToken();

    const url = accountsUrl + '/' + this.editId;
    let editAlias = this.getFieldById('editAlias');
    if (editAlias.checkValidity()) {
      const data = {active: true, alias: editAlias.value};
      await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'auth-token': token},
      })
        .then((res) => res.json())
        .catch((err) => console.log('Error:', err))
        .then((response) => {
          if (response.ok) {
            this.getAccounts();
            this.closeDialogEditAccount();
            this.clear();
          } else {
            this.showMessage(response.error);
          }
        });
    } else {
      editAlias.reportValidity();
    }
  }

  // GET ACCOUNTS
  async getAccounts() {
    const token = getToken();

    await fetch(accountsUrl, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'auth-token': token},
    })
      .then((res) => res.json())
      .catch((err) => console.log('Error:', err))
      .then((response) => {
        if (response.ok) {
          this.accounts = response.accounts;
        } else {
          this.showMessage(response.error);
        }
      });
  }

  // GET CONTACTS
  async getContacts() {
    const token = getToken();
    await fetch(contactsUrl, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'auth-token': token},
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

  openDialogCreateAccount() {
    this.getFieldById('dialogCreateAccount').show();
  }

  closeDialogCreateAccount() {
    this.getFieldById('dialogCreateAccount').close();
  }

  openDialogEditAccount(accountId) {
    this.editId = accountId;
    this.getFieldById('dialogEditAccount').show();
  }

  closeDialogEditAccount() {
    this.getFieldById('dialogEditAccount').close();
  }

  clearAccount() {
    this.getFieldById('subsidiary').value = '';
    this.getFieldById('alias').value = '';
    this.getFieldById('editAlias').value = '';
  }

  // UTILS
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

customElements.define('cuentas-view', CuentasView);
