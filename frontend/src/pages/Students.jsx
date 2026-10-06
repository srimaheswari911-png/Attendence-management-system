import React, { useEffect, useState } from "react";
import api from "../api";

export default function Students() {
    const empty = {
        rollNumber: "",
        name: "",
        department: "",
        year: "",
        section: "",
        email: ""
    };

    const [form, setForm] = useState(empty);
    const [items, setItems] = useState([]);

    // Load students
    const load = () => {
        api.get("/students")
            .then((r) => setItems(r.data))
            .catch((error) => {
                console.error("Error loading students:", error);
            });
    };

    // IMPORTANT: Don't use useEffect(load, [])
    useEffect(() => {
        load();
    }, []);

    // Add student
    const add = (e) => {
        e.preventDefault();

        api.post("/students", form)
            .then(() => {
                setForm(empty);
                load();
            })
            .catch((e) => {
                alert(e.response?.data?.message || "Error");
            });
    };

    // Delete student
    const del = (id) => {
        if (confirm("Delete student?")) {
            api.delete("/students/" + id)
                .then(() => load())
                .catch((error) => {
                    console.error("Error deleting student:", error);
                });
        }
    };

    return (
        <Page title="Student Management">
            <Form
                fields={Object.keys(empty)}
                form={form}
                setForm={setForm}
                onSubmit={add}
                button="Add Student"
            />

            <Table
                headers={[
                    "Roll No",
                    "Name",
                    "Department",
                    "Year",
                    "Section",
                    "Email",
                    "Action"
                ]}
                rows={items.map((x) => [
                    x.rollNumber,
                    x.name,
                    x.department,
                    x.year,
                    x.section,
                    x.email,
                    <button
                        className="danger"
                        onClick={() => del(x._id)}
                    >
                        Delete
                    </button>
                ])}
            />
        </Page>
    );
}

function Form({ fields, form, setForm, onSubmit, button }) {
    return (
        <form className="form" onSubmit={onSubmit}>
            {fields.map((f) => (
                <input
                    key={f}
                    name={f}
                    placeholder={f.replace(/([A-Z])/g, " $1")}
                    value={form[f]}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            [f]: e.target.value
                        })
                    }
                    required={[
                        "rollNumber",
                        "name",
                        "department",
                        "year",
                        "section"
                    ].includes(f)}
                />
            ))}

            <button type="submit">{button}</button>
        </form>
    );
}

function Table({ headers, rows }) {
    return (
        <div className="table-wrap">
            <table>
                <thead>
                    <tr>
                        {headers.map((h) => (
                            <th key={h}>{h}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            {r.map((c, j) => (
                                <td key={j}>{c}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Page({ title, children }) {
    return (
        <div className="panel">
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export { Table, Page };