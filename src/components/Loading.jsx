import { RotatingSquare } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex fixed left-0 top-0 justify-center flex-col gap-3 items-center bg-white w-full min-h-screen">
      <RotatingSquare
        height="100"
        width="100"
        color="#a855f7"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />

      <h4>Cargando ...</h4>
    </div>
  );
};

export default Loading;
