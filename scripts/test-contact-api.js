/**
 * Contact Form API Integration - Test Script
 * Run this script to test the contact form API
 * 
 * Usage: node scripts/test-contact-api.js
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

// Test data
const validData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "(647) 123-4567",
  subject: "General Inquiry",
  message: "I would like to get more information about your services and available vehicles."
};

const invalidData = {
  firstName: "J",
  lastName: "",
  email: "invalid-email",
  phone: "123",
  subject: "General Inquiry",
  message: "Hi"
};

async function testContactAPI(testName, data) {
  console.log(`\n🧪 Test: ${testName}`);
  console.log('─'.repeat(50));
  
  try {
    const response = await fetch(`${API_BASE_URL}/contact-enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(`Status: ${response.status}`);
    console.log(`Success: ${result.success}`);
    console.log(`Message: ${result.message}`);
    
    if (result.data) {
      console.log(`Enquiry ID: ${result.data.enquiryId}`);
    }
    
    if (result.errors) {
      console.log('Errors:');
      result.errors.forEach(err => {
        console.log(`  - ${err.path}: ${err.msg}`);
      });
    }

    return result;
  } catch (error) {
    console.error('❌ Network Error:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Contact Form API Test Suite');
  console.log('API URL:', API_BASE_URL);
  console.log('='.repeat(50));

  // Test 1: Valid submission
  await testContactAPI('Valid Submission', validData);

  // Test 2: Invalid submission
  await testContactAPI('Invalid Submission (Multiple Errors)', invalidData);

  // Test 3: Empty submission
  await testContactAPI('Empty Submission', {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  // Test 4: Invalid subject
  await testContactAPI('Invalid Subject', {
    ...validData,
    subject: "invalid subject"
  });

  console.log('\n' + '='.repeat(50));
  console.log('✅ All tests completed!');
}

// Run tests
runTests().catch(console.error);
