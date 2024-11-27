import CartContextProvider from "./CartContextProvider";
import OrderContextProvider from "./OrderContextProvider";
import SearchContextProvider from "./SearchContextProvider";
import UserContextProvider from "./UserContextProvider";

const AllContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <OrderContextProvider>
          <SearchContextProvider>{children}</SearchContextProvider>
        </OrderContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
};

export default AllContextProvider;
