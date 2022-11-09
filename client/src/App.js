import React, { Fragment, useState } from "react";
import "./App.css";

function App() {
  const [price, setName] = useState("");
  const [users, setUsers] = useState([]);

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/products/?price=${price}`);

      const parseResponse = await response.json();

      setUsers(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container text-center">
        <h1 className="my-5">List of Products Less Than Price</h1>
        <form className="d-flex" onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="Enter price ..."
            className="form-control"
            value={price}
            onChange={e => setName(e.target.value)}
          />
          <button className="btn btn-success">Submit</button>
        </form>
        <table className="table my-5">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map(product => (
              <tr key={product.productid}>
                <td>{product.productname}</td>
                <td>{product.productid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p>No Results Found</p>}
      </div>
    </Fragment>
  );
}
export default App;
