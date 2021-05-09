import DisplayItems from '../productData/DisplayItems';
import Spinner from './Spinner';

const DisplayProduct = ({ storeData }) => {
  const { loading, productData, setProductId, setEditProduct, setDeleteProduct } = storeData;

  return (
    loading ? <Spinner /> :
      <div className='wrap-content'>
        <DisplayItems storeData={{ productData, setProductId, setEditProduct, setDeleteProduct }} />
      </div>
  );
}

export default DisplayProduct;
