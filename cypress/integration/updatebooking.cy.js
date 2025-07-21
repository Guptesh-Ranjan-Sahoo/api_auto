import { auth, updateBooking } from '../support/apihelpers';


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


const updatedBooking = {
  firstname: 'Bob',
  lastname: 'Smith',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-12-01',
    checkout: '2025-12-10'
  },
  additionalneeds: 'Breakfast'
};

describe('Update Booking API', () => {
    //case-9 happy flow Update Booking
    
  it('updates the booking using fixture ID and token', () => {
 
    cy.fixture('bookingResponse.json').then(({ bookingid }) => {
        cy.log('Token:', Cypress.env('token'));

      updateBooking(bookingid, updatedBooking).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.firstname).to.eq('Bob');
      });
    });
  });

  //case-10 edge case: update non-existent booking
  it('cannot update non-existent booking', () => {
   
    updateBooking(999999, updatedBooking).then((res) => {
      expect(res.status).to.eq(405); // RESTful-Booker gives 405, not 404!
    });
  });

  //case-11 edge case: partial update with missing fields via PUT
  it('Edge case: partial update with missing fields via PUT', () => {
    const partialBooking = {
      firstname: 'PartialOnly'
      // Missing other fields — invalid for PUT in strict REST
    };

    cy.fixture('bookingResponse.json').then(({ bookingid }) => {
      updateBooking(bookingid, partialBooking).then((res) => {
        expect([400, 500]).to.include(res.status);
      });
    });
  });
});
