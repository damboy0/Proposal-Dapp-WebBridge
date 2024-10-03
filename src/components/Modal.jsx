import { useEffect } from "react";

const sizeClassNames = {
  small: "md:w-[472px]",
  full: "w-full h-screen",
};

export const Modal = ({
  isOpen,
  children,
  size = "small",
  handleClose,
  title,
}) => {
  const modalClassName = `max-width m-2 md:m-0 px-8 py-6 relative z-[2500] w-full rounded-lg bg-[white]`;

  const sizeClassName = sizeClassNames[size];
  const classNames = `${modalClassName} ${sizeClassName}`;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        target.classList.contains("ohw-modal") ||
        target.classList.contains("close")
      ) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);

  return (
    isOpen && (
      <div
        data-testid="modal-click-outside"
        className="ohw-modal fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center  justify-center bg-[rgba(76,76,76,0.40)] backdrop-blur-[2px]"
      >
        <div className={`${classNames} grid `}>
          <h2 className="text-blue-500 font-medium text-xl text-center">
            {title}
          </h2>

          <div data-testid="modal-content" className={`text-left py-4`}>
            {children}
          </div>
        </div>
      </div>
    )
  );
};
