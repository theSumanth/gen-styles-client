import { createContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { getAIImageSearchProducts, getAISearchProducts } from "../util/http";

// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext({
  searchRef: null,
  searchedProducts: null,
  selectedSearchType: null,
  setSelectedSearchType: () => {},
  getSearchText: () => {},
  imageFile: null,
  setImageFile: () => {},
  fetchAISearch: () => {},
  isFetchingAISearch: null,
  isAISearchError: null,
  aiSearchError: null,
});

const SearchContextProvider = ({ children }) => {
  const searchRef = useRef(null);
  const [selectedSearchType, setSelectedSearchType] = useState("Text Search");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  function getSearchText() {
    return searchRef.current.value;
  }

  const textSearchMutation = async ({ signal, queryText }) => {
    return await getAISearchProducts({ signal, queryText });
  };

  const imageSearchMutation = async ({ signal, imageBlob }) => {
    const formData = new FormData();
    formData.append("image", imageBlob);
    return await getAIImageSearchProducts({ signal, formData });
  };

  const {
    mutate: fetchAISearch,
    isPending: isFetchingAISearch,
    isError: isAISearchError,
    error: aiSearchError,
  } = useMutation({
    mutationFn: async ({ signal }) => {
      switch (selectedSearchType) {
        case "Text Search":
          console.log("in mutation");
          return await textSearchMutation({
            signal,
            queryText: getSearchText(),
          });
        case "Voice Search":
          return () => {};
        case "Image Search":
          return await imageSearchMutation({ signal, imageBlob: imageFile });
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
    imageFile,
    setImageFile,
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
