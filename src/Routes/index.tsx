import { Routes, Route } from 'react-router-dom';
import Product from '../screen/Product';
import Cart from '../screen/Cart';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/produtos' element={<Product />}/>
      <Route path='/cart' element={<Cart />}/>
    </Routes>
  )
}