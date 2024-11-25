import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AiSearchSvg from "../../assets/AiSearchSvg";
import AiVoiceSearchSvg from "../../assets/AiVoiceSearchSvg";
import AiImageSearchSvg from "../../assets/AiImageSearchSvg";
import { toast } from "sonner";
import { quantum } from "ldrs";
import initSocket from "../../config/initSocket";
import recordRTC from "../../config/recordRTC";

quantum.register();

import { ChevronDown, CircleCheckBig, Sparkle, Upload } from "lucide-react";
import { SearchContext } from "../../store/SearchContextProvider";
import Modal from "../UI/Modal";
import CustomSquareButton from "../UI/CustomSquareButton";
import Button from "../UI/Button";

const Searchbar = () => {
  const [isSearchTypeClicked, setIsSearchTypeClicked] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const imageInputRef = useRef();
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false); // State to toggle recording
  const recordRef = useRef(null); // Ref to store MediaRecorder instance
  const mediaStreamRef = useRef(null);
  const [transcription, setTranscription] = useState("");

  const {
    searchRef,
    getSearchText,
    selectedSearchType,
    setSelectedSearchType,
    imageFile,
    setImageFile,
    fetchAISearch,
  } = useContext(SearchContext);

  const SearchIcons = {
    "Text Search": AiSearchSvg,
    "Voice Search": AiVoiceSearchSvg,
    "Image Search": AiImageSearchSvg,
  };
  const SelectedSearchIcon = SearchIcons[selectedSearchType];

  function handleSearchTypeClick() {
    setIsSearchTypeClicked((prev) => !prev);
  }

  function textAISearch() {
    if (getSearchText().trim() === "") {
      toast.warning("Please enter a text to search");
      return;
    }
    navigate("/search");
    fetchAISearch({ selectedSearchType });
  }

  function imageSearchClick() {
    setIsImageModalOpen(true);
  }

  function imageAISearch() {
    setIsImageModalOpen(false);
    navigate("/search");
    fetchAISearch({ selectedSearchType });
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      // console.log(file);
      setImageFile(file);
    }
  }

  function handleUploadImageClick() {
    imageInputRef.current.click();
  }

  const handleSearchClick = () => {
    switch (selectedSearchType) {
      case "Text Search":
        return textAISearch();
      case "Voice Search":
        return () => {};
      case "Image Search":
        return imageSearchClick();
      default:
        console.error("Invalid search type");
    }
  };

  const startRecording = async () => {
    try {
        if (!socketRef.current) {
            socketRef.current = await initSocket();
            socketRef.current.on("transcription", (data) => {
                console.log(data);
                if (data.text && data.text !== '') {
                    setTranscription(data.text);
                }
            });
        }
        socketRef.current.emit('startRecording');
        const recorder = await recordRTC(socketRef, mediaStreamRef)
        recordRef.current = recorder;
        recorder.startRecording();
        setIsRecording(true);
    } catch (error) {
        console.error("Error starting recording:", error);
    }
};

const stopRecording = () => {
    try {
        if (recordRef.current) {
            recordRef.current.stopRecording();
            recordRef.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        setIsRecording(false);
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    } catch (error) {
        console.error("Error stopping recording:", error);
    }
};

  return (
    <>
    <motion.div className="relative w-[80%] custom-range:w-[40%] lg:w-[50%] md:w-[40%] flex justify-center items-center rounded-full">
      <input
        ref={searchRef}
        type="text"
        className="w-full h-14 rounded-full pl-32 pr-14 text-sm font-normal text-neutral-600 outline-none bg-white border-2 placeholder:text-neutral-400 shadow-sm"
        placeholder="Search GenStyles"
        value={transcription}
        onChange={(e)=>setTranscription(e.target.value)}
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
        <SelectedSearchIcon />
      </motion.button>

      {selectedSearchType === "Image Search" && isImageModalOpen && (
        <Modal
          open={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        >
          <input
            ref={imageInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="relative flex flex-col gap-1 w-80 not-mobile-view:w-96 h-[25rem] items-center justify-center bg-white rounded-md p-4">
            <div className="absolute flex flex-col items-center justify-center left-1/2 -translate-x-1/2 top-6">
              <h4 className="text-base font-bold text-neutral-700">
                Upload an Image ✨
              </h4>
              <span className="text-neutral-500 text-xs whitespace-nowrap">
                File should be JPG, PNG, JPEG
              </span>
            </div>

            <div className="relative flex flex-col justify-center items-center gap-2 w-full h-64 mt-14 p-4 border-2 bg-customBlue bg-opacity-5 border-dashed rounded-xl border-customBlue">
              <Upload size={42} className="text-customBlue" />
              <span className="text-xs text-neutral-500">
                Upload your file here
              </span>
              <Button
                onClick={handleUploadImageClick}
                className={
                  "md:block text-white bg-customBlue text-base whitespace-nowrap rounded-full"
                }
              >
                Browse Files
              </Button>

              {imageFile && (
                <p className="absolute flex items-center justify-center gap-1 left-1/2 -translate-x-1/2 bottom-7 text-neutral-700 font-semibold text-xs">
                  <CircleCheckBig size={12} />
                  <span>{imageFile.name}</span>
                </p>
              )}
            </div>

            <CustomSquareButton
              onClick={imageAISearch}
              LucideIcon={Sparkle}
              label={"Search Image"}
              className={"w-full mt-5 flex items-center justify-center"}
            />
          </div>
        </Modal>
      )}
    </motion.div>
    <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </>
  );
};

export default Searchbar;

function SearchDropDown({ selectedSearchType, onSelect }) {
  const searchTypes = ["Text Search", "Voice Search", "Image Search"];

  return (
    <div className="absolute top-10 w-28 flex flex-col items-center justify-center bg-white rounded-md shadow-md">
      {searchTypes.map((type, index) => {
        const isDisabled = selectedSearchType === type;
        const roundedBorders = { 0: "rounded-t-md", 1: "", 2: "rounded-b-md" };

        return (
          <button
            key={type}
            disabled={isDisabled}
            onClick={() => onSelect(type)}
            className={`p-1 w-28 text-xs text-neutral-500 ${
              roundedBorders[index]
            } hover:bg-customBlue hover:text-white ${
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
