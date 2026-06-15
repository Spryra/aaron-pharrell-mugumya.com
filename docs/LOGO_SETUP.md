# Cloudinary Logo and Image Upload Guide

Complete step-by-step instructions for uploading company logos, project images, and blog cover images to Cloudinary and integrating them with your portfolio database.

---

## Section 1: Overview

### Why Cloudinary?

Cloudinary is a cloud-based image management platform that serves as your portfolio's CDN (Content Delivery Network). Instead of storing large image files in your application, we store them on Cloudinary's optimized servers.

**Key Benefits:**

- **Automatic Image Optimization**: WebP conversion, quality reduction, responsive sizing
- **Global CDN**: Images served from servers closest to your users (fast loading)
- **Responsive Delivery**: Automatic format detection based on device (WebP for modern browsers, JPEG for older)
- **Version Control**: Multiple versions of the same image with v-parameter tracking
- **Advanced Transformations**: Resize, crop, add effects, apply smart thumbnails
- **No Storage Costs**: Images served through Cloudinary's CDN (included in free tier)

### Current Usage

The portfolio uses Cloudinary for:
- Company logos on the Experience page (2 assets)
- Project cover images on the Projects page (3 assets)
- Blog post cover images (3+ assets)

All image URLs follow this pattern:
```
https://res.cloudinary.com/{CLOUD_NAME}/image/upload/{TRANSFORMATIONS}/v{VERSION}/portfolio/{FOLDER}/{filename}
```

---

## Section 2: Cloudinary Account Setup

### Step 1: Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click **"Sign Up Free"** button (top right)
3. Choose your sign-up method (email, Google, GitHub, etc.)
4. Fill in your details:
   - Email address
   - Password
   - Company name (optional, but helps organize)
5. Verify your email address
6. Accept the terms and complete signup

### Step 2: Access Your Cloud Dashboard

1. Log in to Cloudinary
2. You'll land on your **Dashboard** (this is your main control panel)
3. In the top-left corner, you'll see your **Cloud Name** (e.g., `aaron-mugumya`)
4. Bookmark this page: https://console.cloudinary.com

### Step 3: Find Your API Credentials

These are needed to configure your portfolio application.

**To find your credentials:**

1. In the Cloudinary Dashboard, look for the **"Dashboard"** section
2. On the right side of the page, you'll see your **API Credentials** section with:
   - **Cloud Name**: Your unique identifier (example: `aaron-mugumya`)
   - **API Key**: A numeric code (example: `123456789`)
   - **API Secret**: A sensitive code (example: `xxxxxxxxxxxxxxxxxxxxx`)

### Step 4: Add Credentials to Your Environment File

These variables tell your Next.js app how to communicate with Cloudinary.

**Edit your `.env.local` file:**

```env
# === Cloudinary (Image Storage) ===
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Replace with your actual values:**

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloud Name from Step 3
- `CLOUDINARY_API_KEY`: Your API Key from Step 3
- `CLOUDINARY_API_SECRET`: Your API Secret from Step 3 (keep this secret!)

**Important Notes:**

- The `NEXT_PUBLIC_` prefix means this variable is exposed to the browser (Cloud Name is safe to expose)
- API Key and Secret are private and should never be committed to Git
- `.env.local` is already in `.gitignore`, so it won't be committed

**Restart your development server after saving:**

```bash
npm run dev
```

---

## Section 3: Creating Folders in Cloudinary

Organizing your images into folders makes them easier to manage and find.

### Recommended Folder Structure

Create folders in Cloudinary to organize your assets:

```
portfolio/
  ├── logos/           (Company logos for experience page)
  ├── projects/        (Project cover images)
  ├── blog/            (Blog post cover images)
  └── other/           (Miscellaneous assets)
