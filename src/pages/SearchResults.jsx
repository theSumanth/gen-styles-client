import { useContext } from "react";

import { quantum } from "ldrs";

quantum.register();

import ProductList from "../components/Products/ProductList";
import { SearchContext } from "../store/SearchContextProvider";
// import ErrorBoundary from "./Error";

const SearchResults = () => {
  const {
    searchedProducts,
    isFetchingAISearch,
    // isAISearchError,
    // aiSearchError,
  } = useContext(SearchContext);

  if (isFetchingAISearch) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 4.5rem)" }}
        className="flex flex-col gap-2 justify-center items-center"
      >
        <l-quantum size="90" speed="2" color="#746eaa"></l-quantum>
        <span className="text-sm text-neutral-500 my-2">Searching...</span>
      </div>
    );
  }

  // if (isAISearchError) {
  //   return (
  //     <ErrorBoundary
  //       style={{ minHeight: "calc(100vh - 4.5rem)" }}
  //       title={"Could not search the products."}
  //       message={aiSearchError.message}
  //     />
  //   );
  // }

  const isProductsEmpty = searchedProducts && searchedProducts.length === 0;

  if (isProductsEmpty) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 4.5rem)" }}
        className="flex justify-center items-center text-neutral-400 font-semibold"
      >
        No products found :&#40;
      </div>
    );
  }

  return (
    <section className="relative bg-neutral-50 m-2 shadow-md rounded-md p-4">
      {searchedProducts && searchedProducts.length !== 0 && (
        <ProductList
          listHeading={"Searched Products"}
          fetchedProducts={searchedProducts}
          isFetching={isFetchingAISearch}
        />
      )}
      {searchedProducts === null && (
        <span className="text-neutral-500 text-sm">
          Please search a product in the AI Search Field
        </span>
      )}
    </section>
  );
};

export default SearchResults;
