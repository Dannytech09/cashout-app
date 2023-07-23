import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';


const UseTokenExpiration = () => {
    const router = useRouter();
  
    useEffect(() => {
      const token = sessionStorage.getItem('token');
  
      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          const expirationDate = new Date(decodedToken.exp * 1000);
  
          if (expirationDate < new Date()) {
            // Token has expired, redirect to login page
            router.push('/login');
          }
        } catch (error) {
          console.error('Failed to decode token:', error);
          // Token is invalid, redirect to login page
          router.push('/login');
        }
      } else {
        // Token is missing, redirect to login page
        router.push('/login');
      }
    }, [router]);
  };
  
  export default UseTokenExpiration;