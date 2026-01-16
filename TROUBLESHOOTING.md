# Troubleshooting: Emails Not Appearing in Google Sheet

If emails show success but don't appear in the Google Sheet, follow these steps:

## Step 1: Verify Google Apps Script is Deployed

1. Go to [Google Apps Script](https://script.google.com/)
2. Open your project
3. Click **Deploy** > **Manage deployments**
4. Make sure you have an active deployment
5. If you updated the code, click **Edit** (✏️) and create a **New version**, then **Deploy**

## Step 2: Check Script Execution Logs

1. In Google Apps Script, click **Executions** (clock icon) in the left sidebar
2. Look for recent executions
3. Click on any execution to see logs
4. Check for errors - they will show what went wrong

## Step 3: Verify Sheet Permissions

1. Open your Google Sheet
2. Make sure the Google Apps Script has permission to edit it
3. The script runs as "Me" (your account), so you need edit access to the sheet

## Step 4: Test the Script Directly

1. In Google Apps Script, click the function dropdown
2. Select `doPost` or create a test function
3. Run it to see if there are any errors

## Step 5: Check Sheet ID

1. Verify the Sheet ID in `google-apps-script.js` matches your actual sheet
2. Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Make sure it's the correct ID: `1echBcUzY1yNofkiM-SxZARFUthmq_LNJt6hmkrMyous`

## Step 6: Check Browser Console

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Submit the form again
4. Look for any error messages
5. Check Network tab to see if the request is being sent

## Common Issues:

### Issue: "Script function not found"
- **Solution**: Make sure you saved and deployed the script

### Issue: "Access denied" or "Permission denied"
- **Solution**: 
  1. Make sure "Who has access" is set to "Anyone"
  2. Make sure you have edit access to the Google Sheet
  3. Re-authorize the script if prompted

### Issue: "Sheet not found"
- **Solution**: Double-check the Sheet ID is correct

### Issue: Script runs but no data appears
- **Solution**: 
  1. Check the Executions log for errors
  2. Make sure the sheet is not protected
  3. Try manually adding a row to verify the sheet works

## Quick Test

Run this test function in Google Apps Script to verify everything works:

```javascript
function testSheetConnection() {
  const SHEET_ID = '1echBcUzY1yNofkiM-SxZARFUthmq_LNJt6hmkrMyous';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  sheet.appendRow(['Test', new Date().toISOString()]);
  Logger.log('Test row added successfully');
}
```

If this works, the sheet connection is fine. If not, check permissions and Sheet ID.
