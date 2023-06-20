import "./style.scss";
const PlayerBox = (props) => {
  const { name, email, isReady } = props;
  return (
    <div className="playerBox">
      <div className="playerBox-info">
        <i className="playerBox-info-icon fa fa-user"></i>
        <div className="playerBox-info-name">
          <strong className="mb-0">{name}</strong>
        </div>
      </div>
      <div className="playerBox-caption">
        {isReady ? (
          <>
            <p className="mb-0 ">Ready</p>
            <p className="playerBox-caption-ready mb-0">
              <i className="fa fa-check" />
            </p>
          </>
        ) : (
          "Building Portfolio..."
        )}
      </div>
    </div>
  );
};

export default PlayerBox;
