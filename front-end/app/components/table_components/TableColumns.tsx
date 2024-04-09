"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { ColumnDef } from "@tanstack/react-table"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// actual columns

type Rankings = {
  username: string;
  hardest_problem: number;
  hardest_problem_name: string;
  total_problems: number;
};

type Contests = {
    name: string;
    link: string;
    date: Date;
    difficulty: string;
}

const rankingColumns: ColumnDef<Rankings>[] = [
  {
      accessorKey: "username",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Username" />
      )
  },
  {
      accessorKey: "hardest_problem_name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Hardest Problem Name" />
      )
  },
  {
      accessorKey: "hardest_problem",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Hardest Problem Rating" />
      )
  },
  {
      accessorKey: "total_problems",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total Problems" />
      )
  }
];


const contestsColumns: ColumnDef<Contests>[] = [
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Contest Name" />
        )
    },
    {
        accessorKey: "link",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Contest Link" />
        )
    },
    {
        accessorKey: "date",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Date" />
        )
    },
    {
        accessorKey: "difficulty",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Difficulty" />
        )
    }
]

export {
  rankingColumns,
  contestsColumns,
}


