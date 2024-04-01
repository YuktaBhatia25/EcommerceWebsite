import { useEffect, useRef } from "react";
import { useDynamicTitle } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../../services/authService";
import { toast } from "react-toastify";

export const Login = () => {
  useDynamicTitle("Login");
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const authDetails = {
        email: email.current.value,
        password: password.current.value,
      };
      await login(authDetails);
      navigate("/products");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }
  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          Login
        </p>
      </section>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            ref={email}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-primary-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light dark:focus:border-primary-300"
            placeholder="john@example.com"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            ref={password}
            type="password"
            id="password"
            placeholder="Password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-primary-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light dark:focus:border-primary-300"
            required
          />
        </div>
        <button
          type="submit"
          className="hover:cursor-pointer text-white bg-primary-700 hover:bg-primary-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Log In
        </button>
      </form>
    </main>
  );
};
