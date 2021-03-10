import React, { useState } from "react";

const SelectNumberOfVotes = (props) => {
  const [atLeastRows, setAtleastRows] = useState(2);

  const options = [2, 5, 10].map((v) => {
    return { value: v, text: v };
  });

  return (
    <FormField>
      <label>At least: </label>
      <Select
        options={options}
        onChange={(e, v) => props.onChange(v.value)}
        defaultValue={props.defaultValue}
      />
      <label> votes</label>
    </FormField>
  );
};

SelectNumberOfVotes.defaultProps = {};

export default SelectNumberOfVotes;
