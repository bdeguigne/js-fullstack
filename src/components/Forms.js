/* eslint-disable */
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Send } from '@material-ui/icons';

function Forms(props) {
  const [Pseudo, setPseudo] = useState('');
  const [Password, setPassword] = useState('');
  // eslint-disable-next-line react/destructuring-assignment
  console.log('onSubmit', props.onSubmit);
  console.log('onSubmit', props);
  return (
    <form onSubmit={() => console.log('onSubmit5', props)}>
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

export default Forms;
