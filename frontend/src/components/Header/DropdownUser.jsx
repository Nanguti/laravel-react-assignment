import { useState } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../ClickOutside";
import UserOne from "../../images/user/user-01.png";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../utils/axios";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser, setToken } = useStateContext();
  console.log("user goes here", user);

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user.name}
          </span>
          <span className="block text-xs">Software Developer</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {dropdownOpen && (
        <div
          className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke
         bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 
                    5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 
                    15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 
                    7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 
                    11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                    fill=""
                  />
                  <path
                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 
                    2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 
                    10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 
                    20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 
                    14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                    fill=""
                  />
                </svg>
                My Profile
              </Link>
            </li>
          </ul>
          <button
            onClick={onLogout}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium text-meta-3 
          duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 21.3812C17.0656 21.3812 21.9344 16.5125 21.9344 10.447C21.9344 4.38124 17.0656 -0.487487 
                11 -0.487487C4.93435 -0.487487 0.0655975 4.38124 0.0655975 10.447C0.0655975 16.5125 4.93435 21.3812
                 11 21.3812ZM11 19.8344C6.2406 19.8344 2.61248 16.1906 2.61248 10.447C2.61248 4.70374 6.2406 1.06874 
                 11 1.06874C15.7594 1.06874 19.3875 4.70374 19.3875 10.447C19.3875 16.1906 15.7594 19.8344 11 19.8344Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9875 5.14375C11.9875 4.69687 11.6344 4.34375 11.1875 4.34375H10.8125C10.3656 4.34375 
                10.0125 4.69687 10.0125 5.14375V10.447C10.0125 10.8937 10.3656 11.2469 10.8125 11.2469H15.1156C15.5625 
                11.2469 15.9156 10.8937 15.9156 10.447C15.9156 10 15.5625 9.64687 15.1156 9.64687H11.9875V5.14375Z"
                fill=""
              />
            </svg>
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
