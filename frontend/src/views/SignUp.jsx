import { createRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axios.js";
import { useStateContext } from "../context/ContextProvider.jsx";

const SignUp = () => {
  const { setUser, setToken } = useStateContext();
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
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
    document.title = "User Sign Up";
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg dark:bg-boxdark">
        <h2 className="text-2xl font-bold text-center text-black dark:text-white">
          Sign Up
        </h2>

        {message && (
          <div
            className="alert bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4 
          dark:bg-red-800 dark:text-red-400 dark:border-red-700"
          >
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-medium text-black dark:text-white">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none 
                focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input 
                dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-black dark:text-white">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none 
                focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input 
                dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-black dark:text-white">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none 
                focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input 
                dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-medium text-black dark:text-white">
              Confirm Password
            </label>
            <input
              ref={passwordConfirmRef}
              type="password"
              name="password_confirmation"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none 
                focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input 
                dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="submit"
              value="Sign Up"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 
                text-white transition hover:bg-opacity-90"
            />
          </div>

          <div className="mt-6 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
