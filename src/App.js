import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Header from "./components/Header";
import TableComponent from "./components/TableComponent";
import { Routes, Route } from "react-router-dom";
import { Home } from "@mui/icons-material";
import SignIn from "./components/Login";

const token = `RzBFAiEA92qN8JvTQ6BIgvjSTke8iQltj3SJf9vhkqyf5zcuUL4CIF1GRd1vLuSJrzzDqv80AF_BAiF91tCWPMvlhuRNrI0DeyJ1IjozLCJlIjoiMjAyMy0xMi0zMVQyMTowMDowMC4wMDArMDA6MDAifQ`;
const URL = `https://gps.autotracker.group/api/devices`;

export const AppContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [inputSearch, setInputSearch] = useState([]);

  useEffect(() => {
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setInputSearch(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);
  // поиск по массиву
  const handleSearch = (e) => {
    setInputSearch(
      data.filter((value) => value.id.toString().includes(e.target.value))
    );
  };
  // поиск по запросу id
  const handleSearchById = (id) => {
    axios
      .get(URL + `?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setInputSearch(res.data);
      })
      .catch((err) => setError(err.message));
  };
  // добавляем наименование
  const handleNewDevice = () => {
    if (!name) {
      setError("Заполните поле");
    } else {
      axios
        .post(
          URL,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          name
        )
        .then(() => {
          setName("");
        })
        .catch((err) =>
          setError("Недостаточно прав для выполнения операции:" + err.message)
        );
    }
  };
  // удаляем наименование
  const handleDeleteDevice = (id) => {
    axios
      .delete(URL + "/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) =>
        setError("Недостаточно прав для выполнения операции:" + err.message)
      );
  };

  return (
    <>
      <AppContext.Provider
        value={{
          data,
          error,
          name,
          setName,
          handleNewDevice,
          handleDeleteDevice,
          inputSearch,
          handleSearch,
          handleSearchById,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<TableComponent />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
