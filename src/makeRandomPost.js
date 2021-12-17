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

export default function RandomPost() {
  const db = getFirestore();

  const currentUser = useAuth();

  const colRef = collection(db, "posts");

  const [post, setPost] = useState("");
  const [itemToDelete, setItemToDelete] = useState("");
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
      post: post,
      active: false,
      comments: [],
    });
    setPost("");
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

  function updateItem(e) {
    console.log("To be UPDATED " + itemToUpdate);
    if (itemToUpdate !== "") {
      console.log("Updating");
      const docToUpdate = doc(db, "posts", itemToUpdate);
      updateDoc(docToUpdate, {
        post: editedEntry,
      }).then(() => {
        console.log("It supposed to be updated");
      });
      setUpdating(false);

      fetchItems();
    }
  }

  function deleteItem(e) {
    console.log("To be Deleted " + itemToDelete);
    if (itemToDelete !== "") {
      console.log("Deleting");
      const docToDelete = doc(db, "posts", itemToDelete);
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
      <h1> Make a post, any post you like</h1>
      <form className="add">
        <input
          rows="10"
          cols="70"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          type="text"
          name="post"
          required
        />
        <br />
        <button onClick={addItem}>Add Post</button>
      </form>
      <div>
        {" "}
        <h2>Post List</h2>
        <div>
          {dataBaseItems.map((database, id) => (
            <div className="insertedItem" key={database.id}>
              <p className="date">{database.displayDate}</p>
              <p> {database.post}</p>Added by: <i>{database.author}</i>
              <br />
              {updating ? (
                <div>
                  {" "}
                  <p>Change post to:</p>
                  <input
                    value={editedEntry}
                    onChange={(e) => setEditedEntry(e.target.value)}
                  />{" "}
                  <button
                    onClick={(e) => {
                      updateItem();
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
                  deleteItem();
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
