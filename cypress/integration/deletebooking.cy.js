import { auth, deleteBooking } from '../support/apihelpers';

// PERFORM AUTH FIRST as it is required for delete booking ans env file isnt transferred to cypress.config.js
describe('Auth API', () => {
    it('gets an authentication token', () => {
      auth().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.exist;
        Cypress.env('token', response.body.token);
         
      });
    });
  });

describe('Delete Booking API', () => {
    //case-12 happy flow Delete Booking
    
  it('deletes booking by ID and valid token', () => {
    cy.fixture('bookingResponse.json').then(({ bookingid }) => {
      deleteBooking(bookingid).then((res) => {
        expect([200, 201, 204]).to.include(res.status);
      });
    });
  });

  //case-13 edge case: delete already deleted booking
  it('delete already deleted booking', () => {

    cy.fixture('bookingResponse.json').then(({ bookingid }) => {
      deleteBooking(bookingid).then(() => {
        deleteBooking(bookingid).then((res) => {
          expect(res.status).to.eq(405);
        });
      });
    });
  });
  //case-14 edge case: invalid ID type
  it('invalid ID type', () => {
    deleteBooking('abc').then((res) => {
        expect(res.status).to.be.oneOf([404, 405]);
    });
  });
});
