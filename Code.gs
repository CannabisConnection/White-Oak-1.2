// Configuration
const CONFIG = {
  SHEET_NAMES: {
    ORDERS: 'Orders',
    BUSINESSES: 'Businesses'
  }
};

function doGet(e) {
  const response = ContentService.createTextOutput();
  
  // Add CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*')
         .setHeader('Access-Control-Allow-Methods', 'GET')
         .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    const { action, data } = e.parameter;
    if (!action) {
      throw new Error('Action parameter is required');
    }

    const parsedData = data ? JSON.parse(data) : {};
    let result;

    switch (action) {
      case 'createOrder':
        result = createOrder(parsedData);
        break;
      case 'getOrders':
        result = getOrders(parsedData.businessId);
        break;
      default:
        throw new Error('Invalid action');
    }

    return response
      .setContent(JSON.stringify({ success: true, ...result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return response
      .setContent(JSON.stringify({
        success: false,
        error: error.message || 'An unexpected error occurred'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Rest of the code remains the same...
