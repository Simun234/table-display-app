import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllData, setShowAllData] = useState(false);
  const [itemsPerPage] = useState(24);
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/data.json");
      if (
        response.data.hasOwnProperty("data") &&
        Array.isArray(response.data.data)
      ) {
        setData(response.data.data);
      } else {
        console.error(
          "Fetched data does not contain an array in the 'data' property:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDarkClick = () => {
    setBackgroundColor("black");
  };

  const handleLightClick = () => {
    setBackgroundColor("white");
  };

  const handlePreviousClick = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleFirstClick = () => {
    setCurrentPage(1);
  };

  const handleShowAllClick = () => {
    setShowAllData(true);
    setCurrentPage(1);
  };

  const handleLastClick = () => {
    setCurrentPage(Math.ceil(data.length / itemsPerPage));
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) =>
      Math.min(currentPage + 1, Math.ceil(data.length / itemsPerPage))
    );
  };

  const handleTezinaClick = (rowId) => {
    const newData = data.map((item) => {
      if (item.rowId === rowId) {
        return { ...item, isEditingTezina: true };
      }
      return item;
    });
    setData(newData);
  };

  const handleTezinaChange = (event, rowId) => {
    const newData = data.map((item) => {
      if (item.rowId === rowId) {
        return { ...item, tezina: event.target.value };
      }
      return item;
    });
    setData(newData);
  };

  const handleTezinaInputBlur = (rowId) => {
    const newData = data.map((item) => {
      if (item.rowId === rowId) {
        return { ...item, isEditingTezina: false };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <div style={{ backgroundColor }}>
      <div className="container-sm container-lg">
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark mb-2 mt-2"
            onClick={handleDarkClick}
          >
            Dark
          </button>
          <button
            type="button"
            className="btn btn-light mb-2 mt-2"
            onClick={handleLightClick}
          >
            Light
          </button>
        </div>
        <div className="table-responsive-sm table-responsive-lg">
          <table className="table">
            <thead className="table-dark mt-2">
              <tr>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  RowId
                </th>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  Iskaznica
                </th>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  Datum
                </th>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  Vrijeme
                </th>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  Označiti
                </th>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  Barkod
                </th>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  Težina(kg)
                </th>
                <th className="font-sans-serif fw-normal fs-3 text-white text-center border">
                  Registracija
                </th>
              </tr>
            </thead>
            <tbody className="table-dark">
              {data
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <tr key={item.rowId}>
                    <td className="border text-center">{item.rowId}</td>
                    <td className="border text-center">{item.iskaznica}</td>
                    <td className="border text-center">{item.datum}</td>
                    <td className="border text-center">{item.vrijeme}</td>
                    <td className="border text-center">{item.oznaciti}</td>
                    <td className="border text-center">{item.barkod}</td>
                    <td
                      className="border text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleTezinaClick(item.rowId)}
                    >
                      {item.isEditingTezina ? (
                        <input
                          type="text"
                          value={item.tezina || ""}
                          onChange={(e) => handleTezinaChange(e, item.rowId)}
                          onBlur={() => handleTezinaInputBlur(item.rowId)}
                        />
                      ) : (
                        item.tezina
                      )}
                    </td>
                    <td className="border text-center">{item.registracija}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-wrap justify-content-between mb-2">
          <button
            type="button"
            className="btn btn-primary mb-2 mb-md-0 mr-2"
            id="prethodni"
            onClick={handlePreviousClick}
          >
            Prethodni
          </button>
          <button
            type="button"
            className="btn btn-primary mb-2 mb-md-0 mr-2"
            id="prvi"
            onClick={handleFirstClick}
          >
            Prvi
          </button>
          <button
            type="button"
            className="btn btn-primary mb-2 mb-md-0 mr-2"
            id="prikazi-sve"
            onClick={handleShowAllClick}
          >
            Prikaži sve
          </button>
          <button
            type="button"
            className="btn btn-primary mb-2 mb-md-0 mr-2"
            id="zadnji"
            onClick={handleLastClick}
          >
            Zadnji
          </button>
          <button
            type="button"
            className="btn btn-primary mb-2 mb-md-0"
            id="sljedeći"
            onClick={handleNextClick}
          >
            Sljedeći
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
