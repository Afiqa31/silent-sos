import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts");
      setContacts(res.data.contacts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addContact = async (e) => {
    e.preventDefault();

    try {
      await API.post("/contacts", form);

      setForm({
        name: "",
        phone: "",
        email: "",
        relationship: "",
      });

      fetchContacts();

      alert("Contact Added");
    } catch (err) {
      alert("Failed to add contact");
    }
  };

  const deleteContact = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Emergency Contacts</h2>

        <form onSubmit={addContact} className="row g-3">

          <div className="col-md-3">
            <input
              className="form-control"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              name="relationship"
              placeholder="Relationship"
              value={form.relationship}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-danger w-100">
              Add
            </button>
          </div>

        </form>

        <hr />

        <div className="row">

          {contacts.map((contact) => (

            <div className="col-md-4 mb-3" key={contact._id}>

              <div className="card shadow">

                <div className="card-body">

                  <h5>{contact.name}</h5>

                  <p>{contact.phone}</p>

                  <p>{contact.email}</p>

                  <p>{contact.relationship}</p>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteContact(contact._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Contacts;