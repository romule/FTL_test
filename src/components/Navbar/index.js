import { useState } from "react";
import "../../assets/styles/navbar.css";

export default function Navbar({ handleFilter, handleSort }) {
  const [disabled, setDisabledBtn] = useState(true);
  const checkboxes = document.querySelectorAll("[type='checkbox']");

  function check(id) {
    for (let i = 0; i < checkboxes.length; i++) {
      if (id !== checkboxes[i].id) checkboxes[i].checked = false;
    }
  }

  function addFilter(event) {
    check(event.target.id);
    if (event.target.checked) {
      handleFilter(event.target.id);
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
      handleFilter(false);
    }
  }

  function addDir(event) {
    handleSort(event.target.id);
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar_box-inputs">
        <span>Sort by: </span>
        <label className="input">
          Name
          <input id="name" type="checkbox" onChange={addFilter} />
        </label>
        <label className="input">
          Category
          <input id="category" type="checkbox" onChange={addFilter} />
        </label>
        <label className="input">
          Price
          <input id="price" type="checkbox" onChange={addFilter} />
        </label>
      </div>

      <div className={`nav-bar_box-inputs ${disabled ? "" : "active"} `}>
        <button id="asc" onClick={addDir} disabled={disabled}>
          Increase 📈
        </button>
        <button id="desc" onClick={addDir} disabled={disabled}>
          Decrease 📉
        </button>
      </div>
    </div>
  );
}
