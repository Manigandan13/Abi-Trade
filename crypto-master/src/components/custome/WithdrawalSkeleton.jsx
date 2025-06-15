import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const WithdrawalSkeleton = ({ rows = 5 }) => {
 return (
   <div className="px-4 md:px-20">
     <Skeleton className="h-8 w-48 my-10" />

     <Table className="text-xs md:text-sm">
       <TableHeader>
         <TableRow>
           <TableHead className="py-5">Date</TableHead>
           <TableHead>Method</TableHead>
           <TableHead>Amount</TableHead>
           <TableHead className="text-right">Status</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {Array.from({ length: rows }).map((_, i) => (
           <TableRow key={i}>
             <TableCell className="py-5">
               <Skeleton className="h-4 w-24" />
             </TableCell>
             <TableCell>
               <Skeleton className="h-4 w-28" />
             </TableCell>
             <TableCell>
               <Skeleton className="h-4 w-20" />
             </TableCell>
             <TableCell className="text-right">
               <Skeleton className="h-6 w-16 rounded-md" />
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </div>
 );
};

export default WithdrawalSkeleton;
