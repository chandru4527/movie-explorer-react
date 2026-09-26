import { useEffect, useRef, useState } from "react";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const Select = ({
  label,
  labelClassName = "",
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  required = false,
  error,
  icon: Icon,
  iconClassName = "text-red-500",
  className = "",
  selectClassName = "",
  dropdownClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    if (option.disabled) return;

    onChange?.({
      target: {
        name,
        value: option.value,
      },
    });

    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={twMerge("w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={twMerge(
            "mb-2 block text-sm font-medium text-gray-200",
            labelClassName
          )}
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          id={name}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={!!error}
          onClick={() => setIsOpen((prev) => !prev)}
          className={twMerge(
            "flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left outline-none transition-all duration-200",
            "border-gray-700 bg-gray-900 text-white",
            "hover:border-red-500",
            "focus:border-red-500 focus:ring-1 focus:ring-red-500",
            error
              ? "border-red-500 focus:ring-red-500"
              : "",
            disabled
              ? "cursor-not-allowed bg-gray-800 opacity-60"
              : "cursor-pointer",
            selectClassName
          )}
        >
          {Icon && (
            <Icon
              className={twMerge(
                "shrink-0 text-xl",
                iconClassName
              )}
            />
          )}

          <span
            className={twMerge(
              "min-w-0 flex-1 truncate",
              selectedOption
                ? "text-white"
                : "text-gray-500"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <MdKeyboardArrowDown
            className={twMerge(
              "shrink-0 text-2xl text-gray-400 transition-transform duration-200",
              isOpen && "rotate-180 text-red-500"
            )}
          />
        </button>

        {isOpen && !disabled && (
          <div
            className={twMerge(
              "absolute z-50 mt-2 max-h-60 w-full overflow-y-auto scrollbar-none rounded-lg border border-gray-700 bg-gray-900 p-1 shadow-xl shadow-black/30",
              dropdownClassName
            )}
          >
            {options.length > 0 ? (
              options.map((option) => {
                const isSelected =
                  String(option.value) === String(value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                    className={twMerge(
                      "flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-all duration-200",
                      isSelected
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:text-red-500",
                      option.disabled &&
                      "cursor-not-allowed opacity-50"
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">
                      {option.label}
                    </span>

                    {isSelected && (
                      <MdCheck className="shrink-0 text-lg" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options available
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;