import { useState } from 'react';

function useAlertModal() {
  const [isShowingAlert, setIsShowingAlert] = useState(false);

  function toggleAlert() {
    setIsShowingAlert(!isShowingAlert);
  }

  return {
    isShowingAlert,
    toggleAlert
  }
};

export default useAlertModal;