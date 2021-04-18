import {css} from 'lit-element';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  .main {
    line-height: 0.5;
    padding: 10px 0px;
    text-align: center;
    min-height: 70vh;
    width: auto;
  }

  h1 {
    color: #111;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 40px;
    font-weight: bold;
    letter-spacing: -1px;
    line-height: 1;
    text-align: center;
  }

  h2 {
    color: #111;
    font-family: 'Open Sans', sans-serif;
    font-size: 30px;
    font-weight: 300;
    line-height: 10px;
    text-align: center;
  }

  mwc-button {
    --mdc-theme-primary: #294786;
    --mdc-theme-on-primary: white;
    --mdc-typography-font-family: 'Noto Sans TC', sans-serif;
  }

  .secondaryButton {
    --mdc-theme-primary: #4b7deb;
  }

  .deleteButton {
    --mdc-theme-primary: #fd5353;
  }

  .closeButton {
    --mdc-theme-primary: #b1b1b1;
  }

`;
