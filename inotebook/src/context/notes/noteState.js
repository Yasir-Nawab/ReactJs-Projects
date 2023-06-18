import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const state = {
        "Name": "Yasir",
        "Laptop":"Dell"
    }
    return(
    <NoteContext.Provider value={state}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;