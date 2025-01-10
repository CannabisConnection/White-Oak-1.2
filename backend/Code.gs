// Add CORS headers
function setCorsHeaders(response) {
  return response
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doGet(e) {
  const response = ContentService.createTextOutput();
  setCorsHeaders(response);

  try {
    const action = e.parameter.action;
    const data = JSON.parse(e.parameter.data || '{}');
    
    switch (action) {
      case 'createOrder':
        return response
          .setContent(JSON.stringify(createOrder(data)))
          .setMimeType(ContentService.MimeType.JSON);
      case 'getOrders':
        return response
          .setContent(JSON.stringify(getOrders(data.businessId)))
          .setMimeType(ContentService.MimeType.JSON);
      default:
        return response
          .setContent(JSON.stringify({
            success: false,
            error: 'Invalid action'
          }))
          .setMimeType(ContentService.MimeType.JSON);
    }
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
