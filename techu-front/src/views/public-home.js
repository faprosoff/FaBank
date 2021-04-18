import {LitElement, html, css} from 'lit-element';
import {globalStyles} from '../css/globalStyles';

class PublicHome extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        h2 {
          margin: 0 0 45px;
        }
        
        .img {
          width: 25%;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="main">
        <img src="./src/img/logo_fabank.PNG" class="img" />

        <h1>¡Bienvenido!</h1>

        <h2>
          ¡Abrite una cuenta con nosotros <b>GRATIS</b> y recibirás asombrosos
          regalos!
        </h2>

        <h2>¡Primera cuenta recibe $30.000!</h2>
        <h2>¡Segunda cuenta recibe $15.000!</h2>
        <h2>¡Tercera cuenta recibe $10.000!</h2>
      </div>
    `;
  }
}

customElements.define('public-home', PublicHome);
