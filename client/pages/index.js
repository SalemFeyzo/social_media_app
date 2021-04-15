import Head from 'next/head'
import { gql } from '@apollo/client'
import client from '../apollo-client'

const Home = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Social Media App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>
          {posts.map((post) => (
            <p key={post.id}>{post.body}</p>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        getPosts {
          id
          body
          username
          createdAt
          commentsCount
          likesCount
          likes {
            id
            username
          }
          comments {
            id
            username
            body
          }
        }
      }
    `,
  })

  return {
    props: {
      posts: data.getPosts,
    },
  }
}
