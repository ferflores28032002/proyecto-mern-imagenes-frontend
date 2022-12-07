import img1 from "../assets/imagenes/img1.jpeg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    name: "",
    apellidos: "",
    email: "",
    password: "",
    password2: "",
    terminos: "",
  });

  const navigate = useNavigate();

  const { registerUser, errorMessage } = UseSliceAuth();

  const onSubmit = (data) => {
    const { password, password2 } = data;

    if (password !== password2) {
      toast.info("Las contraseñas no son iguales", { position: "top-right" });
    } else {
      registerUser(data);
      reset();
    }
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.info(errorMessage, {
        position: "top-right",
      });
    }
  }, [errorMessage]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-indigo-800">
      <div className="rounded-lg mx-4 lg:shadow-2xl bg-white  container lg:mx-64 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div
              style={{ backgroundImage: `url(${img1})` }}
              className="bg-no-repeat rounded-l-lg bg-cover bg-center text-white flex-col px-4 flex items-center justify-center"
            ></div>

            <div className="py-8 px-4">
              <h1 className="font-semibold text-xl">Registrate</h1>
              <p className="mt-3 text-sm">
                Crea tu cuenta y se parte de PexelsPlus
              </p>

              <div className="  grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                <input
                  className="rounded border-gray-300 focus:outline-1 border-1 text-sm"
                  type="text"
                  placeholder="Nombres"
                  {...register("name", {
                    required: true,
                  })}
                />
                <input
                  className="rounded border-gray-300 focus:outline-1 border-1 text-sm"
                  type="text"
                  placeholder="Apellidos"
                  {...register("apellidos", {
                    required: true,
                  })}
                />
              </div>

              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: true,
                })}
              />
              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="password"
                placeholder="Repite la contraseña"
                {...register("password2", {
                  required: true,
                })}
              />

              <div className="text-sm mt-4 flex gap-2">
                <input
                  id="terminos"
                  type="checkbox"
                  className="rounded-lg"
                  {...register("terminos", { required: true })}
                />
                <label htmlFor="terminos">
                  Acepta los términos{" "}
                  <span className="text-indigo-700">y condiciones</span>
                </label>
              </div>

              <div className="block mt-4">
                <button className="py-3 text-sm w-full rounded-lg bg-indigo-700 text-white font-semibold text-center">
                  Registrate
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
