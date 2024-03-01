import { useState } from 'react';
import { Card } from 'components/card';
import { createPagination } from 'utils/createPagination';

const MyAnnouncements = () => {
  const data = Array.from({ length: 6 }, (_, i) => i + 1);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <div className={'cards-container'}>
        {data.map((item) => (
          <Card key={item} item={item + currentPage} editable />
        ))}
      </div>
      <div className="paginations">
        {createPagination(currentPage, 5).map((item, key) => (
          <button
            key={item + key}
            onClick={() => setCurrentPage(item === '...' ? currentPage : item)}
            className={currentPage === item ? 'active' : undefined}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default MyAnnouncements;
