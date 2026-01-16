# Google Sheets API Setup Instructions

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "16s Waitlist" (or any name you prefer)
4. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` part

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script.js`
5. Replace `'YOUR_SHEET_ID'` with your actual Sheet ID (from Step 1)
6. Save the project (Ctrl+S or Cmd+S)
7. Name it "16s Waitlist Handler"

## Step 3: Deploy as Web App

1. Click "Deploy" > "New deployment"
2. Click the gear icon (⚙️) next to "Select type"
3. Choose "Web app"
4. Set the following:
   - **Description**: "16s Waitlist API"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click "Deploy"
6. **IMPORTANT**: Authorize the script when prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [Project Name] (unsafe)"
   - Click "Allow"
7. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/...`)

## Step 4: Update Your Website

1. Open `script.js`
2. Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';`
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'` with your Web App URL from Step 3
4. Save the file

## Step 5: Test

1. Open your website
2. Enter an email in the waitlist form
3. Submit the form
4. Check your Google Sheet - you should see the email and timestamp appear!

## Troubleshooting

- **"Script function not found"**: Make sure you saved the Apps Script project
- **"Access denied"**: Make sure "Who has access" is set to "Anyone"
- **"Sheet not found"**: Double-check your Sheet ID is correct
- **CORS errors**: Make sure you're using the Web App URL, not the script editor URL

## Security Note

The Web App URL will be visible in your JavaScript code. This is okay for a waitlist form, but if you need more security, consider:
- Adding rate limiting in the Apps Script
- Adding email validation
- Using a backend server as a proxy
