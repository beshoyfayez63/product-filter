import { createContext } from 'react';

const ProductsContext = createContext({
  products: [],
  page: 1,
  changePage: (page) => {},
  changeProducts: (products) => {},
  limitProducts: 30,
  productsCount: 0,
  urlParams: '',
  changeUrlParams: (params) => {},
  changeProductsCount: (count) => {},
});

export default ProductsContext;
