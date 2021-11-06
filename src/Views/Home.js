import '../Home.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logUser from '../redux/action/LoginAction';
import Forms from '../components/Forms';
import CardAnimation from '../components/AnimationHome';

function Home(props) {
  return (
    <div className="Container">
      <h1> Welcome To War Card Game</h1>
      <CardAnimation />
      <Forms onSubmit={(Password, Pseudo) => props.logUser(Pseudo, Password)} />
    </div>
  );
}

Home.propTypes = {
  logUser: PropTypes.func.isRequired,
};

const actionCreators = {
  logUser,
};

const connectedHome = connect(null, actionCreators)(Home);

export default connectedHome;
