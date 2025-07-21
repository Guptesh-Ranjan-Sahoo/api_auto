import { getBooking } from '../support/apihelpers';

describe('Get Booking API', () => {
    //case-5 happy flow Get Booking
  it('retrieves the booking by ID from fixture', () => {
    cy.fixture('bookingResponse.json').then(({ bookingid, requestPayload,}) => {
      getBooking(bookingid).then((res) => {
        getBooking(bookingid).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.firstname).to.eq(requestPayload.firstname);
            expect(res.body.lastname).to.eq(requestPayload.lastname);
            expect(res.body.totalprice).to.eq(requestPayload.totalprice);
            expect(res.body.depositpaid).to.eq(requestPayload.depositpaid);
            expect(res.body.bookingdates.checkin).to.eq(requestPayload.bookingdates.checkin);
            expect(res.body.bookingdates.checkout).to.eq(requestPayload.bookingdates.checkout);
            expect(res.body.additionalneeds).to.eq(requestPayload.additionalneeds);
        });
      });
    });
  });

  //case-6 edge case: get booking with non-existent ID
  it('❌ fails to get booking with non-existent ID', () => {
    getBooking(999999999).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  //case-7 edge case: get booking with non-numeric ID
  it('❌ fails when passing non-numeric ID', () => {
    getBooking('abc').then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  //case-8 edge case: get booking with ID as 0{in bound but not valid}
  it('⚠️ edge case: booking ID as 0', () => {
    getBooking(0).then((res) => {
      expect([400, 404]).to.include(res.status);
    });
  });
});
