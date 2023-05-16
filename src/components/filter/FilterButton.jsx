import React, {Fragment, useState} from "react";
import FilterPopup from "../pop-up/FilterPopup";

const FilterButton = () => {
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const handleShowFilterPopup = () => {
        setShowFilterPopup(!showFilterPopup);
    };
    return (
        <div className=" lg:hidden z-20 flex fixed bottom-0 justify-center w-full">
            <div
                className="flex items-center justify-center w-[250px] space-x-2 bg-primary text-white px-3 py-2 rounded-tl-lg rounded-tr-lg shadow-xl cursor-pointer"
                onClick={handleShowFilterPopup}
            >
                <i className="fa-regular fa-sliders"></i>
                <span>Bộ lọc</span>
            </div>
            <FilterPopup show={showFilterPopup} setShow={setShowFilterPopup}/>
        </div>
    );
};

export default FilterButton;
