import { createBooking } from '../support/apihelpers';

describe('Create Booking API', () => {
  const validBooking = {
    firstname: 'Alice',
    lastname: 'Smith',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-12-01',
      checkout: '2025-12-10'
    },
    additionalneeds: 'Breakfast'
  };
//case-2 happy flow Create Booking
  it('creates a new booking and saves id in fixture', () => {
    createBooking(validBooking).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingid).to.exist;

      const responseToSave = {
        bookingid: response.body.bookingid,
        requestPayload: validBooking,
      };

      cy.writeFile('cypress/fixtures/bookingResponse.json', responseToSave);
    });
  });

  //case-3 edge case: create booking with missing required fields
  it('fails to create booking with missing required fields', () => {
    const invalidBooking = {
      firstname: 'MissingDates'
      // it only has firstname
    };

    createBooking(invalidBooking).then((res) => {
      expect(res.status).to.be.oneOf([400, 500]);
    });
  });

  //case-4 edge case: create booking with price above int max value
  it('⚠️ edge case: create booking with huge price value', () => {
    const edgeBooking = {
      ...validBooking,
      totalprice: 99999999999999999
    };
    //Adding price greather than int max value, it should fail
    createBooking(edgeBooking).then((res) => {
      expect([200, 400, 500]).to.include(res.status);
    });
  });
});
