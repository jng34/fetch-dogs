import { Dispatch, SetStateAction } from "react";
import { breedSearch, zipSearch } from "./queries";

// Breed filter function
export const breedFilter = (
  selectBreed: string,
  breeds: string[],
  setBreeds: Dispatch<SetStateAction<string[]>>,
  uri: string,
  setUri: Dispatch<SetStateAction<string>>,
  setCurrentPage: Dispatch<SetStateAction<number>>, 
  setSelected: Dispatch<SetStateAction<string>>, 
) => {
  setSelected(selectBreed);
  if (selectBreed !== 'none' && !breeds.includes(selectBreed)) {
    const breedArr: string[] = [...breeds, selectBreed];
    setBreeds(breedArr);
    const query = breedSearch(breedArr);
    setUri(uri + query);
    setCurrentPage(1);
  }
};

// Age filter function //
export const ageFilter = (
  ageInput: string,
  ageState: number,
  setAgeState: Dispatch<SetStateAction<number>>,
  uri: string,
  setUri: Dispatch<SetStateAction<string>>,
  searchAgeUri: (age: number) => string
) => {
  const prevAge = ageState;
  const newAge = Number(ageInput);
  setAgeState(newAge);
  let newURI = '';
  if (newAge > 0) {
    if (uri.includes(searchAgeUri(prevAge))) {
      newURI = uri.replace(searchAgeUri(prevAge), searchAgeUri(newAge)); 
    } else {
      newURI = uri + searchAgeUri(newAge);
    }
  } else {
    newURI = uri.replace(searchAgeUri(prevAge), ''); 
  }
  setUri(newURI);
};

// Zip Code filter
export const zipCodeFilter = (
  zip: string,
  setZipCode: Dispatch<SetStateAction<string>>,
  uri: string,
  setUri: Dispatch<SetStateAction<string>>,
) => {
  setZipCode(zip);
  let query = uri;
  const searchQuery = /&zipCodes=\d+/;
  const queryExist = uri.match(searchQuery);
  if (queryExist) {
    // Scenario where user deletes numbers in zip input
    if (!zip) query = query.replace(queryExist[0], ''); // empty zip input, resets search
    query = query.replace(queryExist[0], zipSearch(zip)); // non-empty zip input
  } else {
    // Scenario where user begins to input zip
    query += zipSearch(zip);
  }
  setUri(query);
};