import { baseURI } from "../utils/constants";

export function querySearch(
  breeds: string[],
  zipCode: string | null,
  minAge: number,
  maxAge: number,
  nextEndPt?: string,
  prevEndPt?: string, 
  defaultEndPt: string = '/dogs/search?size=100&',
) {
  let newURI = baseURI + (nextEndPt || prevEndPt || defaultEndPt);
  newURI += breedSearch(breeds);
  if (zipCode) newURI += zipSearch(zipCode);
  if (minAge > 0) newURI += minAgeSearch(minAge);
  if (maxAge > 0) newURI += maxAgeSearch(maxAge);
  return newURI;
};


export function breedSearch(breeds: string[]) {
  let queryStr = '';
  breeds.forEach((breed: string) => {
    queryStr = '&breeds=' + encodeURIComponent(breed);
  });
  return queryStr;
}


export function zipSearch(zip: string) {
  return '&zipCodes=' + encodeURIComponent(zip);
}


export function minAgeSearch(age: number) {
  return `&ageMin=${age}`;
}


export function maxAgeSearch(age: number) {
  return `&ageMax=${age}`;
}


export function sortUri(uri: string, field: string, state: boolean) {
  let newURI;
  const descCheck = uri.includes(`&sort=${field}:desc`);
  const ascCheck = uri.includes(`&sort=${field}:asc`);
  if (!state) {
    if (descCheck) {
      newURI = uri.replace(`&sort=${field}:desc`, `&sort=${field}:asc`); 
    } else {
      newURI = uri + `&sort=${field}:asc`; 
    }
  } else {
    if (ascCheck) {
      newURI = uri.replace(`&sort=${field}:asc`, `&sort=${field}:desc`); 
    } else { 
      newURI = uri + `&sort=${field}:desc`; 
    }
  }
  return newURI;
}