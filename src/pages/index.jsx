import { useRouter } from "next/router";
import { collection, addDoc, setDoc, getDocs, doc } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useEffect, useState } from "react";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";

const index = () => {
  const [fetchdata, setFetchdata] = useState(null);

  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogstore"));
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setFetchdata(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 ">
        <div>
          <h1 className="mt-[20px]  text-6xl  ">
            Welcome to CJ Ma Blawg
          </h1>
        </div>
        <div>
          <h1 className="text-center mt-[20px] text-4xl">Share Your Blog</h1>
        </div>
        <div className="flex justify-center items-center mt-[20px] ">
          <button
            onClick={() => {
              router.push("/submit");
            }}
            className="pushable"
          >
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">Create Blog</span>
          </button>
        </div>
        <div>
          <h1 className="mt-[20px] text-center text-4xl">
            See Our Thoughts And Stories Here
          </h1>
        </div>
        <div className="mb-[20px] flex overflow-x-scroll whitespace-nowrap justify-start ml-[20px] gap-[30px]">
          {fetchdata?.map((bloginfo, index) => {
            return <Blogs key={index} data={bloginfo} />;
          })}
        </div>
        <div className="flex justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default index;
