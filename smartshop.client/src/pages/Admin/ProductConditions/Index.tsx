import React, { useState, useEffect } from "react";
// import Table from "./Table";
//import { getProducts } from "../../../services/products.service";
import { getProductConditions } from "../../../services/product-conditions.service";
import Table from "./Table";

function ProductConditions() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getProductConditions().then(
      (json) => {
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
      }
    );
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h3 className="card-title float-start">Categories</h3>
            <div className="btn btn-success float-end">Add</div>
          </div>
        </div>
        <hr />
        {data ? <Table list={data} /> : "Loading..."}
      </div>
    </div>
  );
}

export default ProductConditions;
