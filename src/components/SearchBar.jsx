import React, { useEffect } from "react";
import { MagnifyingGlass, Microphone, MicrophoneSlash } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`search/${searchTerm}`);
    setSearchTerm("");
  }

  const handleClick = () => {
    //console.log("clik")
    !isMicOn
      ? SpeechRecognition.startListening()
      : SpeechRecognition.stopListening();
    setIsMicOn(!isMicOn);
  };

  useEffect(() => {
    setSearchTerm(transcript);
  }, [transcript]);

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button type="button" onClick={handleClick} className="voice-search">
          {!isMicOn ? (
            <Microphone size={25} />
          ) : (
            <MicrophoneSlash size={25} onClick={handleSubmit} />
          )}
        </button>
        <button type="submit" className="search-btn">
          <MagnifyingGlass size={25} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
