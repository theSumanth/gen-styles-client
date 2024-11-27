import { createContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { getAIImageSearchProducts, getAISearchProducts } from "../util/http";
import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext({
  searchRef: null,
  searchedProducts: null,
  getSearchText: () => {},
  imageObj: null,
  setImageObj: () => {},
  fetchAISearch: () => {},
  isFetchingAISearch: null,
  isAISearchError: null,
  aiSearchError: null,
});

const SearchContextProvider = ({ children }) => {
  const searchRef = useRef(null);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [imageObj, setImageObj] = useState({
    file: null,
    url: null,
  });

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
    mutationFn: async ({ signal, searchType }) => {
      switch (searchType) {
        case "Text Search":
          console.log("in mutation");
          return await textSearchMutation({
            signal,
            queryText: getSearchText(),
          });
        case "Voice Search":
          return () => {};
        case "Image Search":
          return await imageSearchMutation({
            signal,
            imageBlob: imageObj.file,
          });
      }
    },
    onSuccess: (data) => {
      setSearchedProducts(data);
    },
    onError: (error) => {
      if (error.message === "Network Error") {
        toast.error(error.message);
        return;
      }
      if (error.status !== 200) {
        toast.error("OpenAi limit exceeded!", {
          description: "Searching products failed. Try again later.",
        });
      }
    },
  });

  const searchContext = {
    searchRef,
    searchedProducts,
    getSearchText,
    imageObj,
    setImageObj,
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
