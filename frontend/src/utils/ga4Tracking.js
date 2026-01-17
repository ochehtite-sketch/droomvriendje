/**
 * GA4 E-commerce Tracking Utility
 * Implementeert Google Analytics 4 e-commerce events voor Droomvriendjes
 * 
 * Events:
 * - view_item_list: Productlijst bekeken
 * - view_item: Product detail bekeken
 * - select_item: Product geselecteerd uit lijst
 * - add_to_cart: Product toegevoegd aan winkelwagen
 * - remove_from_cart: Product verwijderd uit winkelwagen
 * - view_cart: Winkelwagen bekeken
 * - begin_checkout: Checkout gestart
 * - add_shipping_info: Verzendgegevens toegevoegd
 * - add_payment_info: Betaalgegevens toegevoegd
 * - purchase: Aankoop voltooid
 */

// Constanten
const CURRENCY = 'EUR';
const AFFILIATION = 'Droomvriendjes';
const BRAND = 'Droomvriendjes';
const GOOGLE_BUSINESS_VERTICAL = 'retail';

/**
 * Push event naar dataLayer
 */
const pushToDataLayer = (event, ecommerce) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    // Clear previous ecommerce object
    window.dataLayer.push({ ecommerce: null });
    
    // Push new event
    window.dataLayer.push({
      event,
      ecommerce
    });
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔵 GA4 Event:', event, ecommerce);
    }
  }
};

/**
 * Converteer product naar GA4 item formaat
 */
export const productToGA4Item = (product, index = 0, listId = null, listName = null, quantity = 1, coupon = null) => {
  const item = {
    item_id: product.item_id || `KNUF_${String(product.id).padStart(3, '0')}`,
    item_name: product.name,
    affiliation: AFFILIATION,
    index,
    item_brand: BRAND,
    item_category: product.item_category || 'Knuffels',
    item_category2: product.item_category2 || 'Slaapknuffels',
    item_category3: product.item_category3 || product.shortName,
    item_category4: product.item_category4 || 'Standaard',
    item_category5: product.item_category5 || 'Met Projectie',
    item_variant: product.item_variant || 'standaard',
    price: product.price,
    google_business_vertical: GOOGLE_BUSINESS_VERTICAL,
    quantity
  };

  // Optionele velden
  if (listId) item.item_list_id = listId;
  if (listName) item.item_list_name = listName;
  if (coupon) item.coupon = coupon;
  if (product.originalPrice > product.price) {
    item.discount = Number((product.originalPrice - product.price).toFixed(2));
  }

  return item;
};

/**
 * VIEW_ITEM_LIST - Productlijst bekeken (homepage, categorie pagina)
 */
export const trackViewItemList = (products, listId = 'alle_knuffels', listName = 'Alle Knuffels') => {
  const items = products.map((product, index) => 
    productToGA4Item(product, index, listId, listName)
  );

  pushToDataLayer('view_item_list', {
    item_list_id: listId,
    item_list_name: listName,
    items
  });
};

/**
 * SELECT_ITEM - Product geselecteerd uit lijst
 */
export const trackSelectItem = (product, index = 0, listId = 'alle_knuffels', listName = 'Alle Knuffels') => {
  const item = productToGA4Item(product, index, listId, listName);

  pushToDataLayer('select_item', {
    item_list_id: listId,
    item_list_name: listName,
    items: [item]
  });
};

/**
 * VIEW_ITEM - Product detail pagina bekeken
 */
export const trackViewItem = (product) => {
  const item = productToGA4Item(product);

  pushToDataLayer('view_item', {
    currency: CURRENCY,
    value: product.price,
    items: [item]
  });
};

/**
 * ADD_TO_CART - Product toegevoegd aan winkelwagen
 */
export const trackAddToCart = (product, quantity = 1) => {
  const item = productToGA4Item(product, 0, null, null, quantity);

  pushToDataLayer('add_to_cart', {
    currency: CURRENCY,
    value: product.price * quantity,
    items: [item]
  });
};

