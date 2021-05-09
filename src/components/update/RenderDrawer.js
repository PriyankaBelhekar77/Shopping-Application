import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, TextField, MenuItem } from '@material-ui/core';

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

const RenderDrawer = ({ drawerData }) => {
  const classes = useStyles();
  const { product, open, setOpen, setEditProduct } = drawerData;
  const categories = [
    { value: `men's clothing`, label: `men's clothing` },
    { value: 'jewelery', label: 'jewelery' },
    { value: 'elec', label: 'electronics' },
    { value: `women`, label: `women's clothing` },
  ];

  const [demoProduct, setDemoProduct] = useState({
     category: product ? product.category : '',
     description: product ? product.description : '',
     image: product ? product.image : '',
     price: product ? product.price : 0,
     title: product ? product.title : ''
  })

  const handleCategoryChange = ({ target: { value } }) => setDemoProduct({...demoProduct, category: value});
  const handleDescChange = ({ target: { value } }) => setDemoProduct({...demoProduct, description: value});
  const handleImageChange = ({ target: { value } }) => setDemoProduct({...demoProduct, image: value});
  const handlePriceChange = ({ target: { value } }) => setDemoProduct({...demoProduct, price: value});
  const handleTitleChange = ({ target: { value } }) => setDemoProduct({...demoProduct, title: value});

  const handleSubmit = (e) => {
    e.preventDefault()
    Object.keys(product).forEach((key) => {
      if(demoProduct[key]) {
        product[key] = demoProduct[key];
      }
    });
    setEditProduct(false);
    setOpen(true);
  }

  const handleOnClose = () => {
    setOpen(false)
    setEditProduct(false);
  }

  return (
    <>
      <Drawer anchor={window.outerWidth < 480 ? 'bottom': 'right'} open={open} onClose={handleOnClose}>
        <div className='navbar bg-primary'>
          <h2>Edit Product</h2>
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
              <button className='btn btn-dark' type='submit' value='Submit'>Save</button>
            </div>
          </form>
        }
      </Drawer>
    </>
  )
}

export default RenderDrawer;
