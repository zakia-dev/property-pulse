'use client'
import { useEffect } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "react-toastify"
import addMessage from "@/app/actions/addMessage"
import { useSession } from "next-auth/react";
import SubmittMessageButton from "./submittMessageButton"
const PropertyContactForm = ({property}) => {
  const {data:session}=useSession();
  const [state, formAction] = useActionState(addMessage,{});

  useEffect(()=>{
    if(state.error) toast.error(state.error);
    if(state.success) toast.success('Message Sent Successfully');

  },[state])

  if(state.submitted){
    return(
      <p className="text-green-500 mb-4">
        Your Message has been Sent 
      </p>
    )
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
    <form action={formAction}>
      <input
      type="hidden"
      id="property"
      name="property"
      defaultValue={property._id}

      />
       <input
      type="hidden"
      id="recipient"
      name="recipient"
      defaultValue={property.owner}

      />
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Phone:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          name="phone"
          type="text"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="body"
        >
          Message:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
          id="body"
          name="body"
          placeholder="Enter your message"
        ></textarea>
      </div>
      <div>
        <SubmittMessageButton />
      </div>
    </form>
  </div>
  )
}

export default PropertyContactForm