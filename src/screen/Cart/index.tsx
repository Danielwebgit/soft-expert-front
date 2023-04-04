import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Card, Input } from "@material-ui/core";
import store, { RootState } from '../../redux/store';
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { updateCartItemQuantity, removeCartItem } from '../../redux/store/ducks/cart';
import { addPurchaseOrder } from '../../redux/store/fetchActions';
import { TextField, FormControl, FormGroup } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
const Cart = () => {


  const { cartItems }: any = useSelector((state: RootState): any => state.cartItems) ?? [];
  const dispatch = useDispatch();
  const [cart, setCart] = useState(cartItems);
  const [vltItems, setVltItems] = useState(0);
  const [nome, setNome] = useState('');


  useEffect(() => {
    console.log(cartItems)
    const vlt : any = [];

      cartItems.map((item: any) => {
        const v = item.price * item.qtd;
        vlt.push(v)
    })

    const sum: number = vlt.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue;
    }, 0);

    setVltItems(sum);

  }, [cartItems])

  const aumentarQuantidade = (itemId: any) => {

    const itemIndex = cartItems.findIndex((item: any) => item.id === itemId);
    const payloadData: any = { itemId: itemId, newQuantity: cartItems[itemIndex].qtd + 1 };
    dispatch(updateCartItemQuantity(payloadData))
  }

  const diminuirQuantidade = (itemId: any) => {

    const itemIndex = cartItems.findIndex((item: any) => item.id === itemId);
    const payloadData: any = { itemId: itemId, newQuantity: cartItems[itemIndex].qtd - 1 };
    dispatch(updateCartItemQuantity(payloadData))
  }

  const handleRemoveCartItem = (itemId: any) => {
    dispatch(removeCartItem(itemId))
  }

  const [formValues, setFormValues] = useState({
    name_client: '',
    address: '',
    email: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const dataForm = [{"client" : [formValues.name_client, formValues.address, formValues.email], cart: cartItems}];
    store.dispatch(addPurchaseOrder(dataForm));
}

  const handleChange = (e: any) => {
    e.preventDefault();
    
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  

  return (
    <Grid container spacing={2} style={{ marginTop: 40 }}>
      {
        cartItems?.map((item: any, index: any) => {
          return (
            <Grid item xs={12} sm={12} md={12} lg={12} key={item.id}>
              <div>
                <Card style={{ display: "flex", backgroundColor: "#fdfdfd88", justifyContent: "center", alignItems: "center" }}>
                  <Grid item xs={12} sm={12} md={4} lg={4} style={{ border: "solid", borderWidth: 1, borderRadius: 15 }}>

                    <div style={{ display: "flex", marginTop: 20, alignItems: "center", flexDirection: "column", position: "relative", padding: 10 }}>
                      <div>
                        <img style={{ borderRadius: "10px", width: 180, height: 70 }} src={item.img} alt="" />
                      </div>
                      <span style={{ fontSize: 22 }}>{item.name}</span>
                      <h3>Preço</h3>
                      <p style={{ fontSize: 20 }}>R$: {item.price}</p>
                    </div>

                  </Grid>

                  <Grid item xs={12} sm={12} md={8} lg={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <RemoveIcon onClick={(e) => diminuirQuantidade(item.id)} />
                      <Input style={{ textAlign: "center", display: "flex", width: 40, alignItems: "center", fontSize: "15px", justifyContent: "center", background: '#fff', borderWidth: "1" }} name={`qtd.${item.id}`}
                        type="number"
                        value={item.qtd}
                      />
                      <AddIcon onClick={(e) => aumentarQuantidade(item.id)} />
                    </div>
                    <div style={{ borderColor: "aliceblue", border: "solid", borderWidth: "1px", borderRadius: 10, backgroundColor: "#fdfdfd88", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <span style={{ margin: 40, fontSize: 20 }}>Total R$ {item.price * item.qtd}</span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div onClick={() => handleRemoveCartItem(item.id)} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                      <DeleteForeverIcon /> | Remover
                    </div>
                  </Grid>
                </Card>
              </div>
            </Grid>
          )
        })
      }
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card style={{ display: "flex", backgroundColor: "##8f878f11", justifyContent: "center", alignItems: "center" }}>
          <div style={{fontSize: 20}}>
            Valor total - R$: { vltItems.toFixed(2) }
          </div>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card style={{ display: "flex", backgroundColor: "##8f878f11", justifyContent: "center", alignItems: "center" }}>

          <form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} onSubmit={handleSubmit}>
                  <FormControl style={{ width: "400px"}}>
                      <FormGroup style={{margin: 12}}>
                          <TextField size="small" variant="outlined" style={{ background: '#fff', borderWidth: "1"}} name="name_client" value={formValues.name_client} onChange={handleChange} label="Nome" />
                      </FormGroup>

                      <FormGroup style={{margin: 12}}>
                          <TextField size="small" variant="outlined" style={{ background: '#fff', borderWidth: "1"}} name="address"   label="Endereço" />
                      </FormGroup>

                      <FormGroup style={{margin: 12}}>
                          <TextField size="small" variant="outlined" style={{ background: '#fff', borderWidth: "1"}} name="address"   label="Email" />
                      </FormGroup>
                  </FormControl>

                  <Button style={{display: "flex", height: 40}} type="submit" variant="contained" color="primary">
                      Enviar pedito de compra
                  </Button>
                  <ToastContainer />
                  </form>
        </Card>
      </Grid>

    </Grid>
  )
}

export default Cart;