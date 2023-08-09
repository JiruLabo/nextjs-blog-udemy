import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";
import { siteTitle } from "../components/layout";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  // console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私は60歳までにフリーエンジニアになります！</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.paddingg1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                  alt="img"
                />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
