import {css} from 'lit-element';

export const headerStyles = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  .header {
    overflow: hidden;
    background-color: #14213D;
    padding: 20px 10px;
  }

  .header a {
    float: left;
    color: #FFFFFF;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;
  }

  .header a.logo {
    font-size: 30px;
    font-weight: bold;
  }

  .header a:hover {
    background-color: #E5E5E5;
    color: black;
  }

  .header-right {
    float: right;
  }

  @media screen and (max-width: 500px) {
    .header a {
      float: none;
      display: block;
      text-align: left;
    }

    .header-right {
      float: none;
    }
  }
`;
