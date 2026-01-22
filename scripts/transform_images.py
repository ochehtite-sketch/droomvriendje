#!/usr/bin/env python3
"""
Transform product images to Amazon/Shopify e-commerce standards.
- Output: 2048x2048 px square
- Background: Pure white (#FFFFFF)
- Product centered, no cropping, no stretching
- White padding added to make square
"""

import os
import re
import requests
from PIL import Image
from io import BytesIO
import hashlib

# Output directory
OUTPUT_DIR = "/app/frontend/public/products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Target size
TARGET_SIZE = 2048

def download_image(url):
    """Download image from URL"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        return Image.open(BytesIO(response.content))
    except Exception as e:
        print(f"  ❌ Failed to download: {e}")
        return None

def transform_to_ecommerce(img, target_size=2048):
    """
    Transform image to e-commerce standards:
    - Square format (target_size x target_size)
    - Pure white background
    - Product centered, not cropped or stretched
    """
    # Convert to RGBA for transparency handling
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Get original dimensions
    orig_width, orig_height = img.size
    
    # Calculate scaling to fit within target size with padding
    # Leave 10% padding on each side (80% of canvas for product)
    max_product_size = int(target_size * 0.85)
    
    # Calculate scale to fit product in the allowed area
    scale = min(max_product_size / orig_width, max_product_size / orig_height)
    
    # New dimensions
    new_width = int(orig_width * scale)
    new_height = int(orig_height * scale)
    
    # Resize with high quality
    img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Create white background
    result = Image.new('RGB', (target_size, target_size), (255, 255, 255))
    
    # Calculate position to center the product
    x = (target_size - new_width) // 2
    y = (target_size - new_height) // 2
    
    # Paste the product onto white background
    # Handle transparency by creating a mask
    if img_resized.mode == 'RGBA':
        result.paste(img_resized, (x, y), img_resized)
    else:
        result.paste(img_resized, (x, y))
    
    return result

def get_unique_filename(url, index):
    """Generate a unique filename based on URL hash"""
    url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
    return f"product_{index}_{url_hash}.png"

def extract_urls_from_mockdata():
    """Extract all image URLs from mockData.js"""
    mockdata_path = "/app/frontend/src/mockData.js"
    
    with open(mockdata_path, 'r') as f:
        content = f.read()
    
    # Find all image URLs
    url_pattern = r'https://[^"\s,\]]+\.(?:jpeg|jpg|png|webp)'
    urls = re.findall(url_pattern, content)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_urls = []
    for url in urls:
        if url not in seen and url != 'null':
            seen.add(url)
            unique_urls.append(url)
    
    return unique_urls

def main():
    print("=" * 60)
    print("🖼️  Product Image Transformer")
    print("   Amazon/Shopify E-commerce Standards")
    print("=" * 60)
    print(f"\n📐 Output: {TARGET_SIZE}x{TARGET_SIZE}px")
    print("🎨 Background: Pure White (#FFFFFF)")
    print("📍 Product: Centered, no crop, no stretch")
    print(f"📁 Output folder: {OUTPUT_DIR}\n")
    
    # Get all image URLs
    urls = extract_urls_from_mockdata()
    print(f"📋 Found {len(urls)} unique product images\n")
    
    successful = 0
    failed = 0
    results = []
    
    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}] Processing: {url[:60]}...")
        
        # Download
        img = download_image(url)
        if img is None:
            failed += 1
            continue
        
        # Transform
        try:
            transformed = transform_to_ecommerce(img, TARGET_SIZE)
            
            # Save
            filename = get_unique_filename(url, i)
            output_path = os.path.join(OUTPUT_DIR, filename)
            transformed.save(output_path, 'PNG', quality=95, optimize=True)
            
            print(f"  ✅ Saved: {filename} ({img.size[0]}x{img.size[1]} → {TARGET_SIZE}x{TARGET_SIZE})")
            successful += 1
            results.append({
                'original_url': url,
                'new_path': f'/products/{filename}',
                'original_size': img.size,
                'new_size': (TARGET_SIZE, TARGET_SIZE)
            })
        except Exception as e:
            print(f"  ❌ Transform failed: {e}")
            failed += 1
    
    print("\n" + "=" * 60)
    print(f"✅ Successfully processed: {successful}/{len(urls)}")
    print(f"❌ Failed: {failed}/{len(urls)}")
    print(f"📁 Output folder: {OUTPUT_DIR}")
    print("=" * 60)
    
    # Save mapping file
    mapping_path = os.path.join(OUTPUT_DIR, "image_mapping.txt")
    with open(mapping_path, 'w') as f:
        f.write("# Original URL -> New Path Mapping\n")
        for r in results:
            f.write(f"{r['original_url']}\n  -> {r['new_path']}\n\n")
    
    print(f"\n📝 Mapping saved to: {mapping_path}")
    
    return results

if __name__ == "__main__":
    main()
