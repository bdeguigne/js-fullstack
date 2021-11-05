import '../Home.css';
import Forms from '../components/Forms';
import MediaControlCard from './Lobby';
// import Board from './InGame';
import CardAnimation from '../components/AnimationHome';

function Home() {
  return (
    <div className="Container">
      <h1> Welcome To War Card Game</h1>
      <CardAnimation />
      <Forms onSubmit={(Password, Pseudo) => console.log(Password, Pseudo)} />
      <MediaControlCard />
      {/* <Board /> */}
    </div>
  );
}
export default Home;
