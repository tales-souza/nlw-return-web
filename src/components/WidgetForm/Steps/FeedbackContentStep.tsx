import { CloseButton } from '../../CloseButton';
import { ArrowLeft, Camera } from 'phosphor-react'
import { FeedbackType, feedbackTypes } from '..'
import { SreenshotButton } from '../ScreenshotButton'
import { FormEvent, useState } from 'react';
import { api } from '../../../lib/api';
import { Loading } from '../Loading';


interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}


export function FeedbackContentStep({ onFeedbackSent, feedbackType, onFeedbackRestartRequested }: FeedbackContentStepProps) {

  const [screenshotTook, setScreenshotTook] = useState<string | null>(null)
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsDendingFeedback] = useState(false);


  function handleScreenshotTook(screenshot: string | null) {
    setScreenshotTook(screenshot)
  }

  async function handleSubmitFeedbach(event: FormEvent) {

    event.preventDefault();

    setIsDendingFeedback(true);

    await api.post('/feedback', {
      type: feedbackType,
      comment,
      screenshot: screenshotTook
    });

    setIsDendingFeedback(false);


    onFeedbackSent()

  }

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  return (

    <>
      <header>

        <button onClick={onFeedbackRestartRequested} type="button" className="top 5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          < ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2" >

          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />

      </header>


      <form onSubmit={handleSubmitFeedbach} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-500 scrollbar-track-transparent scrollbar-thin"
          onChange={(event => setComment(event.target.value))}
          placeholder="Conte com detalhes o que está acontecendo"
        />


        <footer className="flex gap-2 mt-2  ">

          <SreenshotButton screenshot={screenshotTook} onScreenshotTook={handleScreenshotTook} />

          <button
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment.length === 0 || isSendingFeedback }
            type="submit"
          >

            {isSendingFeedback ? <Loading/> : 'Enviar Feedback'}
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  )
}