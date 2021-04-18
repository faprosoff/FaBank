import { LitElement, html, css } from 'lit-element';

export class FooterView extends LitElement {

    static get styles() {
        return css `
            #footer{
                padding: var(--spacing);
                background: #14213D;
                color: var(--base-color);
                text-align: center;
            }
        `
    }

    static get properties() {
        return {
            footer: { type: String }
        };
    }

    render() {
        return html `
            <div>
                <footer id="footer">
		            <p>${this.footer}</p>
                </footer>
            </div>
        `;
    }
}
customElements.define('footer-view', FooterView);