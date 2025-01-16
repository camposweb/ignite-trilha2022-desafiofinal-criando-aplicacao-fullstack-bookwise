'use client'
import * as Dialog from '@radix-ui/react-dialog'
import googleIcon from '../app/assets/google-icon.png'
import githubIcon from '../app/assets/github-icon.png'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Box } from './box'
import { X } from '@phosphor-icons/react/dist/ssr'

/* const dialogLogin = tv({
  slots: {
    base: '',
  },
})

const { base } = dialogLogin() */

// type DialogLoginType = ComponentProps<'div'>

// interface DialogLoginProps extends DialogLoginType {}

export const DialogLogin = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="font-nunito text-base font-bold leading-base text-purple-100">
          Avaliar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-gray-800/60 data-[state=open]:animate-fade" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 animate-fade">
          <Box className="flex flex-col px-16 py-14">
            <Dialog.Title className="font-nunito text-base font-bold leading-short text-gray-200">
              Faça login para deixar sua avaliação
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Faça login para deixar sua avaliação
            </Dialog.Description>
            <div className="mt-10 flex flex-col gap-4">
              <button
                onClick={() => signIn('google')}
                className="flex gap-5 rounded-lg border-2 border-solid border-transparent bg-gray-600 px-6 py-5 font-nunito text-lg font-bold leading-base text-gray-100 transition hover:border-2 hover:border-gray-500"
              >
                <span>
                  <Image src={googleIcon} alt="Google Login" />
                </span>
                Entar com o Google
              </button>
              <button
                onClick={() => signIn('github')}
                className="flex gap-5 rounded-lg border-2 border-solid border-transparent bg-gray-600 px-6 py-5 font-nunito text-lg font-bold leading-base text-gray-100 transition hover:border-2 hover:border-gray-500"
              >
                <span>
                  <Image src={githubIcon} alt="Github Login" />
                </span>
                Entrar com o Github
              </button>
            </div>
            <Dialog.Close>
              <X size={24} className="absolute right-4 top-4 text-gray-400" />
            </Dialog.Close>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