/**
 * REMOVE_FROM_CART - Product verwijderd uit winkelwagen
 */
export const trackRemoveFromCart = (product, quantity = 1) => {
  const item = productToGA4Item(product, 0, null, null, quantity);

  pushToDataLayer('remove_from_cart', {
    currency: CURRENCY,
    value: product.price * quantity,
    items: [item]
  });
};

/**
 * VIEW_CART - Winkelwagen bekeken
 */
export const trackViewCart = (cartItems) => {
  const items = cartItems.map((cartItem, index) => 
    productToGA4Item(cartItem, index, null, null, cartItem.quantity)
  );

  const value = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  pushToDataLayer('view_cart', {
    currency: CURRENCY,
    value: Number(value.toFixed(2)),
    items
  });
};

/**
 * BEGIN_CHECKOUT - Checkout gestart
 */
export const trackBeginCheckout = (cartItems, coupon = null) => {
  const items = cartItems.map((cartItem, index) => 
    productToGA4Item(cartItem, index, null, null, cartItem.quantity, coupon)
  );

  const value = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const ecommerce = {
    currency: CURRENCY,
    value: Number(value.toFixed(2)),
    items
  };

  if (coupon) ecommerce.coupon = coupon;

  pushToDataLayer('begin_checkout', ecommerce);
};

/**
 * ADD_SHIPPING_INFO - Verzendgegevens toegevoegd
 */
export const trackAddShippingInfo = (cartItems, shippingTier = 'Gratis Verzending', coupon = null) => {
  const items = cartItems.map((cartItem, index) => 
    productToGA4Item(cartItem, index, null, null, cartItem.quantity, coupon)
  );

  const value = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const ecommerce = {
    currency: CURRENCY,
    value: Number(value.toFixed(2)),
    shipping_tier: shippingTier,
    items
  };

  if (coupon) ecommerce.coupon = coupon;

  pushToDataLayer('add_shipping_info', ecommerce);
};

/**
 * ADD_PAYMENT_INFO - Betaalgegevens toegevoegd
 */
export const trackAddPaymentInfo = (cartItems, paymentType = 'iDEAL', coupon = null) => {
  const items = cartItems.map((cartItem, index) => 
    productToGA4Item(cartItem, index, null, null, cartItem.quantity, coupon)
  );

  const value = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const ecommerce = {
    currency: CURRENCY,
    value: Number(value.toFixed(2)),
    payment_type: paymentType,
    items
  };

  if (coupon) ecommerce.coupon = coupon;

  pushToDataLayer('add_payment_info', ecommerce);
};

/**
 * PURCHASE - Aankoop voltooid
 */
export const trackPurchase = (orderId, cartItems, shipping = 0, tax = 0, coupon = null) => {
  const items = cartItems.map((cartItem, index) => 
    productToGA4Item(cartItem, index, null, null, cartItem.quantity, coupon)
  );

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const value = subtotal + shipping;

  const ecommerce = {
    transaction_id: orderId,
    currency: CURRENCY,
    value: Number(value.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    items
  };

  if (coupon) ecommerce.coupon = coupon;

  pushToDataLayer('purchase', ecommerce);
};

/**
 * REFUND - Terugbetaling (optioneel)
 */
export const trackRefund = (orderId, cartItems = null) => {
  const ecommerce = {
    transaction_id: orderId,
    currency: CURRENCY
  };

  // Als items meegegeven worden, is het een gedeeltelijke refund
  if (cartItems && cartItems.length > 0) {
    ecommerce.items = cartItems.map((cartItem, index) => 
      productToGA4Item(cartItem, index, null, null, cartItem.quantity)
    );
    ecommerce.value = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  pushToDataLayer('refund', ecommerce);
};

// Export alle functies
export default {
  productToGA4Item,
  trackViewItemList,
  trackSelectItem,
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackAddShippingInfo,
  trackAddPaymentInfo,
  trackPurchase,
  trackRefund
};
