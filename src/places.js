import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "./firebase";
import { theDate } from "./Utilities/theDate";

export default function Places() {
  const db = getFirestore();

  const currentUser = useAuth();

  const colRef = collection(db, "places");

  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const [dataBaseItems, setDatabaseItems] = useState([]);

  function addPlace(e) {
    e.preventDefault();

    addDoc(colRef, {
      date: new Date(),
      displayDate: theDate,
      author: currentUser?.email,
      place: place,
      location: location,
    });
    setPlace("");
    setLocation("");
    fetchPlaces();
  }

  function fetchPlaces() {
    getDocs(colRef).then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(items);

      setDatabaseItems(items);
      dataBaseItems.sort((a, b) => (b.joinDate < a.joinDate ? 1 : -1));
    });
  }
  useEffect(() => {
    fetchPlaces();
  }, []);

  function deletePlace(itemToDelete) {
    console.log("To be Deleted " + itemToDelete);
    if (itemToDelete !== "") {
      console.log("Deleting");
      const docToDelete = doc(db, "places", itemToDelete);
      deleteDoc(docToDelete).then(() => {
        console.log("It supposed to be deleted");
      });
      fetchPlaces();
    }
  }
  return (
    <div  className="category">
      <br />
      <br />

      <form className="post-component">
        <label>Place:</label>
        <input
          rows="10"
          cols="70"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          type="text"
          name="place"
          required
        />

        <br />
        <label>Where:</label>
        <input
          rows="4"
          cols="50"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          name="place"
          required
        />
        <br />
        <br />
        <button className="add-post" onClick={addPlace}> Add Place</button>
      </form>

      <div>
        {" "}
        <h1>Place List</h1>
        <div className="item-grid">
          {dataBaseItems.map((database, id) => (
            <div className="insertedItem" key={database.id}>
              <p className="date">{database.displayDate}</p>
              <p> {database.place} </p>
              <p>Where: {database.location}</p>
              <p>
                Added by: <i>{database.author}</i>
              </p>
              <button
                className="delete"
                onClick={(e) => {
                  deletePlace(database.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
