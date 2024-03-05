import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function Form() {
  const [books, setBooks] = useState(); //DATABASE
  const [count,setCount] = useState(0);//Count for PlusButton

  //FETCH DATA
  useEffect(() => {
    axios.get("/database/Records.json").then((Response) => {
      setBooks(Response.data);
    });
  }, []);

  //OPTIONS FOR BOOK NAME
  const optionsBookName = books?.map(({name}) => {
    return {value:name,label:name}
  })
 //OPTIONS FOR BOOK Chapter
  const [ optionsBookChapter, setOptionsBookChapter] = useState();
 


  //CHANGE METHOD OF CHAPTERS
  const myhandleChangeChapterName = (e) => {
  values.bookChapter = e.map(values => values.value)
  console.log(values)
}

  //PLUS BUTTON CLICKED
  const handlePlusClicked = () =>{
    
  }

  //FORMIK
  const initialValues = {
    titleOfPlan:'',
    bookName:'',
    bookChapter:''
  };

  const { values, handleSubmit, handleChange, handleReset, errors, touched } =
    useFormik({
      initialValues,

   
      onSubmit: (value, action) => {},
    });

    //CHANGE METHOD OF BOOKNAME
    const myhandleChangeBookName = (e) => {

          var test = books.filter((book) =>{
              if(book.name === e.value)
              {
                return book
              }
            })  
            
          values.bookName =  e.value ; // set value of BookName(Formik)
          let arrayofChapters=(test[0].chapters).map(bookChapterName => bookChapterName.name)//options of Chapters 
            
          /* refrence logic
          console.log(test,"test")
          console.log( " bname: ",values.bookName," CName:",values.bookChapter," titleofPlan:",values.titleOfPlan) */
          

          //SETING OPTIONS FOR CHAPTERS
          setOptionsBookChapter( 
              arrayofChapters?.map((chapters) => { 
              return { value: chapters , label: chapters } 
            })
          )
    }

      return (
        <div className="w-[80%] mx-auto mt-12">


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
                  value={values.titleOfPlan}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Unique Title of Plan"
                />
              </div>
              <div className="w-full flex gap-2 justify-">
                <Select
                  name="bookName"
                  onChange={(e) => myhandleChangeBookName(e)}
                  options={optionsBookName}
                  value={optionsBookName?.value}
                />
                <Select
                  name="chapters"
                  onChange={(e) => myhandleChangeChapterName(e)}
                  options={optionsBookChapter}
                  value={optionsBookChapter?.value}
                  isMulti
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handlePlusClicked}
                  className="w-[10] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  +
                </button>
              </div>
            
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
