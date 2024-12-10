import React, { useState, useEffect } from 'react'
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from 'axios'

const ManageCourseModal = ({ editClass, setManageClassModal, classes }) => {
  const classCode = classes.map((code) => code.classCode)
  console.log({ 'classcode': classCode })
  const [Class, setClass] = useState([])
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
  },[])


  return (
    <div>
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
                <Button>Edit</Button>
              </div>

            </div>
          )}

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ManageCourseModal