# Solēd - Image Assets Guide

This document explains how to add product images to the Solēd application.

## Image Locations

All product images should be placed in the `frontend/public/images/` folder.

## Required Images

The application expects the following image files:

### Hero Section
- `hero-shoe.png` - Large shoe image for hero section (recommended size: 500x500px or larger)

### Product Images (Popular Products & New Arrivals)
1. `nike-dunk-low.png`
2. `aj1-low.png`
3. `airmax-plus-3.png`
4. `nike-sb-dunk.png`
5. `jordan1-mid-kids.png`
6. `dunk-low-retro.png`
7. `jordan1-mid-se-kids.png`
8. `airmax1-sc.png`
9. `nike-airmax.png`
10. `infinityrn-4.png`
11. `sabrina1-ionic.png`
12. `metcon9-amp.png`

**Recommended size for product images: 400x400px** (square format works best with the circular containers)

### Section Images
- `man-camera.png` - Man with camera for "Find the Perfect Shoes" section
- `man-camo.png` - Man in camo jacket for "Elevate Your Game" section
- `person-nike-tee.png` - Person wearing Nike tee for "Just Do It" section

**Recommended size for section images: 300x400px or taller**

## Image Sources

You can obtain Nike product images from:

### Free Stock Photo Sites
1. **Unsplash** (https://unsplash.com)
   - Search: "Nike shoes", "sneakers", "running shoes"
   - Free to use, no attribution required

2. **Pexels** (https://www.pexels.com)
   - Search: "Nike", "sneakers", "athletic shoes"
   - Free to use

3. **Pixabay** (https://pixabay.com)
   - Search: "sneakers", "shoes", "Nike"
   - Free to use

### Nike Official Sources
- https://www.nike.com - Check if you can use product images
- https://developer.nike.com - Check if API access is available

### Placeholder Services

While developing, you can use placeholder images:

1. **Placeholder.com**
   ```
   https://placeholder.com/400x400?text=Nike+Shoe
   ```

2. **Via.placeholder.com**
   ```
   https://via.placeholder.com/400x400?text=Product+Name
   ```

3. **Faker.js** - Generate random images
   ```
   https://picsum.photos/400/400
   ```

## How to Add Images

### Option 1: Download and Save Locally

1. Find an image you like from the sources above
2. Download it as PNG with transparent background (if possible)
3. Rename it to match the required filename
4. Place it in `/frontend/public/images/` folder
5. The application will automatically load it

### Option 2: Use URLs Directly

If you want to host images externally (e.g., on AWS S3, Cloudinary), update the product data in `backend/seed.js`:

```javascript
{
  name: 'Nike Dunk Low',
  imageUrl: 'https://example.com/images/nike-dunk-low.png',
  // ... other properties
}
```

## Image Optimization Tips

1. **Format**: Use PNG for transparency, JPG for photos
2. **Size**: 
   - Product images: 400x400px
   - Section images: 300-500px width
   - File size: Keep under 200KB per image
3. **Transparency**: Use PNG with transparent backgrounds for better integration with circular containers
4. **Quality**: Use high quality images for better appearance

## Converting Images

### Remove Background (Make Transparent)
- Online tool: https://remove.bg/ (free for small images)
- Photoshop, GIMP, or Canva can also be used

### Resize Images
- Online tool: https://www.photoresizer.com/
- ImageMagick command line:
  ```bash
  convert input.jpg -resize 400x400 output.png
  ```

## Testing Images

Once you've added images:

1. Save them in `/frontend/public/images/`
2. Update product URLs in `backend/seed.js` if using different paths
3. Run the application and verify images load correctly
4. Check browser console for any 404 errors

## Troubleshooting

### Images Not Loading

1. **Check file names**: Ensure filenames exactly match what's in the code
2. **Check path**: Images should be in `frontend/public/images/`
3. **Check permissions**: File should be readable by the application
4. **Browser cache**: Clear browser cache and reload
5. **Check console**: Look for 404 errors in browser developer tools

### Images Look Stretched

1. Use square images (400x400px) for product images
2. Use appropriate aspect ratios for section images
3. The CSS handles object-contain, so images maintain aspect ratio

### Remove Background

If you want images on transparent background:
1. Use https://remove.bg/ to automatically remove backgrounds
2. OR use Photoshop/GIMP to manually remove backgrounds
3. Save as PNG format to preserve transparency

## Example Implementation

Here's how to add a specific image:

1. Download a Nike Dunk Low image from Unsplash
2. Resize it to 400x400px using an online tool
3. Save as `nike-dunk-low.png`
4. Place in: `frontend/public/images/nike-dunk-low.png`
5. The app automatically loads it when it references `nike-dunk-low.png`

## Next Steps

- [ ] Create `frontend/public/images/` folder
- [ ] Download or source all required images
- [ ] Optimize image sizes
- [ ] Add images to the folder
- [ ] Test the application
- [ ] Verify all images load correctly

---

For more information on managing assets, see:
- [Frontend README](./frontend/README.md)
- [Complete README](./README.md)
