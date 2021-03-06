import {css} from 'lit-element';

export const loginStyles = css`
  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }
  body {
    font-family: Arial;
    background-color: #3498db;
    padding: 50px;
  }
  .login {
    margin: 20px auto;
    width: 300px;
  }
  .login-screen {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }

  .app-title {
    text-align: center;
    color: #777;
  }

  .login-form {
    text-align: center;
  }
  .control-group {
    margin-bottom: 10px;
  }

  input {
    text-align: center;
    background-color: #ecf0f1;
    border: 2px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 200;
    padding: 10px 0;
    width: 250px;
    transition: border 0.5s;
  }

  input:focus {
    border: 2px solid #3498db;
    box-shadow: none;
  }

  .btn {
    border: 2px solid transparent;
    background: #3498db;
    color: #ffffff;
    font-size: 16px;
    line-height: 25px;
    padding: 10px 0;
    text-decoration: none;
    text-shadow: none;
    border-radius: 3px;
    box-shadow: none;
    transition: 0.25s;
    display: block;
    width: 235px;
    margin: 0 auto;
  }

  .btn:hover {
    background-color: #2980b9;
  }

  .login-link {
    font-size: 12px;
    color: #444;
    display: block;
    margin-top: 12px;
  }
`;

export const cloudsStyles = css`
  /* CSS Document */
  /* ---------- FONTAWESOME ---------- */
  /* ---------- https://fortawesome.github.com/Font-Awesome/ ---------- */
  /* ---------- http://weloveiconfonts.com/ ---------- */
  @import url(http://weloveiconfonts.com/api/?family=fontawesome);
  /* ---------- ERIC MEYER'S RESET CSS ---------- */
  /* ---------- https://meyerweb.com/eric/tools/css/reset/ ---------- */
  @import url(https://meyerweb.com/eric/tools/css/reset/reset.css);
  /* ---------- FONTAWESOME ---------- */
  [class*='fontawesome-']:before {
    font-family: 'FontAwesome', sans-serif;
  }

  /* ---------- GENERAL ---------- */
  * {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    background: #2c3338;
    color: #606468;
    font: 87.5%/1.5em 'Open Sans', sans-serif;
    margin: 0;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  a {
    color: #eee;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  input {
    border: none;
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5em;
    padding: 0;
    -webkit-appearance: none;
  }

  p {
    line-height: 1.5em;
  }

  .clearfix {
    *zoom: 1;
  }
  .clearfix:before,
  .clearfix:after {
    content: ' ';
    display: table;
  }
  .clearfix:after {
    clear: both;
  }

  .container {
    left: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  /* ---------- LOGIN ---------- */
  #login {
    width: 280px;
  }

  #login form span {
    background-color: #363b41;
    border-radius: 3px 0px 0px 3px;
    color: #606468;
    display: block;
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 50px;
  }

  #login form input {
    height: 50px;
  }

  #login form input[type='text'],
  input[type='password'] {
    background-color: #3b4148;
    border-radius: 0px 3px 3px 0px;
    color: #606468;
    margin-bottom: 1em;
    padding: 0 16px;
    width: 230px;
  }

  #login form input[type='submit'] {
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    background-color: #ea4c88;
    color: #eee;
    font-weight: bold;
    margin-bottom: 2em;
    text-transform: uppercase;
    width: 280px;
  }

  #login form input[type='submit']:hover {
    background-color: #d44179;
  }

  #login > p {
    text-align: center;
  }

  #login > p span {
    padding-left: 5px;
  }

  /*Lets start with the cloud formation rather*/

  /*The container will also serve as the SKY*/

  * {
    margin: 0;
    padding: 0;
  }

  #clouds {
    padding: 50px 0;
    background: #c9dbe9;
    background: -webkit-linear-gradient(top, #c9dbe9 0%, #fff 100%);
    background: -linear-gradient(top, #c9dbe9 0%, #fff 100%);
    background: -moz-linear-gradient(top, #c9dbe9 0%, #fff 100%);
  }

  /*Time to finalise the cloud shape*/
  .cloud {
    width: 200px;
    height: 60px;
    background: #fff;

    border-radius: 200px;
    -moz-border-radius: 200px;
    -webkit-border-radius: 200px;

    position: relative;
  }

  .cloud:before,
  .cloud:after {
    content: '';
    position: absolute;
    background: #fff;
    width: 100px;
    height: 80px;
    position: absolute;
    top: -15px;
    left: 10px;

    border-radius: 100px;
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;

    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -moz-transform: rotate(30deg);
  }

  .cloud:after {
    width: 120px;
    height: 120px;
    top: -55px;
    left: auto;
    right: 15px;
  }

  /*Time to animate*/
  .x1 {
    -webkit-animation: moveclouds 15s linear infinite;
    -moz-animation: moveclouds 15s linear infinite;
    -o-animation: moveclouds 15s linear infinite;
  }

  /*variable speed, opacity, and position of clouds for realistic effect*/
  .x2 {
    left: 200px;

    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.6; /*opacity proportional to the size*/

    /*Speed will also be proportional to the size and opacity*/
    /*More the speed. Less the time in 's' = seconds*/
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
  }

  .x3 {
    left: -250px;
    top: -200px;

    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.8; /*opacity proportional to the size*/

    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
  }

  .x4 {
    left: 470px;
    top: -250px;

    -webkit-transform: scale(0.75);
    -moz-transform: scale(0.75);
    transform: scale(0.75);
    opacity: 0.75; /*opacity proportional to the size*/

    -webkit-animation: moveclouds 18s linear infinite;
    -moz-animation: moveclouds 18s linear infinite;
    -o-animation: moveclouds 18s linear infinite;
  }

  .x5 {
    left: -150px;
    top: -150px;

    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.8; /*opacity proportional to the size*/

    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
  }

  @-webkit-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  @-moz-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  @-o-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  .bottom {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    height: 100px;
    position: absolute;
  }
  .bottom h3 {
    color: white;
    font-size: 30px;
    font-weight: bold;
    margin-top: 45px;
    padding-bottom: 45px;
  }
  .blue {
    color: #09c;
  }
`;
