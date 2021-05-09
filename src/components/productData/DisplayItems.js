const DisplayItems = ({ storeData }) => {
  const { productData, setProductId, setEditProduct, setDeleteProduct } = storeData;

  return productData.map((product) => {
    const { id, title, price, image } = product;
    return (
      <div className='product-data' key={id}>
        <div className='product-image'>
          <img src={image} />
        </div>
        <div className='product-info'>
          <div className='product-title text-primary'>
            {title}
          </div>
          <div className='product-price text-primary'>
            <span>$ {price}</span>
          </div>
        </div>
        <div className='btn-container'>
          <button className='btn btn-dark' onClick={(e) => {
            setEditProduct(true);
            setProductId(id);
          }}>Edit</button>
          <button className='btn btn-dark' style={{ background: '#B92B28' }} onClick={(e) => {
            setDeleteProduct(true);
            setProductId(id);
          }}>Delete</button>
        </div>
      </div>
    );
  });
}

export default DisplayItems;