```

### How to Create Folders in Cloudinary Dashboard

1. Log in to Cloudinary and go to **Media Library** (left sidebar)
2. Click the **"Create folder"** button (or right-click in empty space)
3. Enter folder name: `portfolio`
4. Click **Create**
5. Double-click the `portfolio` folder to enter it
6. Create subfolders inside:
   - **logos** — for company logos
   - **projects** — for project images
   - **blog** — for blog post cover images
   - **other** — for miscellaneous assets

### Folder Hierarchy Example

```
📁 portfolio
 ├─ 📁 logos
 │  ├─ tracecorp-logo.png
 │  └─ isbat-logo.png
 ├─ 📁 projects
 │  ├─ echotwin.png
 │  ├─ haiq.png
 │  └─ aceguru.png
 ├─ 📁 blog
 │  ├─ blog-forecasting-hero.jpg
 │  ├─ blog-journey-hero.jpg
 │  └─ blog-haiq-hero.jpg
 └─ 📁 other
    └─ (future assets)
```

---

## Section 4: Uploading Logos and Images

### Recommended Image Sizes and Formats

Before uploading, optimize your images to these specifications:

#### Company Logos

- **Dimensions**: 200×200px to 400×400px (square is ideal)
- **Format**: PNG with transparent background (recommended)
- **File Size**: < 100KB after compression
- **Quality**: High resolution for clarity

**Why square?** Logos display consistently in circular or square containers without distortion.

#### Project Cover Images

- **Dimensions**: 800×600px (landscape, 4:3 ratio)
- **Format**: PNG or JPG (JPG is smaller for photos)
- **File Size**: < 500KB
- **Quality**: High enough to look good at full width

**Mobile Alternative**: 600×400px for mobile optimization (Cloudinary handles responsive sizing)

#### Blog Post Cover Images

- **Dimensions**: 1200×600px (widescreen, 2:1 ratio)
- **Format**: JPG (better compression for photos)
- **File Size**: < 800KB
- **Quality**: Must look professional at full width

**Mobile Alternative**: 600×300px for mobile viewing

### Image Optimization Tips

Before uploading, consider:

1. **Compress images**:
   - Use TinyPNG (tinypng.com) or ImageOptim to reduce file size
   - Cloudinary compresses further, but start with optimized files

2. **Remove unnecessary metadata**:
   - Crop to remove white space
   - Use Squoosh.app for quick optimization

3. **Use correct format**:
   - PNG for logos and graphics (supports transparency)
   - JPG for photos and complex images (smaller file size)
   - WebP for web (Cloudinary converts automatically)

### How to Upload to Cloudinary

#### Option A: Upload via Cloudinary Dashboard (Recommended for Beginners)

1. Log in to Cloudinary
2. Click **Media Library** (left sidebar)
3. Navigate to `portfolio/logos` (or appropriate subfolder)
4. Click **Upload** button (top right)
5. Choose files from your computer or drag and drop
6. Wait for upload to complete
7. Image will appear in the folder immediately

#### Option B: Upload via API (For Automation)

Use this when you want to upload multiple images programmatically:

```bash
# Upload a single image
curl -X POST \
  -F "file=@/path/to/image.png" \
  -F "folder=portfolio/logos" \
  -F "resource_type=auto" \
  https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload \
  -u {API_KEY}:{API_SECRET}
```

#### Option C: Upload in Next.js App

If your portfolio has an admin panel, you can upload through the app:

```typescript
// In your admin page or component
const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'portfolio/logos');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url; // Use this URL in your database
};
```

---

## Section 5: Getting Cloudinary URLs

### Basic URL Structure

After uploading, Cloudinary generates a URL for your image:

```
https://res.cloudinary.com/{CLOUD_NAME}/image/upload/v{VERSION}/{folder}/{filename}
```

**Example:**
```
https://res.cloudinary.com/aaron-mugumya/image/upload/v1702566000/portfolio/logos/tracecorp-logo.png
```

### How to Get Your Image URL

1. **Via Dashboard**:
   - Click on the image in Media Library
   - Click **Copy URL** button
   - Paste into your database

2. **Via API Response**:
   - The upload response includes `secure_url` field
   - Use this directly in your database

3. **Manual Construction**:
   - Cloud Name: `aaron-mugumya`
   - Version: `v1702566000` (timestamp, use `v1` for simplicity)
   - Path: `portfolio/logos/tracecorp-logo.png`

### URL Transformations

You can modify URLs to resize, compress, or format images. Add transformations before the `/v` parameter:

```
https://res.cloudinary.com/{CLOUD_NAME}/image/upload/{TRANSFORMATIONS}/v{VERSION}/{path}
                                          ^^^^^^^^^^^^^^^^^^^^
                                     Add here (optional)
