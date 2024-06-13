import React from "react";
import { data } from "../data";
import { IconCross } from "../assets/iconCross.jsx";

const SearchBar = ({
  query,
  setQuery,
  attributeList,
  handleAttributeList,
  handleOperations,
  setAttributeList,
  operationList,
  handleTripleInput,
  queryTag,
  showList,
  setShowList,
  deleteTags,
  inputRef,
}) => {
  const placeholder = "Search Filter";

  const getInput = function (input) {
    if (input) {
      const temp = attributeList.filter((item) =>
        item.attributeName.includes(input.toLowerCase())
      );
      setAttributeList(temp);
    } else {
      setAttributeList(data);
    }
  };
  const debounce = function (func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleDebounceSearch = debounce(getInput, 1000);

  return (
    <>
      <div className=' w-[100%] border-2 border-slate-700 bg-slate-900 p-3 mt-3 mb-3 font-[1.2em] text-slate-400 flex flex-wrap gap-1'>
        {queryTag?.map((item, index) => {
          return (
            <button
              key={index}
              className=' text-slate-400 border-[1.5px] p-1 border-slate-700 w-[fit-content] shadow-md flex justify-center items-center gap-2 bg-slate-800'
              onClick={() => deleteTags(index)}
            >
              {item} <IconCross />
            </button>
          );
        })}
        <input
          className=' w-[100%] outline-none border-slate-700 bg-slate-900 font-[1.2em] text-slate-400'
          placeholder={placeholder}
          type='text'
          value={query}
          ref={inputRef}
          onChange={(e) => {
            setQuery(e.target.value);
            handleDebounceSearch(e.target.value);
          }}
          onKeyDown={(e) => handleTripleInput(e)}
          onFocus={() => {
            setShowList((open) => !open);
            setAttributeList(data);
          }}
        />
      </div>
      {showList && operationList.length === 0 ? (
        <div className='w-[100%] border-2 border-slate-700 bg-slate-900 pr-2 pl-2 text-slate-400 flex flex-col gap-2'>
          {attributeList?.map((item) => {
            return (
              <button
                key={item.id}
                className='p-2 cursor-pointer hover:bg-slate-700 hover:rounded-md border-none text-left'
                onClick={() => handleAttributeList(item.attributeName)}
              >
                {item.attributeName}
              </button>
              
            );
          })}
        </div>
      ) : showList && operationList.length !== 0 ? (
        <div className='w-[100%] border-2 border-slate-700 bg-slate-900 pr-2 pl-2 text-slate-400 flex flex-col gap-2'>
        {(operationList.length === 0 ? attributeList : operationList[0]?.operations).map((item, idx) => (
          <div key={idx} className='flex justify-between items-center p-2 cursor-pointer hover:bg-slate-700 hover:rounded-md'>
            <button
              onClick={() => (operationList.length === 0 ? handleAttributeList(item.attributeName) : handleOperations(item))}
              className='text-left flex-1'
            >
              {operationList.length === 0 ? item.attributeName : item}
            </button>
            <span className='text-sm text-gray-500'>{operationList.length === 0 ? 'Type: Tag, DataType: String' : 'Type: Tag, DataType: String'}</span>
          </div>
        ))}
      </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchBar;
