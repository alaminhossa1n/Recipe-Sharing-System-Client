
const DevInfo = () => {
    return (
        <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
            Developer Information
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div className="mb-8 md:mb-0 md:w-1/3">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h3>
              <p className="text-gray-600">Name: John Doe</p>
              <p className="text-gray-600">Email: john.doe@example.com</p>
              <p className="text-gray-600">Location: New York, USA</p>
            </div>
            <div className="mb-8 md:mb-0 md:w-1/3">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Educational Background</h3>
              <p className="text-gray-600">B.S. in Computer Science, XYZ University</p>
              <p className="text-gray-600">M.S. in Software Engineering, ABC Institute</p>
            </div>
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Experience</h3>
              <p className="text-gray-600">Software Developer at Company A (2018 - Present)</p>
              <p className="text-gray-600">Frontend Developer at Company B (2015 - 2018)</p>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">Technologies</h3>
              <p className="text-gray-600">JavaScript, React, Node.js, Python, Django, Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
  
    );
};

export default DevInfo;