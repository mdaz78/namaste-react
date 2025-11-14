import { FiShoppingBag } from 'react-icons/fi';

const CartIcon = ({ itemCount = 0 }) => {
  return (
    <button className="relative p-2 hover:bg-doordash-light-gray rounded-full transition-colors">
      <FiShoppingBag className="text-2xl text-doordash-dark" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-doordash-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
