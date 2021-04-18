const apiUrl = 'http://localhost:3000/api';

const loginUrl = apiUrl + '/auth/login';

const registerUrl = apiUrl + '/auth/register';

const userUrl = apiUrl + '/users';

const contactsUrl = apiUrl + '/contacts';

const accountsUrl = apiUrl + '/accounts';

const movementsUrl = '/movements';

const cotizacionesUrl = apiUrl + '/quotes';

module.exports = {
  loginUrl,
  registerUrl,
  userUrl,
  contactsUrl,
  accountsUrl,
  movementsUrl,
  cotizacionesUrl,
};
