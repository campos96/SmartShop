import { Button } from "react-bootstrap";
import { ProductCategory } from "../../../types/ProductCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

type ProductCategories = {
  list: ProductCategory[];
};

function Table(props: ProductCategories) {
  return (
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
          {props.list.map((category) => (
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
  );
}

export default Table;