```

### Common Transformations

| Transformation | Purpose | Example |
|---|---|---|
| `c_scale,w_200` | Scale to 200px width | `c_scale,w_200` |
| `c_fill,h_200,w_200` | Crop to exact 200×200px | `c_fill,h_200,w_200` |
| `q_auto` | Auto quality (reduce filesize) | `q_auto` |
| `f_auto` | Auto format (WebP for modern browsers) | `f_auto` |
| `c_thumb,g_face,h_200,w_200` | Smart thumbnail (detect faces) | `c_thumb,g_face` |
| `dpr_auto` | Device pixel ratio detection | `dpr_auto` |

### Example URLs with Transformations

#### Company Logo (Optimized)
```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_200,q_auto,f_auto/v1702566000/portfolio/logos/tracecorp-logo.png
```
This resizes to 200px width, auto-compresses, and serves best format.

#### Project Image (Responsive)
```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_800,q_auto,f_auto/v1702566000/portfolio/projects/echotwin.png
```
Scales to 800px width for desktop, auto-optimizes.

#### Blog Cover (High Quality)
```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200,q_auto,f_auto/v1702566000/portfolio/blog/blog-forecasting-hero.jpg
```
Scales to 1200px, maintains quality for blog display.

---

## Section 6: Database Updates

After uploading images to Cloudinary, update your database with the image URLs.

### Tables and Columns

Your database has three tables that store image URLs:

#### 1. Experience Table (Company Logos)
```sql
UPDATE experience 
SET logoUrl = 'https://res.cloudinary.com/aaron-mugumya/image/upload/...',
    logoAlt = 'Company Name Logo'
WHERE company = 'TraceCorp Solutions';
```

**Columns:**
- `logoUrl` — Full Cloudinary URL
- `logoAlt` — Alt text (for accessibility, e.g., "TraceCorp Solutions Logo")

#### 2. Projects Table (Project Images)
```sql
UPDATE projects 
SET imageUrl = 'https://res.cloudinary.com/aaron-mugumya/image/upload/...',
    imageAlt = 'EchoTwin voice cloning interface'
WHERE slug = 'echotwin';
```

**Columns:**
- `imageUrl` — Full Cloudinary URL
- `imageAlt` — Alt text (e.g., "EchoTwin voice cloning interface")

#### 3. Blog Posts Table (Blog Cover Images)
```sql
UPDATE blog_posts 
SET coverImageUrl = 'https://res.cloudinary.com/aaron-mugumya/image/upload/...',
    coverImageAlt = 'Time series forecasting visualization'
WHERE slug = 'production-ai-forecasting';
```

**Columns:**
- `coverImageUrl` — Full Cloudinary URL
- `coverImageAlt` — Alt text (e.g., "Time series forecasting visualization")

### How to Update via Database Client

1. **Using pgAdmin** (Recommended):
   - Open pgAdmin (your database client)
   - Connect to your database
   - Navigate to `experience`, `projects`, or `blog_posts` table
   - Right-click row → Edit Row
   - Paste Cloudinary URL into `logoUrl`/`imageUrl`/`coverImageUrl`
   - Save

2. **Using SQL Query**:
   ```sql
   UPDATE experience 
   SET logoUrl = 'https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_200,q_auto,f_auto/v1702566000/portfolio/logos/tracecorp-logo.png',
       logoAlt = 'TraceCorp Solutions'
   WHERE company = 'TraceCorp Solutions';
   ```

3. **Using TypeScript (Admin Panel)**:
   ```typescript
   await db
     .update(experience)
     .set({
       logoUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/...',
       logoAlt: 'Company Name Logo',
     })
     .where(eq(experience.company, 'TraceCorp Solutions'));
   ```

### Current Database Status

Your portfolio currently uses these images (as of June 2025):

#### Experience (Company Logos)
| Company | Current URL | Status |
|---|---|---|
| TraceCorp Solutions | `https://res.cloudinary.com/aaron-mugumya/image/upload/tracecorp-logo.png` | Live |
| ISBAT University | `https://res.cloudinary.com/aaron-mugumya/image/upload/isbat-logo.png` | Live |

