export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogTableProps {
  dogObjs: Dog[];
  currentPage: number;
  displaySize: number;
  toggleMatch: boolean;
  onSortName: (arg: any) => void;
  onSortAge: (arg: any) => void;
  onSortBreed: (arg: any) => void;
}

export interface DogProps {
  breeds: string[];
  zipCodes: string[];
  minAge: number;
  maxAge: number;
  uri: string;
  currentPage: number;
  setUri: (arg: any) => void;
  setCurrentPage: (arg: any) => void;
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
  removeFilterFn: (arg: any) => void;
}

export interface PageProps {
  className: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (arg: number) => void;
}