import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  console.log(data);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/users/`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        // console.log(dataRes);

        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/signin");
        }
      } else {
        toast("Password and Confirm Password not equal");
      }
    } else {
      toast("Some fields are empty!");
    }
  };
  return (
    <div className="py-12 sm:py-28 md:py-28 flex justify-center items-center w-full">
      <div className="bg-white w-11/12 md:w-10/12 lg:w-5/6 2xl:w-1/3 flex flex-row rounded-md shadow-md">
        <div className="w-55p flex flex-col items-center justify-center rounded-md">
          <div className="flex flex-col justify-center items-center md:w-4/5 lg:w-3/5 py-10">          
            <div className="overflow-hidden relative w-24 h-24">
              <label htmlFor="profileImage" className="cursor-pointer">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Profile"
                    className="w-full h-full rounded-full aspect-square"
                  />
                ) : (
                  <div>
                    <AccountCircleIcon
                      style={{ fontSize: "6rem", color: "#ffc220" }}
                    />
                    <div className="absolute bottom-5 text-center w-full flex">
                      <p className="m-auto text-xs"> Upload</p>
                    </div>
                  </div>
                )}

                <input
                  type={"file"}
                  id="profileImage"
                  className="hidden"
                  onChange={handleUploadImage}
                  accept="image/*"
                />
              </label>
            </div>

            <form className="py-3 w-4/5 sm:w-3/5 md:w-full" onSubmit={handleSubmit}>
              <label htmlFor="FirstName">First Name</label>
              <input
                type={"text"}
                id="firstName"
                name="firstName"
                className="w-full bg-slate-200 px-2 py-1 mt-1 mb-2 focus-within:outline-purple-400 rounded"
                value={data.firstName}
                onChange={handleOnChange}
              />

              <label htmlFor="LastName">Last Name</label>
              <input
                type={"text"}
                id="lastName"
                name="lastName"
                className="w-full bg-slate-200 px-2 py-1 mt-1 mb-2 focus-within:outline-purple-400 rounded"
                value={data.lastName}
                onChange={handleOnChange}
              />

              <label htmlFor="Email">Email</label>
              <input
                type={"email"}
                id="email"
                name="email"
                className="w-full bg-slate-200 px-2 py-1 mt-1 mb-2 focus-within:outline-purple-400 rounded"
                value={data.email}
                onChange={handleOnChange}
              />

              <label htmlFor="Password">Password</label>
              <div className="flex w-full bg-slate-200 px-2 py-1 mt-1 mb-2 outline-2 focus-within:outline focus-within:outline-purple-400 rounded">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full bg-slate-200 outline-none"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <span
                  className="flex text-xl cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>

              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <div className="flex w-full bg-slate-200 px-2 py-1 mt-1 mb-2 outline-2 focus-within:outline focus-within:outline-purple-400 rounded">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="comfirmPassword"
                  name="confirmPassword"
                  className="w-full bg-slate-200 outline-none"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                />
                <span
                  className="flex text-xl cursor-pointer"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <button className="greenbg z-1 uppercase rounded w-32 py-2 shadow-md font-poppins font-semibold text-sm my-4">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="font-inter">
              Already have an account?{" "}
              <Link to={"/signin"} className="underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup