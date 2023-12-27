import { useContext, useState } from "react";
import { Button, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../App";

export default function SimpleSnackbar({ children }) {
  const { error, setName, handleNewDevice } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          handleClose();
          setName("");
        }}
      >
        Понятно
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          handleNewDevice();
          handleClick();
        }}
      >
        {children}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={error}
        action={action}
      />
    </div>
  );
}
