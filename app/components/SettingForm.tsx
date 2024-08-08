'use client';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect } from 'react';
import SubmitButton from './SubmitButton';
import { State, UpdateUserSettings } from '../actions';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

interface SettingFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

function SettingForm({ firstName, lastName, email }: SettingFormProps) {
  const initialState: State = { message: '', status: undefined };
  const [state, formAction] = useFormState(UpdateUserSettings, initialState);
  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
    } else if (state?.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          ad earum quam natus sed at neque vero eveniet nemo quos deleniti aut
          praesentium magni fugiat iure rem quas molestias. Doloremque!
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-5'>
        <div>
          <Label>FirstName</Label>
          <Input name='firstName' type='text' defaultValue={firstName}></Input>
        </div>
        <div>
          <Label>LastName</Label>
          <Input name='lastName' type='text' defaultValue={lastName}></Input>
        </div>{' '}
        <div>
          <Label>Email</Label>
          <Input
            name='emaiil'
            type='email'
            disabled
            defaultValue={email}
          ></Input>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center items-center'>
        <SubmitButton title='Update your settings' />
      </CardFooter>
    </form>
  );
}

export default SettingForm;
