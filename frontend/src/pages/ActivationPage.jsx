import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { requestWrapper } from "../utils/request_wrapper";
import Loader from "../components/Layout/Loader";

const ActivationPage = ({ type = "auth" }) => {
  const { token } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const sendRequest = async () => {
        setIsLoading(true);
        const response = await requestWrapper(
          `${server}/${type}/activation?token=${token}`,
          {},
          "GET",
          "application/json"
        );
        console.log(response);

        if (response.status !== 200) {
          setError(true);
        }
        setIsLoading(false);
      };
      sendRequest();
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
