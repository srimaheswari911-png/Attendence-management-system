import React, { useEffect, useState } from "react";
import api from "../api";
import { Table, Page } from "./Students";

export default function Faculty() {
    const empty = {
        facultyId: "",
        name: "",
        department: "",
        email: "",
        phone: ""
    };

    const [form, setForm] = useState(empty);
    const [items, setItems] = useState([]);

    // Load faculty
    const load = () => {
        api.get("/faculty")
            .then((r) => {
                setItems(r.data);
            })
            .catch((error) => {
                console.error("Error loading faculty:", error);
            });
    };

    // FIX: Do not use useEffect(load, [])
    useEffect(() => {
        load();
    }, []);

    // Add faculty
    const add = (e) => {
        e.preventDefault();

        api.post("/faculty", form)
            .then(() => {
                setForm(empty);
                load();
            })
            .catch((e) => {
                alert(e.response?.data?.message || "Error");
            });
    };

    // Delete faculty
    const del = (id) => {
        if (confirm("Delete faculty?")) {
            api.delete("/faculty/" + id)
                .then(() => {
                    load();
                })
                .catch((error) => {
                    console.error("Error deleting faculty:", error);
                });
        }
    };

    return (
        <Page title="Faculty Management">

            <form className="form" onSubmit={add}>
                {Object.keys(empty).map((f) => (
                    <input
                        key={f}
                        name={f}
                        placeholder={f}
                        value={form[f]}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                [f]: e.target.value
                            })
                        }
                        required={[
                            "facultyId",
                            "name",
                            "department"
                        ].includes(f)}
                    />
                ))}

                <button type="submit">
                    Add Faculty
                </button>
            </form>

            <Table
                headers={[
                    "Faculty ID",
                    "Name",
                    "Department",
                    "Email",
                    "Phone",
                    "Action"
                ]}
                rows={items.map((x) => [
                    x.facultyId,
                    x.name,
                    x.department,
                    x.email,
                    x.phone,
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