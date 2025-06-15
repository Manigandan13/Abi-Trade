import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const TreadingHistorySkeleton = ({ rows = 8 }) => {
  return (
    <div>
      {/* Table Header same as real table */}
      <Table className="px-5 relative text-xs md:text-sm">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3 hidden md:table-cell">Date & Time</TableHead>
            <TableHead>Trading Pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead className="hidden md:table-cell">Order Type</TableHead>
            <TableHead className="hidden sm:table-cell">Profit/Loss</TableHead>
            <TableHead className="text-right">VALUE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, idx) => (
            <TableRow key={idx} className="animate-pulse">
              <TableCell className="hidden md:table-cell">
                <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 w-12 bg-gray-300 rounded"></div>
              </TableCell>

              <TableCell className="font-medium flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-300" />
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </TableCell>

              <TableCell>
                <div className="h-4 w-14 bg-gray-300 rounded"></div>
              </TableCell>

              <TableCell>
                <div className="h-4 w-14 bg-gray-300 rounded"></div>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </TableCell>

              <TableCell className="hidden sm:table-cell">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </TableCell>

              <TableCell className="text-right">
                <div className="h-4 w-16 bg-gray-300 rounded ml-auto"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TreadingHistorySkeleton;
