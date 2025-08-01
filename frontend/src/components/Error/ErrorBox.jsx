import PropTypes from "prop-types";

const ErrorBox = ({ children }) => {
  return <div className="h-5 my-1 text-left">{children}</div>;
};

ErrorBox.propTypes = {
  children: PropTypes.node,
};

export default ErrorBox;
