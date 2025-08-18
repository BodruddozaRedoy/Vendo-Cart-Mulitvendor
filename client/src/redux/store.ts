import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import { productApi } from './features/products/productApi'
import { categoryApi } from './features/category/categoryApi'
import { vendorApi } from './features/vendor/vendorApi'
import { cartApi } from './features/cart/cartApi'
import { wishlistApi } from './features/wishlist/wishlistApi'
import { orderApi } from './features/order/orderApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [vendorApi.reducerPath]:vendorApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    [wishlistApi.reducerPath]:wishlistApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productApi.middleware).concat(categoryApi.middleware).concat(vendorApi.middleware).concat(cartApi.middleware).concat(wishlistApi.middleware).concat(orderApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch