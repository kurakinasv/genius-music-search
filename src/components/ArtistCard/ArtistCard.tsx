import { Link } from 'react-router-dom';

const ArtistCard = () => {
  let id = (Math.random() * 10000).toFixed();

  return (
    <div>
      <h5>Artist Card</h5>
      <Link to={`/song/${id}`}>full song {id}</Link> <br />
      <Link to={`/artist/${id}`}>go to artist {id}</Link>
    </div>
  );
};

export default ArtistCard;
