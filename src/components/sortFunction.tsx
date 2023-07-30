  import { sortUri } from "./queryParams";
  const sortRegEx = /&sort=.+:(a|de)sc/;
  // Function that sort by field
  export const sortFunction = (
    field: string,
    state: boolean, 
    setState: (arg: boolean) => void,
    uri: string,
    setUri: (arg: string) => void
  ) => {
    setState(!state);
    let queryStr = ''; 
    if (sortRegEx.test(uri)) {
      if (state) {
        queryStr = uri.replace(sortRegEx, `&sort=${field}:desc`)
      } else {
        queryStr = uri.replace(sortRegEx, `&sort=${field}:asc`)
      }
    } else {
      queryStr = sortUri(uri, field, state);
    }
    setUri(queryStr);
  }


