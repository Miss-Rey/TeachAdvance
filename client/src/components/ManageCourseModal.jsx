import React, { useState, useEffect } from 'react'
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from 'axios'

const ManageCourseModal = ({ manageClass, setManageClassModal, classes }) => {
  const classCode = classes.map((code) => code.classCode)
  const classId = classes.map((id) => id._id)
  const [Class, setClass] = useState([])
  const [edit, setEdit] = useState(false)
  const [classcode, setClassCode] = useState('')
  const [className, setClassName] = useState('')
  const [endDate, setEndDate] = useState('')
  const endpoint = import.meta.env.VITE_ENDPOINT
  // const endpoint = 'https://teachadvance.onrender.com'




  useEffect(() => {
    const getClassDetails = async () => {
      try {
        const response = await axios.get(`${endpoint}/api/getclassdetails?classCode=${classCode}`)
        const data = response.data
        setClass(data)
        console.log(data)

      } catch (error) {
        console.error(error)
      }
    }

    getClassDetails()
  }, [])


    const editClass = () => {
      const response = axios.put(`${endpoint}/api/editclassdetails?classId=${classId}`, { classcode, className, endDate})

      if(response.ok){
        console.log("Class updated successfully")
        alert('Changing the class Code will automatically unenroll all students.')
      }
    }


  return (
    <div>
      {!edit ? (
        <Modal show={manageClass} size="md" popup onClose={() => setManageClassModal(false)}>
          <Modal.Header />
          <Modal.Body>
            {Class && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Class Details</h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="classcode" value="classcode" />
                  </div>
                  <TextInput id="text" value={Class.classCode} readOnly />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="calssname" value="classname" />
                  </div>
                  <TextInput id="classname" value={Class.className} readOnly />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="endDate" value="enddate" />
                  </div>
                  <TextInput id="endDate" value={Class.endDate} readOnly />
                </div>
                <div className="w-full">
                  <Button onClick={() => setEdit(true)}>Edit</Button>
                </div>

              </div>
            )}

          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={manageClass} size="md" popup onClose={() => {setManageClassModal(false), setEdit(false)}}>
          <Modal.Header />
          <Modal.Body>
            {Class && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Details</h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="classcode" value="classcode" />
                  </div>
                  <TextInput id="text" value={classCode} onChange={(e) => setClassCode(e.target.value)} />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="calssname" value="classname" />
                  </div>
                  <TextInput id="classname" value={className} onChange={(e) => setClassName(e.target.value)} />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="endDate" value="enddate" />
                  </div>
                  <TextInput id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="w-full">
                  <Button onClick={editClass}>Edit</Button>
                </div>

              </div>
            )}

          </Modal.Body>
        </Modal>
      )}

    </div>
  )
}

export default ManageCourseModal