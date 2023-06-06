import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { ProductCategory } from "../../types/ProductCategory";
import {
  getProductCategory,
  updateProductCategory,
} from "../../services/product-categories.service";
import Loader from "../Modal/Loader";

type EditRequest = {
  productCategoryId: string;
  onSuccess: () => void;
};

function EditForm({ productCategoryId, onSuccess }: EditRequest) {
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
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (productCategory != null) {
      setProductCategory({
        ...productCategory,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (productCategory != null) {
      updateProductCategory(productCategoryId, productCategory)
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
    }
  };

  if (productCategory == null) {
    return <Loader />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl
        type="hidden"
        name="shopId"
        value={productCategory!.shopId}
      />
      <FormGroup className="form-floating mb-3">
        <FormControl
          type="text"
          name="name"
          value={productCategory!.name}
          onChange={onInputChange}
          placeholder="Name"
          required
        />
        <FormLabel htmlFor="name">Name</FormLabel>
      </FormGroup>
      <FormGroup className="form-floating mb-3">
        <FormControl
          as="textarea"
          style={{ height: 150 }}
          name="description"
          value={productCategory!.description}
          onChange={onInputChange}
          placeholder="Description"
        />
        <FormLabel htmlFor="description">Description</FormLabel>
      </FormGroup>
      <Button
        variant="success"
        type="submit"
        className="float-end has-icon"
        disabled={loading}
      >
        {loading && <span className="spinner-border spinner-border-sm"></span>}
        {!loading && <FontAwesomeIcon icon={icon({ name: "save" })} />}
        Save changes
      </Button>
    </Form>
  );
}

export default EditForm;
