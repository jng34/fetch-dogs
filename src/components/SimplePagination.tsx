import classnames from 'classnames';
import '../index.css';

interface PageProps {
  className: string,
  currentPage: number,
  onPageChange: (page: number) => void
}

export default function SimplePagination(props: PageProps) {
  const { className, currentPage, onPageChange } = props;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" /> &nbsp; Previous 
      </li>
      
      {/*  Right Navigation arrow */}
      <li
        className='pagination-item'
        onClick={onNext}
      >
        Next &nbsp;<div className="arrow right" />
      </li>
    </ul>
  );
};
