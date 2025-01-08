import Image from 'next/image'
import imageLogin from '../assets/image-login.png'
import googleIcon from '../assets/google-icon.png'
import githubIcon from '../assets/github-icon.png'
import rocketLauchIcon from '../assets/rocket-launch-icon.png'

export default function PageLogin() {
  return (
    <main className="grid min-h-screen grid-cols-1 p-5 xl:grid-cols-[1fr,2fr]">
      <div className="hidden max-w-[606px] items-center justify-center md:flex">
        <Image
          src={imageLogin}
          alt="imagelogin"
          quality={100}
          width={606}
          height={920}
        />
      </div>
      <div className="flex items-center justify-center lg:justify-around">
        <div className="">
          <h1 className="font-nunito text-2xl font-bold leading-short text-gray-100">
            Boas vindas!
          </h1>
          <h3 className="font-nunito text-base font-normal leading-base text-gray-200">
            Faça seu login ou acesse como visitante.
          </h3>
          <div className="mt-10 flex flex-col gap-4">
            <button className="flex gap-5 rounded-lg border-2 border-solid border-transparent bg-gray-600 px-6 py-5 font-nunito text-lg font-bold leading-base text-gray-100 hover:border-2 hover:border-gray-500">
              <span>
                <Image src={googleIcon} alt="Google Login" />
              </span>
              Entar com o Google
            </button>
            <button className="flex w-full gap-5 rounded-lg bg-gray-600 px-6 py-5 font-nunito text-lg font-bold leading-base text-gray-100">
              <span>
                <Image src={githubIcon} alt="Google Login" />
              </span>
              Entrar com o Github
            </button>
            <button className="flex w-full gap-5 rounded-lg bg-gray-600 px-6 py-5 font-nunito text-lg font-bold leading-base text-gray-100">
              <span>
                <Image src={rocketLauchIcon} alt="Google Login" />
              </span>
              Acessar como visitante
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
