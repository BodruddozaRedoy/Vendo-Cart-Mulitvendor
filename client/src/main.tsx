import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routes } from './routes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51RtYq4JnaHFm9cJ7oqvrPm4xL1AedYSvofzDgMrMA1HtPLBTAPwdNmesMGC8jhmanAblJoHnzdeeRGKFV6WPA63B00PintKW0y")

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
    </Elements>
  </StrictMode>,
)