#### Projects (Project Images)
| Project | Current URL | Status |
|---|---|---|
| EchoTwin | `https://res.cloudinary.com/aaron-mugumya/image/upload/echotwin.png` | Live |
| HAIQ Bakery | `https://res.cloudinary.com/aaron-mugumya/image/upload/haiq.png` | Live |
| AceGuru | `https://res.cloudinary.com/aaron-mugumya/image/upload/aceguru.png` | Live |

#### Blog Posts (Cover Images)
| Blog Post | Current URL | Status |
|---|---|---|
| Production AI Forecasting | `https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-forecasting-hero.jpg` | Live |
| Academia to Production | `https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-journey-hero.jpg` | Live |
| HAIQ Bakery Project | `https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-haiq-hero.jpg` | Live |

---

## Section 7: Image Transformations

Cloudinary's transformation API allows you to modify images on-the-fly without re-uploading.

### Transformation Syntax

Add transformations as comma-separated parameters before the `/v` in your URL:

```
/image/upload/{TRANSFORMATION1},{TRANSFORMATION2},{TRANSFORMATION3}/v{VERSION}/{path}
```

### Common Transformations Reference

#### Sizing Transformations

| Parameter | Description | Example |
|---|---|---|
| `w_NUMBER` | Set width in pixels | `w_200` → 200px wide |
| `h_NUMBER` | Set height in pixels | `h_200` → 200px tall |
| `c_scale` | Scale (preserve aspect ratio) | `c_scale,w_200` → fit to 200px |
| `c_fill` | Fill (crop to exact dimensions) | `c_fill,w_200,h_200` → exact 200×200 |
| `c_thumb` | Thumbnail (smart crop) | `c_thumb,w_200,h_200` → intelligent crop |

#### Quality & Format Transformations

| Parameter | Description | Example |
|---|---|---|
| `q_NUMBER` | Quality (1-100) | `q_85` → 85% quality |
| `q_auto` | Auto-optimize quality | `q_auto` → Cloudinary decides (recommended) |
| `f_auto` | Auto format detection | `f_auto` → WebP for modern, JPG for old |
| `f_webp` | Force WebP format | `f_webp` → always WebP |
| `f_jpg` | Force JPEG format | `f_jpg` → always JPEG |

#### Device Pixel Ratio

| Parameter | Description | Example |
|---|---|---|
| `dpr_auto` | Device pixel ratio detection | `dpr_auto` → 1x on phone, 2x on retina |
| `dpr_NUMBER` | Explicit DPR | `dpr_2` → 2x resolution |

#### Face Detection (Smart Crops)

| Parameter | Description | Example |
|---|---|---|
| `g_face` | Gravity to face | `c_thumb,g_face,w_200,h_200` → crop to face |
| `g_center` | Gravity to center | `g_center` → focus on center |
| `g_auto` | Auto gravity detection | `g_auto` → intelligent focus |

### Real-World Examples

#### Example 1: Company Logo
```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_200,q_auto,f_auto/v1702566000/portfolio/logos/tracecorp-logo.png
```
- Scales to 200px width
- Auto-optimizes quality
- Serves best format

#### Example 2: Project Image (Responsive)
```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_800,h_600,c_fill,q_auto,f_auto/v1702566000/portfolio/projects/echotwin.png
```
- Scales to 800×600px
- Fills exactly (crops if needed)
- Auto-optimizes

#### Example 3: Blog Cover (Desktop)
```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200,q_auto,f_auto/v1702566000/portfolio/blog/blog-forecasting-hero.jpg
```
- Scales to 1200px for desktop
- Auto quality

