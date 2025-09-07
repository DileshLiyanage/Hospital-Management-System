import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadNoticeImage from '../helpers/uploadNoticeImage';
import DisplayImage from './DisplayImage';
import { MdOutlineDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const EditNotice = ({
    onClose,
    noticeData,
    fetchdata,
}) => {
    const[data,setData] = useState({
        ...noticeData,
        topic : noticeData?.topic,
        noticeImage : noticeData?.noticeImage || [],
        description : noticeData?.description,

    })
    console.log("notice data",noticeData)
    
    const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
    const [fullScreenImage,setFullScreenImage] = useState("")


    const handleOnChange = (e) =>{
        const {name,value} = e.target
        
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
           })
        
    }

    const handleUploadNotice = async(e) => {
        const file = e.target.files[0]
       const uploadImageCloudinary = await uploadNoticeImage(file)

       setData((preve)=>{
        return{
            ...preve,
            noticeImage : [ ...preve.noticeImage,uploadImageCloudinary.url]
        }
       })

       console.log("upload Image",uploadImageCloudinary.url)

    }

    const handleDeleteNoticeImage = async(index)=>{
        console.log("image index",index)

        const newNoticeImage = [...data.noticeImage]
        newNoticeImage.splice(index,1)

        setData((preve)=>{
            return{
                ...preve,
                noticeImage : [...newNoticeImage]
            }
           })

    }

    {/* upload notice */}
    const handleSubmit = async(e) => {
      e.preventDefault()


      const response = await fetch(SummaryApi.updateNotice.url,{
        method : SummaryApi.updateNotice.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const responseData = await response.json()

      if (response.ok && responseData.success) { 
        toast.success(responseData?.message || "Notice Created Successfully!");
        onClose();  
        fetchdata()
    } else {
        toast.error(responseData?.message || "Error creating notice");
    }

    }


  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-60 bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded-xl w-full max-w-2xl max-h-[80%]'>
            <div className='flex justify-between items-center font-bold'>
                <h2>Edit General Notice</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-800 cursor-pointer' onClick={onClose}>
                    <IoClose/>
                </div>
            </div>


            <form className='grid p-6 gap-2 h-full pb-5' onSubmit={handleSubmit}>

                <label htmlFor='topic'>Topic :</label>
                <input 
                    type='text' 
                    placeholder='Enter Topic' 
                    name='topic'
                    value={data.topic} 
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                />

                <label htmlFor='description'>Description :</label>
                <textarea 
                    type='text' 
                    placeholder='Enter Description' 
                    name='description'
                    value={data.description} 
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded resize-none'
                    rows={4}
                    required
                />

                <label htmlFor='noticeImage'>Images :</label>
                <label htmlFor='uploadimageInput'>
                <div className='p-20 bg-slate-100 border rounded h-30 w-full cursor-pointer'>
                        <div className='text-slate-500 text-xl flex justify-center items-center flex-col gap-2'>
                            <FaCloudUploadAlt/>
                            <p className='text-sm'>Upload Images</p>
                            <input type='file' id='uploadimageInput' className='hidden' onChange={handleUploadNotice}></input>
                        </div>
                </div>
                </label>
                <div>
                    {
                        data?.noticeImage[0]?(
                          <div className='flex items-center gap-2'>
                            {
                                data.noticeImage.map((el,index)=>{
                                    return(
                                        <div className='relative group' key={el+index}>
                                            <img 
                                                src={el} 
                                                alt={el} 
                                                width={100} 
                                                height={100} 
                                                className='bg-slate-100 border cursor-pointer' 
                                                onClick={() => {
                                                    setOpenFullScreenImage(true);
                                                    setFullScreenImage(el);
                                                }} 
                                            />
                                            <div 
                                                className='absolute bottom-0 right-0 p-1 m-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' 
                                                onClick={() => handleDeleteNoticeImage(index)}
                                                >
                                                <MdOutlineDelete/>
                                            </div>

                                        </div>
                                    )
                                    })
                            }
                          </div>
                        ) : (
                            <p className='text-blue-500 text-xs'>*Please upload Image</p>
                        )
                    }
                    
                </div>

                <button className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full' >Update Notice</button>
                
            </form>
           
        </div>


        {/* Display Image FullScreen */}
        {
            openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
        }
        
    </div>
  )
}

export default EditNotice
