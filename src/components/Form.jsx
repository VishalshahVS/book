import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function Form() {
  const [books, setBooks] = useState(); //DATABASE
  const [plus, setPlus] = useState(0); //Count for PlusButton
  const [renderCount, setRenderCount] = useState([0]); //Render count book field
  const [addDates, setAddDates] = useState([]); // rendering of date and time

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

  //CHANGE METHOD OF BOOKNAME
  const myhandleChangeBookName = (e) => {
    var test = books.filter((book) => {
      if (book.name === e.value) {
        return book;
      }
    });

    values.book[plus].bookName = e.value; // set value of BookName(Formik)
    books.map((fil) => {
      if (fil.name === e.value) {
        values.book[plus].bookId = fil.id;
      }
    });

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

  //CHANGE METHOD OF CHAPTERS
  const myhandleChangeChapterName = (e) => {
    values.book[plus].chp_name = e.map((values) => values.value);

    var dummy = [];
    e.map((v) => {
      books[plus].chapters.map((I) => {
        if (v.value === I.name) {
          dummy.push(I.id);
        }
      });
    });

    values.book[plus].chp_id = dummy;

    console.log(values, "&&&&&&&&&&&&&&&&&");
    // values.book[plus].chp_id = dummy
    // let test1 = values.book[plus].chapters

    // console.log(test1,"************")
    // console.log(values)
  };

  //PLUS BUTTON CLICKED
  const handlePlusClicked = () => {
    let dummy = { bookId: "", chp_id: "", bookName: "", chp_name: "" };
    values.book = [...values.book, dummy];
    setPlus(plus + 1);
    setRenderCount([...renderCount, plus + 1]);
  };

  //start & end time
  /* LOGIC FOR SELECT
  var hr = 0;
  var min = 0;
  var time = []

  while(hr < 24)
  {
    while(min != 60)
    {
      time.push({hour: hr ,minute: min})
      min += 15
    }
    if(min === 60){
      min = 0;
      hr += 1;
    }
  }
time.push({hour: hr , minute: 0})
console.log(time) */

  //Dates
  const dates = [
    "sunday",
    "monday",
    "tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // handleAddDate

  //Using State
  const [ArraysofDates, setArrayofDates] = useState([
    { id: 0, size: [] },
    { id: 1, size: [] },
    { id: 2, size: [] },
    { id: 3, size: [] },
    { id: 4, size: [] },
    { id: 5, size: [] },
    { id: 6, size: [] },
  ]);
  const temp = [];
  const handleAddDate = (id) => {
    setArrayofDates(
      ArraysofDates.map((values) => {
        if (values.id === id) {
          return { id: values.id, size: [...ArraysofDates[id].size, 0] };
        }
        return values;
      })
    );
    console.log(temp, "$$");
    // console.log(ArraysofDates[id].size.length,"LENGTH");
  };

  //Options Logic
  var hr = 0;
  var min = 0;
  var time = [];

  while (hr < 24) {
    while (min != 60) {
      time.push({ hour: hr, minute: min });
      min += 15;
    }
    if (min === 60) {
      min = 0;
      hr += 1;
    }
  }
  time.push({ hour: hr, minute: 0 });

  //Options for End Time
  const [optionsEndTime, setoptionsEndTime] = useState();
  
  //Options for Start Time
  const [optionsStartTime, setoptionsStartTime] = useState();

  useEffect(() =>{
    setoptionsStartTime(
      time?.map(({ hour, minute }) => {
    return { value: `${hour}:${minute}`, label: `${hour}:${minute}` };
  })
    )
  },[])
  
 /*  const optionsStartTime = time?.map(({ hour, minute }) => {
    return { value: `${hour}:${minute}`, label: `${hour}:${minute}` };
  }); */

  //Change event of Start Time

  /* const handleStartTime = (e,id) => {
    console.log(e.value, "START TIME");
    let hr = [];
    let min = [];
   
    //Convert Time to Number
    let sTime = Array.from(e.value)
    let sepratorIndex = sTime.findIndex((I) => I === ':')
    hr = sTime.slice(0,sepratorIndex).toString().replace(/\,/g,'');
    min = sTime.slice(sepratorIndex+1).toString().replace(/\,/g,'')

   
   let dummy1=[]
   time.filter(({hour,minute}) =>
    {
        if(!(hour == hr  && minute == min)) {
          dummy1.push({value: `${hour}:${minute}`, label: `${hour}:${minute}`})
        } 
    } 
  )
    setoptionsEndTime(dummy1)
    values.timing[id].push({start_Time: `${hr}:${min}`})
  };

  //Change event of End Time
  const handleEndTime = (e,id) => {
    console.log(e.value, "END TIME");
    console.log(id,"hgyug")
    let hr = [];
    let min = [];
   
   
    //Convert Time to Number
    let sTime = Array.from(e.value)
    let sepratorIndex = sTime.findIndex((I) => I === ':')
    hr = sTime.slice(0,sepratorIndex).toString().replace(/\,/g,'');
    min = sTime.slice(sepratorIndex+1).toString().replace(/\,/g,'')

    values.timing[id][id] = {...values.timing[id][id],end_Time:`${hr}:${min}`}
    
    console.log(  values.timing,"%%%%%%%%%%%%")

  }; */

  //Testing
  var sTime;
  const [startHour,setStartHour] = useState();
  const [startMin,setstartMin] = useState();

  var eTime = [];
  var e_hr = [];
  var e_min = [];
  const handleStartTime = (e, id) => {
    console.log(e.value, "START TIME");

    //Convert Time to Number
    var s_hr = [];
    var s_min = [];
    sTime = Array.from(e.value);
    let sepratorIndex = sTime.findIndex((I) => I === ":");
    s_hr = sTime?.slice(0, sepratorIndex).toString().replace(/\,/g, "");
    s_min = sTime
      .slice(sepratorIndex + 1)
      .toString()
      .replace(/\,/g, "");

    let dummy1 = [];
    time.filter(({ hour, minute }) => {
      if (!(hour == s_hr && minute == s_min)) {
        dummy1.push({ value: `${hour}:${minute}`, label: `${hour}:${minute}` });
      }
    });
    setoptionsEndTime(dummy1);
    setoptionsStartTime(dummy1);
    /* values.timing[id].push({start_Time: `${hr}:${min}`}) */
    setStartHour(hr)
    setstartMin(min)
  };

  //Change event of End Time
  const handleEndTime = (e, id) => {
    console.log(e.value, "END TIME");

    //Convert Time to Number
    eTime = Array.from(e.value);
    let sepratorIndex = eTime.findIndex((I) => I === ":");
    e_hr = eTime.slice(0, sepratorIndex).toString().replace(/\,/g, "");
    e_min = eTime
      .slice(sepratorIndex + 1)
      .toString()
      .replace(/\,/g, "");

    /* values.timing[id][id] = {
      ...values.timing[id][id],
      end_Time: `${hr}:${min}`,
    }; */

    console.log(startHour)
   /*  values.timing[id].push({
      start_Time: `${startHour}:${startMin}`,
      end_Time: `${e_hr}:${e_min}`,
    });
    console.log(values.timing, "%%%%%%%%%%%%"); */
  };

  //FORMIK
  const initialValues = {
    id: uuidv4(),
    titleOfPlan: "",
    book: [{ bookId: "", chp_id: "", bookName: "", chp_name: "" }],
    timing: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    },
    startDate: "",
    endDate: "",
    createdDate: "",
    startTempTime:'',
    endTempTime:''
  };

  const { values, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues,

    onSubmit: (value, action) => {},
  });



  return (
    <div className="w-[80%] mx-auto mt-12">
      {/* <div>
        <input type="time" name="startTempTime" onChange={handleChange} value={values.startTempTime} />
        <input type="time" name="endTempTime" onChange={handleChange} value={values.endTempTime} />
      </div> */}
      <section className=" w-full flex items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border   xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=" w-full p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Book Plan
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

              {renderCount.map((count, id) => {
                return (
                  <div className="w-full flex gap-2 justify-" key={id}>
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
                );
              })}

              <div>
                <button
                  type="button"
                  onClick={handlePlusClicked}
                  className="w-[10] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  +
                </button>
              </div>

              <div>
                <div className="w-full border flex gap-3 justify-between p-3">
                  {dates.map((renders, id) => {
                    return (
                      <>
                        <ul key={id}>
                          <div>
                            {renders}

                            <div className="w-full mt-[5%] align-center">
                              {/* {console.log( ArraysofDates[id].size,"bbbbbbbbbbbb")} */}
                              {ArraysofDates[id].size.map((arrayOfDates) => {
                                return (
                                  <>
                                    <div className="mx-5">
                                      <Select
                                        className="mt-3"
                                        name="start_Time"
                                        onChange={(e) => handleStartTime(e, id)}
                                        options={optionsStartTime}
                                        // value={values?.books[plus].optionsBookName?.value}
                                      />

                                      <Select
                                        name="end_Time"
                                        onChange={(e) => handleEndTime(e, id)}
                                        options={optionsEndTime}
                                        // value={values?.books[plus].optionsBookName?.value}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                              <button
                                type="button"
                                onClick={() => handleAddDate(id)}
                                className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </ul>
                      </>
                    );
                  })}
                </div>
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
