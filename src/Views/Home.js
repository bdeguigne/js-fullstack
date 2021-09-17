import Forms from '../components/Forms';
import MediaControlCard from './Lobby';

function Home() {
  return (
    <div>
      <h1> Welcome To War Card Game</h1>
      <Forms onSubmit={(Password, Pseudo) => console.log(Password, Pseudo)} />
      <MediaControlCard />
    </div>
  );
}
export default Home;
