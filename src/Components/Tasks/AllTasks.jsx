import React, { useContext, useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import useTasks from '../Hooks/useTasks';
import { AuthContext } from '../Provider/AuthProvider';
import Todo from './Todo';
import InProgress from './InProgress';
import Done from './Done';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, refetch] = useTasks();
    const [todoTasks, setTodoTasks] = useState([]);

    useEffect(() => {
        const myTasks = tasks?.filter(task => task.addedBy === user?.email);
        const filteredTodoTasks = myTasks?.filter(task => task.category === "To-Do");
        setTodoTasks(filteredTodoTasks || []);
    }, [tasks, user]);

    // Filter tasks by category
    const inProgressTasks = tasks?.filter(task => task.category === "In Progress");
    const doneTasks = tasks?.filter(task => task.category === "Done");

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        // If dropped in the same column and same position, do nothing
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        try {
            let newCategory;
            switch (destination.droppableId) {
                case 'todo':
                    newCategory = "To-Do";
                    break;
                case 'in-progress':
                    newCategory = "In Progress";
                    break;
                case 'done':
                    newCategory = "Done";
                    break;
                default:
                    return;
            }

            const loadingToast = toast.loading('Moving task...');

            // Update task category
            await axios.put(`http://localhost:5000/tasks/${draggableId}`, {
                category: newCategory
            });

            toast.dismiss(loadingToast);
            toast.success('Task moved successfully');
            await refetch();
        } catch (error) {
            console.error('Error moving task:', error);
            toast.error('Failed to move task');
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-4 md:justify-between justify-center">
                {/* To-Do Tasks */}
                <Todo 
                    tasks={todoTasks} 
                    setTasks={setTodoTasks} 
                    refetch={refetch}
                />

                {/* In Progress Tasks */}
                <InProgress 
                    tasks={inProgressTasks} 
                    refetch={refetch}
                />

                {/* Done Tasks */}
                <Done 
                    tasks={doneTasks} 
                    refetch={refetch}
                />
            </div>
        </DragDropContext>
    );
};

export default AllTasks;
