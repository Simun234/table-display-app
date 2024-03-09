import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json");
        console.log("Response data:", response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else if (typeof response.data === "object") {
          const dataArray = Object.values(response.data);
          console.log("Extracted data array:", dataArray);
          setData(dataArray);
        } else {
          console.error(
            "Data fetched is not an array or object:",
            response.data
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageData = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderData = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
            No data available
          </td>
        </tr>
      );
    } else {
      return currentPageData.map((item) => (
        <tr key={item.rowId}>
          <td>{item.rowId}</td>
          <td>{item.iskaznica}</td>
          <td>{item.datum}</td>
          <td>{item.vrijeme}</td>
          <td>{item.oznaciti}</td>
          <td>{item.barkod}</td>
          <td>{item.tezina}</td>
          <td>{item.registracija}</td>
        </tr>
      ));
    }
  };
  return (
    <div className="container-sm container-lg">
      <div className="d-flex justify-content-between">
        <button
          type="button"
          id="darkModeBtn"
          className="btn btn-dark mb-2 mt-2"
        >
          Dark
        </button>
        <button
          type="button"
          id="lightModeBtn"
          className="btn btn-light mb-2 mt-2"
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
          <tbody className="table-dark" id="table-body">
            {renderData()}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-wrap justify-content-between mb-2">
        <button
          type="btn"
          className="btn btn-primary mb-2 mb-md-0 mr-2"
          id="prethodni"
        >
          Prethodni
        </button>
        <button
          type="btn"
          className="btn btn-primary mb-2 mb-md-0 mr-2"
          id="prvi"
        >
          Prvi
        </button>
        <button
          type="btn"
          className="btn btn-primary mb-2 mb-md-0 mr-2"
          id="prikazi-sve"
        >
          Prikaži sve
        </button>
        <button
          type="btn"
          className="btn btn-primary mb-2 mb-md-0 mr-2"
          id="zadnji"
        >
          Zadnji
        </button>
        <button
          type="btn"
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
