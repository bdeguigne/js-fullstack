import '../Home.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import logUser from '../redux/action/LoginAction';
import Forms from '../components/Forms';
import CardAnimation from '../components/AnimationHome';
import '../utils/i18n.js';

function Home(props) {
  const { t, i18n } = useTranslation();
  // const {langue} = props;
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="Container" onChange={changeLanguage}>
      <h1> {t('Welcome.label')} </h1>
      <CardAnimation />
      <Forms onSubmit={(Password, Pseudo) => props.logUser(Pseudo, Password)} />
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="fr" name="language" /> français
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
