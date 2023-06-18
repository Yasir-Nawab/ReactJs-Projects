import React, {useState} from 'react';

export default function TextForm(props){
    const handleUpClick = () =>{
        let uppertext = text.toUpperCase();
        setText(uppertext);
        props.showAlert("Converted to upper case","success");
    }

    const handleLoClick = () =>{
        let lowertext = text.toLowerCase();
        setText(lowertext);
        props.showAlert("Converted to lower case","success");
    }

    const handleAutoText = () =>{
        let autoText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        setText(autoText);
        props.showAlert("Auto text is added","success");
    }

    const clearText = () =>{
        let clrtxt="";
        setText(clrtxt);
        props.showAlert("Text cleared","success");
    }

    const handleOnChange = (event) =>{
        setText(event.target.value);
    }

    const [text, setText] = useState("");
    return(
        <>
        <h1 style={{color:props.mode==='light'?'black':'white'}}>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor:props.mode==='light'?'white':'gray', color:props.mode==='light'?'black':'white'}} id="exampleFormControlTextarea1" rows="8" placeholder='Enter Text Here'></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to uppercase</button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to lowerCase</button>
        <button className="btn btn-primary mx-1" onClick={handleAutoText}>Convert into autoText</button>
        <button className="btn btn-primary mx-1" onClick={clearText}>Clear Text</button>

        <div className="container my-3" style={{color:props.mode==='light'?'black':'white'}}>
            <h2>Your Text summary</h2>
            <p>word {text.split(" ").length} and character {text.length} </p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Enter Text Above To Preview"}</p>
        </div>

        </>
    )
}