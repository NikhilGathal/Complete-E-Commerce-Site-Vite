import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '../store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Wish from '../pages/Wish'
import OrderPlace from '../components/OrderPlace'
import AboutUs from '../components/About'
import ContactUs from '../components/Contact'
import ItemDetail from '../components/ItemDetail'
import ContactForm from '../components/ContactForm'
import Myorders from '../pages/Myorders'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/myorder',
        element: <Myorders/>,
      },
      {
        path: '/wish',
        element: <Wish />,
      },
      {
        path: '/Order',
        element: <OrderPlace />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
        children: [
          {
            path: 'feedback',  // Nested route for /contact/form
            element: <ContactForm />,
          },
        ]
      },
      {
        path: '/:productId',
        element: <ItemDetail />,
      },
    ],
  },
])
createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)


