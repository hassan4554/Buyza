import PropTypes from "prop-types";

const Error = ({ children }) => {
  return <p className="text-red-600 text-sm">{children}</p>;
};

Error.propTypes = {
  children: PropTypes.node,
};

export default Error;
