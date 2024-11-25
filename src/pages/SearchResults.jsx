import { useContext } from "react";

import { quantum } from "ldrs";

quantum.register();

import ProductList from "../components/Products/ProductList";
import { SearchContext } from "../store/SearchContextProvider";

const SearchResults = () => {
  const { searchedProducts, isFetchingAISearch } = useContext(SearchContext);

  if (isFetchingAISearch) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center mt-44">
        <l-quantum size="90" speed="2" color="#746eaa"></l-quantum>
        <span className="text-sm text-neutral-500 my-2">Searching...</span>
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
      {searchedProducts && searchedProducts.length === 0 && (
        <span className="text-neutral-500 text-sm">
          Please search a product in the AI Search Field
        </span>
      )}
    </section>
  );
};

export default SearchResults;
