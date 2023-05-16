import React from "react";
import styles from "../../styles/Home.module.css";
import { PaginationProps } from "../../domain/types";

const Pagination: React.FC<PaginationProps> = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount: number = Math.ceil(items / pageSize);
  if (pagesCount === 1) return null;
  const pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div data-testid="pagination">
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage ? styles.pageItemActive : styles.pageItem
            }
          >
            <a onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
