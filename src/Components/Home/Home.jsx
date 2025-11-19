import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  const addToCart = () => {
    const auth = localStorage.getItem("Auth");
    if (!auth) {
      alert("Sign in to add items to cart!");
      return;
  }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");}

  return (
    <div className="mainhome">
      <main className="hero">
        <h1>Welcome to <span className="cc">CC.</span>Good<span className="cc">ies</span></h1>
        <p className="subtitle">Browse our products and shop affordably.</p>
      </main>
      <h2 className="specials-heading">Weekly Specials</h2>
       <video
  width="1000"
  controls
  autoPlay muted loop style={{ borderRadius: "10px", display: "block", margin: "0 auto" }}
>
        <source src="Your paragraph text.mp4" type="video/mp4" />
      </video>
      <section className="specials">
        <h2 className="specials-heading">Shop Now!</h2>
        </section>
        <section className="specials">

         <div className="products-grid">
          <div className="product-card">
            <img src="granola.jpg" alt="Granola" />
            <h5 className="brand">Granola Organic</h5>
            <p className="product-text">Assorted Granola 750g</p>
            <p className="price">R43.69</p>
             <button
            onClick={() =>
              addToCart({
                _id: "granola",
                product_name: "Assorted Granola 750g",
                price: 43.69,
                image: "granola.jpg"
              })
            }
          >
            Add to Cart
          </button>
          </div>

          <div className="product-card">
            <img src="clover milk.jpeg" alt="Milk" />
            <h5 className="brand">Clover</h5>
            <p className="product-text">Full cream milk 1L</p>
            <p className="price">R20.00</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="olive oil.jpeg" alt="Olive Oil" />
            <h5 className="brand">GreenLeaf</h5>
            <p className="product-text">Extra Virgin Olive Oil</p>
            <p className="price">R139.69</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="vita coco.jpeg" alt="Coconut Water" />
            <h5 className="brand">Coco Fresh</h5>
            <p className="product-text">Coconut Water 500ml</p>
            <p className="price">R35.99</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </section>
       {/* <section className="specials">
         <div className="products-grid">
          <div className="product-card">
            <img src="crackly's biltong.jpeg" alt="Biltong" />
            <h5 className="brand">Crackly's</h5>
            <p className="product-text">Sliced Biltong 750g</p>
            <p className="price">R43.69</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="morning mills.png" alt="Milk" />
            <h5 className="brand">Morning Mills</h5>
            <p className="product-text">Choco balls 350g</p>
            <p className="price">R35.99</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="kelloggs 1kg.png" alt="Kelloggs Corn flakes" />
            <h5 className="brand">Kellogg's</h5>
            <p className="product-text">Corn Flakes 1kg</p>
            <p className="price">R89.99</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="Red apples.jpg" alt="Red Apples" />
            <h5 className="brand">Fresh</h5>
            <p className="product-text">Red Apples 1kg</p>
            <p className="price">R17.49</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </section>
      <section className="specials">
         <div className="products-grid">
          <div className="product-card">
            <img src="beef wors.jpg" alt="Boerewors" />
            <h5 className="brand">Meats</h5>
            <p className="product-text">Beef Boerewors 1kg</p>
            <p className="price">R109.69</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="Green apples.jpeg" alt="Green Apples" />
            <h5 className="brand">Fresh</h5>
            <p className="product-text">Green Apples 1kg</p>
            <p className="price">R19.99</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="domestos.jpg" alt="Domestos" />
            <h5 className="brand">Domestos</h5>
            <p className="product-text">Extended Germ-Kill 750ml</p>
            <p className="price">R36.99</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="sunlight.jpg" alt="Dishwasher" />
            <h5 className="brand">Sunlight</h5>
            <p className="product-text">Dishwashing liquid 750ml</p>
            <p className="price">R34.99</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </section> */}
     


      <footer className="footer">
  <div className="footer-container">

    <div className="footer-column">
      <h4>MY ACCOUNT</h4>
      <ul>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/products">Shopping Lists</Link></li>
      </ul>
        <button><Link to="/signup">Sign in/Sign Up</Link></button>
    </div>

    <div className="footer-column">
      <h4>CUSTOMER SERVICE</h4>
      <ul>
        <li>FAQs</li>
        <li>Delivery Options</li>
        <li>Returns & Exchanges</li>
        <li>Terms & Conditions</li>
        <li>Corporate Sales</li>
      </ul>
    </div>

    <div className="footer-column">
      <h4>ABOUT CC.GOODIES</h4>
      <ul>
        <li>Store Locator</li>
        <li>Contact Us</li>
        <li>About Us</li>
        <li>Careers</li>
        <li>Press & News</li>
      </ul>
    </div>

    <div className="footer-column newsletter">
      <h4>Be the first to know!</h4>
      <p>Sign up for our newsletter to know about our latest deals.</p>
      <p className="privacy">Read our <a href="#">Privacy Policy</a></p>
    </div>
  </div>

  <div className="footer-bottom">
    <p className='last-p'>© 2025 CC.Goodies. All Rights Reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Home;