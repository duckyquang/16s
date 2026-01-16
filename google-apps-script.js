/**
 * Google Apps Script for 16s Waitlist
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Paste this code into the editor
 * 4. Replace 'YOUR_SHEET_ID' with your Google Sheet ID
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Click Deploy and copy the Web App URL
 * 10. Update the URL in script.js
 */

function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('Received POST request: ' + JSON.stringify(e));
    
    // Parse the request data - handle form data
    const email = e.parameter ? e.parameter.email : null;
    
    Logger.log('Extracted email: ' + email);
    
    if (!email) {
      Logger.log('Error: Email is missing');
      return HtmlService.createHtmlOutput('<html><body><script>window.top.postMessage({success: false, message: "Email is required"}, "*");</script></body></html>')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
    
    const timestamp = new Date().toISOString();
    
    // Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
    // You can find it in the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
    const SHEET_ID = '1echBcUzY1yNofkiM-SxZARFUthmq_LNJt6hmkrMyous';
    
    try {
      const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      const sheet = spreadsheet.getActiveSheet();
      
      Logger.log('Opened sheet successfully');
      
      // If the sheet is empty, add headers
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Email', 'Timestamp']);
        Logger.log('Added headers to sheet');
      }
      
      // Check if email already exists (only if there are rows)
      if (sheet.getLastRow() > 1) {
        const emails = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();
        if (emails.includes(email)) {
          Logger.log('Email already exists: ' + email);
          return HtmlService.createHtmlOutput('<html><body><script>window.top.postMessage({success: false, message: "Email already exists"}, "*");</script></body></html>')
            .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
        }
      }
      
      // Add the email and timestamp to the sheet
      sheet.appendRow([email, timestamp]);
      Logger.log('Successfully added email to sheet: ' + email);
      
      // Return HTML that posts message to parent window
      return HtmlService.createHtmlOutput('<html><body><script>window.top.postMessage({success: true, message: "Email added successfully"}, "*");</script></body></html>')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
        
    } catch (sheetError) {
      Logger.log('Sheet error: ' + sheetError.toString());
      return HtmlService.createHtmlOutput('<html><body><script>window.top.postMessage({success: false, message: "Sheet error: ' + sheetError.toString() + '"}, "*");</script></body></html>')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
    
  } catch (error) {
    Logger.log('General error: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return HtmlService.createHtmlOutput('<html><body><script>window.top.postMessage({success: false, message: "' + error.toString().replace(/"/g, '\\"') + '"}, "*");</script></body></html>')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: '16s Waitlist API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
