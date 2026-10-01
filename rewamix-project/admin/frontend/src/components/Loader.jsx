const Loader = ({ text = "Loading..." }) => (
  <div className="loader">
    <span className="loader-spinner" />
    {text}
  </div>
);

export default Loader;
