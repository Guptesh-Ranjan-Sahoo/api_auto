
import { auth } from '../support/apihelpers';
//case-1 happy flow Auth
describe('Auth API', () => {
  it('gets an authentication token', () => {
    auth().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.exist;
      Cypress.env('token', response.body.token);
       
    });
  });
});
