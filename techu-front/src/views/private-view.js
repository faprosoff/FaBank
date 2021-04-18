import {LitElement, html, css} from 'lit-element'
import './private-home';
import './cuentas-view';
import './agenda-view';
import './cotizaciones-view';
import 'dile-tabs/dile-tabs';
import 'dile-pages/dile-pages';

class PrivateView extends LitElement {

    static get styles() {
        return css `
            :host {
                --dile-tab-background-color: transparent;
                --dile-tab-selected-background-color: transparent;
                --dile-tab-selected-text-color: #1020c0;
            }
        `;
    }

    static get properties() {
        return {
            selected: { type: String }
        };
    }

    constructor() {
        super();
        this.selected = "home";
    }

    render() {
        return html `
                <dile-tabs selected="${this.selected}" attrForSelected="name"
                    @dile-tabs-selected-changed="${this.selectedChanged}">
                        <dile-tab name="home">Home</dile-tab>
                        <dile-tab name="cuentas">Cuentas</dile-tab>
                        <dile-tab name="agenda">Agenda</dile-tab>
                        <dile-tab name="cotizaciones">Cotizaciones</dile-tab>
                </dile-tabs>

                <dile-pages selected="${this.selected}" attrForSelected="name">
                    <private-home
                        name="home"
                        ?active=${this.selected == 'home'}>
                    </private-home>
                    <cuentas-view
                        name="cuentas"
                        ?active=${this.selected == 'cuentas'}>
                    </cuentas-view>
                    <agenda-view
                        name="agenda"
                        ?active=${this.selected == 'agenda'}>
                    </agenda-view>
                    <cotizaciones-view
                        name="cotizaciones"
                        ?active=${this.selected == 'cotizaciones'}>
                    </cotizaciones-view>
                </dile-pages>
        `;
    }

    selectedChanged(e) {
        this.selected = e.detail;
    }

}

customElements.define('private-view', PrivateView);