'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// * hooks
import { useHtmlContext } from '@/context/HtmlContextProvider';
import { useParams } from 'next/navigation';
const SubmitButton = () => {
  const [similarityPercent, setSimilarityPercent] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const { html } = useHtmlContext();
  const params = useParams();
  const { id } = params;

  const clickHandler = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/challenge?id=${id}`, {
        method: 'POST',
        body: JSON.stringify({ html }),
      });

      const { data } = await res.json();
      setSimilarityPercent(data.similarity);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <button
        type='button'
        disabled={loading}
        onClick={clickHandler}
        className='w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-600/50 rounded-md p-2 mt-10'
      >
        Submit
      </button>
      </DialogTrigger>
      {
        similarityPercent && <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className='text-xl text-orange-500 font-bold'>Congrats !!!</div>
          </DialogTitle>
          <DialogDescription>
            <p className='mt-3'>
              You finished the challenge with
              <span className='text-orange-500 font-bold mx-1'>{similarityPercent}%</span>
              similarity. 😊
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      }
    </Dialog>

    
  );
};

export default SubmitButton;
