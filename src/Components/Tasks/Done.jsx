import React, { useState } from 'react';
import moment from 'moment';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { FaEye, FaPen, FaRegClock } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { TbSubtask } from 'react-icons/tb';

const Done = ({ tasks , refetch}) => {
    const [selectedTask, setSelectedTask] = useState(null);

    // Function to open modal
    const openModal = (task) => {
        setSelectedTask(task);
    };

    // Function to close modal
    const closeModal = () => {
        setSelectedTask(null);
    };

    return (
        <div className='md:w-2/6'>
            {/* Title */}
            <div className="text-xl md:text-2xl text-green-600 lg:text-3xl font-bold flex justify-center items-center gap-2 mb-5">
                <p><IoCheckmarkDoneCircleOutline /></p>
                <p>Done</p>
            </div>

            <div>
                {tasks?.length > 0 ? (
                    <ul>
                        {tasks.map(task => (
                            <div key={task._id} className=' border-2 border-green-200 bg-slate-200 p-2 rounded-md flex gap-2 flex-col shadow-[0px_4px_10px_rgba(34,197,94,10)] mb-4'>

                                {/* Title */}
                                <div className='font-medium text-lg flex gap-1 items-center'>
                                    <p><TbSubtask /></p>
                                    <p>{task.title}</p>
                                </div>

                                {/* Time */}
                                <div className='text-md flex gap-1 items-center'>
                                    <p><FaRegClock /></p>
                                    <p>{moment(task.timestamp).format('MMM D YYYY')}</p>
                                </div>

                                <div className='flex justify-between items-center'>
                                    {/* Description Button */}
                                    <div
                                        className='flex gap-1 items-center text-info cursor-pointer'
                                        onClick={() => openModal(task)}
                                    >
                                        <p><FaEye /></p>
                                        <p> Description</p>
                                    </div>

                                    <div className='flex gap-2 items-center'>
                                        <p><FaPen className='text-green-500 text-sm' /></p>
                                        <p><MdDeleteForever className='text-lg text-error' /></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks done yet</p>
                )}
            </div>

            {/* Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-2">Title : {selectedTask.title}</h2>
                        <p className="text-gray-700">Description : {selectedTask.description || "No description available"}</p>

                        <button
                            onClick={closeModal}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Done;
