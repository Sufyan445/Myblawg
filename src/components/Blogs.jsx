import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Link from "next/link";

const Blogs = ({ data }) => {
  const [imga, setImga] = useState(null);
  const [profile, setProfile] = useState(null);
  function pic(location) {
    if (location) {
      const storage = getStorage();
      getDownloadURL(ref(storage, location)).then((url) => {
        setImga(url);
      });
    }
  }

  function tilecover(pro) {
    if (pro) {
      const storage = getStorage();
      getDownloadURL(ref(storage, pro)).then((co) => {
        setProfile(co);
      });
    }
  }

  useEffect(() => {
    if (data) {
      pic(data.avatar);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      tilecover(data.cover);
    }
  }, [data]);

  return (
    <div className="max-w-[300px] min-w-[200px] mt-[50px] blogcard bg-white shadow-lg rounded-md overflow-hidden hover:shadow-yellow-500 transition-all duration-300">
      <Link href={`/Intoblog/${data.id}`}>
      <img
        className="w-full h-48 object-cover"
        src={profile}
        alt="Blog Cover"
      />
      <div className="p-4">
        <h1 className="text-2xl text-wrap font-bold mb-2">{data.title}</h1>
        <img
          className="w-12 h-12 rounded-full object-cover mb-2"
          src={imga}
          alt="Author Profile"
          />
        <h1 className="text-lg font-bold">{data.authorname}</h1>
      </div>
          </Link>
          </div>
   
  );
};
export default Blogs;
