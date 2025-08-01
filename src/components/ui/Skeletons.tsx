import { Card, Skeleton } from "@heroui/react";

const SkeletonCard = () => (
    <div className="w-[320px]">
        <Card className="w-full shadow-md rounded-xl overflow-hidden bg-zinc-800">
            <Skeleton className="rounded-lg">
                <div className="h-36 rounded-lg bg-zinc-700"></div>
            </Skeleton>
            <div className="p-3 space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-4 w-3/5 rounded-lg bg-zinc-700"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-zinc-700"></div>
                </Skeleton>
            </div>
        </Card>
    </div>
);

export const SkeletonSwiper = () => {
    return (
        <div className="mt-5">
            <div className="flex space-x-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );
};

export const SkeletonCategory = () => {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            <Skeleton className="h-10 w-28 rounded-lg bg-zinc-700" />
            <Skeleton className="h-10 w-24 rounded-lg bg-zinc-700" />
            <Skeleton className="h-10 w-32 rounded-lg bg-zinc-700" />
            <Skeleton className="h-10 w-28 rounded-lg bg-zinc-700" />
            <Skeleton className="h-10 w-24 rounded-lg bg-zinc-700" />
        </div>
    )
}

export const AllEventsGridSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl bg-zinc-800" />
        ))}
    </div>
)
