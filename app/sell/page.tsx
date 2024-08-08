'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import SelectCategory from '../components/SelectCategory';
import { Textarea } from '@/components/ui/textarea';
import { TipTapEditor } from '../components/Editor';
import { UploadDropzone } from '../lib/uploadthing';
import { Button } from '@/components/ui/button';
import { JSONContent } from '@tiptap/react';
import { useFormState } from 'react-dom';
import { SellProduct, State } from '../actions';
import { toast } from 'sonner';
import SubmitButton from '../components/SubmitButton';

function SellRoute() {
  const initialState: State = { message: '', status: undefined };
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [productFile, setProductFile] = useState<string | null>(null);
  const [state, formAction] = useFormState(SellProduct, initialState);
  console.log(state?.error);
  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
    } else if (state?.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <section className='max-w-7xl mx-auto px-4 md:px-8 mb-14'>
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product</CardTitle>
            <CardDescription>
              Please fill in the form below to sell your product
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-y-10'>
            <div className='gap-y-2 flex flex-col'>
              <Label>Name</Label>
              <Input
                required
                minLength={3}
                type='text'
                name='name'
                placeholder='Enter your product name'
              />
              {state?.error?.['name']?.[0] && (
                <p className='text-red-500'>{state.error.name[0]}</p>
              )}
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Category</Label>
              <SelectCategory />{' '}
              {state?.error?.['category']?.[0] && (
                <p className='text-destructive'>
                  {state?.error?.['category']?.[0]}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-y-2'>
              <Label>Price</Label>
              <Input
                required
                minLength={1}
                name='price'
                type='number'
                placeholder='Enter your product price'
              />{' '}
              {state?.error?.['price']?.[0] && (
                <p className='text-destructive'>
                  {state?.error?.['price']?.[0]}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Small Summary</Label>
              <Textarea
                required
                minLength={10}
                placeholder='Enter a small summary of your product'
                name='smallDescription'
              />{' '}
              {state?.error?.['smallDescription']?.[0] && (
                <p className='text-destructive'>
                  {state?.error?.['smallDescription']?.[0]}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-y-2'>
              <input
                type='hidden'
                name='description'
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.error?.['description']?.[0] && (
                <p className='text-destructive'>
                  {state?.error?.['description']?.[0]}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-y-2'>
              <input
                type='hidden'
                name='images'
                value={JSON.stringify(images)}
              />
              <Label>Upload Images</Label>
              <UploadDropzone
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success('Image uploaded successfully');
                }}
                onUploadError={(err: Error) => {
                  throw new Error(`Error uploading image: ${err}`);
                  toast.error('Error uploading image');
                }}
              />
              {state?.error?.['images']?.[0] && (
                <p className='text-destructive'>
                  {state?.error?.['images']?.[0]}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-y-2'>
              <input
                type='hidden'
                name='productFile'
                value={productFile ?? ''}
              />
              <Label>Upload Files</Label>
              <UploadDropzone
                endpoint='fileUploader'
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success('File uploaded successfully');
                }}
                onUploadError={(err: Error) => {
                  throw new Error(`Error uploading file: ${err}`);
                  toast.error('Error uploading file');
                }}
              />
              {state?.error?.['productFile']?.[0] && (
                <p className='text-destructive'>{state.error.productFile[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className='mt-3 flex justify-center'>
            <SubmitButton title='Create your product' />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default SellRoute;
