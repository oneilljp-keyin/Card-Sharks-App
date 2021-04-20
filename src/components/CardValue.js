function CardValue(cardValue) {
    let faceValue = cardValue;
    let value;
    if (faceValue === "ACE")   {value = 14;} else
    if (faceValue === "KING")  {value = 13;} else 
    if (faceValue === "QUEEN") {value = 12;} else 
    if (faceValue === "JACK")  {value = 11;} else
       {value = faceValue};

  return (
    parseInt(value)
  )
}

export default CardValue
