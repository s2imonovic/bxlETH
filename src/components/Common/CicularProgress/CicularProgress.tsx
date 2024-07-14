import './CicularProgress.scss';
import clsx from 'clsx';

export default function CicularProgress({ className }: { className?: string }) {
  return <progress className={clsx('pure-material-progress-circular', className)} />;
}
