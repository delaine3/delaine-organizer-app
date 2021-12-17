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

export default function CurrentSubScriptions() {
  const db = getFirestore();

  const currentUser = useAuth();

  const colRef = collection(db, "currentSubscriptions");

  const [activeStatus, setActiveStatus] = useState(false);
  const [subscription, setSubscription] = useState("");
  const [itemToDelete, setItemToDelete] = useState("");
  const [dataBaseItems, setDatabaseItems] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState("");
  const [updating, setUpdating] = useState(false);
  const [editedEntry, setEditedEntry] = useState("");

  function addSubscription(e) {
    e.preventDefault();

    addDoc(colRef, {
      date: new Date(),
      displayDate: theDate,
      author: currentUser?.email,
      subscription: subscription,
      active: false,
    });
    setSubscription("");
    fetchSubscriptions();
  }

  function fetchSubscriptions() {
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
    fetchSubscriptions();
  }, []);

  function updateSubscription(e) {
    console.log("To be UPDATED " + itemToUpdate);
    if (itemToUpdate !== "") {
      console.log("Updating");
      const docToUpdate = doc(db, "currentSubscriptions", itemToUpdate);
      updateDoc(docToUpdate, {
        subscription: editedEntry,
      }).then(() => {
        console.log("It supposed to be updated");
      });
      setUpdating(false);

      fetchSubscriptions();
    }
  }
  async function changeActiveStatus(e) {
    return setActiveStatus(e);
  }
  function toggleActiveSubscription(e) {
    if (itemToUpdate !== "") {
      const docToUpdate = doc(db, "currentSubscriptions", itemToUpdate);
      updateDoc(docToUpdate, {
        active: activeStatus,
      });

      fetchSubscriptions();
    }
  }

  function deleteSubscription(e) {
    console.log("To be Deleted " + itemToDelete);
    if (itemToDelete !== "") {
      console.log("Deleting");
      const docToDelete = doc(db, "currentSubscriptions", itemToDelete);
      deleteDoc(docToDelete).then(() => {
        console.log("It supposed to be deleted");
      });
      fetchSubscriptions();
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
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
          type="text"
          name="subscription"
          required
        />
        <br />
        <button onClick={addSubscription}>Add Subscription</button>
      </form>

      <div>
        {" "}
        <h2>Subscription List</h2>
        for some reason you have to press the Active/inactive button 2 times
        before it updates, idk why yet
        <div>
          {dataBaseItems.map((database, id) => (
            <div className="insertedItem" key={database.id}>
              <p className="date">{database.displayDate}</p>
              <p> {database.subscription}</p>Added by: <i>{database.author}</i>
              <br />
              <div
                onClick={() => {
                  setItemToUpdate(database.id);
                  changeActiveStatus(!database.active);
                  toggleActiveSubscription();
                }}
              >
                {database.active ? (
                  <button className="activeStyle">Active</button>
                ) : (
                  <button className="inactiveStyle">Innactive</button>
                )}
              </div>
              {updating ? (
                <div>
                  {" "}
                  <p>Change subscription to:</p>
                  <input
                    value={editedEntry}
                    onChange={(e) => setEditedEntry(e.target.value)}
                  />{" "}
                  <button
                    onClick={(e) => {
                      updateSubscription();
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
                  setItemToUpdate(database.id);
                  setUpdating(true);
                }}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={(e) => {
                  setItemToDelete(database.id);
                  deleteSubscription();
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
