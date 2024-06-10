import React, { useState } from "react";

const ProductModal = ({ onClose }) => {
  const [formdata, setFormdata] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    })
      .then(res => res.json())
      .then(json => {
        console.log("New Product:", json);
        onClose();
      })
      .catch(error => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              name="title"
              type="text"
              value={formdata.title}
              className="w-full border p-2"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              name="price"
              type="number"
              value={formdata.price}
              step="0.01"
              className="w-full border p-2"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formdata.description}
              className="w-full border p-2"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              name="image"
              type="file"
              value={formdata.image}
              className="w-full border p-2 justify-end"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              name="category"
              type="text"
              value={formdata.category}
              className="w-full border p-2"
              onChange={handleInput}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 p-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
