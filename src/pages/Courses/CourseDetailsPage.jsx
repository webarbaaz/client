import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../../api';
import ReactPlayer from 'react-player';
import { GlobalContext } from '../../context/globalContext';
const CourseDetailsPage = () => {
    const { id } = useParams();
    const { course, setCourse } = useContext(GlobalContext)
    const [toggle, setToggle] = useState(true)
    const [playLesson, setPlayLesson] = useState({})

    // fetch course details based on its ID
    const fetchCourse = useCallback(async (courseId) => {
        try {
            const response = await fetchCourseById(courseId);
            if (response.status === 200) {
                setCourse(response.data.course);
            }
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }, [setCourse]);

    // Fetch course details when the component mounts or when the ID changes
    useEffect(() => {
        fetchCourse(id);
    }, [fetchCourse, id]);

    const playLessonFunction = (id) => {
        const index = course.lessons.findIndex(item => item._id === id)
        const lesson = course.lessons[index]
        setPlayLesson(lesson)
        setToggle(false)
    }

    return (
        <div>
            <div className='main-course-page grid grid-cols-12'>
                <div className='col-span-9'>
                    {toggle ?
                        <div className='preview px-10'>
                            <div className='image-container'>
                                <img className='w-full my-10' src={course?.featureImage} alt='feature' />
                            </div>
                            <h2 className='text-4xl font-extrabold capitalize mb-10'>{course?.title}</h2>
                            <div className='text-xl text-slate-500 mb-5' dangerouslySetInnerHTML={{ __html: course?.description }}>
                            </div>
                        </div> :
                        <div className='course-lessons p-3'>
                            <ReactPlayer
                                url={playLesson?.videoLink}
                                controls={true}
                                width="100%"
                                height="500px"
                            />
                            <div className='px-5'>
                                <h2 className='text-4xl font-extrabold capitalize my-10'>{playLesson?.title}</h2>
                                <div className='text-xl text-slate-500' dangerouslySetInnerHTML={{ __html: playLesson?.description }}>

                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='col-span-3'>
                    <div className='sideBar p-0 border-l-2 sticky top-0 h-screen'>
                        <ul className=''>
                            <li className='mb-2 transition-all capitalize hover:bg-gray-100 cursor-pointer p-3' onClick={() => setToggle(true)}>Introduction</li>
                            {course?.lessons?.map(lesson => <li key={lesson._id} onClick={() => playLessonFunction(lesson._id)} className='mb-2 transition-all capitalize hover:bg-gray-100 cursor-pointer p-3'>{lesson.title}</li>)}

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CourseDetailsPage
