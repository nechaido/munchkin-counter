import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';

const PlayerPropery = ({ property, value, onUpd }) => (
  <div>
    <Typography align='center'>
      {property}
    </Typography>
    <Typography align='center'>
      <IconButton onClick={() => onUpd(value - 1)}>
        -
      </IconButton>
      {value}
      <IconButton onClick={() => onUpd(value + 1)}>
        +
      </IconButton>
    </Typography>
  </div>
);

PlayerPropery.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onUpd: PropTypes.func.isRequired,
};

const PlayerCard = ({ player, onUpdate }) => (
  <Card>
    <CardHeader
      title={player.name}
    />
    <CardContent>
      <PlayerPropery
        property={'Level'}
        value={player.level}
        onUpd={value => onUpdate(player.id, 'level', value)}
      />
      <PlayerPropery
        property={'Power'}
        value={player.power}
        onUpd={value => onUpdate(player.id, 'power', value)}
      />
      <PlayerPropery
        property={'Temporary'}
        value={player.temp}
        onUpd={value => onUpdate(player.id, 'temp', value)}
      />
      <Typography align='center'>
        Total
      </Typography>
      <Typography align='center'>
        {player.level + player.power + player.temp}
      </Typography>
    </CardContent>
  </Card>
);

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const PlayerGridItem = ({ player, onUpdate }) => (
  <Grid item>
    <PlayerCard player={player} onUpdate={onUpdate} />
  </Grid>
);

PlayerGridItem.propTypes = {
  player: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const PlayerGrid = props => (
  <Grid container justify='center' align='center'>
    {props.players.map(player => (
      <PlayerGridItem
        player={player}
        key={player.id}
        onUpdate={props.onUpdate}
      />
    ))}
  </Grid>
);

PlayerGrid.propTypes = {
  players: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerGrid;
