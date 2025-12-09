import React from "react";

export default function About() {
  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

        <p className="text-lg leading-relaxed mb-4">
          Welcome to our application! We are dedicated to providing the best
          user experience with smooth UI, fast performance, and modern features.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Our aim is to simplify your tasks and provide a seamless workflow
          through intuitive design and efficient functionality.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p className="text-lg leading-relaxed mb-4">
          To build high‑quality, user‑friendly digital solutions that enhance
          productivity and improve everyday tasks.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Clean and modern user interface</li>
          <li>Fast and optimized performance</li>
          <li>Reliable backend and secure data handling</li>
          <li>Continuous updates and improvements</li>
        </ul>
      </div>
    </div>
   
  );
}





