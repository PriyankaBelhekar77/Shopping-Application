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
  const toggle = false;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [error, setError] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addProduct, productData, setProductData, setProductAdd, props } = storeData;

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

  const handleCategoryChange = ({ target: { value } }) => {
    setDemoProduct({ ...demoProduct, category: value });
    value && setError({ ...error, category: '' });
  }
  const handleDescChange = ({ target: { value } }) => {
    setDemoProduct({ ...demoProduct, description: value });
    value && setError({ ...error, description: '' });
  }
  const handleImageChange = ({ target: { value } }) => {
    setDemoProduct({ ...demoProduct, image: value });
    value && setError({ ...error, image: '' });
  }
  const handlePriceChange = ({ target: { value } }) => {
    setDemoProduct({ ...demoProduct, price: value });
    value && setError({ ...error, price: '' });
  }
  const handleTitleChange = ({ target: { value } }) => {
    setDemoProduct({ ...demoProduct, title: value });
    value && setError({ ...error, title: '' });
  }

  const randomID = () => {
    const id = Math.floor(Math.random() * 1000);
    const isId = productData.findIndex(val => val.id === id);
    return isId === -1 ? id : randomID();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      return;
    } else {
      setOpen(false);
      setProductData([...productData, { ...demoProduct, id: randomID() }]);
      setProductAdd(false);
      setDialogOpen(true);
    }
  }

  const handleValidation = () => {
    let validate = false;
    const { category, description, image, price, title } = demoProduct;
    if (category === '') {
      validate = true;
      setError({ ...error, category: 'Please enter valid category' });
    } else if (description === '') {
      validate = true;
      setError({ ...error, description: 'Please enter valid description' });
    } else if (image === '') {
      validate = true;
      setError({ ...error, image: 'Please enter valid image source' });
    } else if (price === '' || price <= 0) {
      validate = true;
      setError({ ...error, price: 'Please enter valid price' });
    } else if (title === '') {
      validate = true;
      setError({ ...error, title: 'Please enter valid title' });
    }
    return validate;
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
              error={error.category}
              helperText={error.category ? error.category : ''}
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
              multiline
              rows={1}
              onChange={handleDescChange}
              error={error.description}
              helperText={error.description ? error.description : ''}
              defaultValue={demoProduct.description}
            />
            <TextField
              id='standard-image'
              label='image'
              onChange={handleImageChange}
              error={error.image}
              helperText={error.image ? error.image : ''}
              defaultValue={demoProduct.image}
            />
            <TextField
              id='standard-price'
              label='price'
              type='number'
              onChange={handlePriceChange}
              error={error.price}
              helperText={error.price ? error.price : ''}
              defaultValue={demoProduct.price}
            />
            <TextField
              id='standard-title'
              label='title'
              onChange={handleTitleChange}
              error={error.title}
              helperText={error.title ? error.title : ''}
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
