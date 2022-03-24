import fs from 'fs/promises';
import path from 'path'

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => <li key={product.id}>{product.title}</li>)}
    </ul>
  )

  return (
    <ul>
      <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li>
    </ul>
  );
}

//STATIC PAGE FOR PRE-GENERATION
export async function getStaticProps() {
  console.log('Piping -> (Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: '/no-data'
  //     }
  //   }
  // }

  // if (data.products.length === 0) {
  //   return { notFound: true };
  // } 

  return {
    props: {
      products: data.products
    },
    revalidate: 12
  };
}

export default HomePage;
