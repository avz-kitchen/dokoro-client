import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

function Gardens() {
  const [gardens, setGardens] = useState(null);

  const getGardens = () => {
    axios
      .get(`${API_URL}/gardens`)
      .then((response) => {
        const gardensFromApi = response.data.reverse();
        setGardens(gardensFromApi);
      })
      .catch((e) => console.log("error getting gardens from API", e));
  };

  useEffect(() => {
    getGardens();
  }, []);

  if (gardens === null) {
    return <div className="loader"></div>;
  }

  return (
    <div>
      <h1>Number of gardens: {gardens?.length}</h1>

      {gardens?.map((garden) => {
        return (
          <Link to={`/gardens/${garden.id}`} key={garden.id}>
            <div className="card">
              <h3>{garden.title}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Gardens;
