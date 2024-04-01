import React from "react";
import { useFetch } from "../../../hooks";
import { Accordion } from "./Accordion";


export const Faq = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { data } = useFetch(`${BASE_URL}faqs`);

  return (
    <div className="container mx-auto dark:text-white mb-16" data-accordion="open">
    <h2 className='text-4xl font-medium mb-4 text-center sectionTitle'>FAQs</h2>
    { data && data.map(faq => <Accordion key={faq.id} faq={faq} />) }
    
  </div>

  )
}
