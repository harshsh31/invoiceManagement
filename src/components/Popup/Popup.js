import React from "react";
import s from "./Popup.module.css";
import CloseIcon from "@material-ui/icons/Close";

const Popup = ({
  title,
  onSave,
  onClose,
  saveButtonText,
  children,
  showFooter = true,
}) => {
  return (
    <div className={s.popupWrap}>
      <div className={s.header}>
        <div className={s.title}>{title}</div>
        <div className={s.closeIcon} onClick={onClose}>
          <CloseIcon fontSize={"inherit"} />
        </div>
      </div>
      <div className={s.body}>{children}</div>
      {showFooter && (
        <div className={s.footer}>
          <button className={s.saveButton} type="button" onClick={onSave}>
            {saveButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;
