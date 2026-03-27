import { SignupForm } from "@/components/signup-form";
import authBg from "@/assets/auth-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authLogin, authRegister } from "@/store/auth/auth.service";

const Auth = () => {
  const authLoading = useSelector((state) => state.authReducer?.authLoading);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isRegister = pathname === "/register";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = {};
    try {
      if (isRegister) {
        result = await dispatch(authRegister(formData)).unwrap();
      } else {
        result = await dispatch(authLogin(formData)).unwrap();
      }
      if (result?.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-cover bg-center p-6 md:p-10"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(3,7,18,0.28),rgba(2,6,23,0.74))]" />

      <div className="relative z-10 flex w-full max-w-md flex-col gap-6">
        <SignupForm
          isRegister={isRegister}
          formData={formData}
          setFormData={setFormData}
          onHandleChange={handleChange}
          onSubmit={handleSubmit}
          authLoading={authLoading}
        />
      </div>
    </div>
  );
};

export default Auth;
