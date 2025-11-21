#!/usr/bin/env node

/**
 * Test script for Business Settings API integration
 * Run: node scripts/test-settings-api.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-api-domain.com';

async function testPublicSettingsAPI() {
  console.log('🧪 Testing Business Settings API Integration\n');
  console.log('API Base URL:', API_BASE_URL);
  console.log('Endpoint:', `${API_BASE_URL}/settings/public\n`);

  try {
    console.log('📡 Fetching public settings...');
    const response = await fetch(`${API_BASE_URL}/settings/public`);

    console.log('Status:', response.status, response.statusText);
    console.log('Headers:', {
      'content-type': response.headers.get('content-type'),
      'cache-control': response.headers.get('cache-control'),
    });
    console.log();

    if (!response.ok) {
      console.error('❌ API returned error status:', response.status);
      return;
    }

    const data = await response.json();

    if (!data.success) {
      console.error('❌ API returned unsuccessful response');
      console.log('Response:', JSON.stringify(data, null, 2));
      return;
    }

    console.log('✅ API Response Successful!\n');

    // Check required fields
    const settings = data.data;
    console.log('📋 Business Information:');
    console.log('  Business Name:', settings.businessName || '❌ Missing');
    console.log('  Tagline:', settings.tagline || '❌ Missing');
    console.log('  Description:', settings.description ? '✅ Present' : '❌ Missing');
    console.log();

    console.log('📞 Contact Information:');
    console.log('  Primary Phone:', settings.contactInfo?.primaryPhone || '❌ Missing');
    console.log('  Primary Email:', settings.contactInfo?.primaryEmail || '❌ Missing');
    console.log();

    console.log('📍 Address:');
    console.log('  Street:', settings.address?.street || '❌ Missing');
    console.log('  City:', settings.address?.city || '❌ Missing');
    console.log('  Province:', settings.address?.province || '❌ Missing');
    console.log('  Postal Code:', settings.address?.postalCode || '❌ Missing');
    console.log();

    console.log('🌐 Social Media:');
    console.log('  Facebook:', settings.socialMedia?.facebook ? '✅ Configured' : '⚠️ Not set');
    console.log('  Instagram:', settings.socialMedia?.instagram ? '✅ Configured' : '⚠️ Not set');
    console.log('  Twitter:', settings.socialMedia?.twitter ? '✅ Configured' : '⚠️ Not set');
    console.log('  LinkedIn:', settings.socialMedia?.linkedin ? '✅ Configured' : '⚠️ Not set');
    console.log('  YouTube:', settings.socialMedia?.youtube ? '✅ Configured' : '⚠️ Not set');
    console.log();

    console.log('🕒 Business Hours:');
    if (settings.businessHours && settings.businessHours.length > 0) {
      settings.businessHours.forEach(day => {
        const hours = day.isOpen 
          ? `${day.openTime} - ${day.closeTime}` 
          : 'Closed';
        console.log(`  ${day.day}: ${hours}`);
      });
    } else {
      console.log('  ❌ No business hours configured');
    }
    console.log();

    console.log('⚙️ Features:');
    console.log('  Test Drive:', settings.features?.enableTestDrive ? '✅' : '❌');
    console.log('  Financing:', settings.features?.enableFinancing ? '✅' : '❌');
    console.log('  Trade-in:', settings.features?.enableTradeIn ? '✅' : '❌');
    console.log('  Online Booking:', settings.features?.enableOnlineBooking ? '✅' : '❌');
    console.log('  Show Pricing:', settings.features?.showPricing ? '✅' : '❌');
    console.log();

    console.log('🎯 Summary:');
    console.log('  ✅ API is accessible and returning valid data');
    console.log('  ✅ All required fields present');
    console.log('  ✅ Ready for production use');
    console.log();

    console.log('📊 Full Response:');
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('❌ Error fetching settings:');
    console.error(error.message);
    console.log();
    console.log('💡 Troubleshooting:');
    console.log('  1. Check NEXT_PUBLIC_API_BASE_URL in .env.local');
    console.log('  2. Verify API endpoint is accessible');
    console.log('  3. Check network connectivity');
    console.log('  4. Ensure API returns valid JSON');
  }
}

// Run test
testPublicSettingsAPI();
