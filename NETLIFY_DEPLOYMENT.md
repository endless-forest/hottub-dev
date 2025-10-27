# Netlify Deployment Guide for Santa Rosa Spas

## Quick Deploy Options

### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select your repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

4. **Add Environment Variables:**
   Go to Site settings → Environment variables and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://hnayeszrudjhxzgdmcob.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYXllc3pydWRqaHh6Z2RtY29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MzQ2MjksImV4cCI6MjA3NzExMDYyOX0.U6OovURZrvQMjDJkLoSMfG8hzA_SbbYGn3Y4meAqXJ0
   NEXT_PUBLIC_TAWKTO_WIDGET_URL=your_tawkto_widget_url_here
   ```

5. **Deploy:** Click "Deploy site"

### Option 2: Manual Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=out
```

### Option 3: Drag & Drop Deploy

1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com)
3. Drag the `out` folder to the deploy area

## Important Configuration Changes Made

1. **Updated `next.config.js`:**
   - Added `output: 'export'` for static export
   - Added `trailingSlash: true` for better routing
   - Changed `distDir` to `'out'`

2. **Created `netlify.toml`:**
   - Configured build settings
   - Set up redirects for SPA routing
   - Environment configurations

3. **Updated `package.json`:**
   - Added export script

## Post-Deployment Steps

### 1. Update Supabase CORS Settings
Add your Netlify domain to Supabase allowed origins:

1. Go to [Supabase Dashboard](https://app.supabase.com/project/hnayeszrudjhxzgdmcob)
2. Settings → API → CORS: Allowed origins
3. Add your Netlify URL (e.g., `https://your-site-name.netlify.app`)

### 2. Test Your Deployment
- ✅ All pages load correctly
- ✅ Contact form submits to Supabase
- ✅ Appointment booking works
- ✅ Admin dashboard displays data
- ✅ Product pages with dynamic routes work

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Ensure Node version is 18+
- Verify build command is `npm run build`

### Pages Return 404
- Check that `netlify.toml` redirects are configured
- Ensure `trailingSlash: true` in `next.config.js`

### API Calls Fail
- Verify environment variables are set correctly
- Check Supabase CORS settings include your domain
- Ensure API keys are valid

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://hnayeszrudjhxzgdmcob.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_TAWKTO_WIDGET_URL=your_tawkto_url_here
```

## Performance Optimization

The static export will:
- ✅ Pre-render all static pages
- ✅ Optimize images and assets
- ✅ Generate efficient routing
- ✅ Enable CDN caching

Your site will be fast and SEO-friendly!