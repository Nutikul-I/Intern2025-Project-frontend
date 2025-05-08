//Dashboard page for employees
import React, { useState, useEffect } from "react";

const DashBoard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data from an API
        setTimeout(() => {
            setData([
                { id: 1, name: "John Doe", position: "Manager" },
                { id: 2, name: "Jane Smith", position: "Developer" },
                { id: 3, name: "Alice Johnson", position: "Designer" },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Position</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee) => (
                        <tr key={employee.id}>
                            <td className="py-2 px-4 border-b">{employee.id}</td>
                            <td className="py-2 px-4 border-b">{employee.name}</td>
                            <td className="py-2 px-4 border-b">{employee.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default DashBoard;