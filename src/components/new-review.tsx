/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Check, X } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

const customStyles = {
  itemShapes: ThinRoundedStar,
  activeFillColor: '#8381D9',
  inactiveFillColor: '#181C2A',
  activeStrokeColor: '#8381D9', // Borda para estrelas inativas
  inactiveStrokeColor: '#8381D9', // Borda para estrelas inativas
  itemStrokeWidth: 2, // Largura da borda
}

const newReview = tv({
  slots: {
    base: 'w-full flex bg-gray-700 p-6 rounded-lg flex-col',
    header: 'flex justify-between w-full',
    avatar:
      'flex flex-col h-[41px] w-[41px] items-center justify-center rounded-full bg-black bg-gradient-to-t from-[#9694F5] from-0% to-[#7FD1CC] to-100%',
    boxTextArea:
      'mt-6 bg-gray-800 transition-colors duration-200 group rounded px-5 py-3 border border-solid border-gray-500 focus-within:border-green-200 focus:border-green-200',
    textArea:
      'bg-transparent placeholder:text-gray-400 text-gray-200 font-nunito font-normal text-sm leading-base w-full focus:outline-0 min-h-40',
  },
  variants: {
    animate: {
      true: 'animate-fade-down animate-once animate-ease-out',
      false:
        'animate-fade-up animate-once animate-ease-out animate-duration-500',
    },
  },
})

interface ErrorProps {
  response: {
    data: {
      message: string
    }
  }
}

const formNewReviewSchema = z.object({
  userId: z.string().min(1),
  bookId: z.string().min(1),
  description: z
    .string()
    .min(3, { message: 'A valiação deve conter ao menos uma palavra' })
    .max(450),
  rate: z.number().min(0).max(5),
})

type FormNewReviewData = z.infer<typeof formNewReviewSchema>

const { base, header, avatar, boxTextArea, textArea } = newReview()

type NewReviewType = ComponentProps<'form'> & VariantProps<typeof newReview>

interface NewReviewProps extends NewReviewType {
  onClose: () => void
  bookId: string
}

export const NewReview = forwardRef<HTMLFormElement, NewReviewProps>(
  ({ onClose, bookId, animate, ...props }: NewReviewProps, ref) => {
    const maxCaracterer = 450
    const [text, setText] = useState<string>('')
    // const [rating, setRating] = useState<number>(0)

    const { data: session } = useSession()

    const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors },
    } = useForm<FormNewReviewData>({
      resolver: zodResolver(formNewReviewSchema),
    })

    useEffect(() => {
      if (session?.user?.id) {
        setValue('userId', session?.user?.id ?? undefined)
      }

      setValue('bookId', bookId ?? undefined)
    }, [session, setValue, bookId])

    function handleLimitCaracteres(event: ChangeEvent<HTMLTextAreaElement>) {
      const newText = event.target.value
      if (newText.length <= maxCaracterer) {
        setText(newText)
      }
    }

    /* const handleRatingChange = (newRating: number) => {
      setRating(newRating) // Atualiza o estado dinamicamente
    } */

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
      mutationFn: async (data: FormNewReviewData) => {
        return await api.post(`/new-review`, {
          userId: data.userId,
          bookId: data.bookId,
          description: data.description,
          rate: data.rate,
        })
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ['books'],
        })
        toast.success('Avaliação criada com sucesso', {
          action: {
            label: 'Fechar',
            onClick: () => toast.dismiss(),
          },
        })
        onClose()
      },
      onError: (error: ErrorProps) => {
        toast.error(`${error.response.data.message}`, {
          action: {
            label: 'Fechar',
            actionButtonStyle: { zIndex: 100 },
            onClick: () => toast.dismiss(),
          },
        })
      },
    })

    async function handleOnSubmit(data: FormNewReviewData) {
      mutate(data)
    }

    return (
      <form
        {...props}
        ref={ref}
        onSubmit={handleSubmit(handleOnSubmit)}
        className={base({ animate })}
      >
        <div className={header()}>
          <div className="flex items-center gap-4">
            <div className={avatar()}>
              <Image
                src={session?.user?.image ?? ''}
                alt={session?.user?.name ?? ''}
                width={40}
                height={40}
                className="flex h-10 w-10 rounded-full bg-cover"
              />
            </div>
            <span className="font-nunito text-base font-bold leading-short text-gray-100">
              {session?.user?.name}
            </span>
          </div>
          <div>
            <Controller
              name="rate"
              control={control}
              defaultValue={0} // Valor inicial
              render={({ field }) => (
                <Rating
                  {...field}
                  value={field.value || 0} // Evitar valores indefinidos
                  onChange={(newValue: number) => field.onChange(newValue)}
                  itemStyles={customStyles}
                  style={{ maxWidth: 92 }}
                  halfFillMode="box"
                />
              )}
            />
          </div>
        </div>
        <div className={boxTextArea()}>
          <textarea
            className={textArea()}
            placeholder="Escreva sua avaliação"
            {...register('description')}
            onChange={handleLimitCaracteres}
            maxLength={maxCaracterer}
          />
          <span className="flex justify-end pt-1 font-nunito text-xs font-normal leading-base text-[#7C7C8A]">
            {`${text?.length || 0}/${maxCaracterer}`}
          </span>
        </div>
        {errors.userId && (
          <span className="font-nunito text-xs font-normal leading-base text-red-500">
            {errors.userId.message}
          </span>
        )}
        {errors.bookId && (
          <span className="font-nunito text-xs font-normal leading-base text-red-500">
            {errors.bookId.message}
          </span>
        )}
        {errors.description && (
          <span className="font-nunito text-xs font-normal leading-base text-red-500">
            {errors.description.message}
          </span>
        )}
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex rounded bg-gray-600 p-2"
          >
            <X size={24} className="text-purple-100" />
          </button>
          <button type="submit" className="flex rounded bg-gray-600 p-2">
            <Check size={24} className="text-green-100" />
          </button>
        </div>
      </form>
    )
  },
)

NewReview.displayName = 'NewReview'
