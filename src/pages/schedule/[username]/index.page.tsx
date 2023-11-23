import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'

interface ScheduleProps {
  user: {
    name: string
    avatarUrl: string
    bio: string
  }
}

export default function Schedule({
  user: { name, bio, avatarUrl },
}: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${name} | Ignite Call`} />

      <Container>
        <UserHeader>
          <Avatar src={avatarUrl}></Avatar>
          <Heading>{name}</Heading>
          <Text>{bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      name: true,
      avatar_url: true,
      bio: true,
    },
  })

  if (!user) {
    return { notFound: true }
  }

  return {
    props: {
      user: { bio: user.bio, avatarUrl: user.avatar_url, name: user.name },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
