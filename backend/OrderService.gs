const OrderService = {
  createNewOrder: function(orderData) {
    const requiredFields = orderData.serviceTypes.includes('hourly-van-rental') 
      ? ['orderNumber', 'vanRentalDate', 'arrivalTime', 'departureTime']
      : [
          'orderNumber',
          'serviceDate',
          'manifestNumber',
          'boxCount',
          'boxLength',
          'boxWidth',
          'boxHeight',
          'inventoryValue'
        ];

    validateRequiredFields(orderData, requiredFields);
    
    const sheet = getSheet(CONFIG.SHEET_NAMES.NEW_ORDERS);
    const timestamp = new Date().toISOString();
    
    const rowData = {
      orderId: generateUniqueId(),
      ...orderData,
      status: CONFIG.ORDER_STATUS.NEW,
      createdAt: timestamp
    };
    
    sheet.appendRow(Object.values(rowData));
    
    return {
      success: true,
      orderId: rowData.orderId,
      message: 'Order created successfully'
    };
  },

  updateOrderStatus: function(orderId, newStatus) {
    if (!Object.values(CONFIG.ORDER_STATUS).includes(newStatus)) {
      throw new Error('Invalid status');
    }
    
    const sheet = getSheet(CONFIG.SHEET_NAMES.NEW_ORDERS);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const orderIdCol = headers.indexOf('orderId');
    const statusCol = headers.indexOf('status');
    const orderRow = data.findIndex(row => row[orderIdCol] === orderId);
    
    if (orderRow < 0) {
      throw new Error('Order not found');
    }
    
    sheet.getRange(orderRow + 1, statusCol + 1).setValue(newStatus);
    
    return { 
      success: true, 
      message: 'Order status updated successfully' 
    };
  }
};
