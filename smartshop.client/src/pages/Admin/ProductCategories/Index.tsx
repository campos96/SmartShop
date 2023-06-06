import React, { useState, useEffect } from "react";
import { getProductCategories } from "../../../services/product-categories.service";
import Table from "./Table";
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import AddForm from "../../../components/productCategories/AddForm";

function ProductCategories() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => {
    getData();
    setShowModal(false);
  };

  const getData = () => {
    setData(null);
    getProductCategories().then(
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h3 className="card-title float-start">Categories</h3>
              <Button
                variant="success"
                className="float-end"
                onClick={handleShowModal}
              >
                Add
              </Button>
            </div>
          </div>
          <hr />
          {data ? <Table list={data} onSuccess={getData} /> : "Loading..."}
        </div>
      </div>
      <Modal show={showModal} onHide={handleHideModal}>
        <ModalHeader closeButton>Add product category</ModalHeader>
        <ModalBody>
          <AddForm onSuccess={handleHideModal} />
        </ModalBody>
      </Modal>
    </>
  );
}

export default ProductCategories;
