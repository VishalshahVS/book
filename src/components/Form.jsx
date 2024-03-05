import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function Form() {
  const [books, setBooks] = useState(); //DATABASE
  const [plus, setPlus] = useState(0); //Count for PlusButton
  const [renderCount, setRenderCount] = useState([0]);

  //FETCH DATA
  useEffect(() => {
    axios.get("/database/Records.json").then((Response) => {
      setBooks(Response.data);
    });
  }, []);

  //OPTIONS FOR BOOK NAME
  const optionsBookName = books?.map(({ name }) => {
    return { value: name, label: name };
  });
  //OPTIONS FOR BOOK Chapter
  const [optionsBookChapter, setOptionsBookChapter] = useState();

  // CHANGE OF PLAN
  const handlePlanChange = (e) => {
    values.titleOfPlan = e.target.value;
  };


  //CHANGE METHOD OF CHAPTERS
  const myhandleChangeChapterName = (e) => {
    values.book[plus].chp_name = e.map((values) => values.value);

    var dummy=[]
     e.map((v)=>{
      books[plus].chapters.map((I)=>{
        if(v.value === I.name)
        {
            dummy.push(I.id)
        }
      })
    })

    values.book[plus].chp_id = dummy
    
    console.log(values,"&&&&&&&&&&&&&&&&&")
    // values.book[plus].chp_id = dummy
    // let test1 = values.book[plus].chapters
    
    // console.log(test1,"************")
    // console.log(values)
  };

  //CHANGE METHOD OF BOOKNAME
  const myhandleChangeBookName = (e) => {

    var test = books.filter((book) => {
      if (book.name === e.value) {
        return book;
      }
      
    });

    values.book[plus].bookName = e.value; // set value of BookName(Formik)
    books.map((fil)=>{
      if(fil.name === e.value)
      {
        values.book[plus].bookId = fil.id        
      }
    })

    // console.log(test1,"TEST")

    let arrayofChapters = test[0].chapters.map(
      (bookChapterName) => bookChapterName.name
    ); //options of Chapters

    //SETING OPTIONS FOR CHAPTERS
    setOptionsBookChapter(
      arrayofChapters?.map((chapters) => {
        return { value: chapters, label: chapters };
      })
    );
  };

  //PLUS BUTTON CLICKED
  const handlePlusClicked = () => {
    /* let newBook = {
      id: uuidv4(),
      titleOfPlan: "",
      bookName: "",
      bookChapter: "",
    };

    values.books.push(newBook);
    setPlus(plus + 1);
    setRenderCount([...renderCount, plus + 1]); */
    let dummy = { bookId: '', chp_id: '', bookName: '', chp_name: '' }
    values.book = [...values.book,dummy]  
    setPlus(plus + 1)
    setRenderCount([...renderCount, plus + 1]); 
    
     
  };


  //FORMIK
  /* const initialValues = {
    titleOfPlan:'',
    bookName:'',
    bookChapter:''
  }; */

  const initialValues = {
    id: uuidv4(),
    titleOfPlan: "",
    book: [
      { bookId: '', chp_id: '', bookName: '', chp_name: '' }
    ],

  };

  const { values, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues,

    onSubmit: (value, action) => { },
  });

  return (
    <div className="w-[80%] mx-auto mt-12">
      <section className=" w-full flex items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border   xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=" w-full p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Books
            </h1>

            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title of Plan
              </label>
              <div>
                <input
                  type="text"
                  name="titleOfPlan"
                  onChange={(e) => handlePlanChange(e)}
                  value={values.titleOfPlan?.value}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Unique Title of Plan"
                />
              </div>

              {renderCount.map((count) => {
                return      <div className="w-full flex gap-2 justify-">
                            <Select
                              name="bookName"
                              onChange={(e) => myhandleChangeBookName(e)}
                              options={optionsBookName}
                              // value={values?.books[plus].optionsBookName?.value}
                            />
                            <Select
                              name="chapters"
                              onChange={(e) => myhandleChangeChapterName(e)}
                              options={optionsBookChapter}
                              // value={values?.books[plus].optionsBookChapter?.value}
                              isMulti
                            />
                          </div>
              })}

              {/* {renderCount.map((count) => {
                return <div className="w-full flex gap-2 justify-">
                  <Select
                    name="bookName"
                    onChange={(e) => myhandleChangeBookName(e)}
                    options={optionsBookName}
                  // value={values?.books[plus].optionsBookName?.value}
                  />
                  <Select
                    name="chapters"
                    onChange={(e) => myhandleChangeChapterName(e)}
                    options={optionsBookChapter}
                    // value={values?.books[plus].optionsBookChapter?.value}
                    isMulti
                  />
                </div>
              })} */}
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
                Create a Plan
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Form;
