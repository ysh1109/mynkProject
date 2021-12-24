import React, {useState} from 'react';

export const ListContext = React.createContext({});

export const ListProvider = ({children}) => {
    const [listing, setListing] = useState([]);
    // React.useEffect(()=>{settListing([3,4,5,6])},[]);
    React.useEffect(()=>{console.log(`listing `,listing)},[listing])
    
    return(
        <ListContext.Provider 
            value = {{
                listing:listing,
                setListing:setListing,
                addList:async(value)=>{
                    try {
                    const newData = [...listing,value]
                    setListing(newData)
                    }
                    catch(e){
                        
                    }
                },
                deleteList: async(value) =>{
                    try {
                      const data = [...listing]
                      const filteredArray = data.filter(item=>item.id!==value.id)
                      setListing(filteredArray)
                     
                    }
                    catch(e) {
                        console.log(e)
                    }
                }

            }}
        >

            {children}

        </ListContext.Provider>
    )
}