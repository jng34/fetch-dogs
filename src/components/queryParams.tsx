export const baseURI = 'https://frontend-take-home-service.fetch.com/dogs/search?size=100';

export function querySearch(
  breeds: string[],
  zipCodes: string[],
  minAge: number,
  maxAge: number,
  nextEndPt?: string,
  prevEndPt?: string, 
  defaultEndPt: string = '/dogs/search?size=100&',
) {
  let newURI = `https://frontend-take-home-service.fetch.com${nextEndPt || prevEndPt || defaultEndPt}`;
  newURI += breedSearch(breeds) + zipSearch(zipCodes);
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

export function zipSearch(zips: string[]) {
  let queryStr = '';
  zips.forEach((breed: string) => {
    queryStr = '&zipCodes=' + encodeURIComponent(breed);
  });
  return queryStr;
}

export function minAgeSearch(age: number) {
  return `&ageMin=${age}`;
}

export function maxAgeSearch(age: number) {
  return `&ageMax=${age}`;
}

export function sortByField(uri: string, field: string, state: boolean) {
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