import { useState } from 'react';

function useResultModal() {
  const [isShowingResult, setIsShowingResult] = useState(false);

  function toggleResult() {
    setIsShowingResult(!isShowingResult);
  }

  return {
    isShowingResult,
    toggleResult
  }
};

export default useResultModal;