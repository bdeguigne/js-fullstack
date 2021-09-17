/* eslint-disable */
// eslint-disable

import { React, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Send } from '@material-ui/icons';

function Forms({ toto }) {
  const [Pseudo, setPseudo] = useState('');
  const [Password, setPassword] = useState('');
  console.log(toto)

  return (
    <form>
      <TextField
        id="standard-full-width"
        label="Pseudo"
        style={{ margin: 8 }}
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
        id="standard-full-width"
        label="Password"
        style={{ margin: 8 }}
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
        <Button type="submit" variant="contained" endIcon={<Send />}>
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
