import { useFormStatus } from "react-dom"
import { FaPaperPlane } from "react-icons/fa"
 const SubmittMessageButton = () => {
    const {pending} =useFormStatus();
  return (
    <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="submit"
        >
          <FaPaperPlane className="mr-2"/> {pending ? 'Sending...': 'Send Message'}
        </button>
  )
}

export default SubmittMessageButton