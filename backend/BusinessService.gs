const BusinessService = {
  addOrUpdateBusiness: function(businessData) {
    validateRequiredFields(businessData, [
      'businessName',
      'address',
      'phone',
      'dcpLicense',
      'email'
    ]);
    
    const sheet = getSheet(CONFIG.SHEET_NAMES.PARTNERS);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const emailCol = headers.indexOf('email');
    const existingRow = data.findIndex(row => row[emailCol] === businessData.email);
    
    const rowData = headers.map(header => businessData[header] || '');
    
    if (existingRow > 0) {
      sheet.getRange(existingRow + 1, 1, 1, headers.length).setValues([rowData]);
      return { success: true, message: 'Business updated successfully' };
    } else {
      sheet.appendRow(rowData);
      return { success: true, message: 'Business added successfully' };
    }
  }
};
