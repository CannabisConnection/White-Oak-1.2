const ReportService = {
  generateOrderReport: function(filters = {}) {
    const sheet = getSheet(CONFIG.SHEET_NAMES.NEWORDERS);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    let orders = data.slice(1).map(row => {
      const order = {};
      headers.forEach((header, index) => {
        order[header] = row[index];
      });
      return order;
    });
    
    if (filters.status) {
      orders = orders.filter(order => order.status === filters.status);
    }
    
    if (filters.dateRange) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      orders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    }
    
    if (filters.businessId) {
      orders = orders.filter(order => order.businessId === filters.businessId);
    }
    
    return {
      success: true,
      data: {
        totalOrders: orders.length,
        orders
      }
    };
  }
};
