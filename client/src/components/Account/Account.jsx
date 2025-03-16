import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux"; 
import { toast } from "react-hot-toast";
import { login } from '../../store/slices/authSlice'

const AccountPage = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      profession: ""
    });

    // maybe i can set this up using localstorage instead so that it updates when values are changed.
    // set states according to data from store.
    useEffect(() => {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        profession: user.profession || "",
    });
    }, [user]);

    // uses all previous data and adjusts the given target value change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({...prevData, [name]: value}));
    }

    // put request to change data present in the database
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3000/api/account/${formData.email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }

        const updatedData = await response.json();

        console.log(updatedData.user);

        setFormData({
          firstName: updatedData.user.firstName || "",
          lastName: updatedData.user.lastName || "",
          email: updatedData.user.email || "",
          phoneNumber: updatedData.user.phoneNumber || "",
          profession: updatedData.user.profession || "",
        });
        
        // Merge the existing token into the updated user object.
        const updatedUserWithToken = {
          ...updatedData.user,
          token: user.token, // Preserve the current token from Redux state
        };

        // Dispatch the updated user with token to update Redux store.
        dispatch(login(updatedUserWithToken));
        toast.success("Changes saved!");
      } catch (error) {
        console.error(error);
        toast.error("Error saving changes. Please try again.");
      } 
    };
   
  return (
    <div className="min-h-screen bg-reviewColor flex items-center justify-center p-8">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Account Details</h2>
        <form className="grid grid-cols-2 gap-6">
          {/* left Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                First Name
              </label>
              <input
                defaultValue={formData.firstName}
                onChange={handleChange}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Last Name
              </label>
              <input
                defaultValue={formData.lastName}
                onChange={handleChange}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Email
              </label>
              <input
                defaultValue={formData.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          {/* right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Phone Number
              </label>
              <input
                defaultValue={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="profession"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Profession
              </label>
              <input
                defaultValue={formData.profession}
                onChange={handleChange}
                type="text"
                id="profession"
                name="profession"
                placeholder="Profession"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </form>
        {/* Submit Button */}
        <div className="flex items-center justify-center mt-6">
          <button
            style={{
              backgroundColor: 'var(--blueButtonColor)',
            }}
            className="w-full md:w-auto text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>

        {/* future trip planning data section */}

        <div className="mt-10 p-6 bg-passiveGreen rounded">
          <h3 className="text-xl font-semibold mb-2">Trip Planning Data</h3>
          <p className="text-gray-700">Trip planning data will appear here in the future</p>
          {/* I might map over the trips array and display that here.*/}
          {/* Itinerary might be able to go here instead of having its own page */}
          {/* Every user will have a unique itinerary so maybe use another protected route? */}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
