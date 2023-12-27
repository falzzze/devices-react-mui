import { useContext } from "react";
import moment from "moment";
import "moment/locale/ru";
import { AppContext } from "../App";
import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Container,
  TextField,
  Button,
  Box,
} from "@mui/material";
import NewDeviceModal from "./NewDeviceModal";
import SimpleSnackbar from "./Snackbar";

const TableComponent = () => {
  const {
    data,
    handleDeleteDevice,
    inputSearch,
    handleSearch,
    handleSearchById,
  } = useContext(AppContext);

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <TextField
          id="standard-basic"
          type="search"
          label="Поиск по идентификатору"
          variant="standard"
          sx={{ width: 240 }}
          onChange={handleSearch}
        />
        <Button
          sx={{ m: 1 }}
          variant="contained"
          onClick={() => console.log(inputSearch)}
        >
          Поиск
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Идентификатор</TableCell>
              <TableCell align="center">Наименование</TableCell>
              <TableCell align="center">Статус</TableCell>
              <TableCell align="center">Последнее обновление</TableCell>
              <TableCell align="center">Уникальный номер</TableCell>
              <TableCell align="left">Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inputSearch.length > 0 ? (
              inputSearch?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    {moment(row.lastUpdate).format("LLL")}
                  </TableCell>
                  <TableCell align="center">{row.uniqueId}</TableCell>
                  <SimpleSnackbar onClick={() => handleDeleteDevice(row.id)}>
                    Удалить
                  </SimpleSnackbar>
                </TableRow>
              ))
            ) : (
              <p>Нет информации по указанному идентификатору</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <NewDeviceModal />
    </Container>
  );
};

export default TableComponent;
