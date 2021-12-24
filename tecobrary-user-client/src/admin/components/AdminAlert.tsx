import {ReactNode, useEffect, useState} from "react";

interface Props {
  visible: boolean
  duration: number,
  onDurationEnd?: (visible: boolean) => void
  children: ReactNode
}

export const AdminAlert = ({visible, duration, onDurationEnd, children}: Props): ReactNode => {
  const [_isVisible, _setVisibility] = useState(false);

  useEffect(() => {
    _setVisibility(visible);
  }, [visible]);

  if (!_isVisible) return null;

  if (duration) {
    setTimeout(() => {
      _setVisibility(false);

      if (onDurationEnd) {
        onDurationEnd(false);
      }
    }, duration);
  }

  return children;
};