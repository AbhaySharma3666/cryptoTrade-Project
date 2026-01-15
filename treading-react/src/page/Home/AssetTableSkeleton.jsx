import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"

const ShimmerSkeleton = ({ width = "w-24" }) => (
  <div className={`relative overflow-hidden bg-neutral-800 rounded-full ${width} h-4`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
  </div>
)

const AssetTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 8 })

  return (
    <div className="animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Coin</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24h</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {skeletonRows.map((_, i) => (
            <TableRow key={i}>
              {/* Coin */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <ShimmerSkeleton width="w-28" />
                    <ShimmerSkeleton width="w-20" />
                  </div>
                </div>
              </TableCell>

              {/* SYMBOL */}
              <TableCell><ShimmerSkeleton width="w-14" /></TableCell>

              {/* VOLUME */}
              <TableCell><ShimmerSkeleton width="w-20" /></TableCell>

              {/* MARKET CAP */}
              <TableCell><ShimmerSkeleton width="w-24" /></TableCell>

              {/* 24h */}
              <TableCell><ShimmerSkeleton width="w-10" /></TableCell>

              {/* PRICE */}
              <TableCell className="text-right"><ShimmerSkeleton width="w-16 ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default AssetTableSkeleton