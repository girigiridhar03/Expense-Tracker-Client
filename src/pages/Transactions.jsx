import { getExpenseData } from "@/store/expense/expense.service";
import { useEffect, useMemo, useState } from "react";
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

import {
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Dot,
  ReceiptText,
  WalletCards,
} from "lucide-react";

const Transactions = () => {
  const dispatch = useDispatch();

  const { expenseLoading, expenseData, totalPages, totalRecords } = useSelector(
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

  const expenses = useMemo(() => expenseData || [], [expenseData]);
  const totalAmount = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses],
  );

  const formatDate = (date) => new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[30px] border p-6 md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
              <ReceiptText className="h-3.5 w-3.5" />
              Transaction history
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Review spending with better context.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Filter by month and year, then scan categories, dates, and
              descriptions without losing the overall picture.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/8 bg-slate-950/75 px-5 py-4 text-slate-100">
              <p className="text-sm text-slate-400">Visible total</p>
              <p className="mt-2 text-2xl font-semibold">
                ₹{totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-[24px] border border-sky-300/10 bg-sky-400/8 px-5 py-4">
              <p className="text-sm text-slate-400">Records</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {totalRecords || expenses.length}
              </p>
            </div>
            <div className="rounded-[24px] border border-emerald-300/10 bg-emerald-400/8 px-5 py-4">
              <p className="text-sm text-slate-400">Current page</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {query.page}/{totalPages || 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel flex flex-col gap-4 rounded-[30px] border p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">Active filters</p>
          <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-white">
            <CalendarRange className="h-5 w-5 text-sky-300" />
            {months.find((item) => item.value === query.month)?.label}{" "}
            {query.year}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
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
            <SelectTrigger className="w-full rounded-2xl border-white/8 bg-slate-950/70 text-slate-100 sm:w-44">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-slate-950 text-slate-100">
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
            <SelectTrigger className="w-full rounded-2xl border-white/8 bg-slate-950/70 text-slate-100 sm:w-36">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-slate-950 text-slate-100">
              {years.map((y) => (
                <SelectItem key={y.value} value={String(y.value)}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="glass-panel overflow-hidden rounded-[30px] border">
        <div className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-300">Transactions table</p>
              <p className="mt-1 text-sm text-slate-500">
                Clean record view with category, note, and amount visibility.
              </p>
            </div>
            <div className="hidden rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400 md:block">
              {expenses.length} visible
            </div>
          </div>
        </div>

        <Table className="min-w-[760px]">
          <TableHeader className="bg-slate-950/45 [&_tr]:border-white/8">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Date
              </TableHead>
              <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Category
              </TableHead>
              <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Description
              </TableHead>
              <TableHead className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="[&_tr:last-child]:border-b-0">
            {expenseLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i} className="border-white/6">
                  <TableCell className="px-6 py-5">
                    <Skeleton className="h-4 w-24 bg-white/8" />
                  </TableCell>
                  <TableCell className="px-4 py-5">
                    <Skeleton className="h-8 w-32 rounded-full bg-white/8" />
                  </TableCell>
                  <TableCell className="px-4 py-5">
                    <Skeleton className="h-4 w-56 bg-white/8" />
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <Skeleton className="ml-auto h-4 w-20 bg-white/8" />
                  </TableCell>
                </TableRow>
              ))
            ) : expenses.length > 0 ? (
              expenses.map((item) => (
                <TableRow
                  key={item._id}
                  className="border-white/6 bg-transparent transition duration-200 hover:bg-white/[0.035]"
                >
                  <TableCell className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {formatDate(item.date)}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Entry date
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-5">
                    <div
                      className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      style={{
                        backgroundColor: `${item.category.bgColor}18`,
                        borderColor: `${item.category.bgColor}40`,
                        color: item.category.bgColor,
                      }}
                    >
                      <span className="text-sm">{item.category.categoryEmoji}</span>
                      <span className="capitalize tracking-[0.04em]">
                        {item.category.categoryName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-5">
                    <div className="flex items-start gap-2">
                      <Dot className="mt-0.5 h-4 w-4 shrink-0 text-sky-300/70" />
                      <span className="max-w-md whitespace-normal text-sm leading-6 text-slate-300">
                        {item.description ? item.description : "No description added"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-5 text-right">
                    <div className="inline-flex min-w-28 justify-end rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-2 text-base font-semibold text-white">
                      ₹{Number(item.amount || 0).toLocaleString("en-IN")}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-white/6">
                <TableCell colSpan={4} className="py-16 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-sky-300/10 bg-sky-400/10 text-sky-300">
                      <WalletCards className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">
                        No expenses found
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Try another month or add a new expense to start building
                        history.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="glass-panel flex items-center justify-between rounded-[24px] border px-5 py-4">
        <p className="text-sm text-slate-400">
          Page {query.page} of {totalPages || 1}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === 1}
            onClick={() => handlePageChange("prev")}
            className="rounded-xl border-white/8 bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]"
          >
            <ChevronLeft size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={query.page === (totalPages || 1)}
            onClick={() => handlePageChange("next")}
            className="rounded-xl border-white/8 bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
