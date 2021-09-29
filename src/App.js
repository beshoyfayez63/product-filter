import Categories from './components/categories/Categories';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Filter from './components/filters/Filter';
import Products from './components/products/Products';
import { ProductsContextProvider } from './context/PorductProvider';

import './App.scss';

function App() {
  return (
    <ProductsContextProvider>
      <CssBaseline />
      <Container>
        <Typography variant='h3' align='center' mt={5}>
          Our e-commerce store
        </Typography>
        <Categories />
      </Container>
      <Grid container mt={5} columns={16} justifyContent='center'>
        <Grid item md={4} xs={12} pl={2} mb={2}>
          <Filter />
        </Grid>
        <Grid
          item
          container
          spacing={3}
          md={12}
          px={2}
          mb={2}
          justifyContent='center'
        >
          <Products />
        </Grid>
      </Grid>
    </ProductsContextProvider>
  );
}

export default App;
