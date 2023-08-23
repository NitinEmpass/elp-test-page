import React, { useState } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import "../tippycontent.css";

function TooltipInput({
  tooltipText,
  type,
  placeholder,
  name,
  autoComplete,
  value,
  onChange,
  className,
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleInputFocus = () => {
    setIsTooltipVisible(true);
  };

  const handleInputBlur = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className={`w-[50%] outline-none border-2 border-gray-500 p-2 rounded-md focus:border-gsl-dark-red ${className} group focus-within:border-gsl-dark-red`}
    >
      <Tooltip
        title={tooltipText}
        open={isTooltipVisible}
        interactive
        trigger="manual"
      >
        <input
          type={type}
          placeholder={placeholder}
          className="w-full outline-none"
          required
          name={name}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </Tooltip>
    </div>
  );
}

export default TooltipInput;
