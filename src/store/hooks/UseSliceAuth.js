import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../Api/baseUrl";


import {
  clearErrorMessage,
  Logout,
  onChecking,
  onLogin,
  onLogout,
} from "../slices/authSlice";


export const UseSliceAuth = () => {

  const { user, status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imagenes, setImagenes] = useState([])
  const [userId, setUserId] = useState()

  const startLogin = async ({ email, password }) => {

    try {

      dispatch(onChecking());
      
      const { data } = await baseUrl.post("/login", { email, password });

      const resp = await baseUrl.get(`/user/${data.usuario._id}`);


      localStorage.setItem("token", data.token);

      dispatch(onLogin(resp.data));

      
    } catch (error) {

      dispatch(onLogout("¡Credenciales Incorrectas!"));
      
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 20);

    }
  };


  // ==========================================================================

  const checkAuthToken = async () => {

    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await baseUrl.get("/renew/token");

      const resp = await baseUrl.get(`/user/${data.id}`);

      localStorage.setItem("token", data.token);

      dispatch(onLogin(resp.data));

    } catch (error) {

      localStorage.clear();

      dispatch(onLogout());
    }
  };


  // =====================================================================

  const UserLogout = () => {

    dispatch(Logout());

    localStorage.removeItem("token");
  };

  // =====================================================================

  const registerUser = async ({ name, apellidos, email, password }) => {

    try {
        
        const data = await baseUrl.post("/register", { name, apellidos, email, password})

        if(data.status === 200){
          toast.success("¡Registrado con exito!", {position: "top-center"})
        }
        navigate("/")
    } catch (error) {
      
      dispatch(onLogout("¡El email ya corresponde a un usuario!"));
      
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 20);
    }


}


  //======================================================================

  const addImagenes= async ({ name, description, userId, image}) => {
        
    try {

        const reader = new FileReader();
        reader.readAsDataURL(image[0])
        
    
            reader.onloadend = async () => {

                try{
                  setLoading(true)
                  const data = await baseUrl.post(`/add-images/${userId}`,{ name, description, imagen: reader.result} )
                  setLoading(false)
                  if(data.status === 200) {
                    toast.success("Se ha subido su imagen", { position: "top-center"})
                  }
                }catch(error){
                  console.log(error)                
                }
            }
   
        
      } catch (error) {
        console.log(error)
    }
}


// ===========================================================================

  const loadImagenes = async () => {
    try {
      
      const data = await baseUrl.get("/imagenes")
      setImagenes(data.data)


    } catch (error) {
      console.log(error)
    }
  }


  const searchUserForId = async () => {
      try {
        
        const { data } = await baseUrl.get(`/user/${user.usuario._id}`)

       setUserId(data.usuario.imagenes)

      } catch (error) {
        console.log(error)
      }
  }


  return {
    // Atributos
    user,
    status,
    errorMessage,
    loading,
    imagenes,
    userId,

    // Métodos
    startLogin,
    checkAuthToken,
    UserLogout,
    registerUser,
    addImagenes,
    loadImagenes,
    searchUserForId
  };
};
