import { useMemo, useCallback, useReducer } from 'react';
import ProductsContext from './product-context';

const productsContextReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_URL':
      const prevParams = new URLSearchParams(state.urlParams);
      const nextParams = new URLSearchParams(action.nextParam);
      if (action.mode === 'append') {
        for (let n of nextParams) {
          if (prevParams.has(n[0]) && prevParams.get(n[0]) === n[1]) {
            prevParams.delete(n[0]);
            prevParams.append(n[0], n[1]);
            state.urlParams = prevParams.toString();
          } else {
            prevParams.append(n[0], n[1]);
            state.urlParams = prevParams.toString();
          }
        }
      } else {
        if (nextParams.toString().length > 0) {
          state.urlParams = nextParams.toString();
        } else {
          state.urlParams = '';
        }
      }

      return {
        ...state,
        page: 1,
      };
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.products,
      };
    case 'GET_PAGE':
      return {
        ...state,
        page: action.page,
      };
    case 'GET_COUNT':
      return {
        ...state,
        productsCount: action.count,
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsContextReducer, {
    urlParams: '',
    products: [],
    page: 1,
    productsCount: null,
  });
  const { urlParams, products, page, productsCount } = state;
  console.log(page);
  const limitProducts = 20;

  const changeUrlParams = useCallback((urlParams, mode) => {
    dispatch({ type: 'CHANGE_URL', nextParam: urlParams, mode });
  }, []);

  const changeProducts = useCallback((products) => {
    dispatch({ type: 'GET_PRODUCTS', products });
  }, []);

  const changePage = useCallback((page) => {
    dispatch({ type: 'GET_PAGE', page });
  }, []);

  const productsCountChange = useCallback((count) => {
    dispatch({ type: 'GET_COUNT', count });
  }, []);

  const productContextMemo = useMemo(
    () => ({
      products,
      changeProducts,
      changePage,
      page,
      productsCount,
      changeProductsCount: productsCountChange,
      limitProducts,
      urlParams,
      changeUrlParams,
    }),
    [
      changePage,
      products,
      changeProducts,
      changeUrlParams,
      page,
      productsCount,
      urlParams,
      productsCountChange,
    ]
  );

  return (
    <ProductsContext.Provider value={productContextMemo}>
      {children}
    </ProductsContext.Provider>
  );
};
