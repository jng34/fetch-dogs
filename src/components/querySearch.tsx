export const querySearch = (
  breeds: string[],
  zipCodes: string[],
  minAge: number,
  maxAge: number,
  // displaySize: number,
  // searchIndex: number,
) => {
  let uri = 'https://frontend-take-home-service.fetch.com/dogs/search?';
  breeds.forEach((breed: string) => {
    let queryStr = 'breeds=' + encodeURIComponent(breed) + '&';
    uri += queryStr;
  })
  zipCodes.forEach((zip: string) => {
    let queryStr = 'zipCodes=' + encodeURIComponent(zip) + '&';
    uri += queryStr;
  })
  if (minAge) uri += `ageMin=${minAge}&`;
  if (maxAge) uri += `ageMax=${maxAge}&`;
  const newURI = uri + `size=100`;
  // const newURI = uri + `size=${displaySize}&from=${searchIndex}`;
  return newURI;
};
