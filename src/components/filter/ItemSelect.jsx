import React from 'react';

function ItemSelect({checked, handleSelect, label, hasIcon = true, mobile = false}) {
  if (mobile) {
    return (
      <div className={`flex items-center p-2 hover:text-primary ${checked ? 'bg-primary rounded-md' : ''}`}
           onClick={() => handleSelect()}>
        <label className={`flex-1 cursor-pointer select-none ${checked ? 'text-white' : ''}`}>
          {label}
        </label>
      </div>
    )
  }
  return (
    <div className="flex space-x-1 items-center py-3 border-b-[1px] border-b-gray-300 mx-2 hover:text-primary"
         onClick={() => handleSelect()}>
      {(hasIcon && checked) && <i className={`fa-solid fa-check text-primary`}/>}
      <label className={`flex-1 cursor-pointer pl-3 select-none ${checked ? 'text-primary font-semibold' : ''}`}>
        <div data-tooltip-id="my-tooltip"
             data-tooltip-content={label.length > 25 ? label : ''}
             className={'line-clamp-1'}>{label}</div>
      </label>
    </div>
  );
}

export default ItemSelect;
