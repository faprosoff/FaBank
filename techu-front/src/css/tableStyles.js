import { css } from 'lit-element';

export const tableStyles = css`

* {
  font-family: sans-serif; /* Change your font family */
}

.table {
  border-collapse: collapse;
  margin-left: auto; 
  margin-right: auto;
  font-size: 1.2em;
  min-width: 600px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.table thead tr {
  background-color: #2b4680;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.table th,
.table td {
  padding: 12px 15px;
}

.table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
  border-bottom: 2px solid #2b4680;
}

.table tbody tr.positive {
  color: #009879;
}

.table tbody tr.negative {
  color: #fd5353;
}

`;
