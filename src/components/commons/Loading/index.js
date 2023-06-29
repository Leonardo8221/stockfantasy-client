import "./style.scss";
const Loading = () => {
  return (
    <>
      <div className="e-loadholder">
        <div className="m-loader">
          <span className="e-text">Loading</span>
        </div>
      </div>
      <div id="particleCanvas-Blue"></div>
      <div id="particleCanvas-White"></div>
    </>
  );
};

export default Loading;
