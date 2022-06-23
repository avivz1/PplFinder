import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({isChecked, onChange, label, value }) => {

  const [status, setStatus] = useState(false)

  useEffect(()=>{
    onChange(status)
  },[status])

  const handleChange = () => {
    setStatus(!status)

  };

  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} color="primary" />}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
