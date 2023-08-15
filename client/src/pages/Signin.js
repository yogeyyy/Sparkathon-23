import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import toast from "react-hot-toast";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

//   console.log(data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  //   const userData = useSelector((state) => state.user);
  //   // console.log(userData.user);

  //   const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/users`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            useremail: email,
            userpassword: password
          }),
        });

      const dataRes = await fetchData.json();
      // console.log(dataRes);
      toast(dataRes.message);

      if (dataRes.alert) {
        // dispatch(signinRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      toast("Some fields are empty!");
    }
  };
  return (
    <div className="py-12 sm:py-28 md:py-28 flex justify-center items-center w-full">
      <div className="bg-white w-11/12 md:w-10/12 lg:w-5/6 2xl:w-1/3 flex flex-row rounded-md shadow-md">
        <div className="w-full flex flex-col items-center justify-center rounded-md" >
          <div className="flex flex-col justify-center items-center md:w-4/5 lg:w-3/5 py-10">          
            <div className="overflow-hidden relative w-24 h-24">
              <AccountCircleIcon
                style={{ fontSize: "6rem", color: "#ffc220" }}
              />
            </div>

            <form
              className="py-3 w-4/5 sm:w-3/5 md:w-full"
              onSubmit={handleSubmit}
            >
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

              <div className="flex items-center justify-center">
                <button className="bg-lavender-button z-1 uppercase rounded w-32 py-2 shadow-md font-poppins font-semibold text-sm my-4 m-auto">
                  Sign In
                </button>
              </div>
            </form>
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
