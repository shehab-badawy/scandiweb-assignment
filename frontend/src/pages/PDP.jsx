import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../graphql/client';
import { GET_PRODUCT_DETAILS } from '../graphql/queries';
import { useCart } from '../context/CartContext';
import '../styles/pdp.css';
import { toKebab } from '../utils/helpers';


const PDP = () => {
  const { id } = useParams();
  const { addToCart, setIsOverlayOpen } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.query({
      query: GET_PRODUCT_DETAILS,
      variables: { id },
      fetchPolicy: 'network-only'
    }).then(res => {
      setProduct(res.data.product);
      setLoading(false);
    }).catch(err => {
      console.error("PDP Fetch Error:", err);
      setLoading(false);
    });
  }, [id]);

  const handleAttributeSelect = (attrId, itemId) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attrId]: itemId
    }));
  };


  const isAllSelected = product?.attributes.every(attr => selectedAttributes[attr.id]);

  const handleAddToCart = () => {
    if (isAllSelected && product.inStock) {
      addToCart(product, selectedAttributes);
      setIsOverlayOpen(true);
    }
  };

  const parseDescription = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    const transform = (node) => {
      if (node.nodeType === 3) return node.textContent; // Text node
      const Tag = node.nodeName.toLowerCase();
      const children = Array.from(node.childNodes).map((child, i) => (
        <React.Fragment key={i}>{transform(child)}</React.Fragment>
      ));
      
      switch (Tag) {
        case 'p': return <p>{children}</p>;
        case 'b': case 'strong': return <strong>{children}</strong>;
        case 'ul': return <ul>{children}</ul>;
        case 'li': return <li>{children}</li>;
        case 'br': return <br />;
        default: return children;
      }
    };

    return Array.from(doc.body.childNodes).map((node, i) => (
      <React.Fragment key={i}>{transform(node)}</React.Fragment>
    ));
  };

  if (loading || !product) return <div className="loader">Loading Product...</div>;

  const kebabName = (str) => str.toLowerCase().replace(/\s+/g, '-');

  return (
    <main className="pdp-container">
      {/* 1. Gallery Section */}
      <section className="pdp-gallery" data-testid="product-gallery">
        <div className="thumbnail-list">
          {product.gallery.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={`${product.name} ${idx}`} 
              className={selectedImage === idx ? 'active-thumb' : ''}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>
        
        <div className="main-image-wrapper">
          <img src={product.gallery[selectedImage]} alt={product.name} />
          
          {product.gallery.length > 1 && (
            <div className="gallery-navigation">
              <button 
                className="nav-arrow" 
                onClick={() => setSelectedImage(prev => (prev === 0 ? product.gallery.length - 1 : prev - 1))}
              >
                &lt;
              </button>
              <button 
                className="nav-arrow" 
                onClick={() => setSelectedImage(prev => (prev === product.gallery.length - 1 ? 0 : prev + 1))}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Info Section */}
      <section className="pdp-info">
        <div className="pdp-header">
          <h1 className="brand-name">{product.brand}</h1>
          <h2 className="product-name">{product.name}</h2>
        </div>

        {product.attributes.map(attr => (
          <div 
            key={attr.id} 
            className="attribute-group" 
            data-testid={`product-attribute-${toKebab(attr.name)}`}
          >
            <p className="attr-label">{attr.name.toUpperCase()}:</p>
            <div className="attr-items">
              {attr.items.map(item => {
                const isSelected = selectedAttributes[attr.id] === item.id;
                const isColor = attr.type === 'swatch';
                const style = isColor ? { backgroundColor: item.value } : {};

                const testId = `product-attribute-${toKebab(attr.name)}-${item.value}`;

                return (
                  <button
                    key={item.id}
                    data-testid={testId} 
                    className={`attr-btn ${attr.type} ${isSelected ? 'selected' : ''}`}
                    style={style}
                    onClick={() => handleAttributeSelect(attr.id, item.id)}
                  >
                    {!isColor ? item.displayValue : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="price-section">
          <p className="price-label">PRICE:</p>
          <p className="price-amount" data-testid="product-price">
            {product.prices[0].symbol}{Number(product.prices[0].amount).toFixed(2)}
          </p>
        </div>

        <button 
          className="add-to-cart-btn"
          data-testid="add-to-cart"
          disabled={!isAllSelected || !product.inStock}
          onClick={handleAddToCart}
        >
          {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
        </button>

        <div className="product-description" data-testid="product-description">
          {parseDescription(product.description)}
        </div>
      </section>
    </main>
  );
};

export default PDP;