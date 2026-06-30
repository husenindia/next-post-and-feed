"use client";
import { useActionState } from "react";
import FormSumbit from "@/components/form-submit";
import { createPostAction } from "@/actions/posts-action";

export default function NewPostPage() {    
  const [state, updatedformAction] = useActionState(createPostAction, {validationErrors: []});
    return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-xl bg-surface p-8 shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-primary">
          Create New Post
        </h1>
        <form className="space-y-6" action={updatedformAction}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-text"
            >
              Title
            </label>

            <input
              required
              id="title"
              name="title"
              type="text"
              placeholder="Enter post title"
              className="w-full rounded-lg border border-primary-dark bg-background px-4 py-3 text-text outline-none transition focus:border-primary"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-text"
            >
              Image URL
            </label>

            <input
              id="image"
              name="image"
              type="file"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-primary-dark bg-background px-4 py-3 text-text outline-none transition focus:border-primary"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-text"
            >
              Content
            </label>

            <textarea
              required
              id="content"
              name="content"
              rows={8}
              placeholder="Write your post..."
              className="w-full resize-none rounded-lg border border-primary-dark bg-background px-4 py-3 text-text outline-none transition focus:border-primary"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <FormSumbit></FormSumbit>
          </div>
          {
            state.validationErrors && 
            <ul>
                {
                    state.validationErrors.map(error => <li key={error}>{error}</li>)
                }
            </ul> 
          }
        </form>
        
      </div>
    </section>
  );
}