# Zoho Mail SMTP Setup Guide for Autosys Sunergy Contact Forms

## Overview
This guide helps you configure Zoho Mail SMTP for the contact form email notifications. The system will send emails to your team when customers submit inquiries and optional confirmation emails to customers.

## Zoho Mail Configuration Steps

### 1. Enable IMAP/SMTP Access
1. Log in to your Zoho Mail account at https://mail.zoho.com
2. Go to Settings > Mail > POP/IMAP Access
3. Enable IMAP Access (this also enables SMTP)

### 2. Generate App Password
1. Go to Zoho Account Security: https://accounts.zoho.com/home#security
2. Click on "App Passwords" 
3. Click "Generate App Password"
4. Select "Mail" as the application
5. Enter a name like "Autosys Website Contact Forms"
6. Copy the generated password (you won't see it again)

### 3. Environment Variables Setup
Create a `.env.local` file in your project root with:

```env
# Zoho Mail SMTP Configuration
ZOHO_EMAIL=sales@autosyssunergy.com
ZOHO_APP_PASSWORD=your_generated_app_password_here

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Test Configuration
1. Start your development server: `npm run dev`
2. Submit a test contact form
3. Check your email for notifications
4. Check browser console for email sending logs

## Email Flow

### Team Notifications
- **To:** sales@autosyssunergy.com, nitinrajput1903@gmail.com
- **From:** sales@autosyssunergy.com
- **Content:** Professional HTML email with all form details
- **Trigger:** Every contact form submission

### Customer Confirmations (Optional)
- **To:** Customer's email (if provided)
- **From:** sales@autosyssunergy.com
- **Content:** Thank you message with next steps
- **Trigger:** When customer provides email address

## SMTP Settings Used
- **Host:** smtp.zoho.com
- **Port:** 587
- **Security:** TLS/STARTTLS
- **Authentication:** Required

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify ZOHO_APP_PASSWORD is correct
   - Ensure IMAP/SMTP is enabled in Zoho Mail settings
   - Check if 2FA is enabled (app password required)

2. **Connection Timeout**
   - Verify network allows outbound SMTP connections
   - Check firewall settings for port 587
   - Test from different network if possible

3. **Form Saves but No Email**
   - Check server logs for email errors
   - Verify environment variables are loaded
   - Email failures don't block form submission (by design)

### Testing Commands

Test your Zoho SMTP configuration:

```bash
# Install testing tool
npm install -g nodemailer-smtp-test

# Test SMTP connection
nodemailer-smtp-test \
  --host smtp.zoho.com \
  --port 587 \
  --user sales@autosyssunergy.com \
  --pass your_app_password \
  --from sales@autosyssunergy.com \
  --to your_test_email@example.com
```

## Email Templates

### Team Notification Features
- ✅ Professional HTML design
- ✅ Mobile-responsive layout
- ✅ All form data clearly displayed
- ✅ Customer contact info highlighted
- ✅ System requirements included
- ✅ Source tracking information
- ✅ Branded with Autosys Sunergy colors

### Customer Confirmation Features
- ✅ Welcome message with branding
- ✅ Next steps clearly explained
- ✅ Contact information provided
- ✅ Company benefits highlighted
- ✅ Call-to-action buttons
- ✅ Social media links
- ✅ Professional footer

## Security Considerations

1. **App Passwords**: Use app-specific passwords, never your main account password
2. **Environment Variables**: Never commit `.env.local` to version control
3. **Rate Limiting**: Built-in protection against spam submissions
4. **Data Validation**: All inputs are validated before processing
5. **Error Handling**: Email failures don't expose system details

## Support

If you encounter issues:
1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test SMTP connection independently
4. Contact Zoho support for account-specific issues

For development support, check the console output when submitting forms - detailed logging is included for debugging.

## Production Deployment

Before going live:
1. ✅ Set up production environment variables
2. ✅ Test email delivery from production server
3. ✅ Verify database schema is deployed
4. ✅ Test rate limiting functionality
5. ✅ Confirm SSL/TLS certificates are valid

## Monitoring

Monitor email delivery by:
- Checking Supabase logs for form submissions
- Monitoring server logs for email errors
- Setting up email delivery notifications
- Regular testing of the contact forms
