import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { applyLeave } from "../../features/leaves/leaveSlice";

const LeaveForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(applyLeave(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">From Date</label>
        <input
          type="date"
          {...register("fromDate")}
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">To Date</label>
        <input
          type="date"
          {...register("toDate")}
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Leave Type</label>
        <select
          {...register("type")}
          className="w-full border px-3 py-2"
          required
        >
          <option value="sick">Sick</option>
          <option value="casual">Casual</option>
          <option value="earned">Earned</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Reason</label>
        <textarea
          {...register("reason")}
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default LeaveForm;
