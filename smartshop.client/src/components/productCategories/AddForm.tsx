import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, ReactNode, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel, Form } from "react-bootstrap";
import { ProductCategory } from "../../types/ProductCategory";
import { addProductCategory } from "../../services/product-categories.service";
import { selectedShop } from "../../services/auth.service";
import { Field, Formik, FormikProps, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddForm({ onSuccess = () => {} }) {
  const shop = selectedShop();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState(null);
  const [productCategory, setNewProductCategory] = useState<ProductCategory>({
    id: "",
    shopId: shop.id,
    name: "",
    description: "",
  });

  const initialValues: {
    // id: string;
    shopId: string;
    name: string;
    description: string;
  } = {
    // id: "",
    shopId: shop.id,
    name: "",
    description: "",
  };

  const schema = Yup.object().shape({
    shopId: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string().required(),
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductCategory({
      ...productCategory,
      [e.target.name]: e.target.value,
    });
  };

  const { shopId, name, description } = productCategory;

  const handleSubmit = () => {
    // e.preventDefault();

    setLoading(true);

    addProductCategory(productCategory)
      .then(
        (json) => {
          setData(json);
          onSuccess();
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
      )
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={schema}
      initialValues={initialValues}
    >
      <Form noValidate>
        <FormControl type="hidden" name="shopId" value={shopId} />

        <FormGroup className="form-floating mb-3">
          <FormControl
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
            placeholder="Name"
            required
          />
          <FormLabel htmlFor="name">Name</FormLabel>
          <ErrorMessage
            name="name"
            component="span"
            className="text-danger"
          />
        </FormGroup>

        <FormGroup className="form-floating mb-3">
          <FormControl
            as="textarea"
            style={{ height: 150 }}
            name="description"
            value={description}
            onChange={onInputChange}
            placeholder="Description"
          />
          <FormLabel htmlFor="description">Description</FormLabel>
          <ErrorMessage
            name="description"
            component="span"
            className="text-danger"
          />
        </FormGroup>
        <Button
          variant="success"
          type="submit"
          className="float-end has-icon"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          {!loading && <FontAwesomeIcon icon={icon({ name: "plus" })} />}
          Add
        </Button>
      </Form>
    </Formik>
  );
}

export default AddForm;
