import "../../assets/styles/card.css";
import { forwardRef } from "react";

const CardOfCats = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={props.cat.available ? "card-box" : "disabled card-box"}
    >
      <div className="card-box_img">
        <div className="card-box_price">
          {props.cat.available ? (
            <span>{"🔖 For sale $" + props.cat.price}</span>
          ) : (
            <span>{"❌ Unavailable"}</span>
          )}
        </div>
        <img src={props.cat.image_url} alt="photo_of_cat" />
      </div>
      <div className="card-box_info">
        <p>{"Name: " + props.cat.name}</p>
        <p>{"Category: " + props.cat.category}</p>
      </div>
    </div>
  );
});

export default CardOfCats;
