import axios from "axios";

export const createAccount = async (data) => {
  const baseUrl = "https://staging.rxtro.com/api/jsonws/ws.rxtrouser/create-user";

  try {
    // Construct query parameters using URLSearchParams
    const params = new URLSearchParams({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobilePhone: data.mobilePhone,
    });

    // Make the PUT request
    const response = await axios.put(`${baseUrl}?${params.toString()}`);
    
    return  response.status; 
  } catch (error) {
    console.error("Error creating account:", error); 
  }
};
