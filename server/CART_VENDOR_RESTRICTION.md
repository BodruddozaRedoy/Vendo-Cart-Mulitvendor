# Cart Vendor Restriction Implementation

## Overview
The cart system has been updated to prevent users from adding products from multiple vendors in the same cart. This ensures that users can only purchase from one vendor at a time, which is a common requirement for multi-vendor marketplaces.

## Key Features

### 1. Vendor Consistency Check
- When adding a product to cart, the system checks if it's from the same vendor as existing products
- If a different vendor's product is attempted to be added, the request is rejected with a clear error message

### 2. New API Endpoints

#### `POST /cart` - Add to Cart
- Validates vendor consistency
- Prevents adding products from different vendors
- Returns error with suggestion to clear cart if vendor mismatch

#### `DELETE /cart/clear-for-new-vendor` - Clear Cart for New Vendor
- Allows users to clear their cart and switch to a different vendor
- Resets `vendorId` to allow new vendor products

#### `GET /cart/summary` - Get Cart Summary
- Provides detailed cart information including vendor details
- Shows total items, price, and vendor information

### 3. Error Handling
When attempting to add a product from a different vendor:
```json
{
  "message": "You can only buy from one vendor at a time. Please clear your cart first to add products from a different vendor.",
  "suggestion": "Use DELETE /cart/clear-for-new-vendor to clear your cart and switch vendors",
  "currentVendorId": "current_vendor_id",
  "newProductVendorId": "new_product_vendor_id"
}
```

## Implementation Details

### Cart Model Updates
- `vendorId` field is now optional to allow clearing when switching vendors
- Cart maintains vendor consistency throughout its lifecycle

### Validation Rules
1. **Quantity Validation**: Must be greater than 0
2. **Stock Validation**: Cannot add more than available stock
3. **Vendor Validation**: All products must be from the same vendor

### User Flow
1. User adds first product → Cart is created with that product's vendor
2. User adds more products from same vendor → Products are added normally
3. User attempts to add product from different vendor → Error returned with suggestion
4. User clears cart using special endpoint → Can now add products from different vendor

## API Usage Examples

### Add Product to Cart
```bash
POST /cart
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Clear Cart for New Vendor
```bash
DELETE /cart/clear-for-new-vendor
```

### Get Cart Summary
```bash
GET /cart/summary
```

## Benefits
1. **Vendor Consistency**: Ensures all cart items are from the same vendor
2. **Better User Experience**: Clear error messages with actionable suggestions
3. **Flexibility**: Users can easily switch vendors by clearing their cart
4. **Data Integrity**: Prevents mixed-vendor carts that could cause issues during checkout

## Future Enhancements
- Add vendor information display in cart UI
- Implement cart merging when switching vendors
- Add vendor-specific shipping and tax calculations