#### Example 4: Blog Cover (Mobile)
```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_600,q_auto,f_auto/v1702566000/portfolio/blog/blog-forecasting-hero.jpg
```
- Scales to 600px for mobile
- Same image, different size

---

## Section 8: Responsive Images in Next.js

The portfolio uses Next.js Image component with Cloudinary URLs for automatic optimization.

### Using Next.js Image Component

The `Image` component from `next/image` provides automatic lazy loading, responsive sizing, and format conversion.

```typescript
import Image from 'next/image';

export default function ProjectCard({ imageUrl, imageAlt }) {
  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      priority={false}
    />
  );
}
```

### The `sizes` Prop (Critical for Responsive Images)

The `sizes` prop tells Next.js what width to request based on viewport:

```typescript
// For blog post header (full width on all devices)
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"

// For project grid cards (3 columns on desktop, 2 on tablet, 1 on mobile)
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

// For small logo (fixed size)
sizes="200px"
```

**How it works:**
- On mobile (< 640px): Request 100% viewport width
- On tablet (< 1024px): Request 50% viewport width
- On desktop: Request 33% viewport width

This prevents loading oversized images on mobile!

### Responsive Image Examples in Components

#### Example 1: Experience Logo

```typescript
// In ExperienceTimeline.tsx
import Image from 'next/image';

export function ExperienceCard({ logoUrl, logoAlt, company }) {
  return (
    <div className="flex items-start gap-4">
      <Image
        src={logoUrl}
        alt={logoAlt}
        width={80}
        height={80}
        className="rounded-lg"
        sizes="80px"
      />
      <div>
        <h3>{company}</h3>
        {/* ... */}
      </div>
    </div>
  );
}
```

#### Example 2: Project Cover Image

```typescript
// In ProjectCard.tsx
import Image from 'next/image';

export function ProjectCard({ imageUrl, imageAlt, title }) {
  return (
    <div className="h-48 overflow-hidden rounded-lg">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={400}
        height={300}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
```

#### Example 3: Blog Post Hero

```typescript
// In BlogPostHeader.tsx
import Image from 'next/image';

export function BlogPostHeader({ coverImageUrl, coverImageAlt, title }) {
  return (
    <div className="relative h-96 w-full">
      <Image
        src={coverImageUrl}
        alt={coverImageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1200px"
        priority
      />
    </div>
  );
}
```

### Cloudinary URLs with Next.js Image

Cloudinary URLs work directly with Next.js Image component. The component automatically handles:

- **Lazy loading**: Images load only when in viewport
- **Responsive sizing**: Requests appropriate image size for device
- **Format conversion**: Serves WebP to modern browsers, JPG to older ones
- **Blur placeholder**: Optional smooth loading effect

**Configuration tip**: Your `next.config.js` may need Cloudinary domain configuration:

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
```

This is typically already configured if Cloudinary images are working!

---

## Section 9: Version Control with Cloudinary

### Understanding Cloudinary Versioning

Every image in Cloudinary has a version parameter (`v{TIMESTAMP}`). This allows you to update an image without changing the URL.

### How Versioning Works

#### Default (No Version)
```
https://res.cloudinary.com/aaron-mugumya/image/upload/portfolio/logos/tracecorp-logo.png
```
- Cloudinary serves the **latest** version
- May cache in CDN (could show old version temporarily)

#### With Version Parameter
```
https://res.cloudinary.com/aaron-mugumya/image/upload/v1702566000/portfolio/logos/tracecorp-logo.png
```
- Version `1702566000` is a Unix timestamp
- CDN caches forever (won't update until you change version)
- More reliable for production

### Updating an Image

**Scenario**: You want to update the TraceCorp logo but keep the filename.

1. **Upload new file** with same filename:
   - Cloudinary replaces the file
   - Old `v1702566000` URL still shows old image
   - New default URL shows new image

2. **Update your database**:
   - Either remove the version: `v1702566000` → (no v parameter)
   - Or add new version: `v1702566000` → `v1709000000`

### Best Practice

**Use simple versioning for your seed data:**

Instead of:
```
https://res.cloudinary.com/aaron-mugumya/image/upload/v1702566000/portfolio/logos/tracecorp-logo.png
```

Use:
```
https://res.cloudinary.com/aaron-mugumya/image/upload/v1/portfolio/logos/tracecorp-logo.png
```

The `v1` parameter:
- Still prevents CDN caching issues
- Easy to increment (`v2`, `v3`, etc.) when you update
- Simpler to manage than Unix timestamps

### Updating in Database

```sql
-- When you update an image, increment the version
UPDATE experience 
SET logoUrl = 'https://res.cloudinary.com/aaron-mugumya/image/upload/v2/portfolio/logos/tracecorp-logo.png'
WHERE company = 'TraceCorp Solutions';
```

Or use `.replace()` in code:

```typescript
const oldUrl = 'https://res.cloudinary.com/aaron-mugumya/image/upload/v1/portfolio/logos/tracecorp-logo.png';
const newUrl = oldUrl.replace('/v1/', '/v2/');

