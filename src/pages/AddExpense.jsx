import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addExpense } from "@/store/expense/expense.service";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Loader2,
  Sparkles,
  Tag,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addExpenseLoading, error } = useSelector(
    (state) => state.expenseReducer,
  );
  const [submitError, setSubmitError] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");
        const categoryList = response?.data?.data || [];
        setCategories(categoryList);
        setFormData((prev) => ({
          ...prev,
          categoryId: prev.categoryId || categoryList?.[0]?._id || "",
        }));
      } catch (err) {
        setCategoryError(
          err?.response?.data?.message || "Unable to load categories right now.",
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const selectedCategory = useMemo(
    () =>
      categories.find((item) => item._id === formData.categoryId) ||
      categories[0] ||
      null,
    [categories, formData.categoryId],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      amount: Number(formData.amount),
      date: formData.date,
      description: formData.description,
      category: formData.categoryId,
    };

    try {
      const response = await dispatch(addExpense(payload)).unwrap();
      if (response?.success) {
        navigate("/expenses");
      }
    } catch (err) {
      setSubmitError(err || "Unable to add expense right now.");
    }
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <div className="glass-panel rounded-[34px] border p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
          <Sparkles className="h-3.5 w-3.5" />
          Smart entry
        </div>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Add a new expense with a cleaner, more focused workflow.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          Capture the amount, assign the right category, and submit directly to
          your existing API from a screen designed to feel calm and operational.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <CircleDollarSign className="h-4 w-4 text-sky-300" />
                Amount
              </span>
              <Input
                name="amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="850"
                value={formData.amount}
                onChange={handleChange}
                className="h-13 rounded-2xl border-white/8 bg-slate-950/70 px-4 text-base text-white placeholder:text-slate-500"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <CalendarDays className="h-4 w-4 text-sky-300" />
                Date
              </span>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="h-13 rounded-2xl border-white/8 bg-slate-950/70 px-4 text-base text-white"
                required
              />
            </label>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Tag className="h-4 w-4 text-sky-300" />
                Category
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Choose one
              </span>
            </div>

            {categoriesLoading ? (
              <div className="flex h-28 items-center justify-center rounded-[24px] border border-white/8 bg-slate-950/60 text-slate-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading categories...
              </div>
            ) : categoryError ? (
              <div className="rounded-2xl border border-rose-300/15 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                {categoryError}
              </div>
            ) : categories.length ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {categories.map((item) => {
                  const isActive = formData.categoryId === item._id;

                  return (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          categoryId: item._id,
                        }))
                      }
                      className={`rounded-[24px] border px-4 py-4 text-left transition ${
                        isActive
                          ? "border-sky-300/25 bg-[linear-gradient(180deg,rgba(56,189,248,0.16),rgba(15,23,42,0.7))] shadow-[0_18px_45px_rgba(14,165,233,0.14)]"
                          : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.045]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
                          style={{
                            backgroundColor: `${item.bgColor}18`,
                            color: item.bgColor,
                          }}
                        >
                          {item.categoryEmoji}
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                            isActive
                              ? "bg-sky-300/15 text-sky-200"
                              : "bg-white/[0.04] text-slate-500"
                          }`}
                        >
                          {item.isDefault ? "Default" : "Custom"}
                        </span>
                      </div>
                      <p className="mt-4 font-semibold capitalize text-white">
                        {item.categoryName}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {isActive
                          ? "Selected for this expense entry."
                          : "Tap to assign this category."}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-300/15 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                No categories are available yet. Create a category in the backend
                first, then add expenses here.
              </div>
            )}
          </div>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <FileText className="h-4 w-4 text-sky-300" />
              Description
            </span>
            <Input
              name="description"
              type="text"
              placeholder="Dinner with clients"
              value={formData.description}
              onChange={handleChange}
              className="h-13 rounded-2xl border-white/8 bg-slate-950/70 px-4 text-base text-white placeholder:text-slate-500"
            />
          </label>

          {(submitError || error) && (
            <div className="rounded-2xl border border-rose-300/15 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {submitError || error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="submit"
              disabled={
                addExpenseLoading || categoriesLoading || !formData.categoryId
              }
              className="h-13 rounded-2xl bg-[linear-gradient(90deg,#38bdf8,#22d3ee)] px-6 font-semibold text-slate-950 hover:brightness-110"
            >
              {addExpenseLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Save Expense
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-13 rounded-2xl border-white/8 bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]"
              onClick={() => navigate("/expenses")}
            >
              View Transactions
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(160deg,rgba(8,47,73,0.7),rgba(15,23,42,0.94)_45%,rgba(17,24,39,0.98))] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.34)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_22%)]" />
          <div className="relative">
            <p className="text-sm font-medium text-sky-100/80">Selected category</p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="flex h-18 w-18 items-center justify-center rounded-[26px] border border-white/10 text-3xl"
                style={{
                  backgroundColor: `${selectedCategory?.bgColor || "#94a3b8"}22`,
                  color: selectedCategory?.bgColor || "#e2e8f0",
                }}
              >
                {selectedCategory?.categoryEmoji || "🏷️"}
              </div>
              <div>
                <p className="text-2xl font-semibold capitalize text-white">
                  {selectedCategory?.categoryName || "No category selected"}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300/75">
                  This uses the real category ID expected by the server expense API.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[34px] border p-6">
          <p className="text-sm font-medium text-slate-400">Submission preview</p>

          <div className="mt-5 rounded-[28px] border border-white/8 bg-slate-950/72 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Amount</p>
                <p className="mt-2 text-4xl font-semibold text-white">
                  ₹{Number(formData.amount || 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-full border border-sky-300/15 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-200">
                Preview
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3">
                <span className="text-sm text-slate-400">Date</span>
                <span className="text-sm font-medium text-white">
                  {formData.date || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3">
                <span className="text-sm text-slate-400">Category</span>
                <span className="text-sm font-medium capitalize text-white">
                  {selectedCategory?.categoryName || "-"}
                </span>
              </div>
              <div className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3">
                <span className="text-sm text-slate-400">Description</span>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {formData.description || "No description added yet."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[24px] border border-white/6 bg-white/[0.025] p-4">
            <p className="text-sm font-medium text-slate-300">Entry guidance</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Choose the closest category, add the amount exactly as spent, and
              keep the note short so the transactions view stays easy to scan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddExpense;
