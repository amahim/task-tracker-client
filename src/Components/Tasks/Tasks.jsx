

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTasks } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const Tasks = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const user = useContext(AuthContext);

  // Function to handle form submission
  const onSubmit = async (data) => {
    if (!data.title || !data.category) {
      toast.error("Title and Category are required!");
      return;
    }

    // Add auto-generated timestamp
    const taskData = {
      ...data,
      timestamp: new Date().toISOString(),  // Auto-generated timestamp
      addedBy: user?.email
    };

    try {
      const res = await axios.post("http://localhost:4000/tasks", taskData);
      if (res.data.insertedId) {
        toast.success("Task added successfully!");
        reset();  // Reset the form after successful submission
      }
    } catch (error) {
      console.error("Error saving task to database:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="w-4/5 mx-auto py-10">
      {/* Title Section */}
      <div className="flex items-center gap-4 justify-center mb-8">
        <p className="text-2xl md:text-4xl lg:text-6xl font-bold"><FaTasks/></p>
        <p className="text-2xl md:text-4xl lg:text-6xl font-bold">Track Your Task</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Title (max 50 characters)</label>
          <input
            type="text"
            placeholder="Enter task title"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 50, message: "Title must be less than 50 characters" }
            })}
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Description (max 200 characters)</label>
          <textarea
            placeholder="Enter task description (optional)"
            rows="4"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("description", { maxLength: { value: 200, message: "Description must be less than 200 characters" } })}
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        {/* Category Select and Button in the Same Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">Category</label>
            <select
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category", { required: "Category is required" })}
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="btn md:w-[400px] lg:w-[540px] w-full bg-gray-800 md:mt-9 text-white  rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tasks;

