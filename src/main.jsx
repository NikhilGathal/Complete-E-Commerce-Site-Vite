import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '../store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Wish from '../pages/Wish'
import AboutUs from '../components/About'
import ContactUs from '../components/Contact'
import ItemDetail from '../components/ItemDetail'
import ContactForm from '../components/ContactForm'
import Myorders from '../pages/Myorders'
import CarouselPage from '../components/CarouselPage'
import Diwali from '../components/Diwali'
import AdminDashBoard from '../components/AdminDashBoard'
import UpdateProduct from '../components/UpdateProduct'
import AddNewProduct from '../components/AddNewProduct'
import OrderConfirmation from '../components/OrderConfirmation'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: <Myorders />,
      },
      {
        path: '/wish',
        element: <Wish />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/diwali',
        element: <Diwali />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
        children: [
          {
            path: 'feedback', // Nested route for /contact/form
            element: <ContactForm />,
          },
        ],
      },
      {
        path: '/:productId',
        element: <ItemDetail />,
      },

      {
        path: '/carousel/:carousel',
        element: <CarouselPage />,
      },

      {
        path: '/Admin',
        element: <AdminDashBoard />,
      },
      { path: '/update-product/:id', 
        element: <UpdateProduct /> 
      },
      {
        path: '/Add',
        element: <AddNewProduct/>
      }
      ,{
        path:"/OrderConfirmation",
        element: <OrderConfirmation/>
      }
    ],
  },
])
createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
