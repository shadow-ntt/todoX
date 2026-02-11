import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TaskPagination({ page, setPage, lengthPage }) {
  const handlePre = () => {
    if (page > 1) {
      setPage((pre) => pre - 1);
    }
  };
  const handleNext = () => {
    if (page < lengthPage) {
      setPage((pre) => pre + 1);
    }
  };
  const pagination = () => {
    let pages = [];
    if (lengthPage < 6) {
      for (let i = 1; i <= lengthPage; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages = [1, 2, 3, "...", lengthPage];
      } else if (page >= 4 && page <= lengthPage - 2) {
        pages = [1, 2, 3, "...", page, "...", lengthPage];
      } else {
        pages = [1, "...", lengthPage - 2, lengthPage - 1, lengthPage];
      }
    }
    return pages;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePre} />
        </PaginationItem>

        {pagination().map((p, i) => {
          if (p == "...") {
            return (
              <PaginationItem key={i}>
                <PaginationEllipsis></PaginationEllipsis>
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={p == page}
                  onClick={() => setPage(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
