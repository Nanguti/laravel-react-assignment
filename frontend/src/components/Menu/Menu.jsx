import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";
import AddMenu from "./AddMenu";
import EditMenu from "./EditMenu";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(true);

  useEffect(() => {
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

  const updateMenus = async () => {
    try {
      const response = await axiosClient.get("/menus");
      setMenus(response.data);
    } catch (error) {
      console.error("Error updating menus:", error);
    }
  };

  const handleMenuClick = (menu) => {
    setEditingMenu(menu);
    setShowAddMenu(false);
  };

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
            onClick={() => handleMenuClick(item)}
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
