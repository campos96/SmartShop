import React, { useState, useEffect } from "react";
import Table from "./Table";

function Products() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7019/api/products")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h3 className="card-title float-start">Products</h3>
            <div className="btn btn-success float-end">Add</div>
          </div>
        </div>
        <hr />
        {data ? <Table list={data} /> : "Loading..."}
      </div>
    </div>
  );
}

export default Products;
