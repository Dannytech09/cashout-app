import React, { useState, useEffect } from "react";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import { useRouter } from "next/router";
import { authGuard } from "@/Utils/authGuard";
import {
  accessHandler,
  generateKeyHandler,
  plansHandler,
} from "@/pages/api/user/developer";
import Developer from "./userJsx/Developer";

function DeveloperComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [data, setData] = useState();
  const [dataComponent, setDataComponent] = useState([]);
  const [accessData, setAccessData] = useState({
    liveUrl: "",
    devUrl: "",
    products: [],
    referral: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [openComponent, setOpenComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(null);

  const [copied, setCopied] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  // Handle row click to toggle visibility
  const handleRowClick = (componentID) => {
    setOpenComponent((prev) => (prev === componentID ? null : componentID));
  };

  useEffect(() => {
    setMessage(null);
    const fetchData = async () => {
      try {
        const response = await plansHandler(ctx);
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired." ||
          response.error === "Forbidden!"
        ) {
          sessionStorage.clear();
          aExpireSessionAndRedirect(ctx, router);
        } else if (response.error) {
          setMessage(response.error);
        } else {
          setMessage(response.message);
          setDataComponent(response.data || []);
          // setDataComponent(response[0] || []);       test
        }
      } catch (error) {
        // console.log("errore", error);
        throw new Error(`An error occurred`);
      }
    };

    fetchData();
  }, [ctx, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await generateKeyHandler();
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired." ||
          response.error === "Oops! Bad Request !"
        ) {
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          setError(response.error);
        } else {
          setData(response.data);
        }
      } catch (error) {
        if (error) {
          throw new Error("An error occcurred");
        } else {
          throw new Error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const handleAccess = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await accessHandler(ctx, accessData);
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired." ||
        response.error === "Oops! Bad Request !"
      ) {
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (response.error) {
        setError(response.error);
        setMessage(null);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAccessData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevData.products, value] // Add selected checkbox
            : prevData.products.filter((item) => item !== value) // Remove unselected checkbox
          : value,
    }));
  };

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div>
      <Developer
      copied={copied}
      loading={loading}
      error={error} 
      handleSubmit={handleSubmit}
      data={data}
      handleCopy={handleCopy}
      dataComponent={dataComponent}
      handleRowClick={handleRowClick}
      openComponent={openComponent}
      message={message}
      accessData={accessData}
      handleInputChange={handleInputChange}
      handleAccess={handleAccess}
      />
    </div>
  );
}

export default DeveloperComp;
