import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { FilterProps } from "./Types";

// Render filters component
export function Filters({ entry, index, removeFilterFn }: FilterProps) {
  return (
    <div key={index}>
      <button
        type="button"
        className="deleteButton"
        value={entry}
        onClick={(e) => removeFilterFn(e)}
      >
        X
      </button>
      &nbsp;
      <span>{entry}</span>
    </div>
  );
}

// Age filter //
export const handleAgeFilter = (
  e: ChangeEvent<HTMLInputElement>,
  ageState: number,
  setAgeState: Dispatch<SetStateAction<number>>,
  uri: string,
  setUri: Dispatch<SetStateAction<string>>,
  searchAgeUri: (age: number) => string
) => {
  const prevAge = ageState;
  const newAge = Number(e.target.value);
  setAgeState(newAge);
  let newURI = '';
  if (newAge > 0) {
    if (uri.includes(searchAgeUri(prevAge))) {
      newURI = uri.replace(searchAgeUri(prevAge), searchAgeUri(newAge)); 
    } else {
      newURI = uri + searchAgeUri(newAge);
    }
  } else {
    newURI = uri.replace(searchAgeUri(prevAge), searchAgeUri(newAge)); 
  }
  setUri(newURI);
};