import { Button } from "react-bootstrap";
import { ProductCategory } from "../../../types/ProductCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import ActionModal from "../../../components/productCategories/ActionModal";
import { ActionModalType } from "../../../types/ActionModalType";

type ProductCategoriesTable = {
  list: ProductCategory[];
  onSuccess: () => void;
};

function Table({ list, onSuccess }: ProductCategoriesTable) {
  const [actionModalType, setActionModalType] = useState<ActionModalType>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<string>("");
  const showActionModal = (type: ActionModalType, id?: string) => {
    if (type != null) {
      setActionModalType(type);
      setSelectedRowId(id != null ? id : "");
      setShowModal(true);
    }
  };

  const hideActionModal = () => {
    onSuccess();
    setShowModal(false);
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
                      onClick={() =>
                        showActionModal(ActionModalType.Details, category.id)
                      }
                      variant="outline-secondary"
                      size="sm"
                      className="has-icon me-1"
                    >
                      <FontAwesomeIcon icon={icon({ name: "eye" })} />
                      Details
                    </Button>
                    <Button
                      onClick={() =>
                        showActionModal(ActionModalType.Edit, category.id)
                      }
                      variant="outline-warning"
                      size="sm"
                      className="has-icon me-1"
                    >
                      <FontAwesomeIcon icon={icon({ name: "pencil" })} />
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        showActionModal(ActionModalType.Delete, category.id)
                      }
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

      <ActionModal
        type={actionModalType}
        showModal={showModal}
        onHideModal={hideActionModal}
        selectedRowId={selectedRowId}
      />
    </>
  );
}

export default Table;
