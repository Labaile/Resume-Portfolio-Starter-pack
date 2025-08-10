#!/usr/bin/env node

/**
 * Simple API Test Script
 * Run this to test if your backend API is working
 */

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Resume Portfolio API (PostgreSQL Backend)\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log('✅ Health Check: PASSED');
      console.log(`   Message: ${healthData.message}`);
      console.log(`   Environment: ${healthData.environment}\n`);
    } else {
      console.log('❌ Health Check: FAILED');
      console.log(`   Status: ${healthResponse.status}`);
      console.log(`   Error: ${healthData.message}\n`);
    }

    // Test 2: Contact Form Submission
    console.log('2️⃣ Testing Contact Form Submission...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'API Test Message',
      message: 'This is a test message to verify the PostgreSQL backend is working correctly.'
    };

    const contactResponse = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    const contactResult = await contactResponse.json();

    if (contactResponse.ok) {
      console.log('✅ Contact Submission: PASSED');
      console.log(`   Message ID: ${contactResult.data.id}`);
      console.log(`   Status: ${contactResult.data.status}\n`);
    } else {
      console.log('❌ Contact Submission: FAILED');
      console.log(`   Status: ${contactResponse.status}`);
      console.log(`   Error: ${contactResult.message}\n`);
    }

    // Test 3: Admin Authentication (Expected to fail without proper key)
    console.log('3️⃣ Testing Admin Authentication...');
    const adminResponse = await fetch(`${BASE_URL}/admin/contacts`, {
      headers: {
        'x-admin-key': 'wrong-key'
      }
    });

    if (adminResponse.status === 401) {
      console.log('✅ Admin Authentication: PASSED (Correctly rejected invalid key)');
    } else {
      console.log('❌ Admin Authentication: FAILED');
      console.log(`   Expected: 401 Unauthorized`);
      console.log(`   Got: ${adminResponse.status}`);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }

  console.log('\n📋 Test Summary:');
  console.log('   - Make sure PostgreSQL is running');
  console.log('   - Check that the backend server is started (npm run dev in backend/)');
  console.log('   - Verify your .env file has correct PostgreSQL credentials');
  console.log('   - Database "resume_portfolio" should be created automatically');
}

// Run tests
testAPI();
