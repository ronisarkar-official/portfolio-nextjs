'use client';

import { useRef, useState } from 'react';
import { Button } from './ui/Button';
import { saveGuestbookEntry } from '@/app/guestbook/actions';
import { toast } from 'sonner';

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await saveGuestbookEntry(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Thanks for signing the guestbook!');
        formRef.current?.reset();
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border p-4 bg-card"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your name"
          className="rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Your message..."
          rows={3}
          className="rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-fit">
        {isSubmitting ? 'Signing...' : 'Sign Guestbook'}
      </Button>
    </form>
  );
}
