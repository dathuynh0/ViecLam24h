import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

const Pagination = ({ currentPage, totalPage, onChangePage }) => {
  const initPage = () => {
    const pagination = [];

    if (!totalPage || totalPage <= 4) {
      for (let i = 1; i <= totalPage; i++) {
        pagination.push(i);
      }
    } else if (currentPage < 3) {
      pagination.push(1, 2, 3, '...', totalPage);
    } else if (currentPage >= totalPage - 1) {
      pagination.push(1, '...', totalPage - 2, totalPage - 1, totalPage);
    } else {
      pagination.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage);
    }

    return pagination;
  };

  const pagination = initPage();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white"
        variant="ghost"
        size="icon"
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </Button>

      <ul className="flex items-center">
        {pagination.map((page, index) =>
          page === '...' ? (
            <li key={`dots-${index}`}>
              <span className="px-1 md:px-2 lg:px-4 py-2">...</span>
            </li>
          ) : (
            <li key={page}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onChangePage(page)}
                className={`m-1 md:px-2 lg:px-4 py-2 border rounded-lg ${
                  currentPage === page
                    ? 'bg-green-700 text-white'
                    : 'border border-green-700 text-green-700'
                }`}
              >
                {page}
              </Button>
            </li>
          )
        )}
      </ul>

      <Button
        variant="ghost"
        className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white"
        size="icon"
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination
