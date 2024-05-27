import { Skeleton } from "./ui/skeleton";

const PendingBudget = () => {
  return (
    <>
      <div className="flex flex-wrap space-x-2">
        <div className="flex-grow space-y-2 text-center">
          <div className="flex flex-row space-x-1">
            <Skeleton className="flex h-10 w-full px-3 py-2" />
            <Skeleton className="flex h-10 w-full px-3 py-2" />
          </div>
          <div className="flex flex-row space-x-1">
            <Skeleton className="flex h-10 w-full px-3 py-2" />
            <Skeleton className="h-10 min-w-[60px]" />
          </div>
        </div>
      </div>
    </>
  );
};
const PendingSpend = () => {
  return (
    <>
      <div className="flex flex-wrap space-x-2">
        <div className="flex-grow space-y-2 text-center">
          <div className="flex flex-row space-x-1">
            <Skeleton className="flex h-10 w-full px-3 py-2" />
            <Skeleton className="flex h-10 w-full px-3 py-2" />
          </div>
          <div className="flex flex-row space-x-1">
            <Skeleton className="flex h-10 w-full px-3 py-2" />
            <Skeleton className="h-10 min-w-[60px]" />
          </div>
        </div>
      </div>
    </>
  );
};
const PendingTransaction = () => {
  return (
    <>
      <div className="flex flex-wrap space-x-2">
        <div className="flex-grow space-y-2 text-center">
          <div className="flex flex-row space-x-1">
            <Skeleton className="flex h-10 w-full px-3 py-2" />
            <Skeleton className="flex h-10 w-full px-3 py-2" />
          </div>
          <div className="flex flex-row space-x-1">
            <Skeleton className="flex h-10 w-full px-3 py-2" />
            <Skeleton className="h-10 min-w-[60px]" />
          </div>
        </div>
      </div>
    </>
  );
};

const PendingNewCard = () => {
  return (
    <>
      <div className="space-y-1">
        <div className="flex flex-row">
          <Skeleton className="flex h-10 w-full px-3 py-2" />
        </div>
        <div className="flex flex-row justify-center">
          <Skeleton className="flex h-10 w-[120px] px-3 py-2" />
        </div>
      </div>
    </>
  );
};

const PendingNewRecipient = () => {
  return (
    <>
      <div className="space-y-1">
        <div className="flex flex-row">
          <Skeleton className="flex h-10 w-full px-3 py-2" />
        </div>
        <div className="flex flex-row justify-center">
          <Skeleton className="flex h-10 w-[120px] px-3 py-2" />
        </div>
      </div>
    </>
  );
};

const PendingNewFavourite = () => {
  return (
    <>
      <div className="space-y-1">
        <div className="flex flex-row">
          <Skeleton className="flex h-10 w-full px-3 py-2" />
        </div>
        <div className="flex flex-row justify-center">
          <Skeleton className="flex h-10 w-[120px] px-3 py-2" />
        </div>
      </div>
    </>
  );
};
export {
  PendingBudget,
  PendingSpend,
  PendingTransaction,
  PendingNewCard,
  PendingNewRecipient,
  PendingNewFavourite,
};
