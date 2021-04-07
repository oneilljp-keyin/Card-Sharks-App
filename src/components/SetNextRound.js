import React from 'react'

function SetNextRound() {
  if (rightWrong !== wrong) {
    setDisplayCards(revealCard);
    setRoundNum(previousValue => previousValue + 1);
  }
  setRevealCard(placeholder);
  setShowResults(false);

  setHighBtnDis(false);
  setLowBtnDis(false);
  if (!swapOutUsed) {
    setSwapOutDis(false)
  }
}

export default SetNextRound
