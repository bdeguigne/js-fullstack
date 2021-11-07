import '../Home.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Forms from '../components/Forms';
import { registerUser, logUser } from '../redux/action/LoginAction';
import CardAnimation from '../components/AnimationHome';
import '../utils/i18n.js';

function Home(props) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const navigate = useNavigate();
  return (
    <div className="Container" onChange={changeLanguage}>
      <h1> {t('Welcome.label')} </h1>
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
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="fr" name="language" /> français
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
