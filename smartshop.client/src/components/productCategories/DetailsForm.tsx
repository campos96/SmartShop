import { useEffect, useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { ProductCategory } from "../../types/ProductCategory";
import { getProductCategory } from "../../services/product-categories.service";
import Loader from "../Modal/Loader";

type DetailsRequest = {
  productCategoryId: string;
  onSuccess: () => void;
};

function DetailsForm({ productCategoryId, onSuccess }: DetailsRequest) {
  const [loading, setLoading] = useState<boolean>(false);
  const [productCategory, setProductCategory] = useState<ProductCategory>();

  useEffect(() => {
    getProductCategory(productCategoryId)
      .then(
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
      )
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (productCategory == null) {
    return <Loader />;
  }

  return (
    <>
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
    </>
  );
}

export default DetailsForm;
