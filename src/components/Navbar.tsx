import { Link } from 'react-router-dom';
import logo from '../images/mountain-svgrepo-com.svg';

const Navbar = () => {
  return (
    <nav id="info" className="p-3 h-[72px] flex justify-center items-center">
      <Link className="flex justify-center items-center gap-2" to="/home">
        <img className="w-14 h-14" src={logo} alt=""></img>
        <h1 className="text-xl font-bold">Parks At A Glance</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
