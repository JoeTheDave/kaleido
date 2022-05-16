import { makeStyles } from '@material-ui/core/styles';

import type { FC } from 'react';

interface ContainerProps {
  width: number;
}

const useStyles = makeStyles(() => ({
  container: ({ width }: ContainerProps) => ({
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 0,
    width,
    margin: '50px auto',
  }),
}));

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  const classes = useStyles({ ...props });

  return <div className={classes.container}>{children}</div>;
};

export default Container;
