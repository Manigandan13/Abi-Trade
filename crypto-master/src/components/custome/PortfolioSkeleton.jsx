import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const PortfolioSkeleton = ({ rows = 6 }) => {
  return (
    <Table className="px-5 relative text-xs md:text-sm">
      <TableHeader className="py-9">
        <TableRow className="sticky top-0 left-0 right-0 bg-background ">
          <TableHead className="py-3">Assets</TableHead>
          <TableHead className="hidden md:table-cell">PRICE</TableHead>
          <TableHead>UNIT</TableHead>
          <TableHead className="hidden md:table-cell">CHANGE</TableHead>
          <TableHead>CHANGE(%)</TableHead>
          <TableHead>VALUE</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, idx) => (
          <TableRow key={idx} className="animate-pulse cursor-default">
            <TableCell className="font-medium flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </TableCell>

            <TableCell className="hidden md:table-cell">
              <div className="h-4 w-14 bg-gray-300 rounded"></div>
            </TableCell>

            <TableCell>
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </TableCell>

            <TableCell className="hidden md:table-cell">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </TableCell>

            <TableCell>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </TableCell>

            <TableCell>
              <div className="h-4 w-20 bg-gray-300 rounded ml-auto"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default PortfolioSkeleton;
