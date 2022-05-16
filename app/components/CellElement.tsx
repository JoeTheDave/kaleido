import { makeStyles } from '@material-ui/core/styles';

import type { Cell } from '~/lib/kalidoGen';
import type { FC } from 'react';

interface CellProps {
  data: Cell;
  size: number;
}

const useStyles = makeStyles(() => ({
  cell: ({ data, size }: CellProps) => ({
    border: 'solid 1px black',
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    backgroundColor: data.segment !== null ? 'yellow' : '',
  }),
}));

const CellElement: FC<CellProps> = (props) => {
  const { data } = props;
  const classes = useStyles({ ...props });
  return <div className={classes.cell}>{data.id}</div>;
};

export default CellElement;
