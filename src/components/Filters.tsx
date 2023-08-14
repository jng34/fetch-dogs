import { FilterProps } from "../utils/types";

export default function Filters({ entry, index, removeBreedFilter }: FilterProps) {
  return (
    <div key={index}>
      <button
        type="button"
        className="deleteButton"
        value={entry}
        onClick={(e) => removeBreedFilter(e)}
      >
        X
      </button>
      &nbsp;
      <span>{entry}</span>
    </div>
  );
}