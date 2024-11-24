import { motion } from "framer-motion";
import { useContext, useState } from "react";

import aiTextSearchImg from "../../assets/search.png";
import aiVoiceSearchImg from "../../assets/voice.png";
import aiImageSearchImg from "../../assets/image-search.png";
import { ChevronDown } from "lucide-react";
import { SearchContext } from "../../store/SearchContextProvider";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [isSearchTypeClicked, setIsSearchTypeClicked] = useState(false);
  const navigate = useNavigate();

  const {
    searchRef,
    getSearchText,
    selectedSearchType,
    setSelectedSearchType,
    fetchAISearch,
  } = useContext(SearchContext);

  const searchIconimages = {
    "Text Search": aiTextSearchImg,
    "Voice Search": aiVoiceSearchImg,
    "Image Search": aiImageSearchImg,
  };

  function handleSearchTypeClick() {
    setIsSearchTypeClicked((prev) => !prev);
  }

  function textSearch() {
    console.log("in text search function");
    navigate("/search");
    fetchAISearch({ queryText: getSearchText() });
  }

  const handleSearchClick = () => {
    console.log(getSearchText());
    switch (selectedSearchType) {
      case "Text Search":
        return textSearch();
      case "Voice Search":
        return () => {};
      case "Image Search":
        return () => {};
      default:
        console.error("Invalid search type");
    }
  };

  return (
    <motion.div className="relative w-[80%] custom-range:w-[40%] lg:w-[50%] md:w-[40%] flex justify-center items-center rounded-full">
      <input
        ref={searchRef}
        type="text"
        className="w-full h-14 rounded-full pl-32 pr-14 text-sm font-normal text-neutral-600 outline-none bg-white border-2 placeholder:text-neutral-400 shadow-sm"
        placeholder="Search GenStyles"
      />
      <div
        onClick={handleSearchTypeClick}
        className="absolute left-2 w-28 h-10 rounded-full px-1 bg-customBlue bg-opacity-70 hover:bg-opacity-100 cursor-pointer text-white font-medium flex items-center justify-center"
      >
        <div className="relative flex items-center justify-center gap-1">
          <motion.span
            animate={{ rotate: isSearchTypeClicked ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -left-1"
          >
            <ChevronDown size={18} />
          </motion.span>
          <span className="text-xs ml-4">{selectedSearchType}</span>

          {isSearchTypeClicked && (
            <SearchDropDown
              selectedSearchType={selectedSearchType}
              onSelect={setSelectedSearchType}
            />
          )}
        </div>
      </div>
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        onClick={handleSearchClick}
        className="absolute right-2 h-10 rounded-full bg-customBlue px-2 border-2 border-[#746eea] text-white font-medium flex items-center justify-center"
      >
        <motion.img
          src={searchIconimages[selectedSearchType]}
          alt="ai sparkle icon"
          initial={{ scale: 1.4 }}
          animate={{ scale: 1, transition: { duration: 2 } }}
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          whileTap={{
            scale: 0.99,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="w-5 h-5 filter invert brightness-0"
        />
      </motion.button>
    </motion.div>
  );
};

export default Searchbar;

function SearchDropDown({ selectedSearchType, onSelect }) {
  const searchTypes = ["Text Search", "Voice Search", "Image Search"];

  return (
    <div className="absolute top-10 w-28 flex flex-col items-center justify-center bg-white rounded-md shadow-md">
      {searchTypes.map((type) => {
        const isDisabled = selectedSearchType === type;
        return (
          <button
            key={type}
            disabled={isDisabled}
            onClick={() => onSelect(type)}
            className={`p-1 w-28 text-xs text-neutral-500 rounded-md hover:bg-customBlue hover:text-white ${
              isDisabled ? "bg-customBlue bg-opacity-50 text-white" : ""
            }`}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
