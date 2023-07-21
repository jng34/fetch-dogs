export const querySearch = (
  breeds: string[],
  zipCodes: string[],
  minAge: number,
  maxAge: number,
  endPoint: string = '/dogs/search?size=100&',
) => {
  let uri = `https://frontend-take-home-service.fetch.com${endPoint}`;
  breeds.forEach((breed: string) => {
    let queryStr = 'breeds=' + encodeURIComponent(breed) + '&';
    uri += queryStr;
  })
  zipCodes.forEach((zip: string) => {
    let queryStr = 'zipCodes=' + encodeURIComponent(zip) + '&';
    uri += queryStr;
  })
  if (minAge) uri += `ageMin=${minAge}&`;
  if (maxAge) uri += `ageMax=${maxAge}`;
  return uri;
};
