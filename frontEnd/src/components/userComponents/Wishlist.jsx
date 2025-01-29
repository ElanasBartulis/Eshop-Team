import { useWishList } from '../../custom-hooks/useWishList';

export default function Wishlist({ activeSection }) {
  const { wishListItems } = useWishList();
  console.log(wishListItems);

  return (
    <>
      {activeSection === 'wishlist' && (
        <h2 className="text-gray-50 text-2xl font-bold">h!</h2>
      )}
    </>
  );
}
