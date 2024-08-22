import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";
import AddMenu from "./AddMenu";
import EditMenu from "./EditMenu"; // Import your EditMenu component

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null); // Track the menu item being edited
  const [showAddMenu, setShowAddMenu] = useState(true); // Track whether to show AddMenu or EditMenu

  useEffect(() => {
    // Fetch menu items from the API
    const fetchMenus = async () => {
      try {
        const response = await axiosClient.get("/menus");
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Function to update the menu list
  const updateMenus = async () => {
    try {
      const response = await axiosClient.get("/menus");
      setMenus(response.data);
    } catch (error) {
      console.error("Error updating menus:", error);
    }
  };

  // Function to handle menu item click
  const handleMenuClick = (menu) => {
    setEditingMenu(menu); // Set the menu item to be edited
    setShowAddMenu(false); // Show EditMenu component
  };

  // Recursive function to render menu items and their descendants
  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => (
      <li key={item.id}>
        {item.descendants && item.descendants.length > 0 ? (
          <details className="mb-2">
            <summary className="bg-gray-100 mt-1 p-3 cursor-pointer shadow mr-2 ">
              <span className="font-small">{item.title}</span>
            </summary>
            <ul className="ml-8 space-y-4">
              {renderMenuItems(item.descendants)}
            </ul>
          </details>
        ) : (
          <a
            href="#"
            onClick={() => handleMenuClick(item)} // Handle click event
            className="block bg-gray-100  m-1 p-3 cursor-pointer shadow"
          >
            <span className="font-small">{item.title}</span>
          </a>
        )}
      </li>
    ));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <details
            className="rounded-md border border-stroke bg-white shadow-default 
          dark:border-strokedark dark:bg-boxdark"
          >
            <summary className="bg-gray-200 p-4 cursor-pointer shadow-sm mb-1 mr-2 ">
              <span className="font-semibold">Main Menu</span>
            </summary>
            <ul className="ml-8 space-y-4">{renderMenuItems(menus)}</ul>
          </details>
        </div>
        <div className="flex flex-col gap-9">
          {showAddMenu ? (
            <AddMenu menuItems={menus} onMenuAdded={updateMenus} />
          ) : (
            <EditMenu
              menu={editingMenu}
              onEditComplete={() => setShowAddMenu(true)}
            />
          )}
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto mt-24"></div>
    </>
  );
};

export default Menu;
