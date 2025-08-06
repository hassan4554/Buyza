import styles from "../../constants/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block py-10 px-5 mb-12 rounded-xl`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img
            src="/images/Sony-logo.png"
            alt=""
            className="w-36 object-contain"
          />
        </div>
        <div className="flex items-center">
          <img
            src="/images/Dell-logo.png"
            className="w-36 object-contain"
            alt=""
          />
        </div>
        <div className="flex items-center">
          <img
            src="/images/apple-logo.png"
            className="w-36 object-contain"
            alt=""
          />
        </div>
        <div className="flex items-center">
          <img
            src="/images/LG-logo.png"
            className="w-36 object-contain"
            alt=""
          />
        </div>
        <div className="flex items-center">
          <img
            src="/images/microsoft-logo.png"
            className="w-36 object-contain"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
