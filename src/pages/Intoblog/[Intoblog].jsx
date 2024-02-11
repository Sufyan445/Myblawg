import { useRouter } from "next/router";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  where,
  query,
} from "firebase/firestore";
import { db } from "@/firebase/db";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

const Intoblog = ({ vlogs }) => {
  const [fetchdata, setFetchdata] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [coverURL, setCoverURL] = useState(null);
  const [docid, setDocid] = useState(null);

  const avimg = async (blogid) => {
    try {
      const q = query(collection(db, "blogstore"), where("id", "==", blogid));

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setFetchdata(posts);

      // Fetch image URL
      if (posts.length > 0) {
        const storage = getStorage();
        const location = posts[0].avatar; // Assuming avatar is the field that contains the image location
        if (location) {
          const url = await getDownloadURL(ref(storage, location));
          setImageURL(url);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    avimg(vlogs);
  }, [vlogs]);

  const coimg = async (blogid) => {
    try {
      const q = query(collection(db, "blogstore"), where("id", "==", blogid));

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setFetchdata(posts);

      // Fetch image URL
      if (posts.length > 0) {
        const storage = getStorage();
        const location = posts[0].cover; // Assuming avatar is the field that contains the image location
        if (location) {
          const url = await getDownloadURL(ref(storage, location));
          setCoverURL(url);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    coimg(vlogs);
  }, [vlogs]);
  
  const fetchPost = async (blogid) => {
    try {
      const q = query(collection(db, "blogstore"), where("id", "==", blogid));

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => {
        setDocid(doc.id);
        return doc.data();
      });
      setFetchdata(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPost(vlogs);
  }, [vlogs]);

  const router = useRouter();
  if (fetchdata) {
    return (
      <div className="bg-gray-100">
        <div className="flex flex-row justify-between">
          <div>
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              <FaArrowLeftLong className=" w-[60px] mt-[20px]  text-yellow-500 ml-[5px] hover:text-yellow-800 text-4xl " />
            </button>
          </div>
          <div>
            <Modal data={fetchdata} id={docid} />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-[50px]">
          {coverURL && (
            <img
              className="w-[95%] h-[600px] rounded-lg"
              src={coverURL}
              alt="Cover"
            />
          )}
          <div className="bg-white shadow-sm shadow-yellow-500 text-center p-[10px] w-[95%] flex justify-center items-center flex-col gap-[20px] text-yellow-500 rounded-lg">
            <h1 className="text-2xl font-bold underline">
              {fetchdata[0]?.title}
            </h1>
            <p className="">{fetchdata[0].content}</p>
          </div>
          <div className="bg-white shadow-sm  shadow-yellow-500 mb-[20px] flex justify-center items-center flex-col text-center p-[10px] w-[95%] text-yellow-500 rounded-lg">
            {imageURL && (
              <img
                className="w-[50px] rounded-full"
                src={imageURL}
                alt="Avatar"
              />
            )}
            <h1 className="mt-[5px]">{fetchdata[0].authorname}</h1>
            <p className="mt-[20px]">{fetchdata[0].authorbio}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Intoblog;
export async function getServerSideProps(context) {
  // Fetch data from external API
  const vlogs = context.query.Intoblog;
  return { props: { vlogs } };
}
