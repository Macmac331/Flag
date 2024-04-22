import React, { useEffect, useState } from "react";

const FlagForm = () => {
    const [countryName, setCountryName] = useState('');
    const [countryFlag, setCountryFlag] = useState('');
    const [userGuess, setUserGuess] = useState('');
    const [isCorrect, setIsCorrect] = useState(null); // Initialize with null

    useEffect(() => {
        fetchRandomCountry();
    }, []);

    const fetchRandomCountry = () => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomCountry = data[randomIndex];
                const name = randomCountry.name.common;
                const flag = randomCountry.flags.png;
                console.log(name);
                setCountryName(name);
                setCountryFlag(flag);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleGuess = () => {
        if (!userGuess) {
            window.alert("Please enter your guess!");
            return;
        }
        if (userGuess.toLowerCase() === countryName.toLowerCase()) {
            setIsCorrect(true);
            setUserGuess('');
        } else {
            setIsCorrect(false);
        }
    }

    const handleNext = () => {
        fetchRandomCountry(); 
        setIsCorrect(null);
        setUserGuess('');
    }

    return (
        <div className="h-[72vh] w-[30vw] bg-blue-100 rounded-md">
            <div className="p-4">
                <h1 className="text-center font-sans text-3xl font-bold mb-4">
                    Guess the Flag
                </h1>
                <div>
                    {countryName && countryFlag && (
                        <img className="w-full h-52" src={countryFlag} alt="Country Flag" />
                    )}
                    <input
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        type="text"
                        required
                        className="border-2 rounded-md text-2xl p-4 w-full mt-5 h-12"
                    />
                    <button
                        onClick={handleGuess}
                        className="w-full bg-blue-400 mt-5 h-12 rounded-md text-xl font-bold hover:bg-blue-800 hover:text-white"
                    >
                        Submit
                    </button>
                    {isCorrect !== null && (
                        <p className="mt-3 text-center font-bold text-lg">
                            {isCorrect ? "Correct!" : "Incorrect. Try again!"}
                        </p>
                    )}
                    <button
                        onClick={handleNext}
                        className="w-full bg-green-400 mt-5 h-12 rounded-md text-xl font-bold hover:bg-green-800 hover:text-white"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlagForm;
