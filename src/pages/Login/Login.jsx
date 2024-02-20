import React, { useContext, useState } from "react";
import { login, register } from "../../api";
import { onInputChange } from "../../utils/setter";
import { toast } from "react-toastify";
import { setToken, setUserLocally } from "../../services/authenticationService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

import { Dropdown } from "primereact/dropdown";

export default function Login() {
  const emptyNewUser = {
    username: "",
    email: "",
    password: "",
    role: "student",
  };
  const emptyUser = { email: "", password: "" };
  const roleOptions = ["student", "teaccher"];
  const { setGlobalUser } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [newUser, setNewUser] = useState(emptyNewUser);
  const [user, setUser] = useState(emptyUser);
  const onRegister = async () => {
    const res = await register(newUser);
    if (res) {
      if (res.status === 201) {
        toast.success(res.data.message);
        // setToken(res.data.token);
        setNewUser(emptyNewUser);
        setToggle(false);
      }
    }
  };

  const onLogin = async () => {
    const res = await login(user);
    if (res) {
      if (res.status === 200) {
        toast.success(res.data.message);
        const userData = res.data.user;
        const token = res.data.token;
        setUserLocally(userData);
        setGlobalUser(userData);
        setToken(token);
        setUser(emptyUser);
        navigate("/profile");
      }
    }
  };
  return (
    <div className="h-screen">
      {!toggle ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => onInputChange(e, setUser)}
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => onInputChange(e, setUser)}
                    autoComplete="current-password"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={onLogin}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                onClick={() => setToggle(true)}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={(e) => onInputChange(e, setNewUser)}
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => onInputChange(e, setNewUser)}
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => onInputChange(e, setNewUser)}
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <Dropdown
                  name="role"
                  value={newUser.role}
                  onChange={(e) => onInputChange(e, setNewUser)}
                  options={roleOptions}
                  className="w-full shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Choose Role"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={onRegister}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <a
                onClick={() => setToggle(false)}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
