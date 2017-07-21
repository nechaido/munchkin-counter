import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Input from 'material-ui/Input';

const fabStyle = {
  margin: 0,
  top: 'auto',
  right: 32,
  bottom: 32,
  left: 'auto',
  position: 'fixed',
};

const Bar = props => (
  <div className={'AppBar'}>
    <AppBar>
      <Toolbar>
        <Typography type='title' color='inherit' style={{ flex: 1 }}>
          Counter
        </Typography>
        <IconButton color='contrast' onClick={props.onGameStatusChange}>
          <Icon>{props.gameStarted ? 'stop' : 'play_arrow'}</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
    <br />
    <br />
    <br />
    <br />
  </div>
);

Bar.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  onGameStatusChange: PropTypes.func.isRequired,
};

const NameDialog = props => (
  <Dialog open={props.addingPlayer}>
    <DialogTitle>
      {'Input players name'}
    </DialogTitle>
    <DialogContent>
      <Input
        placeholder={'PlayerName'}
        onChange={event => props.onNewPlayerNameChange(event.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button
        color='primary'
        onClick={props.onSubmit}
      >
        {'Submit'}
      </Button>
    </DialogActions>
  </Dialog>
);

NameDialog.propTypes = {
  addingPlayer: PropTypes.bool.isRequired,
  onNewPlayerNameChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const Controls = props => (
  <div className='Main'>
    <Bar
      gameStarted={props.gameStarted}
      onGameStatusChange={props.onGameStatusChange}
    />
    <NameDialog
      addingPlayer={props.addingPlayer}
      onNewPlayerNameChange={props.onNewPlayerNameChange}
      onSubmit={name => props.onPlayerAdded(name)}
    />
    <Button
      fab
      style={fabStyle}
      color='primary'
      onClick={
        () => {
          if (props.gameStarted) {
            props.onResetTemp();
          } else {
            props.onPlayerAdd();
          }
        }
      }
    >
      <Icon>{props.gameStarted ? 'skip_next' : 'add'}</Icon>
    </Button>
  </div>
);

Controls.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  addingPlayer: PropTypes.bool.isRequired,
  onGameStatusChange: PropTypes.func.isRequired,
  onNewPlayerNameChange: PropTypes.func.isRequired,
  onPlayerAdd: PropTypes.func.isRequired,
  onPlayerAdded: PropTypes.func.isRequired,
  onResetTemp: PropTypes.func.isRequired,
};

export default Controls;