await db
  .update(experience)
  .set({ logoUrl: newUrl })
  .where(eq(experience.company, 'TraceCorp Solutions'));
```

### Important: Security & Secrets

⚠️ **Never commit private information to Git:**

- **SAFE**: URLs with `/v1/` or transformations (public, no auth needed)
- **SAFE**: Cloud name in NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- **UNSAFE**: API Key and Secret (keep in `.env.local` only)

Your `.gitignore` already protects `.env.local`, so you're good!

---

## Section 10: Troubleshooting

### Common Issues and Solutions

#### Issue: 404 Error on Image URLs

**Problem**: Image shows broken icon or 404 error.

**Causes & Solutions**:

1. **Wrong Cloud Name**:
   ```
   ❌ https://res.cloudinary.com/wrong-cloud-name/image/upload/...
   ✓ https://res.cloudinary.com/aaron-mugumya/image/upload/...
   ```
   - Check `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`

2. **Wrong Folder Path**:
   ```
   ❌ https://res.cloudinary.com/aaron-mugumya/image/upload/portfolio/wrong-folder/logo.png
   ✓ https://res.cloudinary.com/aaron-mugumya/image/upload/portfolio/logos/tracecorp-logo.png
   ```
   - Verify folder structure in Cloudinary Media Library

3. **Wrong Filename**:
   ```
   ❌ https://res.cloudinary.com/aaron-mugumya/image/upload/portfolio/logos/tracecorplogo.png
   ✓ https://res.cloudinary.com/aaron-mugumya/image/upload/portfolio/logos/tracecorp-logo.png
   ```
   - Match filename exactly (case-sensitive)

4. **File Never Uploaded**:
   - Check Media Library in Cloudinary Dashboard
   - Upload the file if missing

#### Issue: CORS Errors

**Problem**: Image loads locally but fails in production.

**Solution**: Cloudinary handles CORS automatically (you don't need to configure it). If this persists:

1. Check Cloudinary Security Settings:
   - Go to Settings → Security
   - Ensure "Allowed fetch domains" includes your domain
2. Check Next.js Image config:
   - Ensure `res.cloudinary.com` is in allowed domains

#### Issue: Images Load Slowly

**Problem**: Images take a long time to display.

**Solutions**:

1. **Add transformations** for optimization:
   ```
   // BEFORE (slow)
   https://res.cloudinary.com/aaron-mugumya/image/upload/portfolio/logos/tracecorp-logo.png
   
   // AFTER (fast)
   https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_200,q_auto,f_auto/portfolio/logos/tracecorp-logo.png
   ```

2. **Use Next.js Image component** with `sizes` prop (handles responsive sizing)

3. **Add priority hint** for above-the-fold images:
   ```typescript
   <Image src={imageUrl} alt={alt} priority />
   ```

4. **Monitor file size**:
   - Logos should be < 50KB
   - Project images < 300KB
   - Blog covers < 500KB

#### Issue: Image Not Showing in Dark Mode

**Problem**: Image displays fine in light mode but disappears in dark mode.

**Solution**: This usually means the image background is black and dark mode background is also black. Fix:

1. **Use PNG logos with transparent background** (not white background)
2. **Ensure good contrast** for alt text display
3. **Add background if needed**:
   ```typescript
   <div className="bg-white dark:bg-gray-900 rounded-lg">
     <Image src={logoUrl} alt={logoAlt} />
   </div>
   ```

#### Issue: Different Image Quality on Different Devices

**Problem**: Images look pixelated on high-DPI devices (iPhone, Android).

**Solution**: Use `dpr_auto` transformation:

```
https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_200,dpr_auto,q_auto,f_auto/portfolio/logos/tracecorp-logo.png
```

This serves 2x resolution on Retina/high-DPI screens automatically.

### Verification Steps

#### Test an Image URL

**In your browser**:
1. Copy the image URL
2. Paste into address bar
3. Press Enter
4. Image should display
5. If 404: Check URL for typos

**Using curl** (from terminal):
```bash
curl -I https://res.cloudinary.com/aaron-mugumya/image/upload/v1/portfolio/logos/tracecorp-logo.png
```

Should return `HTTP/1.1 200 OK` (not 404).

#### Check Database

1. Open pgAdmin (your database client)
2. Query the experience table:
   ```sql
   SELECT company, logoUrl, logoAlt FROM experience LIMIT 5;
   ```
3. Verify all URLs start with `https://res.cloudinary.com/`
4. Copy a URL and test in browser

