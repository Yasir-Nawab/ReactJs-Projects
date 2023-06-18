import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import About from './components/About';
import Error from './components/Error';
import { useState } from 'react';

// react Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // mode state
  const [mode,setMode] = useState('light');
  const toggleMode = () => {
    if(mode === 'light')
    {
      setMode('dark');
      document.body.style.backgroundColor="gray";
      // showAlert("Dark Mode Has Been Enabeled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor="white";
      // showAlert("Light Mode Has Been Enabeled", "success");
    }
  }

  // alert state
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1000);
  }

  return (
    <>
          {/* <Navbar logo={"This"} mode={mode} toggleMode={toggleMode}/>
          <Alert alert={alert}/>
          <div className="container my-3">
                <TextForm showAlert={showAlert} heading="Enter The Text To Analyze Below" mode={mode}/>
          </div> */}

          <BrowserRouter>
            <Routes>
              <Route element={<Navbar mode={mode} toggleMode={toggleMode} />}>
                  <Route exact path='/' element={<TextForm heading="Enter The Text To Analyze Below" mode={mode} />} />
                  <Route path='about' element={<About/>} />
                  <Route path='*' element={<Error/>}/>
              </Route>
            </Routes>
          </BrowserRouter>

    </>
  );
}

export default App;