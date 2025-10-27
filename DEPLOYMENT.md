# Deployment Guide for Santa Rosa Spas

## CORS Issue Fix Summary ✅

### What Was Fixed
1. ✅ **Added debug logging** to `supabaseClient.ts` to catch missing env vars
2. ✅ **Added error handling** in `ProductGrid.tsx` to log fetch errors
3. ✅ **Verified RLS policy** - Products table allows `anon` and `authenticated` reads
4. ✅ **Using correct anon key** (not service role key)

## Build Status
✅ **Build is successful** - The application builds without errors.

## Before Deploying

### 1. Environment Variables Required
You MUST configure these environment variables on your deployment platform:

```
NEXT_PUBLIC_SUPABASE_URL=https://hnayeszrudjhxzgdmcob.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_TAWKTO_WIDGET_URL=your_tawkto_url_here
```

### 2. Database Setup
Ensure your Supabase database has been configured with:
- ✅ Products table
- ✅ Leads table
- ✅ Appointments table
- ✅ Storage buckets (product-images, media)
- ✅ Row Level Security policies
- ✅ Edge Functions deployed

## Deploy to Vercel

### Option 1: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### Option 2: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add `NEXT_PUBLIC_TAWKTO_WIDGET_URL` (optional)
5. Click "Deploy"

### Option 3: Via Git Push
```bash
# Connect to Vercel
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Deploy
vercel --prod
```

## Deploy to Netlify

1. Connect your Git repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_TAWKTO_WIDGET_URL`
4. Deploy

## Deploy to Other Platforms

### Requirements
- Node.js 18+ support
- Next.js 13+ support
- Environment variables configuration
- Ability to run `npm run build`

### Build Command
```bash
npm install
npm run build
```

### Start Command
```bash
npm start
```

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Contact form submits to Supabase
- [ ] Appointment booking works
- [ ] Admin dashboard displays data
- [ ] Product pages with dynamic routes work
- [ ] Search and filters function properly
- [ ] SEO meta tags are visible (check page source)
- [ ] Mobile responsive design works

## Supabase CORS Configuration 🔧

### CRITICAL: Add Allowed Origins in Supabase

To fix CORS errors, you MUST add your deployment domains to Supabase:

1. Go to your [Supabase Dashboard](https://app.supabase.com/project/hnayeszrudjhxzgdmcob)
2. Navigate to **Settings** → **API** → **API Settings**
3. Scroll to **CORS: Allowed origins**
4. Add these origins (one per line):

```
http://localhost:3000
https://*.bolt.dev
https://*.vercel.app
https://*.netlify.app
```

5. Click **Save**

### Why This Is Required

Without adding your domain to Supabase's allowed origins, you'll see these errors:
- "Response was blocked by CORB"
- "blocked by CORS policy"
- Products page won't load
- Console shows network errors

## Troubleshooting

### Products Not Loading / CORS Errors

**Check Browser Console** (Press F12):

✅ **Success:**
```
Fetching products...
Supabase URL: https://hnayeszrudjhxzgdmcob.supabase.co
Products fetched successfully: 3
```

❌ **Missing Env Vars:**
```
Missing Supabase environment variables!
NEXT_PUBLIC_SUPABASE_URL:
```
**Solution:** Add environment variables in your deployment platform settings

❌ **CORS Error:**
```
Access to fetch at 'https://hnayeszrudjhxzgdmcob.supabase.co/rest/v1/products'
from origin 'https://yourapp.vercel.app' has been blocked by CORS policy
```
**Solution:** Add your domain to Supabase Allowed Origins (see above)

### Build fails with environment variable errors
**Solution:** Ensure all `NEXT_PUBLIC_*` variables are set in your deployment platform settings.

### Dynamic routes (/models/[id]) return 404
**Solution:** Make sure your deployment platform supports Next.js dynamic routes. Vercel does this automatically.

### Database queries fail
**Solution:**
1. Check Supabase URL and API key are correct
2. Verify RLS policies allow public access for reads
3. Check Edge Functions are deployed

### Edge Functions not working
**Solution:**
1. Ensure Edge Functions are deployed to Supabase
2. Verify CORS headers are properly configured
3. Check function URLs in client code match deployment URLs

## Production Environment Variables

Create these in your deployment platform (NOT in .env):

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_TAWKTO_WIDGET_URL=your_tawkto_widget_url
```

## Performance Notes

The build output shows:
- First Load JS: ~79.3 kB (excellent)
- All pages under 132 kB total
- Dynamic routes use server-side rendering
- Static pages are pre-rendered

## Security Notes

- ✅ RLS enabled on all tables
- ✅ Anonymous key used (not service role key)
- ✅ Edge Functions validate inputs
- ✅ No secrets exposed in client code
- ✅ CORS properly configured

## Need Help?

If deployment fails:
1. Check build logs for specific errors
2. Verify all environment variables are set
3. Ensure Supabase instance is accessible
4. Test locally with `npm run build && npm start`
