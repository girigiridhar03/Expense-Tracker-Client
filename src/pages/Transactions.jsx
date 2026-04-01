import { getExpenseData } from "@/store/expense/expense.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Transactions = () => {
  const dispatch = useDispatch();

  const { expenseLoading, expenseData, totalPages } = useSelector(
    (state) => state.expenseReducer,
  );

  const todayDate = new Date();

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const currentYear = todayDate.getFullYear();
  const startYear = currentYear - 9;

  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => ({
    value: startYear + i,
    label: String(startYear + i),
  }));

  const [query, setQuery] = useState({
    month: todayDate.getMonth() + 1,
    year: todayDate.getFullYear(),
    page: 1,
    pageSize: 15,
  });

  useEffect(() => {
    dispatch(getExpenseData(query));
  }, [dispatch, query]);

  const handlePageChange = (type) => {
    setQuery((prev) => ({
      ...prev,
      page: type === "next" ? prev.page + 1 : prev.page - 1,
    }));
  };

  const expenses = expenseData || [];

  const formatDate = (date) => new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your expenses
          </p>
        </div>

        <div className="flex gap-3">
          <Select
            value={String(query.month)}
            onValueChange={(val) =>
              setQuery((prev) => ({
                ...prev,
                month: Number(val),
                page: 1,
              }))
            }
          >
            <SelectTrigger className="w-35">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={String(m.value)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(query.year)}
            onValueChange={(val) =>
              setQuery((prev) => ({
                ...prev,
                year: Number(val),
                page: 1,
              }))
            }
          >
            <SelectTrigger className="w-30">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y.value} value={String(y.value)}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Details</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {expenseLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : expenses.length > 0 ? (
              expenses.map((item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-muted/50 transition"
                >
                  <TableCell className="text-muted-foreground">
                    {formatDate(item.date)}
                  </TableCell>

                  <TableCell className="text-center">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-fit"
                      style={{
                        backgroundColor: `${item.category.bgColor}20`,
                        color: item.category.bgColor,
                      }}
                    >
                      {item.category.categoryEmoji}
                      <span className="capitalize">
                        {item.category.categoryName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {item.description ? item.description : "-"}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{item.amount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No expenses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Page {query.page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === 1}
            onClick={() => handlePageChange("prev")}
          >
            <ChevronLeft size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={query.page === totalPages}
            onClick={() => handlePageChange("next")}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
