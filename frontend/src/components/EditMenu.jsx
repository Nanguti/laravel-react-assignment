import React, { useState, useEffect } from "react";
import axiosClient from "../utils/axios.js"; // Import your axios client configuration

const EditMenu = ({ menu, onEditComplete }) => {
  const [title, setTitle] = useState(menu?.title || "");
  const [parentId, setParentId] = useState(menu?.parentId || ""); // Track the parent ID
  const [parentMenus, setParentMenus] = useState([]); // Store parent menus
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch parent menu items when the component mounts
    const fetchParentMenus = async () => {
      try {
        const response = await axiosClient.get("/menus"); // Adjust endpoint if needed
        setParentMenus(response.data);
      } catch (error) {
        console.error("Error fetching parent menus:", error);
      }
    };

    fetchParentMenus();
    setTitle(menu?.title || "");
    setParentId(menu?.parentId || "");
  }, [menu]);

  // Function to handle input change for title
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle selection change for parent
  const handleParentChange = (event) => {
    setParentId(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      title: title,
      parentId: parentId || null, // Include parentId in the payload, or set to null if not selected
    };

    try {
      await axiosClient.put(`/menus/${menu.id}`, payload);
      setMessage("Menu item updated successfully!");
      onEditComplete(); // Notify parent component that editing is done
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setMessage(response.data.message);
      } else {
        setMessage("An error occurred while updating the menu item.");
      }
    }
  };

  // Function to handle delete action
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/menus/${menu.id}`);
      setMessage("Menu item deleted successfully!");
      onEditComplete(); // Notify parent component that deletion is done
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setMessage(response.data.message);
      } else {
        setMessage("An error occurred while deleting the menu item.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        {/* Main Menu Display */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Main Menu
            </h3>
          </div>
          <div className="p-6.5">
            <ul>
              {parentMenus.map((parent) => (
                <li key={parent.id} className="mb-2">
                  {parent.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Edit Menu Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit Menu Item
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
                  onChange={handleTitleChange}
                  placeholder="Enter title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5
                   text-black outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Parent
                </label>
                <select
                  value={parentId}
                  onChange={handleParentChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5
                   text-black outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">None</option>
                  {parentMenus.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 justify-center rounded bg-primary p-3 
                  font-medium text-white hover:bg-opacity-90"
                >
                  Update Menu Item
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 justify-center rounded bg-red-600 p-3 
                  font-medium text-white hover:bg-red-700"
                >
                  Delete Menu Item
                </button>
              </div>
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

export default EditMenu;
