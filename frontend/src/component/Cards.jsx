import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Cards({ value }) {
  // eslint-disable-next-line react/prop-types
  const navigate = useNavigate()
  // eslint-disable-next-line react/prop-types
  const { imgUrl, title, description, user } = value
  // eslint-disable-next-line react/prop-types
  const onlyUserName = user?.username
  return (
    <div className="card mt-2">
      <img
        src={imgUrl}
        className="card-img-top"
        alt="..."
        height={200}
        width={200}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {description}
        </p>
        {onlyUserName && <div>
          <button className="text-muted btn btn-light" onClick={() => navigate(`/${onlyUserName}`)}>{user?.name}</button>
        </div>}
        
      </div>
    </div>
  );
}

export default Cards;