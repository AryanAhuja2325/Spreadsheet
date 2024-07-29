import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <div className='flex flex-col items-center h-screen w-screen px-10 home'>
            <div className='py-6 pr-10 pl-20 rounded-lg w-screen mt-5 bg-transparent'>
                <h2 className='text-5xl font-semibold text-gray-700'>
                    Welcome, {user ? user.name : 'Guest'}!
                </h2>
            </div>
            <div className='py-6 pr-10 pl-20 rounded-lg w-screen mt-7 bg-transparent'>
                <div className='text-black text-l text-justify'>
                    <p>A web-based Excel application brings the power and functionality of traditional spreadsheet software to the convenience of a web browser. It allows users to create, edit, and manage spreadsheets online, making it possible to work from anywhere with an internet connection. Key features include real-time collaboration, where multiple users can work on the same spreadsheet simultaneously, with changes updated instantly. This capability is particularly beneficial for teams and organizations, as it enhances productivity and ensures everyone is working with the most up-to-date information.</p>
                    <p>In addition to collaboration, web-based Excel applications leverage cloud storage, ensuring that all spreadsheets are stored securely online. This means users can access their documents from any device, whether it's a desktop, laptop, tablet, or smartphone. The integration with cloud services also simplifies sharing and version control, as users can easily share links to their spreadsheets and track changes over time. Furthermore, many web-based Excel applications offer advanced features such as data analysis tools, charting, and compatibility with various file formats, making them a versatile tool for both personal and professional use.</p>
                </div>
            </div>
            <div className='flex flex-col items-center px-10 rounded-lg w-full mt-10 space-y-5 pb-10'>
                <div className='self-start flex flex-row space-x-5 bg-white p-10 rounded-lg w-1/2'>
                    <div className='bg-black flex-shrink-0'>
                        <img className='w-32 h-32 object-cover' src='https://via.placeholder.com/150' alt='Box 1' />
                    </div>
                    <div className='bg-gray-200 p-4 w-full rounded-lg overflow-hidden'>
                        <p className='text-black text-l overflow-hidden'>Excel sheets are essential tools for organizing and analyzing data efficiently. They utilize a tabular format that enables users to input, manipulate, and interpret data through rows and columns. Excel offers a comprehensive suite of features including basic data entry, formatting options, and a wide range of built-in formulas and functions for calculations and data manipulation. Users can visualize trends and comparisons using graphs and charts, perform advanced data analysis with tools like pivot tables and conditional formatting, and collaborate in real-time through cloud-based services. Excel supports data import and export from various sources, ensures data integrity with validation features, and allows for automation through macros and VBA. These capabilities make Excel indispensable across industries for tasks ranging from financial analysis and project management to inventory tracking and reporting.</p>
                    </div>
                </div>
                <div className='self-end flex flex-row space-x-5 bg-white p-10 rounded-lg w-1/2'>
                    <div className='bg-black flex-shrink-0'>
                        <img className='w-32 h-32 object-cover' src='https://via.placeholder.com/150' alt='Box 1' />
                    </div>
                    <div className='bg-gray-200 p-4 w-full rounded-lg overflow-hidden'>
                        <p className='text-black text-l overflow-hidden'>Excel sheets are essential tools for organizing and analyzing data efficiently. They utilize a tabular format that enables users to input, manipulate, and interpret data through rows and columns. Excel offers a comprehensive suite of features including basic data entry, formatting options, and a wide range of built-in formulas and functions for calculations and data manipulation. Users can visualize trends and comparisons using graphs and charts, perform advanced data analysis with tools like pivot tables and conditional formatting, and collaborate in real-time through cloud-based services. Excel supports data import and export from various sources, ensures data integrity with validation features, and allows for automation through macros and VBA. These capabilities make Excel indispensable across industries for tasks ranging from financial analysis and project management to inventory tracking and reporting.</p>
                    </div>
                </div>
                <div className='self-start flex flex-row space-x-5 bg-white p-10 rounded-lg w-1/2'>
                    <div className='bg-black flex-shrink-0'>
                        <img className='w-32 h-32 object-cover' src='https://via.placeholder.com/150' alt='Box 1' />
                    </div>
                    <div className='bg-gray-200 p-4 w-full rounded-lg overflow-hidden'>
                        <p className='text-black text-l overflow-hidden'>Excel sheets are essential tools for organizing and analyzing data efficiently. They utilize a tabular format that enables users to input, manipulate, and interpret data through rows and columns. Excel offers a comprehensive suite of features including basic data entry, formatting options, and a wide range of built-in formulas and functions for calculations and data manipulation. Users can visualize trends and comparisons using graphs and charts, perform advanced data analysis with tools like pivot tables and conditional formatting, and collaborate in real-time through cloud-based services. Excel supports data import and export from various sources, ensures data integrity with validation features, and allows for automation through macros and VBA. These capabilities make Excel indispensable across industries for tasks ranging from financial analysis and project management to inventory tracking and reporting.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