#### Monitor in Cloudinary

1. Log in to Cloudinary Dashboard
2. Click **Analytics** (left sidebar)
3. View:
   - Total images uploaded
   - Storage used
   - Transformations applied
   - Bandwidth usage

---

## Section 11: Current Setup Status

### Images Currently in Use

#### Experience Logos

| Company | File Path | Current URL | Cloud Size | Last Updated |
|---|---|---|---|---|
| TraceCorp Solutions | `portfolio/logos/tracecorp-logo.png` | `https://res.cloudinary.com/aaron-mugumya/image/upload/tracecorp-logo.png` | ~15KB | Dec 2025 |
| ISBAT University | `portfolio/logos/isbat-logo.png` | `https://res.cloudinary.com/aaron-mugumya/image/upload/isbat-logo.png` | ~12KB | Dec 2025 |

#### Project Images

| Project | File Path | Current URL | Cloud Size | Last Updated |
|---|---|---|---|---|
| EchoTwin | `portfolio/projects/echotwin.png` | `https://res.cloudinary.com/aaron-mugumya/image/upload/echotwin.png` | ~85KB | Dec 2025 |
| HAIQ Bakery | `portfolio/projects/haiq.png` | `https://res.cloudinary.com/aaron-mugumya/image/upload/haiq.png` | ~120KB | Dec 2025 |
| AceGuru | `portfolio/projects/aceguru.png` | `https://res.cloudinary.com/aaron-mugumya/image/upload/aceguru.png` | ~95KB | Dec 2025 |

#### Blog Cover Images

| Blog Post | File Path | Current URL | Cloud Size | Last Updated |
|---|---|---|---|---|
| Production AI Forecasting | `portfolio/blog/blog-forecasting-hero.jpg` | `https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-forecasting-hero.jpg` | ~180KB | Dec 2025 |
| Academia to Production | `portfolio/blog/blog-journey-hero.jpg` | `https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-journey-hero.jpg` | ~165KB | Dec 2025 |
| HAIQ Bakery Project | `portfolio/blog/blog-haiq-hero.jpg` | `https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-haiq-hero.jpg` | ~175KB | Dec 2025 |

### Total Storage Usage

- **Total images**: 8
- **Total cloud storage**: ~847KB (well within free tier: 25GB)
- **Monthly quota**: 25GB storage, unlimited delivery

---

## Section 12: Best Practices

### File Naming Convention

Use consistent, descriptive names:

**Good Examples**:
```
tracecorp-logo.png
isbat-university-logo.png
blog-forecasting-hero.jpg
project-echotwin-interface.png
```

