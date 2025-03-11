import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux"; // Redux hook for accessing state
import { toast } from "react-hot-toast"

const AccountPage = () => {
    // assuming max is going to set up the correct dispatch calls in loginForm.jsx
    const { user } = useSelector((state) => state.auth)

    // declare states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profession, setProfession] = useState('');
    const [company, setCompany] = useState('');

    // set states according to data from store.
    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        // Optional fields are set with fallbacks
        setPhoneNumber(user.phoneNumber || "");
        setCompany(user.company || ""); 
        setProfession(user.profession || ""); 
        setCompany(user.company || "");
    }, [user]);
    
    /*
    - using dipatch() call to store in loginForm.jsx
    - using localstorage to hold temporary user and password (WILL NEED TO BE CHANGED TO DATABASE)
    - altered Navigation.jsx to correctly display and account button or login button based on user data in the store
    - implemented protected route based on a loaded state and user presence
    */
   
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
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
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                type="text"
                id="profession"
                name="profession"
                placeholder="Profession"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          {/* right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Phone Number
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Company
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                id="company"
                name="company"
                placeholder="Company"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            onClick={() => toast.success('Changes saved!')}
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
