import { React, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Send } from '@material-ui/icons';
import '../Home.css';
import '../utils/i18n.js';

function Forms({ onSubmit }) {
  const [Pseudo, setPseudo] = useState('');
  const [Password, setPassword] = useState('');
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(Password, Pseudo);
    console.log(Password, Pseudo);
  };

  return (
    <div className="Container" onChange={changeLanguage}>
      <form className="Forms" onSubmit={handleSubmit}>
        <TextField
          id="Pseudo"
          label="Pseudo"
          style={{ margin: 8, backgroundColor: 'lightgreen' }}
          placeholder={t('Pseudo.label')}
          margin="normal"
          value={Pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="Password"
          className="Field"
          label={t('Psswrd.label')}
          style={{ margin: 8, backgroundColor: 'lightgreen' }}
          placeholder={t('Psswrd.label')}
          margin="normal"
          required
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div>
          <Button
            style={{
              marginTop: '12px',
              backgroundColor: 'lightgreen',
              color: 'black',
            }}
            fullWidth="100%"
            type="submit"
            variant="contained"
            endIcon={<Send />}
          >
            {t('Login.label')}
          </Button>
        </div>
      </form>
    </div>
  );
}

Forms.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Forms;