**Avoid**:
```
logo.png (ambiguous)
image1.jpg (not descriptive)
temp_final_v2.png (confusing versioning)
```

### Storage Organization

```
portfolio/
├── logos/              (Company logos - always PNG with transparency)
│   ├── tracecorp-logo.png
│   └── isbat-logo.png
│
├── projects/           (Project screenshots - PNG or JPG)
│   ├── echotwin-interface.png
│   ├── haiq-storefront.png
│   └── aceguru-gameplay.png
│
├── blog/               (Blog cover images - JPG for photos)
│   ├── blog-forecasting-hero.jpg
│   ├── blog-journey-hero.jpg
│   └── blog-haiq-hero.jpg
│
└── other/              (Miscellaneous assets)
    └── (future use)
```

### Security Best Practices

1. **Never commit credentials**:
   - API Key and Secret stay in `.env.local` only
   - `.gitignore` protects `.env.local`
   - NEXT_PUBLIC_* variables are safe (exposed in browser)

2. **Restrict API permissions** (optional, for teams):
   - Set API Key restrictions in Cloudinary Security settings
   - Limit to specific upload folders
   - Set IP restrictions if possible

3. **Regular backups**:
   - Export media list monthly via Cloudinary API
   - Keep local copies of original files
   - Document all URLs in spreadsheet or database

4. **Monitor usage**:
   - Check Cloudinary Analytics monthly
   - Set bandwidth alerts if close to limits
   - Review unused images and clean up

### Performance Optimization

#### For Logos
- Always use `c_scale,w_200,q_auto,f_auto` transformation
- Ensures small file size (< 20KB after optimization)
- Result: Instant load times

#### For Project Images
- Use `c_scale,w_800,q_auto,f_auto` for desktop display
- Separate mobile version: `c_scale,w_600,q_auto,f_auto`
- Let Next.js handle responsive sizing via `sizes` prop

#### For Blog Cover Images
- Use `c_scale,w_1200,q_auto,f_auto` for desktop
- Mobile variant: `c_scale,w_600,q_auto,f_auto`
- Add `priority` hint for above-the-fold images

#### Lazy Loading
- All images use Next.js Image component (built-in lazy loading)
- Add `priority` only for hero images
- Let browser decide when to load off-screen images

### Testing Checklist

Before deploying new images:

- [ ] Image file < recommended size (logos < 50KB, projects < 300KB, blog < 500KB)
- [ ] File named according to convention (lowercase, hyphens, no spaces)
- [ ] Uploaded to correct folder (`portfolio/logos`, `portfolio/projects`, etc.)
- [ ] URL added to database with matching `alt` text
- [ ] URL tested in browser (no 404)
- [ ] Image displays in app (dev server and production)
- [ ] Image loads quickly (< 2 seconds)
- [ ] Image looks good in light and dark modes
- [ ] Image displays correctly on mobile and desktop

### Monitoring

#### Daily
- Manually check portfolio pages for broken images
- Add to your testing routine

#### Weekly
- Check Cloudinary Analytics dashboard
- Monitor bandwidth usage

#### Monthly
- Export Cloudinary asset list
- Compare with database (ensure no orphaned URLs)
- Clean up old/unused images

---

## Conclusion

Cloudinary simplifies image management and delivery for your portfolio. By following this guide, you can:

1. ✓ Upload logos and images efficiently
2. ✓ Get optimized URLs for production
3. ✓ Update database records
4. ✓ Leverage responsive image delivery
5. ✓ Monitor and maintain assets

**Next Steps**:

1. Review your current Cloudinary account status
2. Verify all 8 images are uploaded and accessible
3. Check database URLs match Cloudinary paths
4. Test each image on both light and dark modes
5. Monitor performance in Analytics

**Questions?** Refer to:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Component](https://nextjs.org/docs/basic-features/image-optimization)
- Database schema: `lib/db/schema.ts`

---

**Document Version**: 1.0
**Last Updated**: June 15, 2025
**Maintained by**: Aaron Pharrell
