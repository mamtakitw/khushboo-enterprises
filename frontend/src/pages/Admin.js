import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function Admin() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http:///khushboo-enterprises-production.up.railway.app/api/products"
      );

      setProducts(response.data.products);

    } catch (error) {

      console.log(error);

    }

  };

  // ADD PRODUCT

  const addProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http:///khushboo-enterprises-production.up.railway.app/api/products/add",
        {
          name,
          price,
          category,
          image,
          description
        }
      );

      alert("Product Added");

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
      setDescription("");

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE PRODUCT

const deleteProduct = async (id) => {

  try {

    await axios.delete(
      `http://khushboo-enterprises-production.up.railway.app/api/products/${id}`
    );

    alert("Product Deleted");

    fetchProducts();

  } catch (error) {

    console.log(error);

  }

};
  
  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <h1>
        Admin Dashboard
      </h1>

      {/* ADD PRODUCT FORM */}

      <form
        onSubmit={addProduct}
        style={{
          marginTop: "30px",
          marginBottom: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px"
        }}
      >

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button type="submit">
          Add Product
        </button>

      </form>

      {/* PRODUCT LIST */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >

        {
          products.map((product) => (

            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px"
              }}
            >

              <img
                src={product.image}
                alt={product.name}
                width="100%"
                height="200"
                style={{
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              <h3>
                {product.name}
              </h3>

              <p>
                ₹ {product.price}
              </p>

              <p>
                {product.category}
              </p>
              
              <button
  onClick={() => deleteProduct(product._id)}
  style={{
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Delete Product
</button>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Admin;