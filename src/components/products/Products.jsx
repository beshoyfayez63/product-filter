import { useEffect, Fragment, useCallback, useContext, useState } from 'react';
import ProductsContext from '../../context/product-context';
import useHttp from '../../hooks/http-hook';

import LoadingSpinner from '../UI/LoadingSpinner';
import ProductItem from './productItem/ProductItem';
import Pagination from './pagination/Pagination';
import InfoModal from '../UI/InfoModal';

import './Products.scss';

function Products() {
  const {
    products,
    changeProducts,
    page,
    changePage,
    productsCount,
    changeProductsCount,
    limitProducts,
    urlParams,
  } = useContext(ProductsContext);
  const { loading, sendRequest, error } = useHttp();
  const [openModal, setOpenModal] = useState(false);

  const fetchProducts = useCallback(async () => {
    const products = await sendRequest(
      `http://test-api.edfa3ly.io/product?_page=${page}&_limit=${limitProducts}&${urlParams}`
    );
    changeProductsCount(+products.headers['x-total-count']);
    changeProducts(products.data);
  }, [
    limitProducts,
    page,
    changeProducts,
    changeProductsCount,
    urlParams,
    sendRequest,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const paginationChange = useCallback(
    (_, page) => {
      return changePage(page);
    },
    [changePage]
  );

  useEffect(() => {
    if (error || !products) {
      setOpenModal(true);
    }
  }, [error, products, loading]);

  const closeModalHandler = () => setOpenModal(false);

  let productsJsx;
  if (loading) {
    productsJsx = <LoadingSpinner />;
  }

  if (!loading && !error && products && products.length > 0) {
    productsJsx = products.map((product) => {
      return <ProductItem product={product} key={product.id} />;
    });
  }

  if ((error || !products || products?.length === 0) && !loading) {
    productsJsx = <p>{error ? error : 'No Products Found'}</p>;
  }
  return (
    <Fragment>
      <InfoModal
        message={error || 'No Products Found'}
        open={openModal}
        handleClose={closeModalHandler}
      />
      {productsJsx}
      {!error && products && products.length !== 0 && (
        <Pagination
          page={page}
          productsCount={productsCount}
          limitProducts={limitProducts}
          paginationChangeHandler={paginationChange}
        />
      )}
    </Fragment>
  );
}

export default Products;
