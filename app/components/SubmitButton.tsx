'use client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <Button disabled>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Submitting...
        </Button>
      ) : (
        <Button className='' type='submit'>
          {title}
        </Button>
      )}
    </div>
  );
}

export default SubmitButton;
