import { Product } from "../../../types/Product";

type Products = {
  list: Product[];
};

function Table(props: Products) {
  return (
    <div className="table-responsive">
      <table className="table table-xl table-hover table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>SKU</th>
            <th>Categoria</th>
            <th>Condicion</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.model}</td>
              <td>{product.brand}</td>
              <td>{product.sku}</td>
              <td>{product.category.name}</td>
              <td>{product.condition.name}</td>
              <td>{new Date(product.created).toLocaleString("en-us")}</td>
              <td>{new Date(product.updated).toLocaleString("es-mx")}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="details">
                        Details
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="edit">
                        Edit
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="delete">
                        Delete
                      </a>
                    </li>
                  </ul>
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
