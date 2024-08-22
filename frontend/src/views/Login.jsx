import { createRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../utils/axios.js";

const Login = () => {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  useEffect(() => {
    document.title = "User Login";
  }, []);

  return (
    <>
      {/* <Breadcrumb pageName="Sign In" /> */}

      <div className="flex justify-center items-center min-h-screen">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-md">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In
            </h2>

            {message && (
              <div className="alert">
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 
                    text-black outline-none focus:border-primary focus-visible:shadow-none 
                    dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    {/* SVG Icon */}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 
                    text-black outline-none focus:border-primary focus-visible:shadow-none 
                    dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    {/* SVG Icon */}
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 
                  text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
