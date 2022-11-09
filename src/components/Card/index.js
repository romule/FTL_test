import "../../assets/styles/card.css";
import Placeholder from "../../assets/img/cat_placeholder.png";
import { forwardRef, useState } from "react";

const CardOfCats = forwardRef((props, ref) => {
  const [hasError, setError] = useState(false);

  function replaceIMG(error) {
    setError(true);
    return (error.target.src = Placeholder);
  }

  return (
    <div
      ref={ref}
      className={props.cat.available ? "card-box" : "disabled card-box"}
    >
      <div className="card-box_price">
        {props.cat.available ? (
          <span>{"🔖 For sale $" + props.cat.price}</span>
        ) : (
          <span>{"❌ Unavailable"}</span>
        )}
      </div>
      <div className="card-box_img">
        <img
          className={hasError ? "img-error" : ""}
          src={props.cat.image_url}
          alt="photo_of_cat"
          onError={replaceIMG}
        />
      </div>
      <div className="card-box_info">
        <p>{"Name: " + props.cat.name}</p>
        <p>{"Category: " + props.cat.category}</p>
      </div>
    </div>
  );
});

export default CardOfCats;
