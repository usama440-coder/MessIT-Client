import "./Login.page.css";
import lottie from "../../lottieAnim.gif";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../slices/auth.slice";
import toast from "react-hot-toast";
import { setRole } from "../../slices/auth.slice";
import UserRoleModal from "../../components/UserRoleModal/UserRoleModal.component";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const [userRoleModal, setUserRoleModal] = useState(false);
  const btnRef = useRef();

  // function to handle input change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((values) => ({ ...values, [name]: value }));
  };

  // function to submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    btnRef.current.disabled = true;
    const loggingToast = toast.loading("Logging in...");
    dispatch(loginUser(loginData))
      .unwrap()
      .then((data) => {
        if (data?.user?.role?.length > 1) {
          toast.dismiss(loggingToast);
          setUserRoleModal(true);
        } else {
          dispatch(setRole(data?.user?.role));
          toast.dismiss(loggingToast);
          toast.success("Logged in successfully");
        }
        btnRef.current.disabled = false;
      })
      .catch((err) => {
        toast.dismiss(loggingToast);
        toast.error(err?.message || "Something went wrong");
        btnRef.current.disabled = false;
      });
  };

  return (
    <div className="login">
      {userRoleModal ? (
        <UserRoleModal setUserRoleModal={setUserRoleModal} />
      ) : (
        ""
      )}
      <div className="loginContainer">
        <div className="loginLottie">
          <img src={lottie} alt="lottieAnimation" className="lottie" />
        </div>

        <div className="loginForm">
          <h2 className="modalHeading loginHeading">Hello Again!</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={loginData?.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginData?.password || ""}
                onChange={handleChange}
              />
            </div>
            <button className="modalBtn" type="submit" ref={btnRef}>
              Sign In
            </button>
          </form>

          <p className="resetPassword">Reset Password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
