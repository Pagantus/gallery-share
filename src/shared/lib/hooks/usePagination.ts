import React from 'react';

const usePagination = (initialPage = 1, initialPageSize = 10) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize
  };
};

export { usePagination };
