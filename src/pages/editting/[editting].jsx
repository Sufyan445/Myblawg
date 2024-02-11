import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, getDocs, doc } from "firebase/firestore";
const bcrypt = require("bcryptjs");
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/db";
import { FaArrowLeftLong } from "react-icons/fa6";

const editting = ({vlogs}) => {

    console.log(vlogs)

     const router = useRouter();

  const saltRounds = 10;

  const [password, setPassword] = useState(null);
  const [hashed, setHashed] = useState(null);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    title: "",
    content: "",
    authorname: "",
    authorbio: "",
    cover: "",
    avatar: "",
  });

  let uploaddata = {};

  function passwordstore() {}

  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `cover/${file?.name}`);

    try {
      // 'file' comes from the Blob or File API
      const snapshot = await uploadBytes(storageRef, file);
      setFormData({
        ...formData,
        cover: snapshot.metadata.fullPath,
      });
      return snapshot; // Return the snapshot for handling in handlesubmit
    } catch (error) {
      console.error(error);
      throw error; // Propagate the error to handlesubmit
    }
  };

  const avatarhandleImageChange = async (event) => {
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${file?.name}`);

    try {
      // 'file' comes from the Blob or File API
      const snapshot = await uploadBytes(storageRef, file);
      setFormData({
        ...formData,
        avatar: snapshot.metadata.fullPath,
      });
      return snapshot; // Return the snapshot for handling in handlesubmit
    } catch (error) {
      console.error(error);
      throw error; // Propagate the error to handlesubmit
    }
  };

  async function blogupload(blog) {
    try {
      // Now, you can proceed with the form submission
      await addDoc(collection(db, "blogstore"), blog).then((e) => {
        setFormData({
          title: "",
          content: "",
          authorname: "",
          authorbio: "",
          cover: "",
          avatar: "",
        });
      });
      // Redirect to home page after successful submission
      router.push("/");
    } catch (error) {
      console.error("Error during form submission: ", error);
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    uploaddata = formData;

    const hash_1 = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err_1, hash) {
          console.log(hash);
          setHashed(hash);
          resolve(hash);
        });
      });
    });
    uploaddata = {
      ...formData,
      password: hash_1,
    };
    blogupload(uploaddata);
  }; 


  
    return ( 
        <div className="bg-gray-100">
        <div>
          <button
            className="text-xl  text-yellow-500 ml-[5px] hover:text-yellow-800 "
            onClick={() => {
              router.push("/");
            }}
          >
            <FaArrowLeftLong className=" w-[60px] mt-[20px] text-4xl " />
          </button>
        </div>
        <div className="w-[100 %]  rounded-xl border-solid flex flex-col justify-center items-center">
          <form
            className="bg-white shadow-xl shadow-yellow-500 flex flex-col justify-center items-center p-[40px] w-[30%] rounded-2xl  "
            /* onSubmit={handlesubmit} */
          >
            <label
              htmlFor="filecover"
              className="text-lg bg-yellow-500 ] text-white p-[5px] border-none rounded-xl hover:bg-white hover:text-yellow-600 transition-all duration-300 "
            >
              Cover Image
            </label>
            <input
              id="filecover"
              type="file"
              required
              /* onChange={(e) => {
                handleImageChange(e);
              }} */
              className=" mt-2 hidden"
            />
            <h1 className="text-xl mt-[20px] text-yellow-500 border-b-2 border-yellow-300  ">
              Title
            </h1>
            <input
              type="text"
              required
              className="bg-yellow-300 mt-2  "
              name="title"
              /* onChange={handlechange} */
            />
            <h1 className="text-xl mt-[20px] text-yellow-500 border-b-2 border-yellow-300  ">
              Content
            </h1>
            <textarea
              type="text"
              required
              className="bg-yellow-300 mt-2  "
              name="content"
              /* onChange={handlechange} */
            />
            <label
              htmlFor="avatarimg"
              className="text-lg mt-[20px] bg-yellow-500 text-white p-[5px] border-none rounded-xl hover:bg-white hover:text-yellow-500 transition-all duration-300 "
            >
              Avatar
            </label>
            <input
              type="file"
              id="avatarimg"
              required
             /*  onChange={(e) => {
                avatarhandleImageChange(e);
              }} */
              className="mt-2 hidden"
            />
            <h1 className="text-xl mt-[20px] text-yellow-500 border-b-2 border-yellow-300 ">
              Author Name
            </h1>
            <input
              type="text"
              required
              className="bg-yellow-300 mt-2  "
              name="authorname"
              /* onChange={handlechange} */
            />
            <h1 className="text-xl mt-[20px] text-yellow-500 border-b-2 border-yellow-300 ">
              Author Bio
            </h1>
            <textarea
              type="text"
              required
              className="bg-yellow-300 mt-2  "
              name="authorbio"
              /* onChange={handlechange} */
            />
            <h1 className="text-xl mt-[20px] text-yellow-500 border-b-2 border-yellow-300 ">
              Password
            </h1>
            <input
              type="password"
             /*  onChange={(e) => {
                setPassword(e.target.value);
              }} */
              className="bg-yellow-300 mt-2  "
            />
            <button
              className="text-lg bg-yellow-500 mt-[20px] text-white p-[5px] border-none rounded-xl hover:bg-white hover:text-yellow-600 transition-all duration-300 "
              /* type="submit" */
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}
 
export default editting;
export async function getServerSideProps(context) {
    // Fetch data from external API
    const vlogs = context.query.editting;
    return { props: { vlogs } };
  }
  