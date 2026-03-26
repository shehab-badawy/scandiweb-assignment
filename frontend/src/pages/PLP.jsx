import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../graphql/client';
import { GET_PRODUCTS_BY_CATEGORY } from '../graphql/queries';
import { useCart } from '../context/CartContext';
import '../styles/plp.css';
import { toKebab } from '../utils/helpers';

const PLP = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsOverlayOpen } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: { category: category || 'all' },
      fetchPolicy: 'network-only' 
    }).then(res => {
      setProducts(res.data.products);
      setLoading(false);
    }).catch(err => {
      console.error("GraphQL Error:", err);
      setLoading(false);
    });
  }, [category]);

  const handleQuickShop = (e, product) => {
    e.stopPropagation(); 
    
    // Logic: If product has attributes, select the first item of each as default
    const defaultAttributes = product.attributes ? product.attributes.reduce((acc, attr) => {
      acc[attr.id] = attr.items[0].id;
      return acc;
    }, {}) : {};
    
    addToCart(product, defaultAttributes);
    setIsOverlayOpen(true);
  };

  if (loading) return <div className="loader">Loading Products...</div>;

  return (
    <main className="plp-container">
      <h1 className="category-title">{category || 'all'}</h1>
      
      <div className="product-grid">
        {products.map(product => {
          // Fallback for empty gallery arrays in your DB
          const displayImage = product.gallery && product.gallery.length > 0 
            ? product.gallery[0] 
            : 'https://imgs.search.brave.com/nW8iPwhmpQOqrTyHizHKlZno4V7Wti_7xxKZ7kF1xW0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC81/NS84NS9uby1pbWFn/ZS1zeW1ib2wtc2hh/ZG93LW1pc3Npbmct/YXZhaWxhYmxlLWlj/b24tdmVjdG9yLTQ0/Njk1NTg1LmpwZw';


          const kebabName = product.name.toLowerCase().replace(/\s+/g, '-');

          return (
            <div 
              key={product.id} 
              className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}
              data-testid={`product-${toKebab(product.name)}`}
              onClick={() => product.inStock && navigate(`/product/${product.id}`)}
            >
              <div className="image-wrapper">
                <img src={displayImage} alt={product.name} />
                
                {!product.inStock && (
                  <div className="stock-overlay">OUT OF STOCK</div>
                )}
                
                {product.inStock && (
                  <button 
                    className="quick-shop-btn"
                    onClick={(e) => handleQuickShop(e, product)}
                    aria-label="Add to cart"
                  >
                    🛒
                  </button>
                )}
              </div>
              
              <div className="product-info">
                <p className="product-name">{product.brand} {product.name}</p>
                <p className="product-price">
                  {product.prices[0].symbol}
                  {Number(product.prices[0].amount).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default PLP;