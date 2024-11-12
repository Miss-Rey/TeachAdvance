import React from 'react'
import { Popover } from 'flowbite-react'

const CoursePopover = () => {
    return (
        <div>
            <Popover
                aria-labelledby="profile-popover"
                content={
                    <div>
                        <ul>
                            <li>Manage Class</li>
                            <li>Manage Students</li>
                        </ul>
                    </div>
                }>
            </Popover>
        </div>
    )
}

export default CoursePopover