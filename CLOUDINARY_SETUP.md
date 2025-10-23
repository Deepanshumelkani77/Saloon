# Cloudinary Setup Guide for Inventory Management

## 📸 Setting Up Cloudinary for Product Images

### Step 1: Create a Cloudinary Account
1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Sign up for a free account
3. After login, go to your Dashboard

### Step 2: Get Your Credentials
From your Cloudinary Dashboard, you'll find:
- **Cloud Name**: (e.g., `your_cloud_name`)
- **API Key**: (e.g., `123456789012345`)
- **API Secret**: (keep this secure, not needed for frontend)

### Step 3: Create an Upload Preset
1. Go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Set the following:
   - **Preset name**: `salon_products` (or your preferred name)
   - **Signing Mode**: Select **Unsigned** (for frontend uploads)
   - **Folder**: `products` (optional, for organization)
   - **Use filename or externally defined Public ID**: Enable if needed
5. Click **Save**

### Step 4: Update Inventory.jsx
Open `admin/src/pages/Inventory.jsx` and update these lines (around line 30-31):

```javascript
const CLOUDINARY_UPLOAD_PRESET = 'salon_products'; // Your upload preset name
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name'; // Your cloud name from dashboard
```

Replace with your actual values:
```javascript
const CLOUDINARY_UPLOAD_PRESET = 'salon_products'; // The preset name you created
const CLOUDINARY_CLOUD_NAME = 'dxxxxx123'; // Your actual cloud name
```

### Step 5: Test Image Upload
1. Start your admin panel: `npm run dev` (from admin folder)
2. Navigate to Inventory page
3. Click "Add New Product"
4. Try uploading an image
5. The image should upload to Cloudinary and display in the preview

### Alternative: Use Local File Preview (No Cloudinary)
If you don't want to use Cloudinary immediately, the code already has a fallback that will use local file preview (base64). The images won't persist on refresh but will work for testing.

### Security Notes
- ✅ **Upload Preset** is set to unsigned (safe for frontend)
- ✅ **Cloud Name** is public (safe to expose)
- ❌ **API Secret** should NEVER be in frontend code
- ✅ Set upload restrictions in Cloudinary dashboard:
  - File size limits (e.g., 5MB)
  - Allowed formats (jpg, png, webp, etc.)
  - Rate limiting

### Optional: Add Environment Variables
For better security, you can use environment variables:

Create `.env` file in admin folder:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=salon_products
```

Then update Inventory.jsx:
```javascript
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
```

### Troubleshooting
**Upload fails with 401 Unauthorized:**
- Check that upload preset is set to "Unsigned"
- Verify preset name is correct

**Upload fails with 400 Bad Request:**
- Check file size (default max is 10MB)
- Verify file format is allowed

**Image doesn't display:**
- Check browser console for errors
- Verify the image URL returned from Cloudinary
- Check CORS settings in Cloudinary dashboard

### Cloudinary Dashboard Features
- **Media Library**: View all uploaded images
- **Transformations**: Resize, crop, optimize images automatically
- **Usage Stats**: Monitor storage and bandwidth
- **Backup**: Automatic image backups

Your free tier includes:
- 25 GB storage
- 25 GB monthly bandwidth
- 25,000 transformations/month
