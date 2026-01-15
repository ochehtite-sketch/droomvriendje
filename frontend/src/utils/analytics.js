/**
 * Google Analytics 4 E-commerce Tracking
 * Events: view_item, add_to_cart, begin_checkout, add_payment_info, purchase, contact_form_submit
 */

// Check if gtag is available
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Format product for GA4
const formatProductForGA4 = (product, quantity = 1) => ({
  item_id: product.id?.toString() || product.product_id,
  item_name: product.shortName || product.name || product.product_name,
  price: parseFloat(product.price) || 0,
  quantity: quantity,
  item_category: 'Slaapknuffel',
  item_brand: 'Droomvriendjes',
});

// Format cart items for GA4
const formatCartForGA4 = (cart) => {
  return cart.map(item => formatProductForGA4(item, item.quantity));
};

// Calculate cart total
const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Track: Product Viewed (view_item)
 */
export const trackViewItem = (product) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'view_item', {
    currency: 'EUR',
    value: parseFloat(product.price) || 0,
    items: [formatProductForGA4(product)]
  });
  
  console.log('📊 GA4: view_item', product.shortName || product.name);
};

/**
 * Track: Add to Cart (add_to_cart)
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (!isGtagAvailable()) return;
  
  const value = parseFloat(product.price) * quantity;
  
  // GA4: Standard e-commerce event
  window.gtag('event', 'add_to_cart', {
    currency: 'EUR',
    value: value,
    items: [formatProductForGA4(product, quantity)]
  });
  
  // Google Ads: Conversion event (legacy)
  window.gtag('event', 'ads_conversion_Add_to_cart_1', {
    currency: 'EUR',
    value: value,
    items: [formatProductForGA4(product, quantity)]
  });
  
  // Google Ads: conversion_event_add_to_cart
  window.gtag('event', 'conversion_event_add_to_cart', {
    currency: 'EUR',
    value: value,
    items: [formatProductForGA4(product, quantity)]
  });
  
  console.log('📊 GA4: add_to_cart', product.shortName || product.name);
};

/**
 * Track: Remove from Cart (remove_from_cart)
 */
export const trackRemoveFromCart = (product, quantity = 1) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'remove_from_cart', {
    currency: 'EUR',
    value: parseFloat(product.price) * quantity,
    items: [formatProductForGA4(product, quantity)]
  });
  
  console.log('📊 GA4: remove_from_cart', product.shortName || product.name);
};

/**
 * Track: View Cart (view_cart)
 */
export const trackViewCart = (cart) => {
  if (!isGtagAvailable() || !cart.length) return;
  
  window.gtag('event', 'view_cart', {
    currency: 'EUR',
    value: calculateTotal(cart),
    items: formatCartForGA4(cart)
  });
  
  console.log('📊 GA4: view_cart', cart.length, 'items');
};

/**
 * Track: Begin Checkout (begin_checkout) - CONVERSION EVENT
 */
export const trackBeginCheckout = (cart, customerEmail = '') => {
  if (!isGtagAvailable() || !cart.length) return;
  
  window.gtag('event', 'begin_checkout', {
    currency: 'EUR',
    value: calculateTotal(cart),
    items: formatCartForGA4(cart),
    coupon: ''
  });
  
  console.log('📊 GA4: begin_checkout', calculateTotal(cart), 'EUR');
};

/**
 * Track: Add Payment Info (add_payment_info)
 */
export const trackAddPaymentInfo = (cart, paymentMethod) => {
  if (!isGtagAvailable() || !cart.length) return;
  
  window.gtag('event', 'add_payment_info', {
    currency: 'EUR',
    value: calculateTotal(cart),
    payment_type: paymentMethod,
    items: formatCartForGA4(cart)
  });
  
  console.log('📊 GA4: add_payment_info', paymentMethod);
};

/**
 * Track: Add Shipping Info (add_shipping_info)
 */
export const trackAddShippingInfo = (cart, shippingMethod = 'gratis_verzending') => {
  if (!isGtagAvailable() || !cart.length) return;
  
  window.gtag('event', 'add_shipping_info', {
    currency: 'EUR',
    value: calculateTotal(cart),
    shipping_tier: shippingMethod,
    items: formatCartForGA4(cart)
  });
  
  console.log('📊 GA4: add_shipping_info');
};

/**
 * Track: Purchase (purchase) - MAIN CONVERSION EVENT
 */
export const trackPurchase = (orderData) => {
  if (!isGtagAvailable()) return;
  
  const items = (orderData.items || []).map(item => ({
    item_id: item.product_id,
    item_name: item.product_name,
    price: parseFloat(item.price),
    quantity: item.quantity,
    item_category: 'Slaapknuffel',
    item_brand: 'Droomvriendjes',
  }));
  
  window.gtag('event', 'purchase', {
    transaction_id: orderData.order_id || orderData._id,
    value: parseFloat(orderData.total_amount),
    currency: 'EUR',
    tax: 0,
    shipping: 0,
    items: items
  });
  
  console.log('📊 GA4: purchase', orderData.order_id, orderData.total_amount, 'EUR');
};

/**
 * Track: Contact Form Submit (generate_lead)
 */
export const trackContactFormSubmit = (formData) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'generate_lead', {
    currency: 'EUR',
    value: 10, // Estimated lead value
    lead_source: 'contact_form',
    form_name: formData.onderwerp || 'contact'
  });
  
  // Also track as custom event for more detail
  window.gtag('event', 'contact_form_submit', {
    form_subject: formData.onderwerp,
    page_location: formData.page_url || window.location.href
  });
  
  console.log('📊 GA4: contact_form_submit');
};

/**
 * Track: Checkout Started (click_checkout) - Custom micro-conversion
 */
export const trackCheckoutClicked = (cart, customerEmail) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'click_checkout', {
    currency: 'EUR',
    value: calculateTotal(cart),
    items_count: cart.length,
    customer_email_provided: !!customerEmail
  });
  
  console.log('📊 GA4: click_checkout');
};

/**
 * Track: Product List View (view_item_list)
 */
export const trackViewItemList = (products, listName = 'Homepage Products') => {
  if (!isGtagAvailable() || !products.length) return;
  
  const items = products.map((product, index) => ({
    ...formatProductForGA4(product),
    index: index,
    item_list_name: listName
  }));
  
  window.gtag('event', 'view_item_list', {
    item_list_name: listName,
    items: items
  });
  
  console.log('📊 GA4: view_item_list', listName, products.length, 'products');
};

/**
 * Track: Product Click from List (select_item)
 */
export const trackSelectItem = (product, listName = 'Homepage Products') => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'select_item', {
    item_list_name: listName,
    items: [formatProductForGA4(product)]
  });
  
  console.log('📊 GA4: select_item', product.shortName || product.name);
};

export default {
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackAddPaymentInfo,
  trackAddShippingInfo,
  trackPurchase,
  trackContactFormSubmit,
  trackCheckoutClicked,
  trackViewItemList,
  trackSelectItem
};
