# Resend.com Email Integration Setup Guide

## 🚀 Overview

All form submissions on the website now automatically send emails through **Resend.com API** to `Social@autosyssunergy.com`. The system has a smart fallback mechanism that uses Zoho SMTP if Resend is not configured or fails.

## 📧 Email Flow

When a user submits any form (contact, product inquiry, service inquiry, etc.):

1. **Form Data is Saved** → Database (Supabase) - Always happens first
2. **Team Notification Email** → Sent to `Social@autosyssunergy.com` via Resend (or Zoho fallback)
3. **Customer Reply Email** → Sent to customer's email (if provided) via Resend (or Zoho fallback)

## ✅ What's Already Done

✓ **Resend Package** - Already installed (`resend: ^6.0.1`)
✓ **Resend Service** - Created at `/src/utils/resendService.ts`
✓ **API Integration** - Updated `/src/app/api/contact/route.ts` to use Resend
✓ **Email Templates** - Beautiful HTML templates for team & customer emails
✓ **Fallback System** - Auto-fallback to Zoho SMTP if Resend fails
✓ **All Forms Supported** - Works with all existing forms automatically

## 🔧 Setup Instructions

### Step 1: Get Your Resend API Key

1. Go to [Resend.com](https://resend.com)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **"Create API Key"**
5. Give it a name (e.g., "Autosys Sunergy Production")
6. Copy the API key (starts with `re_...`)

### Step 2: Verify Your Domain (Important!)

Before you can send emails from your domain, you need to verify it:

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `autosyssunergy.com`
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes to hours)

**DNS Records to Add** (example - Resend will provide exact values):
```
TXT record: resend._domainkey.autosyssunergy.com
CNAME record: resend.autosyssunergy.com
```

### Step 3: Add Environment Variables

Add the following to your `.env.local` file:

```bash
# Resend Email Service Configuration
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=noreply@autosyssunergy.com
```

**Important Notes:**
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- The `RESEND_FROM_EMAIL` should be from your verified domain (e.g., `noreply@autosyssunergy.com` or `contact@autosyssunergy.com`)
- Until domain is verified, you can use `onboarding@resend.dev` for testing

### Step 4: Restart Your Development Server

After adding the environment variables:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 5: Test the Integration

1. Go to your contact page: `http://localhost:3000/contact`
2. Fill out and submit the contact form
3. Check the console logs for:
   - `✅ Resend team notification sent successfully`
   - `✅ Resend customer reply sent to...`
4. Check `Social@autosyssunergy.com` inbox for the team notification email
5. Check customer's email for the confirmation/reply email

## 📝 Configuration Details

### Email Recipients

**Team Notification Emails are sent to:**
- Primary: `Social@autosyssunergy.com` (via Resend)

**Customer Reply Emails:**
- Sent to whatever email the customer provides in the form
- Reply-to address: `sales@autosyssunergy.com`

### Email Templates

**Team Notification Email includes:**
- Contact information (name, phone, email, company, location)
- Inquiry details (form type, customer type, subject)
- System requirements (monthly bill, business type, power consumption, etc.)
- Customer message
- Source information and timestamp
- Professional formatting with company branding

**Customer Reply Email includes:**
- Personalized greeting
- Confirmation that inquiry was received
- Next steps timeline (within 24 hours response)
- Contact information for immediate assistance
- Company benefits and features
- Call-to-action buttons
- Professional branding

## 🔄 Fallback System

The system has a smart fallback mechanism:

1. **Try Resend First** - Primary email provider
2. **Fallback to Zoho SMTP** - If Resend fails or is not configured
3. **Success Tracking** - Logs which provider was used

This ensures emails are always sent, even if one provider has issues.

## 🛠️ Testing with Development Email

Before domain verification, you can test with Resend's development email:

```bash
# In .env.local
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note:** Emails from `onboarding@resend.dev` can only be sent to the email address associated with your Resend account.

## 📊 Monitoring & Logs

All email sending is logged in the console:

```
✅ Contact form saved to database: abc-123-xyz
📧 Attempting to send team notification via Resend...
✅ Team notification email sent via resend: re_msg_123456
📧 Attempting to send customer reply to user@example.com via Resend...
✅ Customer reply email sent via resend: re_msg_789012
```

If Resend fails:
```
⚠️ Resend failed or not configured, falling back to Zoho SMTP...
✅ Team notification email sent via zoho: <message-id>
```

## 📋 Supported Forms

All these forms automatically use Resend:

- ✅ Contact Form (`/contact`)
- ✅ Homepage Contact Form
- ✅ Product Inquiry Forms
- ✅ Service Inquiry Forms
- ✅ Production Contact Form
- ✅ Any custom forms using `/api/contact` endpoint

## 🔐 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Different keys** for development and production
4. **Rotate API keys** periodically
5. **Monitor email logs** for suspicious activity

## 🐛 Troubleshooting

### Problem: "Resend API key not configured"

**Solution:** Make sure `RESEND_API_KEY` is set in `.env.local` and restart the dev server.

### Problem: "Email sending failed - Domain not verified"

**Solution:** Complete domain verification in Resend dashboard or use `onboarding@resend.dev` for testing.

### Problem: No emails received

**Check:**
1. Console logs for email sending status
2. Spam/junk folder
3. Resend dashboard → Logs for delivery status
4. Environment variables are correctly set
5. Development server was restarted after adding env vars

### Problem: Customer email not sent

**Check:**
1. Customer provided a valid email in the form
2. Email passes validation (format check)
3. Console logs for specific error messages

## 📈 Production Deployment

When deploying to production (Vercel, etc.):

1. Add environment variables in hosting platform:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`

2. Ensure domain is fully verified in Resend

3. Update `RESEND_FROM_EMAIL` to use your verified domain:
   ```
   RESEND_FROM_EMAIL=noreply@autosyssunergy.com
   ```

4. Monitor Resend dashboard for email delivery analytics

## 📞 Support

**Resend Support:**
- Documentation: https://resend.com/docs
- Support: support@resend.com
- Dashboard: https://resend.com/dashboard

**Developer Contact:**
For technical issues with the integration, check:
- `/src/utils/resendService.ts` - Resend email service
- `/src/app/api/contact/route.ts` - Contact API endpoint
- Console logs for detailed error messages

## 🎯 Next Steps

1. [ ] Get Resend API key
2. [ ] Verify domain in Resend dashboard
3. [ ] Add environment variables to `.env.local`
4. [ ] Test form submission
5. [ ] Verify emails are received at `Social@autosyssunergy.com`
6. [ ] Deploy to production with env vars

---

**Status:** ✅ Integration Complete - Waiting for API Key Configuration

**Last Updated:** November 4, 2025
