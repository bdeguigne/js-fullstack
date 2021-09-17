/* eslint-disable */
import Forms from '../components/Forms';

function Home() {
  return (
    <div>
      <h1> Welcome To War Card Game</h1>
      <Forms
       toto='tutu'
       onSubmit={(Password, Pseudo) => console.log(Password, Pseudo)} />
    </div>
  );
}
export default Home;
