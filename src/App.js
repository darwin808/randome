import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addpeople,
  decrement,
  deletepeople,
  increment,
  updatepeople,
} from "./Actions/Actions";

function App() {
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const counter = useSelector((e) => e.CounterReducer);
  const people = useSelector((e) => e.PeopleReducer.peoples);
  const [edit, setedit] = useState("");
  const [idholder, setidholder] = useState(0);
  const [modal, setmodal] = useState(false);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(5);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(addpeople({ name, id: Math.random() }));
  };

  const openmodal = (id) => {
    setidholder(id);
    setmodal(true);
  };

  const handleedit = (e) => {
    e.preventDefault();
    dispatch(updatepeople({ idholder, edit }));
  };

  const indexoflasitem = currentpage * postperpage;
  const indexoffirstitem = indexoflasitem - postperpage;
  const posts = people.slice(indexoffirstitem, indexoflasitem);

  const pagenum = [];
  for (let i = 1; i <= Math.ceil(people.length / postperpage); i++) {
    pagenum.push(i);
  }

  return (
    <div className="App">
      {counter}
      <button
        onClick={() => {
          dispatch(increment());
        }}>
        add
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        minus
      </button>

      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </form>

      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit}
            onChange={(e) => {
              setedit(e.target.value);
            }}
          />
        </form>
      )}

      {posts.map((e) => (
        <div key={e.id}>
          {e.name}{" "}
          <button
            onClick={() => {
              dispatch(deletepeople(e.id));
            }}>
            delete
          </button>
          <button
            onClick={() => {
              openmodal(e.id);
            }}>
            edit
          </button>
        </div>
      ))}

      <div>
        {pagenum.map((e) => (
          <div
            onClick={() => {
              setcurrentpage(e);
            }}
            key={e}>
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
