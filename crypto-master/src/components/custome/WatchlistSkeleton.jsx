import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const WatchlistSkeleton = ({ rows = 8 }) => {
 return (
   <div className="pt-8 px-3 lg:px-10">
     <div className="flex items-center pt-5 pb-10 gap-5 animate-pulse">
       <div className="h-10 w-10 rounded-full bg-gray-200" />
       <div className="h-6 w-48 bg-gray-200 rounded-md" />
     </div>

     <Table className="px-5 lg:px-20 border-t border-x border-b text-xs md:text-sm">
       <ScrollArea>
         <TableHeader>
           <TableRow className="sticky top-0 bg-background">
             <TableHead className="py-4">Coin</TableHead>
             <TableHead>SYMBOL</TableHead>
             <TableHead className="hidden md:table-cell">VOLUME</TableHead>
             <TableHead className="hidden md:table-cell">MARKET CAP</TableHead>
             <TableHead className="hidden md:table-cell">24H</TableHead>
             <TableHead>PRICE</TableHead>
             <TableHead className="text-right">Remove</TableHead>
           </TableRow>
         </TableHeader>

         <TableBody>
           {Array.from({ length: rows }).map((_, i) => (
             <TableRow key={i}>
               <TableCell className="flex items-center gap-2">
                 <div className="h-8 w-8 rounded-full bg-gray-200" />
                 <Skeleton className="h-4 w-24" />
               </TableCell>
               <TableCell>
                 <Skeleton className="h-4 w-12" />
               </TableCell>
               <TableCell className="hidden md:table-cell">
                 <Skeleton className="h-4 w-20" />
               </TableCell>
               <TableCell className="hidden md:table-cell">
                 <Skeleton className="h-4 w-24" />
               </TableCell>
               <TableCell className="hidden md:table-cell">
                 <Skeleton className="h-4 w-10" />
               </TableCell>
               <TableCell>
                 <Skeleton className="h-4 w-16" />
               </TableCell>
               <TableCell className="text-right">
                 <Skeleton className="h-10 w-10 rounded-md" />
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </ScrollArea>
     </Table>
   </div>
 );
};

export default WatchlistSkeleton;
