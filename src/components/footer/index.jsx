import React from 'react'

const Footer = () => {
  return (
    <div>
<footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between">
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 class="text-xl font-bold mb-4">About Us</h2>
          <p class="text-gray-400">
            We are a team of passionate individuals dedicated to providing the best service. Our goal is to meet your needs with excellence.
          </p>
        </div>
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 class="text-xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li><a href="#" class="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">About</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div class="w-full md:w-1/3">
          <h2 class="text-xl font-bold mb-4">Contact Us</h2>
          <p class="text-gray-400">1234 Street Name, City, State, 12345</p>
          <p class="text-gray-400">Email: info@example.com</p>
          <p class="text-gray-400">Phone: (123) 456-7890</p>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-700 pt-6 text-center">
        <p class="text-gray-500">&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer
