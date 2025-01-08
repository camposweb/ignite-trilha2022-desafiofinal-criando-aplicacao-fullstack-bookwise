import { Card } from '@/components/card'
import { CaretRight, ChartLine } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

export default function PageHome() {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-[72px] flex items-center gap-3">
        <ChartLine size={32} className="text-green-100" />
        <h1 className="font-nunito text-2xl font-bold leading-base text-gray-200">
          Início
        </h1>
      </div>
      <div className="mt-10 flex justify-between gap-16">
        <article className="flex w-full max-w-[608px] flex-col gap-3 2xl:max-w-none">
          <span className="font-nunito text-base font-normal leading-base text-gray-100">
            Avaliações mais recentes
          </span>
          <Card
            title="A revolução dos bichos"
            author="George Orwell"
            coverUrl={`https://grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grjgd93pjxvw/b/bookwise/o/a-revolucao-dos-bixos.png`}
            member="Jaxson Dias"
            avalaliationDate="Hoje"
            variants="recents"
            rating={4}
          />
          <Card
            title="A revolução dos bichos"
            author="George Orwell"
            coverUrl={`https://grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grjgd93pjxvw/b/bookwise/o/a-revolucao-dos-bixos.png`}
            member="Jaxson Dias"
            avalaliationDate="Hoje"
            variants="recents"
            rating={4}
          />
          <Card
            title="A revolução dos bichos"
            author="George Orwell"
            coverUrl={`https://grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grjgd93pjxvw/b/bookwise/o/a-revolucao-dos-bixos.png`}
            member="Jaxson Dias"
            avalaliationDate="Hoje"
            variants="recents"
            rating={4}
          />
        </article>
        <section className="mr-24">
          <div className="flex justify-between">
            <span className="font-nunito text-base font-normal leading-base text-gray-100">
              Livros Populares
            </span>
            <Link
              href={''}
              className="flex items-center gap-3 font-nunito text-sm font-bold leading-base text-purple-100"
            >
              Ver Todos
              <CaretRight size={16} />
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Card
              title="A revolução dos bichos"
              author="George Orwell"
              coverUrl={`https://grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grjgd93pjxvw/b/bookwise/o/a-revolucao-dos-bixos.png`}
              rating={4}
            />
            <Card
              title="A revolução dos bichos"
              author="George Orwell"
              coverUrl={`https://grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grjgd93pjxvw/b/bookwise/o/a-revolucao-dos-bixos.png`}
              rating={4}
            />
            <Card
              title="A revolução dos bichos"
              author="George Orwell"
              coverUrl={`https://grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grjgd93pjxvw/b/bookwise/o/a-revolucao-dos-bixos.png`}
              rating={4}
            />
            <Card
              title="A revolução dos bichos"
              author="George Orwell"
              coverUrl={`https://grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grjgd93pjxvw/b/bookwise/o/a-revolucao-dos-bixos.png`}
              rating={4}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
