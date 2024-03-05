import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";




const options = books.map(({name}) =>{
  return name
})

function Form() {

    const[books,setBooks] = useState();

    //FETCH DATA
    useEffect(() =>{
        axios.get("/database/Records.json")
        .then((Response)=>{
            setBooks(Response.data)
        })
    },[])
    

  const initialValues = {
    id: crypto.randomUUID(),
    token: crypto.randomUUID(),
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, handleSubmit, handleChange, handleReset, errors, touched } =
    useFormik({
      initialValues,
      onSubmit: (value, action) => {},
    });

  return (
    <div className="w-[80%] mx-auto mt-12">
        {console.log(books)}
      <section className=" w-full flex items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border   xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=" w-full p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Books
            </h1>
            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Titke of Plan
                </label>
                <input
                  type="text"
                  name="titleOfPlan"
                  onChange={handleChange}
                  // value={values.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Unique Title of Plan"
                />
              </div>
              <div className="w-40">
                <Select
                  name="BookName"
                  //   onChange={(e) => handleChange1(e, id)}
                  options={options}
                  styles={{ width: "50px" }}
                />

                
              </div>
              <div>
                <button
                  type="submit"
                  className="w-[10] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    +
                </button>
              </div>
              {/* <div>
                <label
                  htmlFor="contactNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Number
                </label>
                <input
                  type="Number"
                  // name="contactNumber"
                  onChange={handleChange}
                  // value={values.contactNumber}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="(+1) 0123456789"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  // name="email"
                  onChange={handleChange}
                  // value={values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="vishalshah@gmail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  // name="password"
                  onChange={handleChange}
                  // value={values.password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  // name="confirmPassword"
                  onChange={handleChange}
                  // value={values.confirmPassword}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div> */}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Form;
