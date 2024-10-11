import { memo, useState } from "react";
import { back, search } from "../../assets";
import "./index.css";

function Header({ onChangeQuery, query, title }: HeaderProps) {
  const [showInput, setShowInput] = useState(false);
  const toggleInputView = () => setShowInput((prev) => !prev);
  const hideInput = () => setShowInput(false);

  return (
    <div className="header-container">
      {showInput ? (
        <input
          className="header-input"
          inputMode="search"
          onBlur={hideInput}
          onChange={onChangeQuery}
          placeholder="Search..."
          type="text"
          value={query}
        />
      ) : (
        <div className="title-container">
          <button className="header-button" type="button">
            <img alt="back-button" className="header-icon" src={back} />
          </button>
          <h2 className="header-title">{title}</h2>
        </div>
      )}
      <button className="header-button" onClick={toggleInputView} type="button">
        <img alt="search" className="header-icon" src={search} />
      </button>
    </div>
  );
}

export default memo(Header);
