import { React, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Send } from '@material-ui/icons';
import '../Home.css';

function Forms({ onSubmit }) {
  const [Pseudo, setPseudo] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(Password, Pseudo);
    console.log(Password, Pseudo);
  };

  return (
    <form className="Forms" onSubmit={handleSubmit}>
      <TextField
        id="Pseudo"
        label="Pseudo"
        style={{ margin: 8, backgroundColor: 'lightgreen' }}
        placeholder="Pseudo"
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
        label="Password"
        style={{ margin: 8, backgroundColor: 'lightgreen' }}
        placeholder="Password"
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
          Login
        </Button>
      </div>
    </form>
  );
}

Forms.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Forms;
