import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { ActionModalType } from "../../types/ActionModalType";
import DeleteForm from "./DeleteForm";
import DetailsForm from "./DetailsForm";
import EditForm from "./EditForm";

type ActionModalRequest = {
  type?: ActionModalType;
  showModal: boolean;
  onHideModal: () => void;
  selectedRowId: string;
};

function ActionModal({
  type,
  showModal: show,
  onHideModal: onHide,
  selectedRowId,
}: ActionModalRequest) {
  return (
    <Modal show={show} onHide={onHide}>
      <ModalHeader closeButton>
        {type === ActionModalType.Add && "Add product category"}
        {type === ActionModalType.Details && "Product category details"}
        {type === ActionModalType.Edit && "Edit product category"}
        {type === ActionModalType.Delete && "Delete product category"}
      </ModalHeader>
      <ModalBody>
        {type === ActionModalType.Details && (
          <DetailsForm productCategoryId={selectedRowId} onSuccess={onHide} />
        )}
        {type === ActionModalType.Edit && (
          <EditForm productCategoryId={selectedRowId} onSuccess={onHide} />
        )}
        {type === ActionModalType.Delete && (
          <DeleteForm productCategoryId={selectedRowId} onSuccess={onHide} />
        )}
      </ModalBody>
    </Modal>
  );
}

export default ActionModal;
