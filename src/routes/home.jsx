import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <Link to='/game1'>
        <button>
          game1
        </button>
      </Link>
      <Link to='/game2'>
        <button>
          game2
        </button>
      </Link>
      <Link to='/game3'>
        <button>
          game3
        </button>
      </Link>
      <Link to='/game4'>
        <button>
          game4
        </button>
      </Link>
    </div>
  )
}
export default Home;