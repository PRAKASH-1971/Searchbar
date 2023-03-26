import { useCallback, useState ,useEffect} from 'react';
import './App.css';
import Searchbar from './Components/Searchbar';
import countries from './utils/Countries';


function App() {
  const [query,setQuery] = useState("");
  const [suggestion,setSuggestion] = useState("")

const queryhandler = useCallback((val)=>{
  setQuery(val)
},[]);

useEffect(()=>{
  if(query === ""){
     setSuggestion([])
  }else{
    let newsuggestions = countries.filter((item)=>{
      return item.country.toLowerCase().indexOf(query) !== -1 ? true : false;
    }).map((item)=> item.country);
    // console.log(newsuggestions);
    setSuggestion(newsuggestions)
  }
 },[query])


  return (
    <div className="App">
      <h3>Serach query is "{query}"</h3>
      <Searchbar inputhandler={queryhandler} suggestions={suggestion} />
    </div>
  );
}

export default App;
