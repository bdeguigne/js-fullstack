import '../Home.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { logUser, registerUser } from '../redux/action/LoginAction';
import Forms from '../components/Forms';
import CardAnimation from '../components/AnimationHome';

function Home(props) {
  const navigate = useNavigate();
  return (
    <div className="Container">
      <h1> Welcome To War Card Game</h1>
      <CardAnimation />
      <Forms
        onSubmit={async (Password, Pseudo) => {
          const bool = await props.logUser(Pseudo, Password);
          if (bool) {
            navigate('/lobby');
          }
        }}
        onRegister={(Pseudo, Password) => props.registerUser(Pseudo, Password)}
      />
    </div>
  );
}

Home.propTypes = {
  logUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const actionCreators = {
  logUser,
  registerUser,
};

const connectedHome = connect(null, actionCreators)(Home);

export default connectedHome;
