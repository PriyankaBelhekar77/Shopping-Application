import { useEffect, useState } from 'react';
import Navbar from './layout/Navbar';
import DisplayProduct from './layout/DisplayProduct';
import RenderEdit from './update/RenderEdit';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RenderAddProduct from './update/RenderAddProduct';

const Content = () => {
  const [loading, setStatus] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productId, setProductId] = useState();

  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [addProduct, setProductAdd] = useState(true);

  useEffect(() => {
    setStatus(true);
    const fetchURL = 'https://fakestoreapi.com'
    const getData = () => fetch(`${fetchURL}/products`).then((res) => res.json());
    getData().then((data) => setProductData(data));
    setStatus(false);
  }, []);

  return (
    <Router>
      <div className='conatiner'>
        <Navbar />
        <Switch>
          <Route exact path='/' render={props => (
            <>
              <DisplayProduct storeData={{ loading, productData, setProductId, setEditProduct, setDeleteProduct }} />
              {
                (editProduct || deleteProduct) && <RenderEdit
                  storeData={{
                    productId,
                    productData,
                    editProduct,
                    deleteProduct,
                    setProductData,
                    setDeleteProduct,
                    setEditProduct
                  }} />
              }
            </>
          )} />
          <Route exact path='/addProduct' render={props => (
            <>
              <RenderAddProduct storeData={{ addProduct, productData, props, setProductData, setProductAdd }} />
            </>
          )} />

        </Switch>
      </div>
    </Router>
  );
}

export default Content;
