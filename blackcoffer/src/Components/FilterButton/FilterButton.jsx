import React from "react";
import "./FilterButton.css";

function FilterButton(props) {
    return (
        <div className="filter-button-container">
            <div className="filter-button">
                {props.name === "Country" ? "Countries" : props.name + "s"}
            </div>
        </div>
    );
}

export default FilterButton;
