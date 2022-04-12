import { Link } from 'react-router-dom';

const SongCard = () => {
  let id = (Math.random() * 10000).toFixed();

  return (
    <div>
      <h5>Song Card</h5>
      <Link to={`/song/${id}`}>full song</Link> <br />
      <Link to={`/artist/${id}`}>go to artist</Link>
    </div>
  );
};

export default SongCard;
