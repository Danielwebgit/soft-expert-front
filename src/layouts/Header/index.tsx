import { HeaderContent } from "./style";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header(this: any) {

  return (
  
    <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: "#8545" }}>
          <HeaderContent>
            <div className="logo">
              <img
                style={{
                  borderRadius: "15px",
                  height: "30px",
                  width: "60px"
                }}
                alt="complex"
                src="https://yt3.googleusercontent.com/ytc/AL5GRJVb3SCY8hCQbE8eX38oQa8ww117BtBioJMl_rdumg=s176-c-k-c0x00ffffff-no-rj"
              />
            </div>
            <Box>
              <ul className="menu">
                <>
                  <li>    
                    <NavLink to="/produtos" className="nav-link">
                      LOJA
                    </NavLink>
                  </li>

                  <li>    
                    <NavLink to="/cart" className="nav-link">
                  
                   <div style={{display: "flex", justifyContent: "center"}}>
                      CARRINHO <ShoppingCartIcon/>
                    </div> 
                    </NavLink>
                  </li>
                </>
              </ul>
            </Box>
          </HeaderContent>
        </Grid>
      </Grid> 
  )

}