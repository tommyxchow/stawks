import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout title='404 | STAWKS' description='Stock or page not found'>
      <div className='m-auto flex min-h-screen max-w-screen-md items-center justify-center'>
        <h1 className='text-neutral-600 dark:text-neutral-400'>
          404 - Stock or page not found
        </h1>
      </div>
    </Layout>
  );
}
