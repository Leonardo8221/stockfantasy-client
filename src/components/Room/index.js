import { useNavigate } from "react-router-dom";

import TimeCounter from "../TimeCounter";

import "./style.scss";

const Room = (props) => {
  const navigate = useNavigate();
  const { _id, name, startedDate, endDate, duration, players, page } = props;

  const route = endDate ? "game-result" : "gameRoom";
  const handleViewGame = (val) => {
    navigate(val);
  };

  return (
    <div
      className="gameRoom"
      onClick={() => handleViewGame(`/${route}/${_id}`)}
      key={_id}
    >
      <h3 className="gameRoom-name text-center text-primary text-uppercase">{name}</h3>
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

export default Room;
