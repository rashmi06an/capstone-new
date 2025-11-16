// Quick test script to verify backend is working
const axios = require('axios');

const API_URL = 'http://localhost:5001';

async function testServer() {
  console.log('🧪 Testing Backend Server...\n');

  // Test 1: Health Check
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('   ✅ Health check passed:', healthResponse.data);
  } catch (error) {
    console.log('   ❌ Health check failed:', error.message);
    console.log('   💡 Make sure the backend server is running: npm run dev');
    process.exit(1);
  }

  // Test 2: Signup endpoint
  try {
    console.log('\n2. Testing signup endpoint...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'test123456',
      role: 'Freelancer'
    };
    
    const signupResponse = await axios.post(`${API_URL}/api/auth/signup`, testUser);
    console.log('   ✅ Signup endpoint working:', signupResponse.data.message);
  } catch (error) {
    console.log('   ❌ Signup endpoint failed:', error.response?.data?.error || error.message);
    if (error.response?.status === 500) {
      console.log('   💡 Check database connection and Prisma setup');
    }
  }

  // Test 3: Login endpoint
  try {
    console.log('\n3. Testing login endpoint...');
    const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    });
    console.log('   ⚠️  Login accepted (unexpected)');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('   ✅ Login endpoint working (correctly rejected invalid credentials)');
    } else {
      console.log('   ❌ Login endpoint error:', error.response?.data?.error || error.message);
    }
  }

  console.log('\n✅ Backend server tests completed!');
  console.log('💡 If all tests passed, your backend is ready to use.');
}

testServer().catch(console.error);

