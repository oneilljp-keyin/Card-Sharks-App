import { useState } from 'react';

function useChoiceModal() {
  const [isShowingChoice, setIsShowingChoice] = useState(false);

  function toggleChoice() {
    setIsShowingChoice(!isShowingChoice);
  }

  return {
    isShowingChoice,
    toggleChoice
  }
};

export default useChoiceModal;