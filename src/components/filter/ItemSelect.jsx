import React from 'react';

function ItemSelect({checked, handleSelect, label, hasIcon = true}) {
    return (
        <div className="flex space-x-1 items-center py-3 border-b-[1px] border-b-gray-300 mx-2 hover:text-primary"
             onClick={() => handleSelect()}>
            {(hasIcon && checked) && <i className={`fa-solid fa-check text-primary`}/>}
            <label className={`flex-1 cursor-pointer pl-3 select-none ${checked ? 'text-primary font-semibold' : ''}`}>
                {label}
            </label>
        </div>
    );
}

export default ItemSelect;
