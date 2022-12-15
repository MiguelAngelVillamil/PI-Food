

export default function PageButtons({ pagesNumber, currentPage, changePage }) {
  
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  
  const handleClick = (newPage) => {
    changePage(newPage);
  }

  return (
    <div>
      {
        currentPage > 1 &&

        (<button onClick={() => handleClick(1)} >
          {"<<"}
        </button>)
      }

      {
        currentPage > 1 &&

        (<button onClick={() => handleClick(previousPage)} >
          {"<"}
        </button>)
      }

      <button onClick={() => handleClick(previousPage)}>
        {previousPage}
      </button>

      <button>
        {currentPage}
      </button>

      <button onClick={() => handleClick(nextPage)}>
        {nextPage}
      </button>

      {
        currentPage < pagesNumber &&

        (<button onClick={() => handleClick(nextPage)} >
          {">"}
        </button>)
      }

      {
        currentPage < pagesNumber &&

        (<button onClick={() => handleClick(pagesNumber)} >
          {">>"}
        </button>)
      }
    </div>
  );
}