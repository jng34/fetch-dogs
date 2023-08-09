export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogProps {
  breeds: string[];
  zipCode: string | null;
  minAge: number;
  maxAge: number;
  uri: string;
  currentPage: number;
  sortName: boolean;
  sortAge: boolean;
  sortBreed: boolean;
  setUri: (arg: any) => void;
  setCurrentPage: (arg: any) => void;
  onSortName: (arg: any) => void;
  onSortAge: (arg: any) => void;
  onSortBreed: (arg: any) => void;
}

export interface DogTableProps {
  dogObjs: Dog[];
  currentPage: number;
  displaySize: number;
  toggleMatch: boolean;
  sortName: boolean;
  sortAge: boolean;
  sortBreed: boolean;
  onSortName: (arg: any) => void;
  onSortAge: (arg: any) => void;
  onSortBreed: (arg: any) => void;
}

export interface DogModalProps {
  dogObj: Dog;
  toggleModal: boolean;
  setToggleModal: (arg: any) => void;
}

export interface FilterProps {
  entry: string;
  index: number;
  removeBreedFilter: (arg: any) => void;
}

export interface MatchProps {
  toggleMatch: boolean;
  dogMatch: string;
  setToggleMatch: (arg: any) => void;
}

export interface PageProps {
  className: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (arg: number) => void;
}

export interface Pagination {
  totalCount: number,
  pageSize: number,
  siblingCount: number,
  currentPage: number
}