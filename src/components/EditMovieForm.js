import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';


 // #### GET `http://localhost:9000/api/movies/:id`

/// - Retrieves a movie with the passed value as id.




const EditMovieForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMovies } = props;
  

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
  });

  useEffect(() => {
    // Use Axios to make a GET request
    axios.get(`http://localhost:9000/api/movies/${id}`)
      .then(response => {
        // Handle the successful response, update the 'movie' state
        setMovie(response.data)
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  }, []); // The dependency array specifies when this effect should run


  




  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9000/api/movies/${id}`, movie)
      .then(res => {
        setMovies(res.data);
        navigate(`/movies/${movie.id}`);
      })
      .catch(err => {
        console.log(err);
      })
    }

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
            </div>

          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save" />
            <Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>
        </form>
      </div>
    </div>);
}

export default EditMovieForm;
