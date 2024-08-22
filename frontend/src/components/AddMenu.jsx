import React, { useState } from "react";
import axiosClient from "../utils/axios.js"; // Import your axios client configuration

const AddMenu = ({ menuItems, onMenuAdded }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(null);

  // Function to handle selection change
  const handleSelectChange = (event) => {
    setSelectedMenu(event.target.value);
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  // Recursive function to render menu items in a flat structure
  const flattenMenuItems = (items) => {
    let flatItems = [];
    items.forEach((item) => {
      flatItems.push(item);
      if (item.descendants && item.descendants.length > 0) {
        flatItems = flatItems.concat(flattenMenuItems(item.descendants));
      }
    });
    return flatItems;
  };

  const flattenedMenuItems = flattenMenuItems(menuItems);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      title: title,
      parent_id: selectedMenu,
    };

    try {
      await axiosClient.post("/menus", payload);
      setMessage("Menu item added successfully!");
      setTitle(""); // Clear the title input
      setSelectedMenu(""); // Reset the select input
      onMenuAdded(); // Call the callback to update the menu list
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setMessage(response.data.message);
      } else {
        setMessage("An error occurred while adding the menu item.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add Menu Item
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5
                   text-black outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Parent / Root Menu
                </label>
                <select
                  value={selectedMenu}
                  onChange={handleSelectChange}
                  className="w-full mt-2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 
                  text-black outline-none transition focus:border-primary active:border-primary 
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white 
                  dark:focus:border-primary"
                >
                  <option value="">Select Parent Menu</option>
                  {flattenedMenuItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 
              font-medium text-gray hover:bg-opacity-90"
              >
                Add Menu Item
              </button>
            </div>
          </form>
          {message && (
            <div className="p-6.5">
              <p className="text-green-500">{message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddMenu;
