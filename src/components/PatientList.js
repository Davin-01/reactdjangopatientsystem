import { useEffect, useState } from "react";
import { deletepatient, getpatient } from "../services/ApiService";
import AddPatient from "./AddPatient";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [showAddPatient, setShowAddPatient] = useState(false);

    useEffect(() => {
        let mount = true;
        getpatient()
            .then((res) => {
                console.log("Response from API", res);
                setPatients(res);
                return () => (mount = false);
            })
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    const handleDeleteBtn = (id) => {
        deletepatient(id)
            .then(() => setPatients(patients.filter((p) => p.patient_id !== id)))
            .catch((error) => console.error("Error deleting patient:", error));
    };

    const handleCancelBtn = () => {
        setShowAddPatient(false);
        getpatient()
            .then((res) => {
                console.log("Response from API", res);
                setPatients(res);
            })
            .catch((error) => console.error("Error fetching patients:", error));
    };

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: "#0a0f2c", minHeight: "100vh" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0" style={{ backgroundColor: "#1c2b4a", color: "#ffffff" }}>
                        <div className="card-header text-center" style={{ backgroundColor: "#0e162e", color: "#ffffff" }}>
                            <h4 className="mb-0">Patient List</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover table-bordered" style={{ color: "#ffffff" }}>
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Blood Group</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map((patient) => (
                                        <tr key={patient.patient_id}>
                                            <td>{patient.first_name}</td>
                                            <td>{patient.last_name}</td>
                                            <td>{patient.blood}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteBtn(patient.patient_id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-success"
                                    onClick={() => setShowAddPatient(!showAddPatient)}
                                >
                                    Add New Patient
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showAddPatient && <AddPatient handleCancelBtn={handleCancelBtn} />}
        </div>
    );
};

export default PatientList;
