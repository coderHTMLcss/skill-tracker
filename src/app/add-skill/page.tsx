'use client';

import { rqClient } from '@/shared/api/instance';
import React from 'react'

const NewSkillPage = () => {
    const skills = rqClient.useQuery('get', '/skills');
    console.log(skills.data)
    return (
        <div>
            Add a new skill here
        </div>
    )
}

export default NewSkillPage;
