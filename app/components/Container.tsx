import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { useNavigate } from '@remix-run/react';

import type { FC } from 'react';

interface ContainerProps {
  width: number;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  container: ({ width }: ContainerProps) => ({
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 0,
    width,
  }),
  hoverZone: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: -50,
    left: -50,
    transition: '0.5s',
    '&:hover': {
      paddingTop: 50,
      paddingLeft: 50,
    },
  },
}));

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  const classes = useStyles({ ...props });
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <div className={classes.hoverZone}>
        <IconButton size="medium" onClick={() => navigate('/')}>
          <Refresh />
        </IconButton>
      </div>
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default Container;
