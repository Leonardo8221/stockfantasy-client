import TimeCounter from "../TimeCounter";

import "./style.scss";

const RoomBox = (props) => {
  const { name, startedDate, endDate, duration, players, page, onClick } = props;

  return (
    <div className="gameRoom" onClick={onClick}>
      <h3 className="gameRoom-name text-center text-primary text-uppercase">
        {name}
      </h3>
      {page === "home" &&
        (endDate ? (
          <>
            <h5 className="gameRoom-completedBadge">
              <i className="fa fa-check" />
            </h5>
            <p className="gameRoom-badge finished">Finshed</p>
          </>
        ) : (
          <>
            <h6 className="text-dark">
              <TimeCounter startedDate={startedDate} duration={duration} />
            </h6>
            <p className="gameRoom-badge playing">Playing...</p>
          </>
        ))}
      {page === "join" && (
        <>
          <div className="gameRoom-players">
            {players.map((player) => (
              <i key={player} className="fa fa-user" />
            ))}
          </div>
          <p className="gameRoom-badge pending">Pending...</p>
        </>
      )}
    </div>
  );
};

export default RoomBox;
