import React, { useState, useEffect } from "react";
import Table from "./Table";
import { getProducts } from "../../../services/products.service";

function Products() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getProducts()
      .then((json) => {
        setData(json);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setData(_content);
      })
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
