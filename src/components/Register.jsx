import img1 from "../assets/imagenes/img1.jpeg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const { register,handleSubmit, reset, formState: { errors }} = useForm({ name:"", apellido:"", email:"", password:"", password2:"", terminos: "" });
  const navigate = useNavigate()
  const onSubmit = (data) => {
    navigate("/login")
    reset()
  }


  return (
    <div
      className="w-full min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "linear-gradient(115deg,#7e22ce, #7e22ce, #6b21a8)",
      }}
    >
      <div className="rounded-lg mx-4 lg:shadow-2xl bg-white  container lg:mx-64 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div
              style={{ backgroundImage: `url(${img1})` }}
              className="bg-no-repeat rounded-l-lg bg-cover bg-center text-white flex-col px-4 flex items-center justify-center"
            ></div>

            <div className="py-8 px-4">
              <h1 className="font-semibold text-xl">Register</h1>
              <p className="mt-3 text-sm">
                Create your account it's free and only take a minute
              </p>

              <div className="  grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                <input
                  className="rounded border-gray-300 focus:outline-1 border-1 text-sm"
                  type="text"
                  placeholder="First Name"
                  autoFocus={true}
                  {...register("name")}
                />
                <input
                  className="rounded border-gray-300 focus:outline-1 border-1 text-sm"
                  type="text"
                  placeholder="Last Name"
                  {...register("apellido")}
                />
              </div>

              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="text"
                placeholder="Email"
                {...register("email")}
              />
              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <input
                className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
                type="password"
                placeholder="Confirm Password"
                {...register("password2")}
              />

              <div className="text-sm mt-4 flex gap-2">
                <input id="terminos" type="checkbox" className="rounded-lg" {...register("terminos")} />
                <label htmlFor="terminos">
                  I accept the{" "}
                  <span className="text-indigo-600">Terms of use</span> Privacy
                  Polity
                </label>
                
              </div>

              <div className="block mt-4">
                <button className="py-3 text-sm w-full rounded-lg bg-indigo-600 text-white font-semibold text-center">
                  Register Now
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
