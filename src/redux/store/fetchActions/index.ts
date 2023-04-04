import apiService from '../../../services/apiService';
import { setProducts } from '../ducks/products';
import { updateCartItemQuantity } from '../ducks/cart';

export const fetchProducts = (): any => {
  
  return (dispatch: any) => {
        
    apiService.get('/products').then((response) => {
      
      dispatch(setProducts(response.data.data));

    }).catch((error) => {
      console.log(error)
    });
  }
}

export const addItemCart = (productItem: any) => {
  return (dispatch: any) => {
    dispatch(setProducts(productItem));
  }
}

export const addPurchaseOrder = (dataForm: any) => {
  return (dispatch: any) => {
   
    apiService.post(`/products/store`, dataForm).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }
}

