import { Condition } from "../../../types/Condition";

type Conditions = {
  list: Condition[];
};

function Table(props: Conditions) {
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
          {props.list.map((condition) => (
            <tr key={condition.id}>
              <td>{condition.name}</td>
              <td>{condition.description}</td>
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
