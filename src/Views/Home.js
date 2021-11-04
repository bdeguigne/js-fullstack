import '../Home.css';
import Forms from '../components/Forms';
import CardAnimation from '../components/AnimationHome';

function Home() {
  return (
    <div className="Container">
      <h1> Welcome To War Card Game</h1>
      <CardAnimation />
      <Forms onSubmit={(Password, Pseudo) => console.log(Password, Pseudo)} />
    </div>
  );
}
export default Home;
