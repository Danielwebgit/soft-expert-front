import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/store/fetchActions';
import { addItemCart } from '../../redux/store/ducks/cart';
import Grid from '@mui/material/Grid';
import { Card } from "@material-ui/core";
import store, { RootState } from '../../redux/store';
import { Button } from '@mui/material';

const Product = () => {

  const dispatch = useDispatch();

  const { products }: any = useSelector((state: RootState): any => state.products) ?? [];
  const { cartItems }: any = useSelector((state: RootState): any => state.cartItems) ?? [];
  const [productsCart, setProductCar] = useState(cartItems)

  //console.log(products[0])
  useEffect(() => {

    dispatch(fetchProducts());

  }, [])

  const handleAddItemCart = (productItem: any) => {
    const isItemInCart: any = cartItems.find((itemCart: any) => itemCart.id == productItem.id);

    const productItemCartAdd: any = {
      id: productItem.id, 
      name : productItem.name, 
      description : productItem.description, 
      price : productItem.price, 
      qtd : 1,
      img: productItem.img,
      vltItem: 0.00
    }

    if(!isItemInCart){
      console.log("Item adicionado com sucesso")
      console.log(productItemCartAdd)
      dispatch(addItemCart(productItemCartAdd))
    } else {
      console.log("Item já existe no carrinho")
    }  
  }

  return (
    <Grid container spacing={2} style={{marginTop: 40}}>

      {products[0]?.map((row: any) => (
      <Grid item xs={12} sm={12} md={4} lg={4} style={{ backgroundColor: "#e8927554" }}>
        <div>
          <Card style={{display: "flex", flexDirection: "column", backgroundColor: "#c0d5c2", justifyContent: "center"}}>
            <div>
              <img style={{ borderRadius: "15px", width: "100%", height: "40%"}} src={row.product.img} alt="" />
            </div>
            <div style={{display: "flex", justifyContent: "center", fontSize: 28}}>
            <h5>{row.product.name}</h5>
            </div>
            
            <div style={{ fontSize: 25, marginLeft: 40}}>
              {row.product.price}
            </div>
              <Button onClick={() => handleAddItemCart(row.product)}>Adicionar no carrinho</Button>
          </Card>
        </div>
      </Grid>
      ))}
      
    </Grid>
  )
}

export default Product;