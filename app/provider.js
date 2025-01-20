'use client';
import React, { useEffect } from 'react';
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

function provider({ children }) {
    const { user } = useUser();

    useEffect(() => {
        user && isNewUSer();
    }, [user]);

    const isNewUSer = async () => {
        const res = await db.select().from(Users)
            .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

        console.log(res);
        if (!res[0]) {
            await db.insert(Users).values({
                name: user.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                imageUrl: user?.imageUrl
            })
        }
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default provider;
