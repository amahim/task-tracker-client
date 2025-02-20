import React, { useContext, useState, useEffect } from 'react';
import useTasks from '../Hooks/useTasks';
import { AuthContext } from '../Provider/AuthProvider';
import Todo from './Todo';
import InProgress from './InProgress';
import Done from './Done';

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

    return (
        <div className=" flex flex-col md:flex-row gap-4 md:justify-between justify-center">
            {/* To-Do Tasks */}
            <Todo 
                tasks={todoTasks} 
                setTasks={setTodoTasks} 
                refetch={refetch}
            />

            {/* In Progress Tasks */}
            <InProgress tasks={inProgressTasks} refetch={refetch}/>

            {/* Done Tasks */}
            <Done tasks={doneTasks} refetch={refetch}/>
        </div>
    );
};

export default AllTasks;
