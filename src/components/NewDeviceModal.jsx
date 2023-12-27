import { useContext, useState } from "react";
import {
  Modal,
  TextField,
  ButtonGroup,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { AppContext } from "../App";
import SimpleSnackbar from "./Snackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewDeviceModal = () => {
  const { handleNewDevice, name, setName } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        color="success"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Добавить
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Поле для ввода:
          </Typography>
          <TextField
            id="outlined-basic"
            label="Наименование"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ButtonGroup sx={{ mt: 2 }} variant="contained">
            <SimpleSnackbar
              variant="contained"
              onClick={() => {
                handleNewDevice();
                handleClose();
              }}
            >
              Добавить
            </SimpleSnackbar>
            <Button
              variant="contained"
              color="error"
              sx={{ ml: 2 }}
              onClick={() => {
                handleClose();
              }}
            >
              Отмена
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
};

export default NewDeviceModal;
