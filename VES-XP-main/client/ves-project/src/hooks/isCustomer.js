import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';

export const IsCustomerData = async () => {
    const [customer, setCustomer] = useState([]);
    
    const userID = window.localStorage.getItem("userID")
    const projectID = window.localStorage.getItem("ProjectID")
    // const [loading, setLoading] = useState(true);
    // const { id } = useParams();


    useEffect(()=>{
        const fetch = async () => {
        try{
            const customersResponse = await fetch(`http://localhost:5000/isCustomer`);
    
            if (!customersResponse.ok) {
              throw new Error(`Error fetching customer `);
            }
            
            const customers = await customersResponse.json();
            setCustomer(customers);
            // setLoading(false); // Set loading to false after data is fetched

            } catch (y){
              console.log(y)
            }
        }
        // if (loading) {
        //     fetch();
        // }
        fetch();
    },[])

const theOne = customer.filter((c) => {
    return c.idProject === projectID && c.idMember === userID
})
  
    // console.log(theOne[0].isCustomer)
    // console.log(customers)

return theOne
}