import {html} from 'lit-element';
import {PageViewElement} from './page-view-element';
import {cotizacionesUrl} from '../helpers/routes';
import {tableStyles} from '../css/tableStyles';
import {getToken} from '../helpers/token';
import '@material/mwc-circular-progress';
import {convertToPesos} from '../helpers/currencyConverter';
import {globalStyles} from '../css/globalStyles'

class CotizacionesView extends PageViewElement {
  static get styles() {
    return [globalStyles, tableStyles];
  }

  static get properties() {
    return {
      cotizaciones: {type: Array},
      showProgress: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.cotizaciones = [];
    this.showProgress = true;
  }

  firstUpdated() {
    this.getCotizaciones();
  }

  render() {
    return html`
      <div class="main">
        <h1>Cotizaciones</h1>

        <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Compra</th>
            <th>Venta</th>
            <th>Fecha</th>
          </tr>
        </thead>

          ${this.showProgress
            ? html`
                <mwc-circular-progress indeterminate></mwc-circular-progress>
              `
            : ``}
            <tbody>
          ${this.cotizaciones.map(
            (cotizacion) =>
              html`
                <tr>
                  <td>${cotizacion.nombre ? cotizacion.nombre : '-'}</td>
                  <td>
                    ${cotizacion.compra
                      ? convertToPesos(cotizacion.compra)
                      : '-'}
                  </td>
                  <td>
                    ${cotizacion.venta ? convertToPesos(cotizacion.venta) : '-'}
                  </td>
                  <td>${cotizacion.fecha ? cotizacion.fecha : '-'}</td>
                </tr>
              `
          )}
          </tbody>
        </table>
      </div>
    `;
  }

  async getCotizaciones() {
    const token = getToken();
    await fetch(cotizacionesUrl, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'auth-token': token},
    })
      .then((res) => res.json())
      .catch((err) => console.log('Error:', err))
      .then((response) => {
        if (response.ok) {
          this.cotizaciones = response.quotes;
          this.showProgress = false;
        } else {
          console.log(response.error);
        }
      });
  }
}

customElements.define('cotizaciones-view', CotizacionesView);
