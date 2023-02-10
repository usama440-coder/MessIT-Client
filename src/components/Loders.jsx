import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loaderWrapper">
        <ThreeDots
          height="80"
          width="60"
          radius="90"
          color="#5A45AA"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
