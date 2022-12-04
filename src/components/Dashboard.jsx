import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image4 from "../assets/imagenes/img4.jpeg";
import { Footer, Modal, FormImages } from "./";
import { useForms } from "../Hooks/useForms";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import baseUrl from "../Api/baseUrl";
import { CiSearch } from "react-icons/ci";
import { saveAs } from "file-saver";
import { BiDownload } from "react-icons/bi";

const Dashboard = () => {
  const { onInputChange, search } = useForms({
    search: "",
  });

  const [busqueda, setBusqueda] = useState([]);

  const imagenName = async () => {
    try {
      const { data } = await baseUrl.post("/imagen/name", { name: search });

      setBusqueda(data.resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const { user, UserLogout, loadImagenes, searchUserForId, userId } =
    UseSliceAuth();

  const [modal, setModal] = useState(false);

  const [misImages, setMisImages] = useState(false);

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("aparente", window.scrollY > 0);
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const downloadImage = (url, name) => {
    saveAs(url, name + ".png");
  };

  useEffect(() => {
    loadImagenes();
    searchUserForId();
  }, [modal, misImages]);

  useEffect(() => {
    imagenName();
  }, [search]);

  return (
    <>
      <Modal
        setcloseModal={setModal}
        closeModal={modal}
        color="#ffffff"
        bac="#a855f7"
        titulo={`Hola! ${user.usuario.name} sube tu imagen a pexelsplus`}
        info="Comparte tu imagen"
      >
        <FormImages />
      </Modal>

      <header className="fixed z-[100] bg-transparent max-w-full left-0 top-0 container px-4 lg:px-8  flex justify-between items-center py-4">
        <Link to="/">
          <span className="p-2 lg:p-3 rounded-full mr-2 bg-purple-500 text-white font-semibold">
            PP
          </span>
          <span className="font-semibold text-white aparente1 lg:text-xl">
            PexelsPlus
          </span>
        </Link>

        <ul className="flex items-center justify-between gap-x-4">
          <button
            onClick={() => setModal(!modal)}
            className="text-white font-semibold hover:border-b-2 aparente1"
          >
            Subir
          </button>
          <button
            onClick={() => UserLogout()}
            className="py-2 px-4 rounded-full mr-2 bg-purple-500 text-white font-semibold hover:bg-purple-600"
          >
            Salir
          </button>
        </ul>
      </header>

      <div
        className="relative estilos w-full bg-no-repeat bg-cover bg-center h-[75vh]"
        style={{ backgroundImage: `url(${image4})` }}
      >
        <div className="flex items-center justify-center flex-col h-full">
          <h1 className="z-60 text-[1.1rem] lg:text-2xl pb-4 text-white font-semibold z-50">
            ¡Bienvenido{" "}
            <span className="text-purple-500">{user.usuario.name}!</span> a
            PexelsPlus
          </h1>
          <h3 className="text-[1rem] text-center pb-4 text-white font-semibold z-50">
            Sube, visualiza y descarga las mejores imagenes para tus sitios web.
            Gracias por ser parte de la comunidad de PexelsPlus
          </h3>

          <form
            onSubmit={onSubmit}
            className="relative z-50 flex items-center justify-center"
          >
            <input
              placeholder="Busca imagenes ..."
              name="search"
              value={search}
              onChange={onInputChange}
              className=" px-4 py-3 lg:w-[32rem] outline-none border-none rounded"
              type="text"
            />
            <CiSearch
              className="text-gray-800 absolute right-4 top-3"
              size={25}
            />
          </form>
        </div>
      </div>

      <div className="px-3 pt-4 container mx-auto flex items-center justify-center gap-6">
        <h1 className="text-center">
          ¡Hola <span className="text-purple-500">{user.usuario.name}!</span>{" "}
          Explora tus imagenes aqui
        </h1>

        <button
          onClick={() => setMisImages(!misImages)}
          className="px-4 text-sm py-2 lg:text-[1rem] lg:px-6 bg-purple-500 text-white rounded-full hover:bg-purple-600 "
        >
          {!misImages ? "Mis imagenes" : "Mi busqueda"}
        </button>
      </div>

      <div className="columns-1 gap-1 md:columns-2 px-1 lg:columns-4 lg:gap-3 container mx-auto pt-8 space-y-3 pb-12">
        {misImages ? (
          userId.length === 0 ? (
            <p className="text-center text-sm">
              {" "}
              {user?.usuario?.name + ` aun no tienes imagenes subidas`}
            </p>
          ) : (
            userId?.map((imgs, i) => (
              <div key={i} className="bg-gray-200 break-inside-avoid relative">
                <img src={imgs.url} className="w-full" />
                <button
                  onClick={() =>
                    downloadImage(elemento.image_url, elemento.name)
                  }
                  className="absolute right-2 bottom-2 text-white text-[2rem]"
                >
                  <BiDownload />
                </button>
              </div>
            ))
          )
        ) : busqueda?.length >= 0 ? (
          busqueda.map((elemento, i) => (
            <div key={i} className="bg-gray-200 break-inside-avoid relative">
              <img src={elemento.image_url} className="w-full" />
              <button
                onClick={() => downloadImage(elemento.image_url, elemento.name)}
                className="absolute right-2 bottom-2 text-white text-[2rem]"
              >
                <BiDownload />
              </button>
            </div>
          ))
        ) : (
          <p>No hay resultados de su busqueda</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
