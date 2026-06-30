"use client";

import { useFormState, useFormStatus } from "react-dom";

export default function FormSumbit() {
    const status = useFormStatus();
    if(status.pending) {
        return <p>Creating Post</p>;
    } 

    return (
            <>
            <button
                type="reset"
                className="rounded-lg border border-primary-dark px-6 py-3 font-medium text-text transition hover:bg-primary-dark"
                >
                Reset
                </button>

                <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 font-medium text-background transition hover:bg-primary-dark hover:text-text"
                >
                Create Post
                </button>
            </>
        )
    
}