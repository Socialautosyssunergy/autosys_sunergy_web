# 📧 Resend Email - Quick Setup

## 🚀 Quick Start (3 Steps)

### 1. Get API Key from Resend.com
```
1. Sign up at https://resend.com
2. Go to API Keys → Create API Key
3. Copy the key (starts with re_...)
```

### 2. Add to .env.local
```bash
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 3. Restart Server
```bash
npm run dev
```

## 📮 Email Destination

**All form submissions automatically go to:**
- `Social@autosyssunergy.com`

## ✅ What Works Now

- ✅ Contact forms
- ✅ Product inquiry forms  
- ✅ Service inquiry forms
- ✅ All forms use Resend → Fallback to Zoho

## 🔍 Test It

1. Go to `/contact` page
2. Submit a form
3. Check console for: `✅ Resend team notification sent`
4. Check `Social@autosyssunergy.com` inbox

## 📝 For Production

1. Verify domain at Resend dashboard
2. Update `.env.local`:
   ```bash
   RESEND_FROM_EMAIL=noreply@autosyssunergy.com
   ```
3. Add env vars to hosting platform (Vercel, etc.)

## 📚 Full Documentation

See `RESEND_EMAIL_SETUP.md` for complete details.
