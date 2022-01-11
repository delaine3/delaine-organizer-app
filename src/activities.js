import { useState, useEffect } from "react";
import {
  updateDoc,
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "./firebase";
import { theDate } from "./Utilities/theDate";

export default function Activities() {
  const db = getFirestore();

  const currentUser = useAuth();

  const colRef = collection(db, "activities");

  const [activity, setActivity] = useState("");
  const [dataBaseItems, setDatabaseItems] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState("");
  const [updating, setUpdating] = useState(false);
  const [editedEntry, setEditedEntry] = useState("");

  function addItem(e) {
    e.preventDefault();

    addDoc(colRef, {
      date: new Date(),
      displayDate: theDate,
      author: currentUser?.email,
      activity: activity,
      active: false,
    });
    setActivity("");
    fetchItems();
  }

  function fetchItems() {
    getDocs(colRef).then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(items);
      setDatabaseItems(items);
    });
  }
  useEffect(() => {
    fetchItems();
  }, []);

  function updateItem(itemToUpdate) {
    console.log("To be UPDATED " + itemToUpdate);
    if (itemToUpdate !== "") {
      console.log("Updating");
      const docToUpdate = doc(db, "activities", itemToUpdate);
      updateDoc(docToUpdate, {
        activity: editedEntry,
      }).then(() => {
        console.log("It supposed to be updated");
      });
      setUpdating(false);

      fetchItems();
    }
  }

  function toggleDone(activeStat, item2Update) {
    let itemToUpdate=item2Update;
    let activeStatus =activeStat;

      const docToUpdate = doc(db, "activities", itemToUpdate);
      updateDoc(docToUpdate, {
        active: activeStatus,
      });
    
    fetchItems();
  }

  function deleteItem(itemToDelete) {
    console.log("To be Deleted " + itemToDelete);
    if (itemToDelete !== "") {
      console.log("Deleting");
      const docToDelete = doc(db, "activities", itemToDelete);
      deleteDoc(docToDelete).then(() => {
        console.log("It supposed to be deleted");
      });
      fetchItems();
    }
  }

  return (
    <div className="post-component">
      <br />
      <br />

      <form className="add">
        <input
          rows="10"
          cols="70"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          type="text"
          name="activity"
          required
        />
        <br />
        <button onClick={addItem}>Add activity</button>
      </form>

      <div>
        {" "}
        <h2>Activity List</h2>
      
        <div>
          {dataBaseItems.map((database, id) => (
            <div className="insertedItem" key={database.id}>
              <p className="date">{database.displayDate}</p>
              <p> {database.activity}</p>Added by: <i>{database.author}</i>
              <br />
              <div
                onClick={() => {
                  toggleDone(!database.active,database.id);
                }}
              >
                {database.active ? (
                  <button className="activeStyle">Done</button>
                ) : (
                  <button className="inactiveStyle">Not Done</button>
                )}
              </div>
              {updating ? (
                <div>
                  {" "}
                  <p>Change activity to:</p>
                  <textarea
                    value={editedEntry}
                    onChange={(e) => setEditedEntry(e.target.value)}
                  />{" "}
                  <button
                    onClick={(e) => {
                      updateItem(database.id);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <br />
              <button
                onClick={(e) => {
                  setUpdating(true);
                }}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={(e) => {
                  deleteItem(database.id);
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
