
import { useState } from "react";

export default function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Rahul", salary: 25000 },
    { id: 2, name: "Priya", salary: 30000 },
  ]);

  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);

  // CREATE and UPDATE
  const saveEmployee = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setEmployees(employees.map((emp) =>
        emp.id === editId ? { ...emp, name, salary } : emp
      ));
      setEditId(null);
    } else {
      setEmployees([...employees, {
        id: Date.now(), name, salary
      }]);
    }

    setName("");
    setSalary("");
  };

  // EDIT
  const editEmployee = (emp) => {
    setEditId(emp.id);
    setName(emp.name);
    setSalary(emp.salary);
  };

  // DELETE
  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold text-blue-600">
          Employee Management
        </h1>

        <form onSubmit={saveEmployee}>
          <input
            className="mb-3 w-full rounded border p-2"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="mb-3 w-full rounded border p-2"
            type="number"
            min="0"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <button className="mb-5 rounded bg-blue-600 px-4 py-2 text-white">
            {editId !== null ? "Update" : "Add Employee"}
          </button>
        </form>

        {employees.map((emp) => (
          <div key={emp.id}
            className="mb-3 flex items-center justify-between rounded border p-3">
            <div>
              <p className="font-bold">{emp.name}</p>
              <p>Salary: ₹{emp.salary}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editEmployee(emp)}
                className="rounded bg-yellow-500 px-3 py-1 text-white">
                Edit
              </button>
              <button onClick={() => deleteEmployee(emp.id)}
                className="rounded bg-red-600 px-3 py-1 text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
