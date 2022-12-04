import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img3 from "../assets/imagenes/img3.jpeg";
import { useForm } from "react-hook-form";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import { toast } from "react-toastify";

const Login = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ email: "", password: "" });
  const { startLogin, errorMessage } = UseSliceAuth();

  const onSubmit = (data) => {
    startLogin(data);
    reset();
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.info(errorMessage, {
        position: "top-right",
      });
    }
  }, [errorMessage]);

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "linear-gradient(115deg,#7e22ce, #7e22ce, #6b21a8)",
      }}
    >
      <div className="rounded-lg mx-4 lg:shadow-2xl bg-white  container lg:mx-72 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gid-cols-1 lg:grid-cols-2 gap-3">
            <div
              style={{ backgroundImage: `url(${img3})` }}
              className="bg-no-repeat rounded-l-lg bg-cover bg-center text-white flex-col px-4 flex items-center justify-center"
            ></div>

            <div className="py-8 px-4">
              <h1 className="font-semibold text-xl">Incia Sesión</h1>
              <p className="mt-3 text-sm">
                Sube y descarga imagenes en PexelsPlus
              </p>

              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="text"
                autoFocus={true}
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />

              {(errors.email?.type || errors.password?.type) === "required" && (
                <p className="text-sm text-center py-2">
                  Los campos con requeridos
                </p>
              )}

              <div className="block mt-2">
                <button className="py-3 text-sm w-full rounded-lg bg-indigo-600 text-white font-semibold text-center">
                  Acceder
                </button>
              </div>

              <div className="mt-4 text-center w-full">
                <Link to="/register" className="text-sm">
                  ¿No tienes una cuenta?{" "}
                  <span className="text-indigo-600">Registrate</span>{" "}
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
