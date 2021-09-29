import { useEffect, useState, Fragment, useContext, useCallback } from 'react';
import ProductContext from '../../context/product-context';
import useHttp from '../../hooks/http-hook';
import { deleteParams } from '../../util/params';
import LoadingSpinner from '../UI/LoadingSpinner';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CategoryItem from './CategoryItem/CategoryItem';
import ErrorModal from '../UI/ErrorModal';

function Categories() {
  const { changeUrlParams, urlParams } = useContext(ProductContext);
  const [disableClear, setDisableClear] = useState(true);
  const { loading, sendRequest, error: categoryError } = useHttp();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const getCategories = useCallback(async () => {
    const categories = await sendRequest('http://test-api.edfa3ly.io/category');
    setCategories(categories.data);
  }, [sendRequest]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    const params = new URLSearchParams(urlParams);
    if (params.has('categoryId')) setDisableClear(false);
  }, [urlParams]);

  const deleteByCategoryFilter = () => {
    const params = deleteParams(urlParams, 'categoryId');
    changeUrlParams(params);
    setDisableClear(true);
  };

  useEffect(() => {
    if (categoryError) {
      setOpen(true);
    }
  }, [categoryError]);
  const closeModalHandler = () => setOpen(false);

  return (
    <Fragment>
      <Typography align='center' mt={2} mb={2}>
        Choose one of our categories from below
      </Typography>
      <Grid container rowSpacing={2} columnSpacing={10} justifyContent='center'>
        {loading && !categoryError && <LoadingSpinner />}
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <CategoryItem
                category={category}
                key={category.id}
                urlParams={urlParams}
                changeUrlParams={changeUrlParams}
              />
            );
          })}

        <ErrorModal
          open={open}
          handleClose={closeModalHandler}
          message={categoryError}
        />
        {categoryError && <p>{categoryError}</p>}
      </Grid>
      {!disableClear && (
        <Button onClick={deleteByCategoryFilter} variant='contained'>
          clear
        </Button>
      )}
    </Fragment>
  );
}

export default Categories;
