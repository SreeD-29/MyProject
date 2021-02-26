import React from 'react';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import clsx from 'clsx';

export default function ArrowPagination(props) {
  const { page, max, updateSearchParam, setCurrentPage } = props;

  const renderLess = (cardListLength, currentPage) => {
    let pages = [];
    for (let i = 1; i <= cardListLength; i++) {
      pages.push(
        <li key={i} className={clsx(i === currentPage && 'selected')}>
          <span
            onClick={() => {
              setCurrentPage(i);
              updateSearchParam(i);
            }}
          >
            {i}
          </span>
        </li>
      );
    }
    return pages;
  };

  const renderMore = (cardListLength, currentPage) => {
    let pages = [];
    // show first page
    pages.push(
      <li className={clsx(currentPage === 1 && 'selected')} key="0">
        <span
          onClick={() => {
            setCurrentPage(1);
            updateSearchParam(1, cardListLength);
          }}
        >
          1
        </span>
      </li>
    );
    // show middle-three number
    for (let i = 1; i < 4; i++) {
      if (currentPage >= 4 && i === 1) {
        pages.push(
          <li key={7}>
            <span>...</span>
          </li>
        );
      }

      let pageNumber = currentPage;

      if (currentPage < 4) {
        pageNumber = i + 1;
      } else if (currentPage <= cardListLength - 3) {
        pageNumber = currentPage - 2 + i;
      } else {
        pageNumber = cardListLength - 4 + i;
      }

      pages.push(
        <li className={clsx(currentPage === pageNumber && 'selected')} key={i}>
          <span
            onClick={() => {
              setCurrentPage(pageNumber);
              updateSearchParam(pageNumber, cardListLength);
            }}
          >
            {pageNumber}
          </span>
        </li>
      );

      if (currentPage <= cardListLength - 3 && i === 3) {
        pages.push(
          <li key={8}>
            <span>...</span>
          </li>
        );
      }
    }

    // show last page
    pages.push(
      <li
        className={clsx(currentPage === cardListLength && 'selected')}
        key="5"
      >
        <span
          onClick={() => {
            setCurrentPage(cardListLength);
            updateSearchParam(cardListLength, cardListLength);
          }}
        >
          {cardListLength}
        </span>
      </li>
    );

    return pages;
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    updateSearchParam(1, max);
  };

  const handleLastPage = () => {
    setCurrentPage(max);
    updateSearchParam(max, max);
  };

  const handlePrev = () => {
    if (page > 1) {
      setCurrentPage(page - 1);
      updateSearchParam(page - 1, max);
    }
  };

  const handlePost = () => {
    if (page < max) {
      setCurrentPage(page + 1);
      updateSearchParam(page + 1, max);
    }
  };

  return (
    <div className="page-bar">
      <ul className="arrow-pagination">
        <li className={clsx(page !== 1 && 'active')}>
          <span onClick={handleFirstPage}>
            <FirstPageIcon />
          </span>
        </li>
        <li className={clsx(page !== 1 && 'active')} key="left">
          <span onClick={handlePrev}>
            <ChevronLeftIcon />
          </span>
        </li>
        {max <= 5 ? renderLess(max, page) : renderMore(max, page)}

        <li className={clsx(page !== max && 'active')} key="right">
          <span onClick={handlePost}>
            <ChevronRightIcon />
          </span>
        </li>
        <li className={clsx(page !== max && 'active')}>
          <span onClick={handleLastPage}>
            <LastPageIcon />
          </span>
        </li>
      </ul>
    </div>
  );
}
