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

export default function ShowsToWatch() {
  const db = getFirestore();

  const currentUser = useAuth();

  const colRef = collection(db, "currentShows");

  const [currentSeason, setcurrentSeason] = useState("");
  const [streaming_service, setStreaming_service] = useState("");

  const [dataBaseItems, setDatabaseItems] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [updatingSeason, setUpdatingSeason] = useState(false)
  const [updatingStreamingService, setUpdatingStreamingService] =useState(false)
  const [editedSeason,setEditedSeason] = useState("")
  const [editedEntry, setEditedEntry] = useState("");
  const [editedStreamingService, setEditedStreamingService] = useState("")

  const [form, setForm]= useState({
    show: "",

  });

  function addItem(e) {
    e.preventDefault();

    addDoc(colRef, {
      date: new Date(),
      displayDate: theDate,
      author: currentUser?.email,
      show: form.show,
      active: false,
      completed: false,
      currentSeason: currentSeason,
      streaming_service:streaming_service
    });
    setcurrentSeason("")

    setForm({
      ...form,
      show: "",
    });

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

  function updateCurrentSeason(itemToUpdate) {
    console.log("To be UPDATED " + itemToUpdate);
    if (itemToUpdate !== "") {
      console.log("Updating");
      const docToUpdate = doc(db, "currentShows", itemToUpdate);
      updateDoc(docToUpdate, {
        currentSeason: editedSeason,
      }).then(() => {
        console.log("It supposed to be updated");
      });
      setUpdatingSeason(false);
      setEditedSeason("")
      fetchItems();
    }
  }
  function updateStreamingService(itemToUpdate) {
    console.log("To be UPDATED " + itemToUpdate);
    if (itemToUpdate !== "") {
      console.log("Updating");
      const docToUpdate = doc(db, "currentShows", itemToUpdate);
      updateDoc(docToUpdate, {
        streaming_service: editedStreamingService,
      }).then(() => {
        console.log("It supposed to be updated");
      });
      setUpdatingStreamingService(false);
      setEditedStreamingService("")
      fetchItems();
    }
  }
  function updateShow(itemToUpdate) {
    console.log("To be UPDATED " + itemToUpdate);
    if (itemToUpdate !== "") {
      console.log("Updating");
      const docToUpdate = doc(db, "currentShows", itemToUpdate);
      if(editedEntry != "")
      updateDoc(docToUpdate, {
        show: editedEntry,
      }).then(() => {
        console.log("It supposed to be updated");
      });
      setEditedEntry("")
      setUpdating(false);

      fetchItems();
    }
  }
  function toggleCompletetionStatus(completionStatus,itemToUpdate) {
    if (itemToUpdate !== "") {
      const docToUpdate = doc(db, "currentShows", itemToUpdate);
      updateDoc(docToUpdate, {
        completed: completionStatus,
      });
    }
    fetchItems();
  }
  function toggleActive(activeStatus,itemToUpdate) {
    if (itemToUpdate !== "") {
      const docToUpdate = doc(db, "currentShows", itemToUpdate);
      updateDoc(docToUpdate, {
        active: activeStatus,
      });
    }
    fetchItems();
  }

  function deleteItem(itemToDelete) {
    console.log("To be Deleted " + itemToDelete);
    if (itemToDelete !== "") {
      console.log("Deleting");
      const docToDelete = doc(db, "currentShows", itemToDelete);
      deleteDoc(docToDelete).then(() => {
        console.log("It supposed to be deleted");
      });
      fetchItems();
    }
  }
  const handleChange = (e) => {
    const target = e.target;
    var { name, value } = e.target;

    if (name == "expiry_date" || name == "foodType" || name == "quantityUnit") {
      value = target.value.toString();
    } else {
      value = target.name === "should_refrigerate" ? target.checked : target.value;
    }

    setForm({
      ...form,
      [name]: value,
    });
    console.log(value);
  };

  return (
    <div className="category" >
      <br />
      <br />

      <form className="post-component">
        <label>Show Name</label>
        <input
          rows="10"
          cols="70"
          value={form.show}
          onChange={handleChange}
          type="text"
          name="show"
          required
        />
        <br />
        <label>Current Season</label>
        <input 
        value={currentSeason}
        onChange={(e)=>setcurrentSeason(e.target.value)}
        type="text"
        name="currentSeason"/>

        <label>Streaming Service</label>
        <input 
        value={streaming_service}
        onChange={(e)=>setStreaming_service(e.target.value)}
        type="text"
        name="currentSeason"/>

        <button className="add-post" onClick={addItem}>Add show</button>
      </form>

      <div>
        {" "}
        <h2>Show List</h2>
      
        <div className=" item-grid">
          {dataBaseItems.map((database, id) => (
            <div className="inserted-item" key={database.id}>
          <p className="show">   {database.show}  <br/>   
          <button
                className="edit"
                onClick={(e) => {
                  setUpdating(true);
                  setUpdatingSeason(false)
                  setUpdatingStreamingService(false)
                }}
              >
                Edit
              </button> {updating ?  <button  
              className="cancel"  
              onClick={(e) => {
                  setUpdating(false);
                }}>Cancel</button> 
                  : <></>}
           {updating ? (
                <div className="updating-show">
                  {" "}
                  <p>Change show to:</p>
                  <input
                    value={editedEntry}
                    onChange={(e) => setEditedEntry(e.target.value)}
                  />{" "}
                  <button
                    onClick={(e) => {
                      updateShow(database.id);
                    }}
                  >
                    Save
                  </button>
                 
                </div>
              ) : (
                <div></div>
              )}</p>  
               <p> Current Season: {database.currentSeason }
            <button
                className="edit"
                onClick={(e) => {
                  setUpdatingSeason(true);
                  setUpdating(false)
                  setUpdatingStreamingService(false)
                }}
              >
                Edit
              </button>
              {updatingSeason ?  <button  
              className="cancel"  
              onClick={(e) => {
                  setUpdatingSeason(false)
                  
                }}>Cancel</button>  : <></>}
             
              {updatingSeason ? (
                <div>
                  {" "}
                  <p>Change season to:</p>
                  <input
                    value={editedSeason}
                    onChange={(e) => setEditedSeason(e.target.value)}
                  />{" "}
                  <button
                    onClick={(e) => {
                      updateCurrentSeason(database.id);
                    }}
                  >
                    Save
                  </button>
                 
                </div>
              ) : (
                <div></div>
              )}    
          
            </p>    
            <p> Streaming Service: {database.streaming_service }
            <button
                className="edit"
                onClick={(e) => {
                  setUpdatingStreamingService(true);
                  setUpdating(false);
                  setUpdatingSeason(false);
                }}
              >
                Edit
              </button>
              {updatingStreamingService ?  <button  
              className="cancel"  
              onClick={(e) => {
                  setUpdatingStreamingService(false)
                }}>Cancel</button> : <></>}
             
              {updatingStreamingService ? (
                <div>
                  {" "}
                  <p>Change streaming service to:</p>
                  <input
                    value={editedStreamingService}
                    onChange={(e) => setEditedStreamingService(e.target.value)}
                  />{" "}
                  <button
                    onClick={(e) => {
                      updateStreamingService(database.id);
                    }}
                  >
                    Save
                  </button>
                  
                </div>
              ) : (
                <div></div>
              )}

            </p>  
          
          
          
          <div className="active-buttons-container">
              <div 
                onClick={() => {
                  toggleActive(!database.active,database.id);
                }}
              >
                {database.active ? (
                  <button className="activeStyleProgress">In Progress</button>
                ) : (
                  <button className="inactiveStyleProgress">Not In Progress</button>
                )}
              </div>
              <div
                onClick={() => {
                  toggleCompletetionStatus(!database.completed,database.id);
                }}
              >
                {database.completed ? (
                  <button className="activeStyle">Completed</button>
                ) : (
                  <button className="inactiveStyle">Not Completed</button>
                )}
              </div>
              </div>
    
              <br />
           
              <button
                className="delete"
                onClick={(e) => {
                  deleteItem(database.id);
                }}
              >
                Delete
              </button>
              <p>Added by: {database.author}</p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
