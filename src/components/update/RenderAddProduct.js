import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, TextField, MenuItem, Dialog } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '16px',
      width: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const RenderAddProduct = ({ storeData }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addProduct, productData, setProductData, setProductAdd, props } = storeData;
  const toggle = false;
  const categories = [
    { value: `men's clothing`, label: `men's clothing` },
    { value: 'jewelery', label: 'jewelery' },
    { value: 'elec', label: 'electronics' },
    { value: `women`, label: `women's clothing` },
  ];

  const [demoProduct, setDemoProduct] = useState({
    category: '',
    description: '',
    image: '',
    price: 0,
    title: ''
  })

  const handleCategoryChange = ({ target: { value } }) => setDemoProduct({ ...demoProduct, category: value });
  const handleDescChange = ({ target: { value } }) => setDemoProduct({ ...demoProduct, description: value });
  const handleImageChange = ({ target: { value } }) => setDemoProduct({ ...demoProduct, image: value });
  const handlePriceChange = ({ target: { value } }) => setDemoProduct({ ...demoProduct, price: value });
  const handleTitleChange = ({ target: { value } }) => setDemoProduct({ ...demoProduct, title: value });

  const randomID = () => {
    const id = Math.floor(Math.random() * 1000);
    const isId = productData.findIndex(val => val.id === id);
    return isId === -1 ? id : randomID();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setProductData([...productData, { ...demoProduct, id: randomID() }]);
    setProductAdd(false);
    setDialogOpen(true);
  }

  return (
    <>
      <Drawer anchor={window.outerWidth < 480 ? 'bottom' : 'right'} open={open} onClose={() => setOpen(!toggle)}>
        <div className='navbar bg-primary'>
          <h2>Add Product</h2>
        </div>
        {
          <form className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <TextField
              id="standard-select-category"
              select
              label="category"
              value={demoProduct.category}
              onChange={handleCategoryChange}
              defaultValue={demoProduct.category}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='standard-desc'
              label='description'
              onChange={handleDescChange}
              multiline
              rows={1}
              defaultValue={demoProduct.description}
            />
            <TextField
              id='standard-image'
              label='image'
              onChange={handleImageChange}
              defaultValue={demoProduct.image}
            />
            <TextField
              id='standard-price'
              label='price'
              type='number'
              onChange={handlePriceChange}
              error={demoProduct.price <= 0 || demoProduct.price === ''}
              helperText={'Please enter valid price'}
              defaultValue={demoProduct.price}
            />
            <TextField
              id='standard-title'
              label='title'
              onChange={handleTitleChange}
              defaultValue={demoProduct.title}
            />
            <div className='btn-container' style={{ display: 'block' }}>
              <button className='btn btn-dark' type='submit' value='Submit'>Add Product</button>
              <button className='btn btn-dark' onClick={() => {
                props.history.push('/');
              }}>Exit</button>
            </div>
          </form>
        }
      </Drawer>
      {
        !addProduct && <div>
          <Dialog aria-labelledby='simple-dialog-title' open={dialogOpen}>
            <div className='wrap-product product-data'>
              <div className='product-image'>
                <img src={demoProduct.image} />
              </div>
              <div className='product-info'>
                <div className='product-title text-primary'>
                  {demoProduct.title}
                </div>
                <div className='product-price text-primary'>
                  <span>$ {demoProduct.price}</span>
                </div>
              </div>
              <button className='btn btn-dark' onClick={() => {
                props.history.push('/');
              }}>Go to all products</button>
            </div>
          </Dialog>
        </div>
      }
    </>
  )
}

export default RenderAddProduct;
