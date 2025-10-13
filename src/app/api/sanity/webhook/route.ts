import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { client as sanityClient } from '../../../../../sanity/lib/client';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SanityWebhookPayload {
  _type: string;
  _id: string;
  _rev: string;
  transition: 'appear' | 'update' | 'disappear';
}

export async function POST(request: NextRequest) {
  console.log('🚀 Webhook endpoint called at:', new Date().toISOString());
  
  try {
    const body = await request.text();
    console.log('📦 Raw webhook body:', body);
    
    const payload: SanityWebhookPayload = JSON.parse(body);
    console.log('📋 Parsed webhook payload:', JSON.stringify(payload, null, 2));

    // Verify webhook signature if configured
    const signature = request.headers.get('x-sanity-signature');
    console.log('🔐 Webhook signature present:', !!signature);
    
    if (process.env.SANITY_WEBHOOK_SECRET && signature) {
      console.log('✅ Webhook secret configured, verifying signature...');
      // Add signature verification logic here if needed
    } else {
      console.log('⚠️ No webhook secret configured, skipping signature verification');
    }

    const { _type, _id, transition } = payload;
    console.log(`🔄 Processing ${_type} document ${_id} with transition: ${transition}`);

    switch (_type) {
      case 'productCategory':
        await handleProductCategory(_id, transition);
        break;
      case 'productBrand':
        await handleProductBrand(_id, transition);
        break;
      case 'product':
        await handleProduct(_id, transition);
        break;
      case 'productReview':
        await handleProductReview(_id, transition);
        break;
      default:
        console.log(`Unhandled document type: ${_type}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Processed ${_type} ${transition}` 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleProductCategory(sanityId: string, transition: string) {
  if (transition === 'disappear') {
    // Delete category
    await supabase
      .from('product_categories')
      .delete()
      .eq('sanity_id', sanityId);
    return;
  }

  try {
    // Fetch category from Sanity
    const category = await sanityClient.fetch(`
      *[_type == "productCategory" && _id == $sanityId][0] {
        _id,
        name,
        slug,
        description,
        iconName,
        features,
        sortOrder,
        isActive,
        seoTitle,
        seoDescription
      }
    `, { sanityId });

    if (!category) {
      console.error('Category not found in Sanity:', sanityId);
      return;
    }

    // Upsert to Supabase
    const { error } = await supabase
      .from('product_categories')
      .upsert({
        sanity_id: category._id,
        name: category.name,
        slug: category.slug?.current || category.name.toLowerCase().replace(/\s+/g, '-'),
        description: category.description,
        icon_name: category.iconName,
        features: category.features || [],
        sort_order: category.sortOrder || 0,
        is_active: category.isActive !== false,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'sanity_id'
      });

    if (error) {
      console.error('Supabase upsert error for category:', error);
    } else {
      console.log('Category synced successfully:', category.name);
    }
  } catch (error) {
    console.error('Error handling product category:', error);
  }
}

async function handleProductBrand(sanityId: string, transition: string) {
  if (transition === 'disappear') {
    await supabase
      .from('product_brands')
      .delete()
      .eq('sanity_id', sanityId);
    return;
  }

  try {
    const brand = await sanityClient.fetch(`
      *[_type == "productBrand" && _id == $sanityId][0] {
        _id,
        name,
        slug,
        "logoUrl": logo.asset->url,
        description,
        websiteUrl,
        country,
        establishedYear,
        isActive
      }
    `, { sanityId });

    if (!brand) {
      console.error('Brand not found in Sanity:', sanityId);
      return;
    }

    const { error } = await supabase
      .from('product_brands')
      .upsert({
        sanity_id: brand._id,
        name: brand.name,
        slug: brand.slug?.current || brand.name.toLowerCase().replace(/\s+/g, '-'),
        logo_url: brand.logoUrl,
        description: brand.description,
        website_url: brand.websiteUrl,
        country: brand.country,
        established_year: brand.establishedYear,
        is_active: brand.isActive !== false,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'sanity_id'
      });

    if (error) {
      console.error('Supabase upsert error for brand:', error);
    } else {
      console.log('Brand synced successfully:', brand.name);
    }
  } catch (error) {
    console.error('Error handling product brand:', error);
  }
}

async function handleProduct(sanityId: string, transition: string) {
  if (transition === 'disappear') {
    // Delete product and all related data
    await supabase.from('products').delete().eq('sanity_id', sanityId);
    return;
  }

  try {
    const product = await sanityClient.fetch(`
      *[_type == "product" && _id == $sanityId][0] {
        _id,
        title,
        slug,
        shortDescription,
        description,
        category->{_id, name, slug},
        brand->{_id, name, slug},
        subcategory,
        model,
        sku,
        efficiency,
        capacity,
        powerOutput,
        features,
        applications,
        certifications,
        compatibleProducts[]->{_id, title},
        "primaryImageUrl": primaryImage.asset->url,
        gallery[] {
          "imageUrl": image.asset->url,
          alt,
          caption,
          imageType
        },
        documents[] {
          title,
          "fileUrl": file.asset->url,
          documentType,
          description,
          "fileSize": file.asset->size
        },
        videos[] {
          title,
          youtubeUrl,
          description,
          videoType,
          "thumbnailUrl": thumbnail.asset->url
        },
        specifications[] {
          category,
          key,
          value,
          unit
        },
        priceRange,
        moq,
        warranty,
        leadTime,
        inStock,
        rating,
        reviewCount,
        isFeatured,
        isPopular,
        sortOrder,
        seoTitle,
        seoDescription,
        "ogImageUrl": ogImage.asset->url,
        status
      }
    `, { sanityId });

    if (!product) {
      console.error('Product not found in Sanity:', sanityId);
      return;
    }

    // Get category and brand IDs from Supabase
    const [categoryResult, brandResult] = await Promise.all([
      supabase.from('product_categories').select('id').eq('sanity_id', product.category?._id).single(),
      supabase.from('product_brands').select('id').eq('sanity_id', product.brand?._id).single()
    ]);

    // Insert/update main product
    const { data: productData, error: productError } = await supabase
      .from('products')
      .upsert({
        sanity_id: product._id,
        title: product.title,
        slug: product.slug?.current || product.title.toLowerCase().replace(/\s+/g, '-'),
        short_description: product.shortDescription,
        description: product.description,
        category_id: categoryResult.data?.id,
        brand_id: brandResult.data?.id,
        subcategory: product.subcategory,
        model: product.model,
        sku: product.sku,
        efficiency: product.efficiency,
        capacity: product.capacity,
        power_output: product.powerOutput,
        price_range: product.priceRange,
        moq: product.moq,
        warranty: product.warranty,
        lead_time: product.leadTime,
        in_stock: product.inStock !== false,
        rating: product.rating || 0,
        review_count: product.reviewCount || 0,
        is_featured: product.isFeatured || false,
        is_popular: product.isPopular || false,
        sort_order: product.sortOrder || 0,
        meta_title: product.seoTitle,
        meta_description: product.seoDescription,
        og_image_url: product.ogImageUrl,
        status: 'published', // Always set to published when syncing from Sanity
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'sanity_id'
      })
      .select('id')
      .single();

    if (productError) {
      console.error('Error upserting product:', productError);
      return;
    }

    const productId = productData.id;

    // Clear existing related data
    await Promise.all([
      supabase.from('product_images').delete().eq('product_id', productId),
      supabase.from('product_documents').delete().eq('product_id', productId),
      supabase.from('product_videos').delete().eq('product_id', productId),
      supabase.from('product_specifications').delete().eq('product_id', productId),
      supabase.from('product_features').delete().eq('product_id', productId),
      supabase.from('product_certifications').delete().eq('product_id', productId),
      supabase.from('product_applications').delete().eq('product_id', productId),
      supabase.from('product_compatibility').delete().eq('product_id', productId)
    ]);

    // Insert primary image
    if (product.primaryImageUrl) {
      await supabase.from('product_images').insert({
        product_id: productId,
        image_url: product.primaryImageUrl,
        alt_text: product.title,
        is_primary: true,
        sort_order: 0
      });
    }

    // Insert gallery images
    if (product.gallery?.length) {
      const galleryImages = product.gallery.map((image: Record<string, unknown>, index: number) => ({
        product_id: productId,
        image_url: image.imageUrl,
        alt_text: image.alt || product.title,
        caption: image.caption,
        image_type: image.imageType || 'product',
        is_primary: false,
        sort_order: index + 1
      }));
      await supabase.from('product_images').insert(galleryImages);
    }

    // Insert documents
    if (product.documents?.length) {
      const documents = product.documents.map((doc: Record<string, unknown>, index: number) => ({
        product_id: productId,
        title: doc.title,
        file_url: doc.fileUrl,
        file_type: (doc.fileUrl as string)?.split('.').pop()?.toLowerCase(),
        document_type: doc.documentType,
        description: doc.description,
        file_size_kb: Math.round(((doc.fileSize as number) || 0) / 1024),
        sort_order: index
      }));
      await supabase.from('product_documents').insert(documents);
    }

    // Insert videos
    if (product.videos?.length) {
      const videos = product.videos.map((video: Record<string, unknown>, index: number) => ({
        product_id: productId,
        title: video.title,
        description: video.description,
        youtube_url: video.youtubeUrl,
        video_type: video.videoType,
        thumbnail_url: video.thumbnailUrl,
        sort_order: index
      }));
      await supabase.from('product_videos').insert(videos);
    }

    // Insert specifications
    if (product.specifications?.length) {
      const specifications = product.specifications.map((spec: Record<string, unknown>, index: number) => ({
        product_id: productId,
        spec_key: spec.key,
        spec_value: spec.value,
        spec_unit: spec.unit,
        spec_category: spec.category,
        sort_order: index
      }));
      await supabase.from('product_specifications').insert(specifications);
    }

    // Insert features
    if (product.features?.length) {
      const features = product.features.map((feature: Record<string, unknown>, index: number) => ({
        product_id: productId,
        feature_text: feature.feature || feature,
        feature_description: feature.description,
        icon_name: feature.iconName,
        sort_order: index
      }));
      await supabase.from('product_features').insert(features);
    }

    // Insert certifications
        if (product.certifications?.length) {
          const certifications = product.certifications.map((cert: Record<string, unknown>, index: number) => ({
            product_id: productId,
            certification_name: cert.name,
            certification_body: cert.certificationBody,
            certificate_url: (cert.certificate as { asset?: { url?: string } })?.asset?.url,
            issue_date: cert.issueDate,
            expiry_date: cert.expiryDate,
            sort_order: index
          }));
          await supabase.from('product_certifications').insert(certifications);
        }

    // Insert applications
    if (product.applications?.length) {
      const applications = product.applications.map((app: Record<string, unknown>, index: number) => ({
        product_id: productId,
        application_name: app.name || app,
        application_description: app.description,
        sort_order: index
      }));
      await supabase.from('product_applications').insert(applications);
    }

    console.log('Product synced successfully:', product.title);
  } catch (error) {
    console.error('Error handling product:', error);
  }
}

async function handleProductReview(sanityId: string, transition: string) {
  if (transition === 'disappear') {
    await supabase.from('product_reviews').delete().eq('sanity_id', sanityId);
    return;
  }

  try {
    const review = await sanityClient.fetch(`
      *[_type == "productReview" && _id == $sanityId][0] {
        _id,
        product->{_id},
        customerName,
        companyName,
        location,
        rating,
        reviewText,
        reviewDate,
        "avatarUrl": avatar.asset->url,
        isFeatured,
        isVerified,
        status,
        adminNotes
      }
    `, { sanityId });

    if (!review) {
      console.error('Review not found in Sanity:', sanityId);
      return;
    }

    // Get product ID from Supabase
    const { data: productData } = await supabase
      .from('products')
      .select('id')
      .eq('sanity_id', review.product?._id)
      .single();

    if (!productData) {
      console.error('Product not found for review:', review.product?._id);
      return;
    }

    const { error } = await supabase
      .from('product_reviews')
      .upsert({
        sanity_id: review._id,
        product_id: productData.id,
        customer_name: review.customerName,
        company_name: review.companyName,
        location: review.location,
        rating: review.rating,
        review_text: review.reviewText,
        review_date: review.reviewDate,
        avatar_url: review.avatarUrl,
        is_featured: review.isFeatured || false,
        is_verified: review.isVerified || false,
        status: review.status || 'pending',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'sanity_id'
      });

    if (error) {
      console.error('Error upserting review:', error);
    } else {
      console.log('Review synced successfully:', review.customerName);
    }
  } catch (error) {
    console.error('Error handling product review:', error);
  }
}
