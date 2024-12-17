import { useState } from "react";
import axios from "axios";

const AddPatient = ({ handleCancelBtn }) => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [blood, setBlood] = useState("");

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(first_name, last_name, blood);
            const res = await axios.post("http://127.0.0.1:8000/patient/", {
                first_name,
                last_name,
                blood,
            });
            console.log(res.data);
            alert("Patient added successfully!");
            setFirstName("");
            setLastName("");
            setBlood("");
            handleCancelBtn();
        } catch (error) {
            console.error("Error adding patient:", error);
            alert("Failed to add patient. Please try again.");
        }
    };

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: "#0a0f2c", minHeight: "100vh" }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0" style={{ backgroundColor: "#1c2b4a", color: "#ffffff" }}>
                        <div className="card-header text-center" style={{ backgroundColor: "#0e162e", color: "#ffffff" }}>
                            <h5 className="mb-0">Add New Patient</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAddSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter first name"
                                        style={{ backgroundColor: "#28394f", color: "#ffffff" }}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter last name"
                                        style={{ backgroundColor: "#28394f", color: "#ffffff" }}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Blood Group</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={blood}
                                        onChange={(e) => setBlood(e.target.value)}
                                        placeholder="Enter blood group (e.g., A+, O-)"
                                        style={{ backgroundColor: "#28394f", color: "#ffffff" }}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">
                                        Add Patient
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCancelBtn}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPatient;
