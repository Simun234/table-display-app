import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);

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

  const handleTezinaClick = (event, tezinaValue) => {
    const newTezina = prompt("Enter new tezina", tezinaValue);
    if (newTezina !== null) {
      const parsedTezina = parseFloat(newTezina);
      if (!isNaN(parsedTezina)) {
        event.target.textContent = parsedTezina;
      } else {
        alert("Please enter a valid number for tezina");
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-sm container-lg">
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-dark mb-2 mt-2">
          Dark
        </button>
        <button type="button" className="btn btn-light mb-2 mt-2">
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
          <tbody className="table-dark" id="table-body">
            {currentPageData.map((item) => (
              <tr key={item.rowId}>
                <td className="border text-center">{item.rowId}</td>
                <td className="border text-center">{item.iskaznica}</td>
                <td className="border text-center">{item.datum}</td>
                <td className="border text-center">{item.vrijeme}</td>
                <td className="border text-center">{item.oznaciti}</td>
                <td className="border text-center">{item.barkod}</td>
                <td
                  className="border text-center"
                  onClick={(e) => handleTezinaClick(e, item.tezina || "")}
                  style={{ cursor: "pointer" }}
                >
                  {item.tezina || ""}
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
        >
          Prethodni
        </button>
        <button
          type="button"
          className="btn btn-primary mb-2 mb-md-0 mr-2"
          id="prvi"
        >
          Prvi
        </button>
        <button
          type="button"
          className="btn btn-primary mb-2 mb-md-0 mr-2"
          id="prikazi-sve"
        >
          Prikaži sve
        </button>
        <button
          type="button"
          className="btn btn-primary mb-2 mb-md-0 mr-2"
          id="zadnji"
        >
          Zadnji
        </button>
        <button
          type="button"
          className="btn btn-primary mb-2 mb-md-0"
          id="sljedeći"
        >
          Sljedeći
        </button>
      </div>
    </div>
  );
};

export default DataTable;
