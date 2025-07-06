
export interface PayPalOrderData {
  items: Array<{
    id: number;
    title: string;
    price: number;
  }>;
  totalAmount: number;
}

export const createPayPalCheckoutUrl = (orderData: PayPalOrderData): string => {
  const baseUrl = 'https://www.paypal.com/cgi-bin/webscr';
  const params = new URLSearchParams({
    cmd: '_cart',
    upload: '1',
    business: 'your-paypal-email@example.com', // Replace with your PayPal business email
    currency_code: 'USD',
    return: `${window.location.origin}/payment-success`,
    cancel_return: `${window.location.origin}/payment-cancelled`,
    notify_url: `${window.location.origin}/paypal-ipn`
  });

  // Add each item to the cart
  orderData.items.forEach((item, index) => {
    const itemNum = index + 1;
    params.append(`item_name_${itemNum}`, item.title);
    params.append(`amount_${itemNum}`, item.price.toString());
    params.append(`quantity_${itemNum}`, '1');
    params.append(`item_number_${itemNum}`, item.id.toString());
  });

  return `${baseUrl}?${params.toString()}`;
};

export const handlePayPalCheckout = (orderData: PayPalOrderData) => {
  const checkoutUrl = createPayPalCheckoutUrl(orderData);
  
  // Log the transaction for debugging
  console.log('PayPal Checkout initiated:', {
    items: orderData.items.length,
    total: orderData.totalAmount
  });
  
  // Open PayPal in the same window for better UX
  window.location.href = checkoutUrl;
};
