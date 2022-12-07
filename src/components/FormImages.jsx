import { toast } from "react-toastify";
import { useForms } from "../Hooks/useForms";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import { Loading } from "./";

const FormImages = () => {
  const { user, addImagenes, loading } = UseSliceAuth();
  const { onInputChange, name, description, onResetForm } = useForms({
    name: "",
    description: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      description === "" ||
      e.target.image.files.length === 0
    ) {
      toast.info("Completa los campos vacios", { position: "top-right" });
    } else {
      onResetForm();
      addImagenes({
        name,
        description,
        userId: user.usuario._id,
        image: e.target.image.files,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handlesubmit}>
      <input
        className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm placeholder:text-sm"
        type="text"
        placeholder="Nombre"
        name="name"
        value={name}
        onChange={onInputChange}
      />
      <input
        className="mt-4 w-full rounded border-gray-300 focus:outline-1 border-1 text-sm"
        type="text"
        placeholder="Descripcion"
        name="description"
        value={description}
        onChange={onInputChange}
      />

      <input
        type="file"
        name="image"
        className="
      file:bg-gradient-to-b file:from-purple-500 file:to-purple-600
      file:pr-2 lg:pr-4 file:py-1 
      file:border-none
      file:text-sm
      file:rounded-full
      file:text-white
      file:cursor-pointer
      file:shadow-lg file:shadow-purple-600/50
      font-semibold
      file:w-40
      w-full
    
      text-gray-300
      pr-1
      rounded-full
      cursor-pointer
      shadow-lg shadow-gray-500/30
      my-4

    "
      />

      <div className="block mt-4">
        <button className="py-3 text-sm w-full rounded-lg bg-purple-500 text-white font-semibold text-center">
          Subir
        </button>
      </div>
    </form>
  );
};

export default FormImages;
