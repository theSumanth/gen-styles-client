import { createContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { getAISearchProducts } from "../util/http";

// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext({
  searchRef: null,
  searchedProducts: null,
  selectedSearchType: null,
  setSelectedSearchType: () => {},
  getSearchText: () => {},
  fetchAISearch: () => {},
  isFetchingAISearch: null,
  isAISearchError: null,
  aiSearchError: null,
});

const SearchContextProvider = ({ children }) => {
  const searchRef = useRef(null);
  const [selectedSearchType, setSelectedSearchType] = useState("Text Search");
  const [searchedProducts, setSearchedProducts] = useState([]);

  function getSearchText() {
    return searchRef.current.value;
  }

  const textMutation = async ({ signal, queryText }) => {
    return await getAISearchProducts({ signal, queryText });
  };

  const {
    mutate: fetchAISearch,
    isPending: isFetchingAISearch,
    isError: isAISearchError,
    error: aiSearchError,
  } = useMutation({
    mutationFn: async ({ signal, queryText }) => {
      console.log("in out mutation");
      switch (selectedSearchType) {
        case "Text Search":
          console.log("in mutation");
          return await textMutation({ signal, queryText });
        case "Voice Search":
          return () => {};
        case "Image Search":
          return () => {};
      }
    },
    onSuccess: (data) => {
      setSearchedProducts(data);
    },
  });

  const searchContext = {
    searchRef,
    searchedProducts,
    selectedSearchType,
    setSelectedSearchType,
    getSearchText,
    fetchAISearch,
    isFetchingAISearch,
    isAISearchError,
    aiSearchError,
  };

  return (
    <SearchContext.Provider value={searchContext}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
