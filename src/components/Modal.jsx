import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { FaPenFancy } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
const bcrypt = require("bcryptjs");
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/db";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid rgb(234 179 8)",
  boxShadow: 24,
  p: 4,
};
const Mod = ({ data, id }) => {
  const [open, setOpen] = useState(false);
  const [pass, setPass] = useState("");

  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handledelete(e) {
    e.preventDefault();
    console.log(pass);
    console.log(data[0].password);
    if (pass && data[0].password) {
      bcrypt.compare(pass, data[0].password).then((res) => {
        if (res) {
          popdelete();
        }
      });
    }
  }

  async function popdelete() {
    const docRef = doc(db, "blogstore", id);
    await deleteDoc(docRef).then(() => {
      router.push("/");
    });
    console.log("deleted");
  }

 /*  function handlecheck(e) {
    e.preventDefault();
    if (pass && data[0].password) {
      bcrypt.compare(pass, data[0].password).then((res) => {
        if (res) {
          router.push(`/editting/${data[0].id}`);
        }
      });
    }
  }
 */
  return (
    <div>
      <Button onClick={handleOpen}>
        <FaPenFancy className="text-4xl text-yellow-500 hover:text-yellow-800" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="text-center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Enter Your Blog
          </Typography>
          <Typography
            className="text-center flex flex-col justify-center items-center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <span className="mb-[10px]">Password</span>
            <input
              onChange={(e) => {
                setPass(e.target.value);
              }}
              type="text"
              className="border-2 mb-[10px] border-yellow-500"
            />
           {/*  <button
              className="mb-[5px] border-2 bg-yellow-500 text-white  border-yellow-600 hover:bg-white hover:text-yellow-500 w-[50px]"
              onClick={handlecheck}
            >
              Edit
            </button> */}
            <button
              className="mb-[5px] border-2 bg-yellow-500 text-white  border-yellow-600 hover:bg-white hover:text-yellow-500 w-[60px]"
              onClick={handledelete}
            >
              Delete
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Mod;
