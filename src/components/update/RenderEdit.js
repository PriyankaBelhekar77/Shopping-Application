import { useEffect, useState } from 'react';
import RenderDrawer from './RenderDrawer';

const RenderEdit = ({ storeData }) => {
  const [open, setOpen] = useState(false);
  const { productId, productData, editProduct, deleteProduct, setProductData, setDeleteProduct, setEditProduct } = storeData;
  const product = productData.find((product) => product.id === productId);
  
  useEffect(() => {
    editProduct && setOpen(true);
    if (deleteProduct) {
      setDeleteProduct(false);
      setProductData(productData.filter(product => product.id !== productId));
      alert(`Product with id ${productId} deleted sucessfuly`);
    }
  }, [productId]);

  return (
    <>
      {
        editProduct && <RenderDrawer drawerData={{product, open, setOpen, setEditProduct}}/>
      }
    </>
  )
}

export default RenderEdit;
