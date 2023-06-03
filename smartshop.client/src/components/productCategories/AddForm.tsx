import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Category } from "../../types/Category";
import { addProductCategory } from "../../services/product-categories.service";
import { selectedShop } from "../../services/auth.service";

function AddForm({ onSuccess = () => {} }) {
  const shop = selectedShop();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState(null);
  const [productCategory, setNewProductCategory] = useState<Category>({
    id: "",
    shopId: shop.id,
    name: "",
    description: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductCategory({
      ...productCategory,
      [e.target.name]: e.target.value,
    });
  };

  const { shopId, name, description } = productCategory;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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
    <Form onSubmit={handleSubmit}>
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
      </FormGroup>
      <FormGroup className="form-floating mb-3">
        <FormControl
          as="textarea"
          rows={10}
          name="description"
          value={description}
          onChange={onInputChange}
          placeholder="Description"
        />
        <FormLabel htmlFor="description">Description</FormLabel>
      </FormGroup>
      <Button variant="success" type="submit" className="float-end has-icon">
        {loading && <span className="spinner-border spinner-border-sm"></span>}
        {!loading && <FontAwesomeIcon icon={icon({ name: "plus" })} />}
        Add
      </Button>
    </Form>
  );
}

export default AddForm;
