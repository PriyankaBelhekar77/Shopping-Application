import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navbar bg-primary'>
      <h1>ShopBridge</h1>
      <ul>
        <li>
          <Link to='/'>All</Link>
        </li>
        <li>
          <Link to='/addProduct'>Add Product</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
