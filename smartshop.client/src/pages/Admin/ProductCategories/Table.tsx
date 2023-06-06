import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { ProductCategory } from "../../../types/ProductCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import DeleteForm from "../../../components/productCategories/DeleteForm";

type ProductCategoriesTable = {
  list: ProductCategory[];
  onSuccess: () => void;
};

function Table({ list, onSuccess }: ProductCategoriesTable) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<string>("");
  const handleShowDeleteModal = (id: string) => {
    setSelectedRowId(id);
    setShowDeleteModal(true);
  };

  const handleHideDeleteModal = () => {
    onSuccess();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-xl table-hover table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <div className="btn-group float-end">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="has-icon me-1"
                    >
                      <FontAwesomeIcon icon={icon({ name: "eye" })} />
                      Details
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="has-icon me-1"
                    >
                      <FontAwesomeIcon icon={icon({ name: "pencil" })} />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleShowDeleteModal(category.id)}
                      variant="outline-danger"
                      size="sm"
                      className="has-icon me-1"
                    >
                      <FontAwesomeIcon icon={icon({ name: "trash-can" })} />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showDeleteModal} onHide={handleHideDeleteModal}>
        <ModalHeader closeButton>Add product category</ModalHeader>
        <ModalBody>
          <DeleteForm
            productCategoryId={selectedRowId}
            onSuccess={handleHideDeleteModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default Table;
