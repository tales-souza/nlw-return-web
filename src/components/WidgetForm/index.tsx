import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/Figmoji/bug.svg'
import ideaImageUrl from '../../assets/Figmoji/idea.svg'
import thoughtImageUrl from '../../assets/Figmoji/thought.svg'
import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de un inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão pensando'
        }
    }
}


export type FeedbackType = keyof typeof feedbackTypes;

// Object.entries(feedbackTypes) => 

/*
    ['BUG', {...}]
    ['IDEA', {...}],
    ['THOUGHT', {...}]
*/


export function WidgetForm() {

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleFeedbackRestartRequested() {
        setFeedbackType(null)
        setFeedbackSent(false)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center w-[calc(100vw-2rem)] shadow-lg md:w-auto">


            {!feedbackType ? (
                <header>
                    <span className="text-xl leading-6"  >Deixe seu feedback</span>
                </header>
            ) : null}

            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleFeedbackRestartRequested} />
            ) : (
                <>

                    {!feedbackType ? (<div className="flex py-8 gap-2 w-full" >
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    </div>) : < FeedbackContentStep feedbackType={feedbackType} onFeedbackRestartRequested={handleFeedbackRestartRequested} onFeedbackSent={() => setFeedbackSent(true)} />}
                </>
            )}


            <footer className="text-xs text-neutral-400" >
                Feito com ♥ pela <a target="_blank" className="underline underline-offset-2" href="https://rocketseat.com.br"> Rocketseat </a>
            </footer>

        </div>
    )
}