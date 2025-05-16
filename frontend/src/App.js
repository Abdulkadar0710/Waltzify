import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Home/Navbar';
import Hero from './Pages/Home/Hero';
import Content from './Pages/Home/Content';
import Collections from './Pages/Home/Collections';
import Products from './Pages/Home/Products';
import OneProduct from './Pages/Home/OneProduct';
import Footer from './Pages/Footer';
import ProductDetail from './Pages/Products/ProductDetail';
import ScrollToTop from './ScrollToTop';
import Cart from './Pages/Cart/Cart';
import Wishlist from './Pages/Wishlist/Wishlist';
import NewArrival from './Pages/Home/NewArrival';
import NewArrivalPage from './Pages/New Arrival/NewArrivalPage';
import Whatsapp from './Pages/Whatsapp';
import Login from './Pages/Auth/login';
import Register from './Pages/Auth/Register';
import Return from './Pages/Return/Return';
import AllProducts from './Pages/Products/AllProducts';
import User from './Pages/User/User';
import HotDeals from './Pages/Hot Deals/HotDeals';
import AboutUs from './Pages/Footer pages/AboutUs'; 
import TnC from './Pages/Footer pages/TnC';
import ReturnPolicy from './Pages/Footer pages/ReturnPolicy';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Checkout from './Pages/Cart/Checkout';
import AdminSign from './Pages/Auth/AdminSign';
import NavAfterLog from './Pages/NavAfterLog';
import AdminFooter from './Pages/AdminFooter';
import Sidebar from './Pages/Sidebar';
import AdminLogin from './Pages/Auth/AdminLogin';
import Home from './Dashboard/Home';
import AddCategoryList from './Dashboard/Category/AddCategoryList';
import CategoryList from './Dashboard/Category/CategoryList';
import NewCategory from './Dashboard/Category/NewCategory';
import OrderDetails from './Dashboard/Orders/OrderDetails';
import OrderList from './Dashboard/Orders/OrderList';
import AddProductList from './Dashboard/Product/AddProductList';
import AddtoProduct from './Dashboard/Product/AddtoProduct';
import ProductList from './Dashboard/Product/ProductList';
import AddReview from './Dashboard/Reviews/AddReview';
import Review from './Dashboard/Reviews/Review';
import Userlist from './Dashboard/User/UserList';
import ProtectedRoute from './ProtectedRoute';
import Collection from './Dashboard/Category/Collection';
import AddBanner from './Dashboard/Category/AddBanner';
import AddNewArrival from './Dashboard/Product/AddNewArrival';
import AddNewArrivalBanner from './Dashboard/Product/AddNewArrivalBanner';
import AddOneProduct from './Dashboard/Product/AddOneProduct';
import MyOrders from './Pages/User/myOrders/MyOrders';
import CollectionList from './Dashboard/Category/CollectionList';
import { UserProvider } from './Context/UserContext';
import Category from './Pages/Display Category/Category';
import ResetPassword from './Pages/Auth/ResetPassword';
import UpdateCategory from './Dashboard/Category/UpdateCategory';
import ReviewProduct from './Pages/Products/ReviewProduct';
import AddProductSize from './Dashboard/Product/AddProductSize';
import ChangeAdminPassword from './Pages/Auth/ChangeAdminPassword';
import ResetAdminPassword from './Pages/Auth/ResetAdminPassword';
import UpdateCollection from './Dashboard/Category/UpdateCollection';
import AddDefaultBanner from './Dashboard/Product/AddDefaultBannerHome';
import AddDefaultBannerNewArrival from './Dashboard/Product/AddDefaultBannerNewArrival';
import ContactUsDetails from './Dashboard/User/ContactUsDetails';
import UpdateProduct from './Dashboard/Product/UpdateProducts';
import EnterOTP from './Pages/Auth/EnterOTP';
import Recipt from './Pages/Receipts/Recipt';
import ReciptP2 from './Pages/Receipts/ReciptP2';
import InvoiceForm from './Dashboard/Orders/InvoiceForm';
import ReadyToShip from './Dashboard/Orders/ReadyToShip';
import InTransit from './Dashboard/Orders/InTransit';
import All from './Dashboard/Orders/All';
import UserReceipt from './Pages/User/myOrders/UserReceipt';
import ReadyToShipInvoice from './Pages/Receipts/ReadyToShipInvoice';
import InTransitInvoice from './Pages/Receipts/InTransitInvoice';
import InTransitLabel from './Pages/Receipts/InTransitLabel';
import ReadyToShipLabel from './Pages/Receipts/ReadyToShipLabel';
import AddCourierCompany from './Dashboard/Orders/AddCourierCompany';
import UserReceipts from './Pages/Receipts/UserReceipts';
import AddAdmin from './Dashboard/AddAdmin';
import AdminList from './Dashboard/AdminList';
import EnterAdminOTP from './Pages/Auth/EnterAdminOTP';
import UpdateUserAddress from './Pages/Cart/UpdateUserAddress';
import AllSubscribers from './Dashboard/User/AllSubscribers';
import CourierCompanyList from './Dashboard/Orders/CourierCompanyList';
import UpdateCompany from './Dashboard/Orders/UpdateCompany';
import NotFound from './Pages/NotFound';
function App() {
  const [countcart, setCountcart] = useState(0);
  const [countwish, setCountwish] = useState(0);
  const [selectedcartItems, setSelectedcartItems] = useState([]);
  const [selectedwishItems, setSelectedwishItems] = useState([]);

  const addtocart = (item) =>{
    setCountcart(countcart+1);
    setSelectedcartItems([...selectedcartItems,item]);
  }
  const removecart = (itemToRemove) =>{
    setCountcart(countcart-1);
    const updatedItems = selectedcartItems.filter((item) => item !== itemToRemove);
    setSelectedcartItems(updatedItems);
  }

  const addwish = (item) =>{
    setCountwish(countwish+1);
    setSelectedwishItems([...selectedwishItems,item]);
  }
  const removewish = (itemToRemove) =>{
    const updatedItems = selectedwishItems.filter((item) => item!== itemToRemove);
    setSelectedwishItems(updatedItems);
    setCountwish(countwish-1);
  }

  return (
    
    <Router>
      <UserProvider>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={
          <>
          <Navbar />
             <Hero/>  
            <Whatsapp/>
            <Content/> 
            <Collections/> 
            <Products/> 
            <OneProduct/>
            <NewArrival/>  
            <Footer/>
          </>
        }/>
        <Route path='/WI/:id' element={
          <>
            <Navbar />
            <Whatsapp/>
            <ProductDetail />
            <Footer/>
          </>
        }/>
       
        <Route path='/cart' element = {
          <>
            <Navbar />
            <Whatsapp/>
            <Cart />
            <Footer/>
          </>
        }/>
        <Route path='/checkout' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <Checkout selectedItems={selectedcartItems}/>
            <Footer/>
          </>
        }/>
        <Route path='/wish' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <Wishlist selectedItems={selectedwishItems} removewish={removewish}/>
            <Footer/>
          </>
        }/>
        {/* <Route path='/cap' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Cap/>
            <Footer/>
          </>
        }/>
        <Route path='/gloves' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Gloves/>
            <Footer/>
          </>
        }/> */}
        <Route path='/newarrival' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <NewArrivalPage/>
            <Footer/>
          </>
        }/>
        {/*Dashboard*/}
         {/*Admin Login*/}
         <Route path='/AdminLogin' element = {
          <>
            <NavAfterLog/>
            <AdminLogin/>
            <AdminFooter/>
          </>
        }/>
         {/*Admin Sign*/}
         <Route path='/AdminSign' element = {
          <>
            
            <AdminSign/>
            <AdminFooter/>
          </>
        }/>
        <Route path='/changeadminpassword' element = {
          <>
            
            <ChangeAdminPassword/>
            <AdminFooter/>
          </>
        }/>
        <Route path='/enteradminotp' element = {
          <>
            
            <EnterAdminOTP/>
            <AdminFooter/>
          </>
        }/>
         <Route path='/resetadminpassword' element = {
          <>
            
            <ResetAdminPassword/>
            <AdminFooter/>
          </>
        }/>
      
        <Route path='/addproduct' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddtoProduct/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/addoneproduct' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddOneProduct/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/addproductsize' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin' , 'Main Admin']}>
          <NavAfterLog/>
          <AddProductSize/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/productlist' element = {
        <>
          <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <ProductList/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/addnewarrival' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddNewArrival/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/addnewarrivalbanner' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddNewArrivalBanner/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/adddefaultbanner' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddDefaultBanner/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/adddefaultbannernewarrival' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddDefaultBannerNewArrival/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/NavAfterLog' element = {
        <>
         <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <Home/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
        
      }/>
      <Route path='/newcategory' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <NewCategory/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/UpdateProduct/:id' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <UpdateProduct/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/UpdateCategory/:id' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <UpdateCategory/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/UpdateCollection/:id' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <UpdateCollection/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/collectionlist' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <CollectionList/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/UpdateCollection/:id' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <UpdateCategory/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/addbanner' element = {
        <>
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddBanner/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/categorylist' element = {
        <>
         <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <CategoryList/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/collection' element = {
        <>
         <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <Collection/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/orderlist' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <OrderList/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/addcouriercompany' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddCourierCompany/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/couriercompanylist' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <CourierCompanyList/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/updatecompany/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <UpdateCompany/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/readytoship' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <ReadyToShip/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/all' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <All/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/intransit' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <InTransit/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/readytoshipinvoice/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <ReadyToShipInvoice/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/> 
      <Route path='/intransitinvoice/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <InTransitInvoice/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/> 
      <Route path='/intransitinvoice/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <InTransitInvoice/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/> 
       <Route path='/intransitlabel/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <InTransitLabel/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/> 
      <Route path='/readytoshiplabel/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <ReadyToShipLabel/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/> 
       <Route path='/userreceipt/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <UserReceipts/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/> 
      <Route path='/receipt' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <ReciptP2/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/receipt_invoice/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandleOrderAdmin', 'Sub Admin','Main Admin']}>
          <NavAfterLog/>
          <Recipt/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/generatinginvoiceform/:id' element = {
        <>
         <ProtectedRoute requiredRole={['HandlOrderAdmin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <InvoiceForm/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/orderdetails' element = {
        <>
           <ProtectedRoute requiredRole={['HandleOrderAdmin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <OrderDetails/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/review' element = {
        <>
        
        <ProtectedRoute requiredRole={['Sub Admin','Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <Review/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       <Route path='/addreview' element = {
        <>
         
        <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AddReview/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/userlist' element = {
        <>
       <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <Userlist/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/contactusdetails' element = {
        <>
       <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <ContactUsDetails/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/allsubscribers' element = {
        <>
       <ProtectedRoute requiredRole={['Sub Admin', 'Main Admin']}>
          <NavAfterLog/>
          <AllSubscribers/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
       
       <Route path='/addadmin' element = {
        <>
        <ProtectedRoute requiredRole={['Main Admin']}>
          <NavAfterLog/>
          <AddAdmin/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
      <Route path='/adminlist' element = {
        <>
        <ProtectedRoute requiredRole={['Main Admin']}>
          <NavAfterLog/>
          <AdminList/>
          <AdminFooter/>
          </ProtectedRoute>
        </>
      }/>
        
        <Route path='/login' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Login/>
            <Footer/>
          </>
        }/>
        <Route path='/register' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Register/>
            <Footer/>
          </>
        }/>
        <Route path='/return' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Return/>
            <Footer/>
          </>
        }/>
        <Route path='/allproduct' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <AllProducts/>
            <Footer/>
          </>
        }/>
        <Route path='/reviewproduct/:id' element = {
        <>
          <Navbar/>
          <ReviewProduct/>
          <Footer/>
        </>
      }/>
       <Route path='/user_receipt/:id' element = {
        <>
          <Navbar/>
          <UserReceipt/>
          <Footer/>
        </>
      }/>
        <Route path='/myorders' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <MyOrders/>
            <Footer/>
          </>
        }/>
        <Route path='/UpdateUserAddress/:addressId' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <UpdateUserAddress/>
            <Footer/>
          </>
        }/>
        {/* <Route path='/Safety Products' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <SafetyProducts/>
            <Footer/>
          </>
        }/> */}
        <Route path='/category/:category' element={
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <Category/>
            <Footer/>
          </>
        }/>
    
        <Route path='/user' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <User/>
            <Footer/>
          </>
        }/>
        <Route path='/hotdeals' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <HotDeals/>
            <Footer/>
          </>
        }/>
        <Route path='/about' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <AboutUs/>
            <Footer/>
          </>
        }/>
        <Route path='/terms' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <TnC/>
            <Footer/>
          </>
        }/>
        <Route path='/returnpolicy' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <ReturnPolicy/>
            <Footer/>
          </>
        }/>
        <Route path='/forgotpassword' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <ForgotPassword/>
            <Footer/>
          </>
        }/>
        <Route path='/enterotp' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <EnterOTP/>
            <Footer/>
          </>
        }/>
        <Route path='/resetpassword' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <ResetPassword/>
            <Footer/>
          </>
        }/>
         <Route path='*' element = {
          <>
            <Navbar countcart={countcart} countwish={countwish}/>
            <Whatsapp/>
            <NotFound/>
            <Footer/>
          </>
        }/>
      </Routes>
      </UserProvider>
    </Router>
    
  );
}

export default App;
