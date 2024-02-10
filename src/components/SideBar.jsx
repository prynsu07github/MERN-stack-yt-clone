import React from "react";
import { categories } from "../utils/constants";

export default function SideBar(props) {
  // console.log(props);
  const activeAnimation = () => {};
  return (
    <div className="side-bar">
      {categories.map((category, indx) => {
        return (
          <button
            key={indx}
            onClick={() => {
              props.setSelectedItem(category.name);
              activeAnimation();
            }}
            style={{
              color: category.name === props.SelectedItem ? "#fff" : "#E8FFCE",
              background:
                category.name === props.SelectedItem
                  ? "#5C5470"
                  : "transparent",
              opacity: category.name === props.SelectedItem ? "1" : "0.5",
            }}
          >
            {category.icon}
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
