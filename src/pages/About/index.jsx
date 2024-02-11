import Footer from "@/components/Footer";

const About = () => {
  return (
    <div>
      <h1 className="text-yellow-600 mb-[20px] text-4xl font-semiboldbold mt-[20px] ml-[20px] border-b-2 border-yellow-600 w-[100px] ">
        About
      </h1>
      <p className="ml-[30px] text-2xl">
        Welcome to CJ My Blawg <br />
        Share your blogs or see our thoughts and stories shared by other authors
      </p>
      <h1 className="text-2xl ml-[30px] mt-[20px]">
        This is a personal project by Syed Sufyan Hassan
      </h1>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default About;
