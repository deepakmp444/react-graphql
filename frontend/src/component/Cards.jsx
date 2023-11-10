function Cards() {
    return (
      <div className="card">
        <img
          src={"https://picsum.photos/200/300"}
          className="card-img-top"
          alt="..."
          height={200}
          width={200}
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
  }
  
  export default Cards;