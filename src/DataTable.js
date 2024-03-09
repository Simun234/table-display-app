import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    axios
      .get("./data.json")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageData = data.slice(indexOfFirstItem, indexOfLastItem);
};

export default DataTable;
