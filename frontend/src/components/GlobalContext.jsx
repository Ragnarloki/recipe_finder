import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

    
// const  fetchme = async ()=> { 


  
//   .then ( response => {
//     return response.json();
//   })	
  
//   .then(data =>{
//     setContainer(data.nameResults.results);
//     setLoading(false);
//     console.log(data)
//   })
  
//   .catch (error => {
//       console.error(error);
//   })  }


export default function Globalstate({children}){
    const [searchParam,setParam] = useState("pancake");
    const [loading,setLoading] =useState(true);
    const[recipeList,setRecipeList] =useState([]);
    const [recipeDetail,setRecipeDetail]=useState([]);
    const {incredientDetail,setincredientDetail} =useState([]);
    async function submitHandler(event){
        event.preventDefault()
        try{
            const res =await     fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${searchParam}`,{
                method: await 'GET',
                headers: {
                'X-RapidAPI-Key': 'bf588ab8f9msh2aebdcef094f1adp1bb55fjsnf088cbe6d2b5',
		        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
              }
            })
             
            const data=await res.json();
            if(data.results){
                setRecipeList(data.results)
                setLoading(false)
                setParam('')
            } 
        }
            
        catch(e){
            setLoading(false)
            setParam('')
        }
    }
    return <GlobalContext.Provider 
    value={{searchParam,setParam,submitHandler,incredientDetail,setincredientDetail,loading,setLoading,
        recipeList,recipeDetail,setRecipeDetail}}>
            {children}
            </GlobalContext.Provider>
} 