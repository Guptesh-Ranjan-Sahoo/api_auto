export function getBooking(id) {
    return cy.apiRequest('GET', `/booking/${id}`);
}

export function createBooking(booking) {
    return cy.apiRequest('POST', '/booking', booking);
}

export function updateBooking(id, booking) {
    return cy.apiRequest('PUT', `/booking/${id}`, booking);
}

export function deleteBooking(id) {
    return cy.apiRequest('DELETE', `/booking/${id}`);
}
export function getBookings() {
    return cy.apiRequest('GET', '/booking');
}

export function auth() {
    return cy.apiRequest('POST', '/auth', {
        username: 'admin',
        password: 'password123'
    });
}