export default function authService(service) {
    
  
    const verify = (token) => service.verify(token);
  

  
    return {
     
      verify,
   
    };
  }