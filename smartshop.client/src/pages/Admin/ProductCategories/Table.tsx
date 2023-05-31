import { Category } from "../../../types/Category";

type Categories = {
  list: Category[];
};

function Table(props: Categories) {
  return (
    <div className="table-responsive">
      <table className="table table-xl table-hover table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              {/* <td>{category.model}</td>
              <td>{category.brand}</td>
              <td>{category.sku}</td>
              <td>{category.category.name}</td>
              <td>{category.condition.name}</td>
              <td>{new Date(category.created).toLocaleString("en-us")}</td>
              <td>{new Date(category.updated).toLocaleString("es-mx")}</td> */}
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
