import React from 'react';
import axios from 'axios';

class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      item: [],
    }
  };

  componentDidMount() {
      let id = this.props.match.params.id_movie;
      console.log(id);
      axios.get('https://tv-v2.api-fetch.website/movie/' + id)
          .then(res => {
            //   console.log(res.data);
              this.setState({
                item: res.data,
              });
          });
  }
  render() {
    const { item } = this.state;
    console.log(item.images);
    console.log("caca---" + item.images); 
        return (
            <div className="container">
           
            <p>title: {item.title}</p>
            <p>Genres: {item.genres}</p>
            <p>Synopsis: {item.synopsis}</p>
            <img src={item.images.poster} alt="" />
            <img src={item.images.fanart} alt="" />
            <img src={item.images.banner} alt="" />
            </div>
        );
  };
}
Movie.url = '/movie/:id_movie'
export default Movie;
