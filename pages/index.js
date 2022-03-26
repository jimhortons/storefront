 
import styles from './../styles/products.module.css'
 

function Product ({productName, uid, productPrice, imageUrl, ...props}){
  
       return   <li className={styles.productItem}>
           <img src={imageUrl} alt=""  width="100"/><p>     {productName}</p>
      
           <p>{uid}</p>
           <button>buy now</button>
           </li>
}


function IndexPage( props) {
  
   const featuredProducts = Object.values(props.products).slice(0,3)
   console.log(featuredProducts)
    
    
    
 
    return (
          <ul className={styles.productList}>
            {
                featuredProducts.map(product=> <Product key={product.uid} {...product} />)
            }
            
          </ul>
    )
        
}


export async function getStaticProps () {
    // `getStaticProps` is executed on the server side.
    const res = fetch( 'https://shoeshine8k-default-rtdb.firebaseio.com/products.json' )
    const products = await (await res).json()
    return {
      props: {
        products,
        fallback: false,
        revalidate: 20
      }
    }
  }

  
 





export default IndexPage 