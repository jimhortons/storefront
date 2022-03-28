import styles from "./../styles/products.module.css";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

import { checkOutRequest } from "./../libs/checkOutRequest";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Product({ productName, uid, productPrice, imageUrl, ...props }) {
  function onHandlePurchase() {
    fetch("api/products", {
      method: "POST",
      body:  JSON.stringify( { uid} ),
    })
      
  }

  return (
    <li className={styles.productItem}>
      <img src={imageUrl} alt="" width="100" />
      <p> {productName}</p>

      <p>{uid}</p>
      <form action="/api/products" method="POST">
        <input type="hidden" name="uid" value={uid} />
         <button type="submit">buy now</button>
      </form>
    </li>
  );
}

function IndexPage(props) {
  const featuredProducts = Object.values(props.products).slice(0, 3);

  return (
    <ul className={styles.productList}>
      {featuredProducts.map((product) => (
        <Product
          key={product.uid}
          {...product}
          checkOutRequest={checkOutRequest}
        />
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  const res = fetch(
    "https://shoeshine8k-default-rtdb.firebaseio.com/products.json"
  );
  const products = await (await res).json();
  
  return {
    props: {
      products,
      fallback: false,
    },
    revalidate: 60,
  };
}

export default IndexPage;
