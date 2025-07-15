import { useState } from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";
import { USER_API_ENDPOINT } from "../Api/Api.js";
import toast from "react-hot-toast";
function ContactSection() {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = axios.post(`${USER_API_ENDPOINT}/contact`, {
        ...formData,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Message not sent");
    } finally {
      setLoader(false);
    }
    console.log(formData);
  };

  return (
    <div
      data-aos="fade-left"
      className="flex flex-col lg:flex-row lg:items-center mb-20 lg:mb-36"
    >
      <span className="uppercase text-3xl lg:text-2xl font-bold mb-8 lg:mb-0 rotate-0 lg:-rotate-90 bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text">
        Get Started
      </span>
      <div className="flex flex-col lg:flex-row lg:ml-20 lg:gap-36">
        <div className="mb-5 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text mb-5 lg:mb-10">
            Contact me
          </h1>
          <div className="flex flex-col gap-2">
            <Link
              to="mailto:piyushjoshi1812@gmail.com"
              className="text-white font-mono underline text-lg lg:text-2xl"
            >
              piyushjoshi1812@gmail.com
            </Link>
          </div>
          <div className="flex gap-2 mt-10">
            <Link to="">
              <AiFillLinkedin className="text-white text-2xl" />
            </Link>
            <Link to="https://github.com/Pyush-18" target="_blank">
              <AiFillGithub className="text-white text-2xl" />
            </Link>
          </div>
          <h2 className="text-2xl lg:hidden font-bold font-mono text-white text-center">
            OR
          </h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col p-3">
            <input
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white font-mono text-lg lg:text-2xl mb-5 lg:mb-10 w-full lg:w-[30vw] bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text "
              type="text"
              value={formData?.subject}
              name="subject"
              id="subject"
              placeholder="Enter your subject"
              onChange={handleChange}
            />
            <input
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white font-mono text-lg lg:text-2xl mb-5 lg:mb-10 w-full lg:w-[30vw] bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text "
              type="email"
              value={formData?.email}
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <textarea
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white font-mono text-lg lg:text-2xl mb-5 lg:mb-10 w-full lg:w-[30vw] bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text "
              name="message"
              value={formData?.message}
              id="message"
              row="3"
              placeholder="Enter your message"
              onChange={handleChange}
            />
            <button
              disabled={loader}
              type="submit"
              className="px-3 py-2 text-lg lg:text-2xl bg-purple-500 hover:bg-purple-600 border font-bold text-white rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
