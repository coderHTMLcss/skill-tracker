import React from 'react'

const CurrentSkill = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return (
        <div>
            {`Current Skill: ${id}`}
            <p>This is the details page for skill with ID: {id}</p>
        </div>
    )
}

export default CurrentSkill;
