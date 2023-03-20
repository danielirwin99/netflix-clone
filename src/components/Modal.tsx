import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import { useState } from "react";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MuiModal open={open} onClose={handleClose}>
      <>
        <h1>Modal</h1>
      </>
    </MuiModal>
  );
};

export default Modal;
