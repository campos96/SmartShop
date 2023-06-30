import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { ProductCategory } from "../../types/ProductCategory";
import {
  deleteProductCategory,
  getProductCategory,
} from "../../services/product-categories.service";
import Loader from "../Modal/Loader";

type DeleteRequest = {
  productCategoryId: string;
  onSuccess: () => void;
};

function DeleteForm({ productCategoryId, onSuccess }: DeleteRequest) {
  const [loading, setLoading] = useState<boolean>(false);
  const [productCategory, setProductCategory] = useState<ProductCategory>();

  useEffect(() => {
    getProductCategory(productCategoryId).then(
      (json) => {
        setProductCategory(json);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.error(_content);
      }
    );
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    deleteProductCategory(productCategoryId)
      .then(
        () => {
          onSuccess();
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.error(_content);
        }
      )
      .then(() => {
        setLoading(false);
      });
  };

  if (productCategory == null) {
    return <Loader />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Alert variant="danger">
        <strong>Attention!</strong> This change is permanent...
      </Alert>
      <FormControl type="hidden" name="shopId" value={productCategory.shopId} />
      <FormGroup className="form-floating mb-3">
        <FormControl
          type="text"
          name="name"
          value={productCategory.name}
          placeholder="Name"
          required
          disabled
        />
        <FormLabel htmlFor="name">Name</FormLabel>
      </FormGroup>
      <FormGroup className="form-floating mb-3">
        <FormControl
          as="textarea"
          style={{ height: 150 }}
          name="description"
          value={productCategory.description}
          placeholder="Description"
          disabled
        />
        <FormLabel htmlFor="description">Description</FormLabel>
      </FormGroup>
      <Button
        variant="danger"
        type="submit"
        className="float-end has-icon"
        disabled={loading}
      >
        {loading && <span className="spinner-border spinner-border-sm"></span>}
        {!loading && <FontAwesomeIcon icon={icon({ name: "trash-can" })} />}
        Confirm Delete
      </Button>
    </Form>
  );
}

export default DeleteForm;
