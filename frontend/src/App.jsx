import './App.css'
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private.jsx'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import AdminRoute from './components/Routes/AdminRoute.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import CreateCategory from './pages/admin/CreateCategory.jsx'
import CreateProduct from './pages/admin/CreateProduct.jsx'
import Users from './pages/admin/Users.jsx'
import Profile from "./pages/user/Profile.jsx"
import Orders from "./pages/user/Orders.jsx"
import Products from "./pages/admin/Products.jsx"
import UpdateProduct from './pages/admin/UpdateProduct.jsx'
import Search from './pages/Search.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Categories from './pages/Categories.jsx'
import CategoryProduct from './pages/CategoryProduct.jsx'
import CartPage from './pages/CartPage.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product/:slug" element={<ProductDetails/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/category/:slug" element={<CategoryProduct/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="user" element={<Dashboard/>}></Route>
            <Route path="user/profile" element={<Profile/>}/>
            <Route path="user/orders" element={<Orders/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}></Route>
            <Route path="admin/create-category" element={<CreateCategory/>}></Route>
            <Route path="admin/create-product" element={<CreateProduct/>}></Route>
            <Route path="admin/product/:slug" element={<UpdateProduct/>}></Route>
            <Route path="admin/products" element={<Products/>}></Route>
            <Route path="admin/users" element={<Users/>}></Route>
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App
