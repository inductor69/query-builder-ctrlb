import { useState, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { data } from "./data";

function App() {
  const [query, setQuery] = useState("");
  const [attributeList, setAttributeList] = useState(data);
  const [operationList, setOperationList] = useState([]);
  const [queryTag, setQueryTag] = useState([]);
  const [showList, setShowList] = useState(false);

  const inputRef = useRef();

  const handleAttributeList = (attribute) => {
    setQuery(attribute);
    setOperationList(
      attributeList.filter((item) => attribute === item.attributeName)
    );
  };

  const handleOperations = (operation) => {
    setQuery(operation);
  };

  const handleTripleInput = (e) => {
    if (e.key === "Enter" && query) {
      setQueryTag([...queryTag, query]);
      inputRef.current.blur();
      setQuery("");
      setOperationList([]);
      setAttributeList(data);
    }
  };

  const deleteTags = (tagIndex) => {
    setQueryTag(queryTag.filter((tag, index) => index !== tagIndex));
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className=' bg-black p-10'
    >
      <SearchBar
        query={query}
        setQuery={setQuery}
        attributeList={attributeList}
        handleAttributeList={handleAttributeList}
        setAttributeList={setAttributeList}
        operationList={operationList}
        handleOperations={handleOperations}
        handleTripleInput={handleTripleInput}
        queryTag={queryTag}
        showList={showList}
        setShowList={setShowList}
        deleteTags={deleteTags}
        inputRef={inputRef}
      />
    </div>
  );
}

export default App;
