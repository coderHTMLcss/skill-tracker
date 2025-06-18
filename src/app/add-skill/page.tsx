'use client';

import { rqClient } from '@/shared/api/instance';
import Link from 'next/link';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';



const NewSkillPage = () => {
    const queryClient = useQueryClient();

    const skillsQuery = rqClient.useQuery('get', '/skills');

    const deleteSkillMutation = rqClient.useMutation(
        "delete",
        "/skills/{skillId}",
        {
            onSettled: async () => {
                await queryClient.invalidateQueries(
                    rqClient.queryOptions("get", "/skills")
                ); ````
            },
        }
    );

    const createSkillMutation = rqClient.useMutation("post", "/skills", {
        onSettled: async () => {
            await queryClient.invalidateQueries(
                rqClient.queryOptions("get", "/skills")
            );
        },
    });

    return (
        <div>
            <h1>Skill List</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement)
                    createSkillMutation.mutate({
                        body: { name: formData.get('name') as string }
                    })
                }}
            >
                <input name="name" />
                <button type='submit' disabled={createSkillMutation.isPending}>
                    Create Skill
                </button>
            </form>

            {skillsQuery.data?.map((skill) => (
                <div key={skill.id}>
                    <Link href={`/skills/${skill.id}`}>
                        {skill.name}
                    </Link>
                    <button
                        disabled={deleteSkillMutation.isPending}
                        onClick={() => {
                            deleteSkillMutation.mutate({
                                params: { path: { skillId: skill.id } }
                            })
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default NewSkillPage;
