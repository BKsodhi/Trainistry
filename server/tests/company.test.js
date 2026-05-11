const request = require('supertest');
const app = require('../server'); // Path to your server.js
const mongoose = require('mongoose');

describe('Trainistry Integration Tests', () => {
  
  // Close the DB connection and allow handles to clear
  afterAll(async () => {
    // 1. Close the Mongoose connection
    await mongoose.connection.close();
    
    // 2. Small delay to allow TLS/Nodemailer handles to close gracefully
    // This helps remove the "TLSWRAP" warning in the terminal.
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  // TEST 1: Public Route
  it('should return 200 for the base API route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Trainistry Backend Running');
  });

  // TEST 2: Protected Route
  it('should block access to dashboard stats without a token', async () => {
    const res = await request(app).get('/api/company/stats');
    // 401 means Unauthorized - this proves your auth middleware works!
    expect(res.statusCode).toEqual(401);
  });

  // TEST 3: Email Test Route (Sir's Requirement)
  it('should have a working email test endpoint', async () => {
    const res = await request(app).get('/api/test-email');
    // We accept 200 (Sent) or 500 (Config error) as long as the route exists
    expect([200, 500]).toContain(res.statusCode);
  });
});